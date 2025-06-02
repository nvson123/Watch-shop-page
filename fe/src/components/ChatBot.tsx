import instance from '@/api/axiosIntance';
import { useSocket } from '@/data/socket/useSocket'; // Đảm bảo rằng bạn đã cấu hình socket context
import { useState, useEffect, useRef } from 'react';
import { ChatBubble } from "@medusajs/icons"
const ChatBot = () => {
    const [messages, setMessages] = useState([]); // Lưu trữ danh sách tin nhắn
    const [input, setInput] = useState(''); // Lưu trữ nội dung nhập từ người dùng
    const [isChatOpen, setIsChatOpen] = useState(false); // Trạng thái mở/đóng khung chat
    const [userId, setUserId] = useState(null); // Lưu trữ ID người dùng
    const socket = useSocket(); // Lấy kết nối socket từ context
    const messagesEndRef = useRef(null); // Tham chiếu đến phần tử chứa tin nhắn

    // Khởi tạo userId từ localStorage hoặc tạo mới
    useEffect(() => {
        let storedUserId = localStorage.getItem('userId');
        if (!storedUserId) {
            storedUserId = `user_${Date.now()}`;
            localStorage.setItem('userId', storedUserId);
        }
        setUserId(storedUserId);

        // Lắng nghe sự kiện nhận tin nhắn từ server
        socket.on('receive-message', (data) => {
            // Kiểm tra nếu tin nhắn phù hợp với userId hiện tại và chỉ khi chat đang mở
            if (data && data._id && data.userId === userId && isChatOpen) {
                setMessages((prevMessages) => {
                    // Kiểm tra xem tin nhắn đã có trong danh sách chưa
                    if (!prevMessages.find(msg => msg._id === data._id)) {
                        return [...prevMessages, data]; // Thêm tin nhắn mới nếu chưa có
                    }
                    return prevMessages; // Không làm gì nếu tin nhắn đã có
                });
            }
        });

        // Dọn dẹp khi component bị unmount
        return () => {
            socket.off('receive-message');
        };
    }, [socket, userId, isChatOpen]);

    // Hàm gọi API để lấy tất cả tin nhắn theo userId
    const fetchMessagesByUserId = async () => {
        try {
            if (userId) {
                const response = await instance.get(`/messages/user/${userId}`);
                setMessages(response.data); // Cập nhật danh sách tin nhắn từ backend
            }
        } catch (error) {
            console.error('Error fetching messages by userId:', error);
        }
    };

    // Hàm lưu tin nhắn vào localStorage
    const saveMessagesToLocalStorage = (messages) => {
        localStorage.setItem('messages', JSON.stringify(messages)); // Lưu tin nhắn vào localStorage
    };

    // Hàm tải tin nhắn từ localStorage
    const loadMessagesFromLocalStorage = () => {
        const storedMessages = localStorage.getItem('messages');
        return storedMessages ? JSON.parse(storedMessages) : [];
    };

    // Sử dụng trong useEffect để tải tin nhắn khi mở chat
    useEffect(() => {
        if (isChatOpen) {
            const storedMessages = loadMessagesFromLocalStorage();
            setMessages(storedMessages);
        }
    }, [isChatOpen]);

    // Cập nhật lại tin nhắn trong localStorage khi có thay đổi
    useEffect(() => {
        if (messages.length > 0) {
            saveMessagesToLocalStorage(messages); // Lưu tin nhắn khi state thay đổi
        }
    }, [messages]);

    // Hàm gửi tin nhắn mới
    const sendMessage = async () => {
        const trimmedMessage = input.trim(); // Loại bỏ khoảng trắng thừa ở đầu và cuối tin nhắn

        if (!trimmedMessage) return; // Nếu tin nhắn rỗng sau khi loại bỏ khoảng trắng, không gửi

        const newMessage = { text: trimmedMessage, sender: 'user', userId };

        try {
            // Gửi tin nhắn của người dùng qua API
            const response = await instance.post('/chat', { message: trimmedMessage, userId });

            // Phát sự kiện với tin nhắn người dùng
            socket.emit('admin-send-message', { ...response.data.userMessage });

            // Cập nhật lại mảng tin nhắn khi nhận được phản hồi từ API
            setMessages((prevMessages) => [...prevMessages, response.data.userMessage]);

            setInput(''); // Reset input
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Hàm mở khung chat và tải tin nhắn
    const handleChatButtonClick = () => {
        setIsChatOpen(true);
        fetchMessagesByUserId(); // Lấy tin nhắn của người dùng khi mở chat
    };

    // Hàm cuộn đến tin nhắn mới nhất
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Sử dụng useEffect để cuộn đến tin nhắn mới nhất khi danh sách tin nhắn thay đổi
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className='z-10 absolute'>
            {/* Nút mở khung chat */}
            {!isChatOpen && (
                <button
                    onClick={handleChatButtonClick}
                    className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg flex items-center p-2 cursor-pointer"
                >
                    <div className="flex gap-2 items-center">
                        <span className="text-black font-semibold">Nhắn tin</span>
                        <i className="fa-regular fa-comment text-[25px]"></i>
                        {/* <ChatBubble /> */}
                    </div>
                </button>
            )}

            {/* Giao diện khung chat */}
            {isChatOpen && (
                <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                    <div className="bg-black text-white p-4 flex items-center">
                        <img
                            className="w-10 h-10 bg-white  rounded-full mr-2 object-cover"
                            src="/logo_fashion.png"
                            alt="Admin"
                        />
                        <div>
                            <p className="font-bold">Tempus Chroniker</p>
                            <p className="text-[10px] text-gray-400">không hoạt động</p>
                        </div>
                        <button
                            onClick={() => setIsChatOpen(false)}
                            className="ml-auto text-white font-bold"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="p-4 h-80 overflow-y-auto space-y-2">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className='flex items-center'>
                                    {msg.sender !== 'user' && (
                                        <img
                                            src="/logo_fashion.png"
                                            alt="Admin Avatar"
                                            className="w-10 h-10 rounded-full mr-2 border mt-4"
                                        />
                                    )}
                                    <div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Intl.DateTimeFormat('vi-VN', {
                                                year: 'numeric',
                                                month: 'long', // Sử dụng 'long' để hiển thị tên tháng đầy đủ, hoặc 'short' nếu muốn rút gọn
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                timeZone: 'Asia/Ho_Chi_Minh', // Đảm bảo sử dụng múi giờ Việt Nam
                                            }).format(new Date(msg.timestamp))}
                                        </p>
                                        <div
                                            className={`${msg.sender === 'user' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'
                                                } px-2 py-2 rounded-lg max-w-xs`}
                                        >

                                            {msg.text}
                                        </div>

                                    </div>
                                </div>
                                {msg.sender === 'user' && (
                                    <img
                                        src="https://res.cloudinary.com/dlzhmxsqp/image/upload/v1716288330/e_commerce/s4nl3tlwpgafsvufcyke.jpg"
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full ml-2 mt-4"
                                    />
                                )}
                            </div>
                        ))}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="flex items-center p-4 border-t gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            type="text"
                            placeholder="Nhập tin nhắn..."
                            className="flex-grow px-3 py-2 border rounded-lg focus:outline-none"
                        />
                        <button
                            onClick={sendMessage}
                            className=" bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
