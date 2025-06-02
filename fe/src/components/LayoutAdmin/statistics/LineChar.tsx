import { useState } from 'react';
import {
  useFetchOrderAll,
  useFetchSuccessfulOrderCount,
} from '@/data/oder/useOderList';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Legend,
  Line,
} from 'recharts';
import {
  format,
  parseISO,
  isAfter,
  isBefore,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addDays,
} from 'date-fns';
import { Input } from '@medusajs/ui';

const DashboardOverview = () => {
  const {
    listOrder,
    loading: orderLoading,
    error: orderError,
  } = useFetchOrderAll();
  const {
    data: successfulOrderData,
    isLoading: deliveredCountLoading,
    error: deliveredCountError,
  } = useFetchSuccessfulOrderCount();

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const today = new Date();

  // Lọc các đơn hàng trong tháng hiện tại
  const filteredOrders = listOrder.filter(order => {
    const orderDate = parseISO(order.createdAt);
    return (
      isAfter(orderDate, startOfMonth(today)) &&
      isBefore(orderDate, endOfMonth(today))
    );
  });

  // Generate all days in the current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  // Chỉ lấy các ngày chẵn (2, 4, 6, 8, ...)
  const evenDays = daysInMonth.filter(day => {
    const dayOfMonth = parseInt(format(day, 'd'), 10);
    return dayOfMonth % 2 === 0; // Chỉ lấy ngày chẵn
  });

  // Tạo dữ liệu cho biểu đồ với các ngày chẵn
  const chartData = evenDays.map(day => {
    const startDateStr = format(day, 'yyyy-MM-dd');

    const dayOrders = listOrder.filter(order => {
      const orderDate = parseISO(order.createdAt);
      return (
        isAfter(orderDate, startOfMonth(today)) &&
        isBefore(orderDate, addDays(day, 1))
      );
    });

    return {
      day: format(day, 'dd'), // Ngày
      newOrders: dayOrders.filter(order => order.status === 'pending').length,
      confirmedOrders: dayOrders.filter(order => order.status === 'confirmed')
        .length,
      pendingPaymentOrders: dayOrders.filter(
        order => order.status === 'pendingPayment'
      ).length,
      shippingOrders: dayOrders.filter(order => order.status === 'shipped')
        .length,
      deliveredOrders: dayOrders.filter(order => order.status === 'delivered')
        .length,
      cancelledOrders: dayOrders.filter(order => order.status === 'canceled')
        .length,
    };
  });

  if (orderLoading || deliveredCountLoading) return <p>Loading...</p>;
  if (orderError || deliveredCountError)
    return <p>Error: {orderError?.message || deliveredCountError?.message}</p>;

  return (
    <div className="flex gap-3 px-4 pb-4">
      <div className="w-[400px] rounded-lg bg-white p-4">
        <h3 className="mb-2 text-lg font-semibold">Đơn hàng trong ngày</h3>
        <hr className="mb-4 mt-4 text-[10px]" />
        <ul className="list-disc space-y-4 pl-5">
          <li className="text-blue-500">
            <div className="flex flex-col">
              <span className="font-semibold text-blue-500">Đơn hàng mới:</span>
              <span className="text-gray-400">
                {
                  filteredOrders.filter(
                    order =>
                      order.status === 'pending' &&
                      format(parseISO(order.createdAt), 'yyyy-MM-dd') ===
                        format(today, 'yyyy-MM-dd')
                  ).length
                }{' '}
                đơn hàng
              </span>
            </div>
          </li>
          <li className="text-orange-500">
            <div className="flex flex-col">
              <span className="font-semibold text-orange-500">
                Đơn hàng đã xác nhận:
              </span>
              <span className="text-gray-400">
                {
                  filteredOrders.filter(
                    order =>
                      order.status === 'confirmed' &&
                      format(parseISO(order.createdAt), 'yyyy-MM-dd') ===
                        format(today, 'yyyy-MM-dd')
                  ).length
                }{' '}
                đơn hàng
              </span>
            </div>
          </li>
          <li className="text-blue-900">
            <div className="flex flex-col">
              <span className="font-semibold text-blue-900">
                Đơn hàng chờ thanh toán:
              </span>
              <span className="text-gray-400">
                {
                  filteredOrders.filter(
                    order =>
                      order.status === 'pendingPayment' &&
                      format(parseISO(order.createdAt), 'yyyy-MM-dd') ===
                        format(today, 'yyyy-MM-dd')
                  ).length
                }{' '}
                đơn hàng
              </span>
            </div>
          </li>
          <li className="text-green-500">
            <div className="flex flex-col">
              <span className="font-semibold text-green-500">
                Đơn hàng đang vận chuyển:
              </span>
              <span className="text-gray-400">
                {
                  filteredOrders.filter(
                    order =>
                      order.status === 'shipped' &&
                      format(parseISO(order.createdAt), 'yyyy-MM-dd') ===
                        format(today, 'yyyy-MM-dd')
                  ).length
                }{' '}
                đơn hàng
              </span>
            </div>
          </li>
          <li className="text-gray-500">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-500">
                Đơn hàng đã giao:
              </span>
              <span className="text-gray-400">
                {
                  filteredOrders.filter(
                    order =>
                      order.status === 'delivered' &&
                      format(parseISO(order.createdAt), 'yyyy-MM-dd') ===
                        format(today, 'yyyy-MM-dd')
                  ).length
                }{' '}
                đơn hàng
              </span>
            </div>
          </li>
          <li className="text-red-500">
            <div className="flex flex-col">
              <span className="font-semibold text-red-500">Đơn hàng hủy:</span>
              <span className="text-gray-500">
                {
                  filteredOrders.filter(
                    order =>
                      order.status === 'canceled' &&
                      format(parseISO(order.createdAt), 'yyyy-MM-dd') ===
                        format(today, 'yyyy-MM-dd')
                  ).length
                }{' '}
                đơn hàng
              </span>
            </div>
          </li>
        </ul>
      </div>

      {/* Phần biểu đồ */}
      <div className="h-[500px] w-full bg-white p-4">
        <h1 className="font-se text-xl font-semibold">
          Biểu đồ đơn hàng theo trong tháng
        </h1>
        <hr className="my-4" />
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Biểu đồ đơn hàng mới */}
            <Line
              type="monotone"
              dataKey="newOrders"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Đơn hàng mới"
            />

            {/* Biểu đồ đơn hàng đã xác nhận */}
            <Line
              type="monotone"
              dataKey="confirmedOrders"
              stroke="#82ca9d"
              name="Đơn hàng đã xác nhận"
            />

            {/* Biểu đồ đơn hàng chờ thanh toán */}
            <Line
              type="monotone"
              dataKey="pendingPaymentOrders"
              stroke="#ffc658"
              name="Đơn hàng chờ thanh toán"
            />

            {/* Biểu đồ đơn hàng đang vận chuyển */}
            <Line
              type="monotone"
              dataKey="shippingOrders"
              stroke="#ff8042"
              name="Đơn hàng đang vận chuyển"
            />

            {/* Biểu đồ đơn hàng đã giao */}
            <Line
              type="monotone"
              dataKey="deliveredOrders"
              stroke="#00c49f"
              name="Đơn hàng đã giao"
            />

            {/* Biểu đồ đơn hàng hủy */}
            <Line
              type="monotone"
              dataKey="cancelledOrders"
              stroke="#ff6666"
              name="Đơn hàng hủy"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardOverview;
