import { useState, useEffect } from 'react';
import { useFetchOrderAll } from '@/data/oder/useOderList';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  format,
  parseISO,
  isWithinInterval,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from 'date-fns';

const DashboardNew = () => {
  const {
    listOrder,
    loading: orderLoading,
    error: orderError,
  } = useFetchOrderAll();

  const [dailyRevenueData, setDailyRevenueData] = useState([]);

  // Tính doanh thu và số lượng đơn hàng theo ngày trong tháng hiện tại
  useEffect(() => {
    const currentMonthStart = startOfMonth(new Date()); // Ngày đầu tháng
    const currentMonthEnd = endOfMonth(new Date()); // Ngày cuối tháng

    // Tạo danh sách tất cả các ngày trong tháng hiện tại
    const allDaysInMonth = eachDayOfInterval({
      start: currentMonthStart,
      end: currentMonthEnd,
    });

    let revenueByDay = {};

    // Duyệt qua danh sách đơn hàng và tính doanh thu cho từng ngày
    listOrder.forEach(order => {
      const orderDate = parseISO(order.createdAt);
      const day = format(orderDate, 'yyyy-MM-dd'); // Định dạng ngày theo `yyyy-MM-dd`

      if (
        isWithinInterval(orderDate, {
          start: currentMonthStart,
          end: currentMonthEnd,
        })
      ) {
        if (!revenueByDay[day]) {
          revenueByDay[day] = { revenue: 0, delivered: 0, canceled: 0 };
        }

        // Cộng doanh thu
        revenueByDay[day].revenue += order.totalPrice;

        // Xử lý trạng thái đơn hàng
        if (
          order.status === 'delivered' ||
          order.status === 'exchange_completed' // Doanh thu của `exchange_completed` cũng được tính vào `delivered`
        ) {
          revenueByDay[day].delivered++;
        }

        if (
          order.status === 'canceled' ||
          order.status === 'refund_completed' // Hủy đơn cũng tính cả trạng thái `refund_completed`
        ) {
          revenueByDay[day].canceled++;
        }
      }
    });

    // Tạo dữ liệu biểu đồ theo từng ngày
    const chartData = allDaysInMonth.map(day => {
      const dayString = format(day, 'yyyy-MM-dd');
      return {
        day: dayString,
        revenue: revenueByDay[dayString]?.revenue || 0,
        delivered: revenueByDay[dayString]?.delivered || 0,
        canceled: revenueByDay[dayString]?.canceled || 0,
      };
    });

    setDailyRevenueData(chartData);
  }, [listOrder]);
  if (orderLoading) return <p>Loading...</p>;
  if (orderError) return <p>Error: {orderError.message}</p>;

  return (
    <div className="rounded-lg bg-white p-6">
      {/* Phần biểu đồ */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={dailyRevenueData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tickFormatter={tick => tick.slice(8)} />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#4bc0c0"
              name="Doanh thu"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="delivered"
              stroke="#4CAF50"
              name="Đơn hàng thành công"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="canceled"
              stroke="#FF5733"
              name="Đơn hàng hủy"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardNew;
