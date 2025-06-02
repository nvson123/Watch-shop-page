import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useRef } from 'react';
import Header from '@/components/layoutAdmin/header/header';
import instance from '@/api/axiosIntance';
import { useSocket } from '@/data/socket/useSocket';

export const Route = createFileRoute('/dashboard/_layout/messenger/')({
  component: Messenger,
});

export default function Messenger() {
  const [activeChat, setActiveChat] = useState(null); // Lưu ID người dùng đang được chọn
  const [newMessage, setNewMessage] = useState(''); // Lưu tin nhắn mới
  const [chats, setChats] = useState([]); // Lưu danh sách các cuộc trò chuyện
  const [messages, setMessages] = useState([]); // Lưu tin nhắn của người dùng đang được chọn
  const socket = useSocket(); // Kết nối socket
  const messagesEndRef = useRef(null); // Tham chiếu đến phần tử cuối cùng trong danh sách tin nhắn

  // Lấy danh sách cuộc trò chuyện khi component được mount
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await instance.get('/messages');
        const groupedMessages = groupMessagesByUserId(response.data);
        setChats(groupedMessages);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    fetchChats();

    // Lắng nghe sự kiện tin nhắn mới từ socket
    if (activeChat) {
      // Chỉ lắng nghe khi có cuộc trò chuyện đang mở
      socket.on('receive-message', data => {
        console.log('Received message:', data);
        if (data && data.userId === activeChat) {
          setMessages(prevMessages => {
            // Kiểm tra nếu tin nhắn đã có trong danh sách
            if (!prevMessages.find(msg => msg._id === data._id)) {
              return [...prevMessages, data]; // Thêm tin nhắn mới nếu chưa có
            }
            return prevMessages;
          });
        }
      });
    }

    return () => {
      socket.off('receive-message'); // Dọn dẹp khi component unmount hoặc activeChat thay đổi
    };
  }, [socket, activeChat]); // Thêm activeChat vào dependency để lắng nghe thay đổi

  // Nhóm các tin nhắn theo userId
  const groupMessagesByUserId = messages => {
    return messages.reduce((acc, message) => {
      const userId = message.userId?._id; // Kiểm tra nếu `userId` hợp lệ
      if (userId) {
        if (!acc[userId]) {
          acc[userId] = {
            userId,
            username: message.userId.username || 'Unknown User',
            avatar: message.userId.avatar || 'https://picsum.photos/100/100',
            messages: [],
          };
        }
        acc[userId].messages.push(message);
      }
      return acc;
    }, {});
  };

  // Hàm khi người dùng click vào tên
  const handleChatClick = userId => {
    setActiveChat(userId); // Lưu người dùng được chọn
    fetchMessagesByUser(userId); // Lấy tin nhắn của người dùng khi chọn cuộc trò chuyện
  };

  // Lấy tin nhắn của người dùng khi người dùng được chọn
  const fetchMessagesByUser = async userId => {
    try {
      const response = await instance.get(`/messages/user/${userId}`);
      setMessages(response.data); // Lưu tin nhắn của người dùng
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Hàm gửi tin nhắn
  const handleSendMessage = async () => {
    if (newMessage.trim() && activeChat) {
      try {
        const response = await instance.post('/chatRep', {
          userId: activeChat, // Đảm bảo activeChat là ID hợp lệ
          replyText: newMessage, // Đảm bảo newMessage không trống
        });

        console.log('data socket:', response);

        // Phát tin nhắn qua socket đến tất cả các client (bao gồm admin)
        socket.emit('admin-send-message', response.data.replyMessage);

        setMessages(prevMessages => [
          ...prevMessages,
          response.data.replyMessage, // Thêm tin nhắn mới vào UI
        ]);
        setNewMessage(''); // Reset input
      } catch (error) {
        console.error('Error sending reply:', error);
      }
    } else {
      console.error('Error: userId or replyText is missing');
    }
  };

  // Hàm cuộn xuống dưới khi có tin nhắn mới
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Sử dụng useEffect để cuộn đến tin nhắn mới khi danh sách tin nhắn thay đổi
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-screen overflow-hidden">
      <Header title="Trò Chuyện" pathname="/" />
      <div className="h-screen overflow-y-scroll">
        <div className="mx-6 mt-4 flex flex-col gap-1 rounded-lg border border-gray-200 bg-ui-bg-base px-6 py-4">
          <div className="flex justify-center bg-gray-100">
            <div className="flex h-[600px] w-full bg-white">
              {/* Sidebar */}
              <div className="w-1/3 border-r border-gray-200">
                <div className="border-b border-gray-200 p-4">
                  <h1 className="text-lg font-bold">Khách Hàng</h1>
                </div>
                <ul className="h-[calc(100vh-80px)] overflow-y-auto">
                  {Object.values(chats).map(chat => (
                    <li
                      key={chat.userId}
                      className={`flex cursor-pointer items-center px-2 py-3 hover:bg-gray-100 ${activeChat === chat.userId ? 'bg-gray-100' : ''}`}
                      onClick={() => handleChatClick(chat.userId)} // Chọn cuộc trò chuyện
                    >
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-xl font-bold text-white">
                        {chat.username.charAt(0).toLowerCase()}
                      </div>
                      <div>
                        <p className="font-semibold">{chat.username}</p>
                        <p className="text-sm text-gray-500">
                          {chat.messages[chat.messages.length - 1]?.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chat Area */}
              <div className="flex w-2/3 flex-col">
                <div className="flex items-center border-b border-gray-200 p-[16.5px]">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-xl font-bold text-white">
                    {activeChat &&
                      chats[activeChat]?.username?.charAt(0).toLowerCase()}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {activeChat
                        ? chats[activeChat]?.username
                        : 'Select a user'}
                    </p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4">
                  {messages.length === 0 ? (
                    <p>No messages yet</p>
                  ) : (
                    messages.map(message => (
                      <div
                        key={message._id}
                        className={`flex ${message.sender === 'user' ? 'items-start' : 'items-end justify-end'} mb-4`}
                      >
                        <div className="flex items-center">
                          {message.sender === 'user' && (
                            <div className="mr-4 mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-xl font-bold text-white">
                              {message.userId?.username?.charAt(0).toLowerCase() || '?'}
                            </div>
                          )}
                          <div>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Intl.DateTimeFormat('vi-VN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                timeZone: 'Asia/Ho_Chi_Minh',
                              }).format(new Date(message.timestamp))}
                            </p>
                            <div
                              className={`${message.sender === 'user' ? 'bg-gray-100' : 'bg-black text-white'
                                } rounded-lg p-3`}
                            >
                              <p>{message.text}</p>
                            </div>

                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {/* Phần tử để cuộn đến */}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div className="flex items-center border-t border-gray-200 p-4">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 "
                  />
                  <button
                    onClick={handleSendMessage}
                    className="ml-4 px-4 rounded-lg bg-black p-2 text-white hover:bg-slate-900"
                  >
                    Gửi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
