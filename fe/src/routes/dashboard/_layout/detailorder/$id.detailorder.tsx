import instance from '@/api/axiosIntance';
import CurrencyVND from '@/components/config/vnd';
import Header from '@/components/layoutAdmin/header/header';
import NewHeader from '@/components/layoutAdmin/header/new-header';
import { toast } from '@medusajs/ui';
import { createFileRoute, useParams } from '@tanstack/react-router';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
export const Route = createFileRoute(
  '/dashboard/_layout/detailorder/$id/detailorder'
)({
  component: OrderDetail,
});

function OrderDetail() {
  const { id } = useParams({
    from: '/dashboard/_layout/detailorder/$id/detailorder',
  });
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRevenueVisible, setRevenueVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(0);

  const toggleRevenueVisibility = () => {
    setRevenueVisible(!isRevenueVisible);
  };

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        const response = await instance.get(`/orders/${id}/admin`);
        setOrderDetail(response.data);
      } catch (err) {
        console.error('Failed to fetch order:', err);
        toast.error('Không thể tải đơn hàng.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg font-semibold text-gray-600">
          Đang tải dữ liệu...
        </div>
      </div>
    );
  }

  if (!orderDetail) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg font-semibold text-gray-600">
          Không tìm thấy đơn hàng.
        </div>
      </div>
    );
  }

  const {
    orderNumber,
    customerInfo,
    items,
    totalPrice,
    status,
    paymentMethod,
    paymentStatus,
    note,
    createdAt,
    discount,
    receivedAt,
    shippingMessageDisplay,
  } = orderDetail;

  const statusOrder = {
    pending: 0,
    pendingPayment: 1,
    shipped: 2,
    received: 3,
    delivered: 4,
    canceled: 5,
    complaint: 6,
    refund_in_progress: 7,
    exchange_in_progress: 8,
    refund_completed: 9,
    exchange_completed: 10,
    canceled_complaint: 11,
    refund_initiated: 12,
    refund_done: 13,
  };

  const statusIndex = statusOrder[status] || 0;
  const getCurrentDateTime = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return new Date(`${today}T${hours}:${minutes}`);
  }; // Xác định trạng thái hiện tại

  const statusOrder2 = [
    {
      status: 'pending',
      info: 'Đơn hàng đã được đặt',
      time: '12:00',
      message: 'Đơn hàng đặt thành công',
      detail: 'Đang đợi xác nhận từ cửa hàng',
      fullDateTime: getCurrentDateTime(),
    },
    {
      status: 'pendingPayment',
      info: 'Chưa thanh toán',
      time: '12:15',
      message: 'Chưa thanh toán',
      detail: 'Vui lòng thanh toán đơn hàng',
      fullDateTime: getCurrentDateTime(),
    },
    {
      status: 'shipped',
      info: 'Đang giao hàng',
      time: '13:00',
      message: 'Đơn hàng đã được xác nhận ',
      detail: 'Hàng đang trên đường đến bạn',
      fullDateTime: getCurrentDateTime(),
    },
    {
      status: 'received',
      info: 'Đã giao hàng',
      time: '14:30',
      message: 'Đã giao hàng',
      detail: 'Đơn hàng đang chờ người dùng xác nhận',
      fullDateTime: getCurrentDateTime(),
    },
    {
      status: 'delivered',
      info: ' Giao hàng thành công',
      time: '15:00',
      message: 'Đơn hàng đã giao thành công',
      detail: 'Đơn hàng đã được người dùng xác nhận',
      fullDateTime: getCurrentDateTime(),
    },
    {
      status: 'canceled',
      info: 'Đã hủy',
      time: '16:00',
      message: 'Đơn hàng bị hủy',
      detail: 'Đơn hàng đã bị hủy',
      fullDateTime: getCurrentDateTime(),
    },
    {
      status: 'complaint',
      info: 'Khiếu nại',
      time: '17:00',
      message: 'Đơn hàng có khiếu nại',
      detail: 'Đang chờ xử lý khiếu nại',
      fullDateTime: getCurrentDateTime(),
    },
    {
      status: 'refund_in_progress',
      info: 'Đang hoàn tiền',
      time: '18:00',
      message: 'Đang hoàn tiền',
      detail: 'Đơn hàng đang được hoàn lại tiền',
      fullDateTime: getCurrentDateTime(),
    },
    {
      status: 'exchange_in_progress',
      info: 'Đang đổi trả',
      time: '19:00',
      message: 'Đang đổi trả',
      detail: 'Chúng tôi đang xử lý yêu cầu đổi trả',
      fullDateTime: getCurrentDateTime(),
    },
    {
      status: 'refund_completed',
      info: 'Hoàn tiền thành công',
      time: '20:00',
      message: 'Hoàn tiền thành công',
      detail: 'Đơn hàng đã hoàn tiền thành công',
      fullDateTime: getCurrentDateTime(),
    },
    {
      status: 'exchange_completed',
      info: 'Đổi trả thành công',
      time: '21:00',
      message: 'Đổi trả thành công',
      detail: 'Đơn hàng đã hoàn tất đổi trả',
      fullDateTime: getCurrentDateTime(),
    },
    {
      status: 'canceled_complaint',
      info: 'Khiếu nại hủy',
      time: '22:00',
      message: 'Khiếu nại đã hủy',
      detail: 'Khiếu nại đã bị hủy',
      fullDateTime: getCurrentDateTime(),
    },
  ];

  if (paymentMethod === 'online') {
    statusOrder2.forEach(order => {
      if (order.status === 'pendingPayment') {
        order.status = 'paid';
        order.info = 'Đã thanh toán';
        order.message = 'Đơn hàng đã thanh toán';
        order.detail = 'Đơn hàng đã được thanh toán bằng zalopay';
      }
    });
  }

  if (paymentMethod === 'cod') {
    statusOrder2.forEach(order => {
      if (order.status === 'delivered') {
        order.status = 'paid'; // Thay đổi trạng thái thành "paid"
        order.info = 'Đã giao và thanh toán'; // Cập nhật thông tin
        order.message = 'Đơn hàng đã thanh toán'; // Cập nhật thông điệp
        order.detail = 'Đơn hàng đã giao và thanh toán thành công'; // Cập nhật chi tiết
      }
    });
  }

  const statusArray = Object.keys(statusOrder).map(key => ({
    status: key,
    ...statusOrder2[key],
  }));

  const statusIndex2 = statusArray.findIndex(item => item.status === status); // Tìm chỉ số trạng thái hiện tại

  return (
    <div>
      <div className="fixed left-0 right-0 top-16 z-10 md:relative md:left-auto md:right-auto md:top-0">
        <NewHeader
          breadcrumbs={[
            {
              title: 'Danh sách đơn hàng',
              href: '/dashboard/order',
            },
            {
              title: 'Chi tiết đơn hàng',
            },
          ]}
        />
      </div>
      <div className="max-h-[600px] overflow-y-scroll">
        <div className="min-h-screen bg-gray-50 p-3">
          {/* Chi tiết theo dõi đơn hàng */}
          <div className="mb-2 rounded-lg bg-white p-4 shadow-md">
            <h2 className="mb-4 text-lg font-bold">Theo dõi đơn hàng</h2>
            <div className="flex w-full items-center justify-between">
              {[
                'Đã Đặt Hàng',
                'Xác nhận',
                'Đang giao hàng',
                'Giao hàng',
                'Đã nhận hàng',
              ].map((statusText, index, arr) => {
                if (statusIndex === 12 || statusIndex === 13) {
                  if (index < 5) {
                    return null;
                  }
                }

                const isCanceled = statusIndex === 5;
                const isCompleted = index <= statusIndex && !isCanceled;
                const isLast = index === arr.length - 1;

                const displayText =
                  isCanceled && index === arr.length - 1
                    ? 'Đơn hủy'
                    : statusText;

                return (
                  <React.Fragment key={index}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-white ${
                          isCompleted ? 'bg-blue-500' : 'bg-gray-300'
                        } ${isCanceled && index === arr.length - 1 ? 'bg-red-500' : ''}`}
                      >
                        {isCompleted ? '✓' : index + 1}
                      </div>
                      <p
                        className={`mt-2 text-center text-sm ${
                          isCompleted ? 'text-black' : 'text-gray-500'
                        }`}
                      >
                        {displayText}
                      </p>
                    </div>

                    {/* Dấu gạch ngang giữa các trạng thái */}
                    {!isLast && (
                      <div
                        className={`mb-4 h-1 w-full max-w-[50px] border-[1px] sm:max-w-[100px] md:max-w-[150px] ${
                          isCompleted ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      ></div>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Thêm trạng thái "Đang hoàn trả" và "Đã hoàn trả" */}
              {statusIndex === 12 || statusIndex === 13 ? (
                <React.Fragment>
                  {/* Trạng thái "Đang hoàn trả" */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 font-bold text-white">
                      {'✓'}
                    </div>
                    <p className="mt-2 text-center text-sm text-yellow-500">
                      Đơn hàng đang hoàn trả tiền cho khách
                    </p>
                  </div>

                  {/* Gạch ngang giữa trạng thái hoàn trả */}
                  <div className="mb-4 h-1 w-full max-w-[50px] border-[1px] bg-yellow-500 sm:max-w-[100px] md:max-w-[150px]"></div>

                  {/* Trạng thái "Đã hoàn trả" */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-white ${
                        statusIndex === 13 ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      {statusIndex === 13 ? '✓' : '13'}
                    </div>
                    <p
                      className={`mt-2 text-center text-sm ${
                        statusIndex === 13 ? 'text-green-500' : 'text-gray-500'
                      }`}
                    >
                      Đơn hàng đã hoàn trả tiền cho khách thành công
                    </p>
                  </div>
                </React.Fragment>
              ) : null}
            </div>
          </div>

          {/* Sản phẩm đơn hàng */}
          <div className="mb-2 flex gap-2">
            <div className="w-2/3 rounded-lg bg-white p-4 shadow-md">
              <h2 className="mb-4 text-lg font-bold">Sản phẩm đơn hàng</h2>
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Sản phẩm</th>
                    <th className="py-2">Phân loại</th>
                    <th className="py-2">Số lượng</th>
                    <th className="py-2">Giá</th>
                    <th className="py-2">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length > 0 ? (
                    items.map((item, index) => (
                      <tr key={item._id} className="border-b">
                        <td className="flex items-center gap-3 py-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-12 w-12 rounded-md"
                          />
                          {item.name}
                        </td>
                        <td className="py-2">
                          Phân loại: {item.color} / {item.size}
                        </td>
                        <td className="py-2 text-center">x{item.quantity}</td>
                        <td className="py-2">
                          {' '}
                          {item.price.toLocaleString()} ₫
                        </td>
                        <td className="py-2 text-red-500">
                          {(item.price * item.quantity).toLocaleString()} ₫
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-2 text-center text-sm text-gray-500"
                      >
                        Không có sản phẩm nào trong đơn hàng.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="mt-4 text-right font-bold text-red-500">
                {items
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toLocaleString()}{' '}
                ₫
              </div>
            </div>
            <div className="w-1/3 space-y-4 rounded-lg bg-white p-4 shadow-md">
              <h2 className="mb-4 text-lg font-bold">
                Chi tiết theo dõi đơn hàng
              </h2>
              <p className="flex justify-between font-semibold">
                Mã đơn hàng: <span className="font-medium">{orderNumber}</span>
              </p>
              <p className="flex justify-between font-semibold">
                Ngày đặt hàng:{' '}
                <span className="font-medium">
                  {' '}
                  {createdAt
                    ? format(new Date(createdAt), 'dd/MM/yyyy HH:mm')
                    : ''}
                </span>
              </p>
              <p className="flex justify-between font-semibold">
                Tổng đơn hàng:{' '}
                <span className="font-semibold text-red-500">
                  <CurrencyVND amount={totalPrice} />
                </span>
              </p>
            </div>
          </div>

          {/* Thông tin thanh toán và Địa chỉ đặt hàng */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="mb-4 text-lg font-bold">Thông tin thanh toán</h2>
              <table className="w-full border-collapse text-left">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Giá tiền</td>
                    <td className="py-2 text-right">
                      {items
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toLocaleString()}{' '}
                      ₫
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Phí vận chuyển</td>
                    <td className="py-2 text-right">
                      {shippingMessageDisplay?.props?.amount ? (
                        <CurrencyVND
                          amount={shippingMessageDisplay.props.amount}
                        />
                      ) : (
                        <span className="text-gray-600">
                          Miễn phí vận chuyển
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Giảm giá</td>
                    <td className="py-2 text-right">
                      {' '}
                      -
                      <CurrencyVND amount={discount} />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold">
                      {paymentMethod === 'online'
                        ? 'Thanh toán online'
                        : 'Thanh toán khi nhận hàng'}
                    </td>

                    <td className="py-2 text-right font-bold text-red-500">
                      <CurrencyVND amount={totalPrice} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-5 rounded-lg bg-white p-4 shadow-md">
              <h2 className="mb-4 text-lg font-bold">Địa chỉ đặt hàng</h2>
              <p className="font-semibold">
                Họ và tên:{' '}
                <span className="font-medium">{customerInfo.name}</span>
              </p>
              <p className="font-semibold">
                Số điện thoại:{' '}
                <span className="font-medium">{customerInfo.phone}</span>
              </p>
              <p className="font-semibold">
                Địa chỉ:{' '}
                <span className="font-medium">
                  {customerInfo.address}, {customerInfo.wards},{' '}
                  {customerInfo.districts}, {customerInfo.city}
                </span>
              </p>
              <p className="font-semibold">
                Phương thức thanh toán:
                <span className="ml-2 font-medium">
                  {paymentMethod === 'online'
                    ? 'Thanh toán zalopay'
                    : 'Thanh toán khi nhận hàng'}
                </span>
              </p>
            </div>
          </div>
          {/* Bảng theo dõi đơn hàng */}
          <div className="mb-2 rounded-lg bg-white p-4 shadow">
            <h2 className="mb-4 text-lg font-bold">Theo dõi đơn hàng</h2>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-400">
                    Thông tin
                  </th>
                  <th className="px-2 py-1 font-semibold text-gray-400">
                    Ngày giờ
                  </th>
                  <th className="px-2 py-1 font-semibold text-gray-400">
                    Tin nhắn
                  </th>
                  <th className="px-2 py-1 font-semibold text-gray-400">
                    Chi tiết
                  </th>
                </tr>
              </thead>
              <tbody>
                {statusIndex2 === 5 ? ( // Kiểm tra nếu trạng thái là "canceled"
                  <tr className="border-t">
                    <td className="px-4 py-3 font-semibold text-red-500">
                      Đơn hàng đã bị hủy
                    </td>
                    <td className="px-2 py-1 text-gray-500" colSpan="3">
                      Không có thông tin chi tiết.
                    </td>
                  </tr>
                ) : statusIndex2 === 12 ? ( // Kiểm tra nếu trạng thái là "đang hoàn trả"
                  <tr className="border-t">
                    <td className="px-4 py-3 font-semibold text-yellow-500">
                      Đơn hàng đang hoàn trả tiền cho khách
                    </td>
                    <td className="px-2 py-1 text-gray-500" colSpan="3">
                      Không có thông tin chi tiết.
                    </td>
                  </tr>
                ) : statusIndex2 === 13 ? ( // Kiểm tra nếu trạng thái là "đã hoàn trả"
                  <tr className="border-t">
                    <td className="px-4 py-3 font-semibold text-green-500">
                      Đơn hàng đã hoàn trả tiền cho khách thành công
                    </td>
                    <td className="px-2 py-1 text-gray-500" colSpan="3">
                      Không có thông tin chi tiết.
                    </td>
                  </tr>
                ) : (
                  statusOrder2
                    .slice(0, statusIndex2 + 1) // Lọc các trạng thái phù hợp
                    .map((row, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-3 font-semibold">{row.info}</td>
                        <td className="px-2 py-1">
                          {row.fullDateTime.toLocaleString()}
                        </td>
                        <td className="px-2 py-1">{row.message}</td>
                        <td className="px-2 py-1">{row.detail}</td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
