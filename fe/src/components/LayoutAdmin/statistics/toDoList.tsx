import { useFetchOrders } from '@/data/oder/useOderList';
import { Link } from '@tanstack/react-router';

const translateOrderStatus = status => {
  const statusTranslations = {
    pendingPayment: 'Đang chờ thanh toán',
    pending: 'Đang chờ xử lý',
    shipped: 'Đang vận chuyển',
    received: 'Giao hàng thành công',
    delivered: 'Hoàn thành đơn hàng',
    canceled: 'Đơn bị hủy',
    complaint: 'Khiếu nại chờ xử lý',
    refund_in_progress: 'Đang hoàn trả hàng',
    refund_completed: 'Hoàn trả hàng thành công',
    exchange_in_progress: 'Đang đổi trả hàng',
    exchange_completed: 'Đổi trả hàng thành công',
  };

  return statusTranslations[status] || status;
};

const ToDoList = () => {
  const { data, isLoading, error } = useFetchOrders({});

  if (isLoading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi khi tải đơn hàng: {error.message}</p>;

  const defaultStatusCounts = {
    pendingPayment: 0,
    pending: 0,
    shipped: 0,
    received: 0,
    delivered: 0,
    canceled: 0,
    complaint: 0,
    refund_in_progress: 0,
    refund_completed: 0,
    exchange_in_progress: 0,
    exchange_completed: 0,
  };

  // Phân loại trạng thái thành 2 nhóm
  const deliveryStatuses = [
    'pendingPayment',
    'pending',
    'shipped',
    'received',
    'delivered',
    'canceled',
  ];
  const complaintStatuses = [
    'complaint',
    'refund_in_progress',
    'refund_completed',
    'exchange_in_progress',
    'exchange_completed',
  ];

  const statusCounts = { ...defaultStatusCounts, ...data?.statusCounts };

  const deliveryCounts = Object.keys(statusCounts)
    .filter(status => deliveryStatuses.includes(status))
    .reduce((obj, key) => ({ ...obj, [key]: statusCounts[key] }), {});

  const complaintCounts = Object.keys(statusCounts)
    .filter(status => complaintStatuses.includes(status))
    .reduce((obj, key) => ({ ...obj, [key]: statusCounts[key] }), {});

  return (
    <div className="m-6 rounded-lg bg-white p-6">
      <h2 className="mb-8 text-center text-xl font-semibold">
        Danh sách cần làm
      </h2>

      {/* Nhóm Delivery */}
      <h3 className="mb-2 mt-4 text-lg font-medium">Đơn giao hàng</h3>
      <div className="grid grid-cols-4 gap-4">
        {Object.keys(deliveryCounts).map(status => (
          <div key={status} className="text-center">
            <Link
              to="/dashboard/order"
              state={{ status, selectedGroup: 'delivery' }}
            >
              <div className="text-3xl font-bold text-blue-500">
                {deliveryCounts[status]}
              </div>
              <p className="text-sm text-gray-600">
                {translateOrderStatus(status)}
              </p>
            </Link>
          </div>
        ))}
      </div>

      {/* Nhóm Complaint */}
      <h3 className="mb-2 mt-8 text-lg font-medium">Khiếu nại</h3>
      <div className="grid grid-cols-4 gap-4">
        {Object.keys(complaintCounts).map(status => (
          <div key={status} className="text-center">
            <Link
              to="/dashboard/order"
              state={{ status, selectedGroup: 'complaint' }}
            >
              <div className="text-3xl font-bold text-red-500">
                {complaintCounts[status]}
              </div>
              <p className="text-sm text-gray-600">
                {translateOrderStatus(status)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
