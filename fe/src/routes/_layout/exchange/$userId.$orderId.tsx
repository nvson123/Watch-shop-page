import instance from '@/api/axiosIntance';
import CurrencyVND from '@/components/config/vnd';
import { toast, usePrompt } from '@medusajs/ui';
import {
  createFileRoute,
  useNavigate,
  useParams,
} from '@tanstack/react-router';
import { useEffect, useState } from 'react';

type OrderItem = {
  productId: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
};

type Order = {
  items: OrderItem[];
  totalPrice?: number;
};

export const Route = createFileRoute('/_layout/exchange/$userId/$orderId')({
  component: ExchangeRequestPage,
});

function ExchangeRequestPage() {
  const { orderId } = useParams({ from: '/_layout/exchange/$userId/$orderId' });
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [reason, setReason] = useState('');
  const [email, setEmail] = useState('');
  const [returnType] = useState('complaint');
  const [loading, setLoading] = useState(false);
  const dialog = usePrompt();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = storedUser?.user?._id;
    const userEmail = storedUser?.user?.email;
    
    if (userEmail) {
      setEmail(userEmail);
    }
  
    if (!userId || !orderId) {
      console.error('userId hoặc orderId không tồn tại');
      return;
    }
  
    const fetchOrder = async () => {
      setLoading(true);
      try {
        // Gọi API lấy thông tin đơn hàng theo userId và orderId
        const response = await instance.get(`/orders/${userId}/${orderId}`);
        console.log('Dữ liệu trả về từ API:', response.data);
  
        if (response.data && response.data.data) {
          setOrder(response.data.data); // Gán dữ liệu đơn hàng vào state
        } else {
          setOrder(null); // Nếu không có dữ liệu hợp lệ, set null
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin đơn hàng:', error);
        toast.error('Không thể tải dữ liệu đơn hàng.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrder();
  }, [orderId, navigate]);

  const handleSubmit = async () => {
    if (!reason) {
      toast.error('Vui lòng chọn lý do đổi trả!');
      return;
    }
    if (!email) {
      toast.error('Vui lòng nhập email.');
      return;
    }

    const isValidEmail = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail(email)) {
      toast.error('Vui lòng nhập email hợp lệ.');
      return;
    }

    const userHasConfirmed = await dialog({
      title: 'Khiếu nại đơn hàng',
      description: 'Bạn có chắc chắn muốn khiếu nại đơn hàng này không?',
    });

    if (!userHasConfirmed) return;

    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = storedUser?.user?._id;

      if (!userId || !orderId) {
        toast.error('Không tìm thấy thông tin người dùng hoặc đơn hàng.');
        return;
      }

      await instance.put(`/orders/${orderId}/return`, {
        reason,
        email,
        returnType,
      });

      toast.success('Yêu cầu đổi trả thành công');
      navigate({ to: '/orderuser' });
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu đổi trả:', error);
      toast.error(
        'Có lỗi xảy ra khi gửi yêu cầu đổi trả. Vui lòng thử lại sau.'
      );
    }
  };

  if (loading) {
    return <div>Đang tải thông tin đơn hàng...</div>;
  }

  if (!order || !Array.isArray(order.items) || order.items.length === 0) {
    return <div className="text-center">Đơn hàng không có sản phẩm nào.</div>;
  }

  return (
    <div className="mx-auto mb-5 mt-8 max-w-3xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Tình huống bạn đang gặp?</h2>
      <p className="mb-6 text-gray-600">
        Tôi muốn đổi sản phẩm do không đúng mẫu mã, kích thước hoặc bị lỗi.
      </p>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Sản phẩm đã chọn</h3>
        {order.items.map(item => (
          <div
            key={item.productId}
            className="mb-4 flex items-center space-x-4 border-b pb-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-16 w-16 rounded object-cover"
            />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-600">Màu: {item.color}</p>
              <p className="text-gray-600">Kích thước: {item.size}</p>
              <p className="text-gray-600">Số lượng: {item.quantity}</p>
              <p className="text-gray-600">
                Giá: <CurrencyVND amount={item.price * item.quantity} />
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Chọn lý do đổi trả</h3>
        <select
          value={reason}
          onChange={e => setReason(e.target.value)}
          className="mb-4 w-full rounded border p-2"
        >
          <option value="">Chọn Lý Do</option>
          <option value="Sản phẩm không đúng mẫu mã đặt hàng">
            Sản phẩm không đúng mẫu mã đặt hàng
          </option>
          <option value="Sản phẩm không đúng kích thước">
            Sản phẩm không đúng kích thước
          </option>
          <option value="Sản phẩm bị lỗi hoặc hư hỏng">
            Sản phẩm bị lỗi hoặc hư hỏng
          </option>
        </select>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Thông tin hoàn tiền</h3>
        <div className="mb-2 flex justify-between">
          <span>Số tiền hoàn lại:</span>
          <span>
            <CurrencyVND amount={order.totalPrice} />
          </span>
        </div>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full rounded border p-2"
          placeholder="Nhập địa chỉ email của bạn"
        />
      </div>

      <div className="text-right">
        <button
          onClick={() => navigate({ to: '/orderuser' })}
          className="mr-4 rounded bg-gray-500 px-6 py-2 font-semibold text-white hover:bg-gray-600"
        >
          Hủy
        </button>
        <button
          onClick={handleSubmit}
          className="rounded bg-orange-500 px-6 py-2 font-semibold text-white hover:bg-orange-600"
        >
          Hoàn thành
        </button>
      </div>
    </div>
  );
}

export default ExchangeRequestPage;
