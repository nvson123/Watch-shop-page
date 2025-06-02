import instance from '@/api/axiosIntance';
import CurrencyVND from '@/components/config/vnd';
import { toast } from '@medusajs/ui';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
  ArrowUturnLeft,
  Cash,
  Check,
  DocumentText,
  MapPin,
  RocketLaunch,
  StarSolid,
} from '@medusajs/icons';

export const Route = createFileRoute('/_layout/orderuser/$id/user')({
  component: DetailOrderUser,
});

function DetailOrderUser() {
  const { id } = useParams({ from: '/_layout/orderuser/$id/user' });
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusHistory, setStatusHistory] = useState([]);
  const [statusIndex1, setStatusIndex] = useState(0);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        const response = await instance.get(`/orders/${id}/admin`);
        setOrderDetail(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Failed to fetch order:', err);
        toast.error('Không thể tải đơn hàng.');
      } finally {
        setLoading(false);
      }
    };

    // Gọi hàm để lấy dữ liệu lần đầu
    fetchOrderDetail();

    // Cập nhật dữ liệu mỗi 30 giây
    const intervalId = setInterval(fetchOrderDetail, 30000);

    // Cleanup: dừng việc polling khi component bị unmount
    return () => clearInterval(intervalId);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
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
    items = [],
    totalPrice,
    status,
    paymentMethod,
    paymentStatus,
    note,
    voucher,
    createdAt,
    shippingMessageDisplay,
    updatedAt,
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
    refund_done: 12,
    refund_initiated: 13,
  };

  const statusIndex = statusOrder[status] || 0;

  const steps = [
    {
      label: 'Đơn Hàng Đã Đặt',
      status: 'pending',
      icon: <DocumentText className="h-5 w-5 text-white" />,
    },
    {
      label: 'Chờ Thanh Toán',
      status: 'pendingPayment',
      icon: <Cash className="h-5 w-5 text-white" />,
    },
    {
      label: 'Đang Vận Chuyển',
      status: 'shipped',
      icon: <RocketLaunch className="h-5 w-5 text-white" />,
    },
    {
      label: 'Đã Nhận',
      status: 'received',
      icon: <Check className="h-5 w-5 text-white" />,
    },
    {
      label: 'Đã Giao Hàng',
      status: 'delivered',
      icon: <StarSolid className="h-5 w-5 text-white" />,
    },
  ];

  const addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000); // Cộng thêm phút
  };

  const generateTimes = (startTime, stepInterval, numberOfSteps) => {
    const times = [];
    let currentTime = startTime;

    for (let i = 0; i < numberOfSteps; i++) {
      times.push(
        currentTime.toLocaleString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      );
      currentTime = addMinutes(currentTime, stepInterval); // Cộng thêm khoảng cách thời gian
    }

    return times;
  };

  // Ví dụ: thời gian bắt đầu từ hiện tại, khoảng cách 15 phút giữa các bước
  const startTime = new Date();
  const stepInterval = 2; // Khoảng cách 15 phút
  const numberOfSteps = 5;
  const times = generateTimes(startTime, stepInterval, numberOfSteps);

  const steps1 = [
    {
      label: 'Đơn hàng đặt thành công',
      icon: <DocumentText />,
      time: times[0],
      description: 'Đơn hàng đã được đặt',
      status: statusOrder.pending,
    },
    {
      label: 'Đơn hàng chưa được thanh toán',
      icon: <DocumentText />,
      time: times[1],
      description: 'Vui lòng thanh toán khi nhận hàng',
      status: statusOrder.pendingPayment,
    },
    {
      label: 'Đơn hàng đang giao',
      icon: <DocumentText />,
      time: times[2],
      description: 'Đơn hàng sẽ sớm được giao, vui lòng chú ý điện thoại',
      status: statusOrder.shipped,
    },
    {
      label: 'Đơn hàng giao thành công',
      icon: <DocumentText />,
      time: times[3],
      description: 'Đơn hàng đã được giao cho bạn',
      status: statusOrder.delivered,
    },
    {
      label: 'Đơn hàng thành công',
      icon: <DocumentText />,
      time: times[4],
      status: statusOrder.delivered,
    },
  ];

  const getFilteredSteps = currentStatus => {
    if (currentStatus === statusIndex) {
      return [
        {
          label: 'Đơn hàng đã bị hủy',
          icon: <DocumentText />,
          time: times[3],
          description: 'Đơn hàng của bạn đã bị hủy',
          status: statusIndex,
        },
      ];
    }

    if (statusIndex === 12) {
      // Trạng thái refund_done
      return [
        {
          label: 'Đã hoàn tiền',
          icon: <DocumentText />,
          time: times[6],
          description: 'Đơn hàng của bạn đã được hoàn tiền thành công',
          status: 12,
        },
      ];
    }

    if (statusIndex === 13) {
      // Trạng thái refund_initiated
      return [
        {
          label: 'Đang hoàn tiền',
          icon: <DocumentText />,
          time: times[7],
          description: 'Đơn hàng của bạn đang trong quá trình hoàn tiền',
          status: 13,
        },
      ];
    }

    return steps1;
  };

  const currentStatus = statusOrder.canceled; // Trạng thái hiện tại của đơn hàng
  const filteredSteps = getFilteredSteps(currentStatus);

  console.log('đ', filteredSteps);

  const total = items
    .map(item => item.price * item.quantity)
    .reduce((sum, price) => sum + price, 0);

  return (
    <div className="bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between text-sm">
          {/* Nút quay lại */}
          <div className="flex items-center">
            <ArrowUturnLeft className="mr-1" />
            <Link className="font-medium hover:underline" to="/orderuser">
              QUAY LẠI
            </Link>
          </div>

          {/* Thông tin đơn hàng */}
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-[#ee4d2d]">
              MÃ ĐƠN HÀNG: {orderNumber}
            </span>
            <span className="text-gray-500">|</span>
            <span className="font-bold text-green-600">
              {{
                pendingPayment: 'CHỜ THANH TOÁN',
                pending: 'ĐANG CHỜ XÁC NHẬN',
                confirmed: 'CHỜ LẤY HÀNG',
                shipped: 'ĐANG VẬN CHUYỂN',
                received: 'GIAO HÀNG THÀNH CÔNG',
                delivered: 'ĐƠN HÀNG HOÀN THÀNH',
                canceled: 'ĐÃ HUỶ',
                returned: 'ĐÃ HOÀN TRẢ HÀNG',
                complaint: 'ĐANG KHIÊU NẠI',
                refund_in_progress: 'ĐANG HOÀN TRẢ HÀNG',
                refund_completed: 'HOÀN TRẢ HÀNG THÀNH CÔNG',
                exchange_in_progress: 'ĐANG ĐỔI TRẢ HÀNG',
                exchange_completed: 'ĐỔI TRẢ HÀNG THÀNH CÔNG',
                canceled_complaint: 'HUỶ KHIẾU NẠI',
                refund_done: 'HOÀN TIỀN THÀNH CÔNG',
                refund_initiated: 'ĐANG HOÀN TIỀN',
              }[status] || status}
            </span>
          </div>
        </div>
        <hr />

        <div className="mt-10">
          {/* Tiến trình đơn hàng */}
          <div className="mb-6 flex items-center justify-around">
            {steps.map((step, index) => {
              const stepOrder = statusOrder[step.status];
              const isActive = stepOrder <= statusIndex;
              const isCurrent = stepOrder === statusIndex;
              const isLastStep = index === steps.length - 1;

              let stepLabel = step.label;
              if (step.status === 'pendingPayment') {
                if (statusIndex === statusOrder['canceled']) {
                  stepLabel = 'Đơn hàng hủy';
                } else if (statusOrder['delivered'] <= statusIndex) {
                  stepLabel = 'Đã thanh toán';
                } else {
                  stepLabel =
                    paymentMethod === 'cod'
                      ? 'Chưa thanh toán'
                      : 'Đã thanh toán';
                }
              }
              const isRefundStep =
                statusIndex === statusOrder['refund_done'] ||
                statusIndex === statusOrder['refund_initiated'];

              if (isRefundStep && index === 1) {
                stepLabel =
                  statusIndex === statusOrder['refund_done']
                    ? 'Hoàn tiền thành công'
                    : 'Đang hoàn tiền';
              }

              const isDisabled =
                (isRefundStep && index > 1) ||
                (statusIndex === statusOrder['canceled'] && index > 1);

              return (
                <div key={index} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                        isDisabled
                          ? 'bg-gray-300'
                          : isActive
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                      } ${isCurrent && !isDisabled ? 'ring-2 ring-green-600' : ''}`}
                    >
                      {index === 1 && isRefundStep ? (
                        <span className="text-sm font-bold text-white">💵</span>
                      ) : (
                        step.icon
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isDisabled
                          ? 'text-gray-400' // Bị "ẩn"
                          : isActive
                            ? 'text-gray-800'
                            : 'text-gray-400'
                      }`}
                    >
                      {stepLabel}
                    </span>
                  </div>

                  {/* Gạch ngang nối các bước (trừ bước cuối cùng) */}
                  {!isLastStep && (
                    <div
                      className={`mx-2 mb-4 h-[2px] w-36 ${
                        isDisabled
                          ? 'bg-gray-300' // Gạch ngang "ẩn"
                          : stepOrder < statusIndex
                            ? 'bg-green-500' // Đã hoàn thành
                            : 'bg-gray-300' // Chưa hoàn thành
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>

          <hr />
          <div className="mb-6 mt-5 flex justify-between">
            <div className="rounded-lg bg-white p-4">
              <h3 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
                <span className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-500" />
                  Thông tin nhận hàng
                </span>
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center">
                  <span className="w-40 font-medium text-gray-800">
                    Tên người nhận:
                  </span>
                  <span>{customerInfo.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-40 font-medium text-gray-800">
                    Số điện thoại:
                  </span>
                  <span>{customerInfo.phone}</span>
                </div>
                <div className="flex items-start">
                  <span className="w-40 font-medium text-gray-800">
                    Địa chỉ:
                  </span>
                  <span>
                    {customerInfo.address}, {customerInfo.wards},{' '}
                    {customerInfo.districts}, {customerInfo.city}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              {getFilteredSteps(currentStatus).map((step, index) => (
                <div
                  key={index}
                  className={`relative flex transform items-start space-x-3 transition-all duration-500 ${
                    index <= statusIndex
                      ? 'translate-y-0 opacity-100'
                      : '-translate-y-5 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        index <= statusIndex ? 'bg-teal-500' : 'bg-gray-300'
                      }`}
                    >
                      <p className="text-white">{step.icon}</p>
                    </div>
                    {index < filteredSteps.length - 1 && (
                      <div
                        className={`mt-2 h-20 w-[2px] transition-all duration-500 ${
                          index < statusIndex
                            ? 'bg-teal-500 opacity-100'
                            : 'bg-gray-300 opacity-0'
                        }`}
                      ></div>
                    )}
                  </div>

                  <p className="text-gray-500">{step.time}</p>
                  <div>
                    <div className="flex flex-col">
                      <p
                        className={`font-semibold ${
                          index <= statusIndex
                            ? 'text-teal-500'
                            : 'text-gray-600'
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-gray-500">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr />
          {/* Phần còn lại của mã */}
          <div className="mt-4">
            {items.length > 0 ? (
              items.map((item, index) => (
                <div key={item._id}>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt=""
                        className="h-40 w-40 object-cover"
                      />
                      <div>
                        <div className="text-xl font-semibold">{item.name}</div>
                        <div className="text-gray-500">
                          Phân loại:{' '}
                          <span className="text-gray-500">
                            {item.color} - {item.size}
                          </span>
                        </div>
                        <div className="font-semibold">x{item.quantity}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 text-right font-semibold text-[#ee4d2d]">
                      Thành Tiền:
                      <CurrencyVND amount={item.price * item.quantity} />
                    </div>
                  </div>
                  {index !== items.length - 1 && <hr className="my-4" />}
                </div>
              ))
            ) : (
              <div className="px-4 py-4 text-center text-sm text-gray-500">
                Không có sản phẩm nào trong đơn hàng.
              </div>
            )}
          </div>
          <hr />
          <div className="mt-10 flex items-center justify-end">
            <div className="w-full max-w-2xl rounded-lg border bg-white p-6">
              <div className="flex justify-between border-b py-2 text-sm">
                <span className="text-gray-600">Tổng tiền hàng</span>
                <span className="font-medium text-gray-800">
                  <CurrencyVND amount={total} />
                </span>
              </div>
              <div className="flex justify-between border-b py-2 text-sm">
                <span className="text-gray-600">Phí vận chuyển</span>
                <span className="font-medium text-gray-800">
                  {shippingMessageDisplay?.props?.amount ? (
                    <CurrencyVND amount={shippingMessageDisplay.props.amount} />
                  ) : (
                    <span className="text-gray-600">Miễn phí vận chuyển</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between border-b py-2 text-sm">
                <span className="text-gray-600">Giảm giá</span>
                <span className="font-medium text-green-500">
                  {voucher ? (
                    <CurrencyVND amount={voucher} />
                  ) : (
                    <span className="text-gray-600"> - 0đ</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between py-4 text-lg font-bold text-[#ee4d2d]">
                <span>Thành tiền</span>
                <span>
                  <CurrencyVND amount={totalPrice} />
                </span>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p className="mb-1">
                  Phương thức thanh toán:
                  <span className="ml-2">
                    {' '}
                    {paymentMethod === 'cod'
                      ? statusIndex === 4
                        ? 'Đã thanh toán'
                        : 'Chưa thanh toán'
                      : 'Thanh toán Zalo Pay'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
