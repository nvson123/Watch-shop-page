import CurrencyVND from '@/components/config/vnd';
import Header from '@/components/layoutAdmin/header/header';
import DashboardNew from '@/components/layoutAdmin/statistics/LineCharNew';
import DashboardOver from '@/components/layoutAdmin/statistics/LineCharSmall';
import { useFetchOrdersStatus } from '@/data/oder/useOderList';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/_layout/revenue/')({
  component: Revenue,
});
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

function Revenue() {
  const {
    data: listOrder,
    meta,
    isLoading,
    error,
  } = useFetchOrdersStatus({
    limit: 1000000,
  });

  const data = [
    { month: 'Jan', revenue: 2500 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 2000 },
    { month: 'Apr', revenue: 2780 },
    { month: 'May', revenue: 1890 },
    { month: 'Jun', revenue: 2390 },
    { month: 'Jul', revenue: 3490 },
    { month: 'Aug', revenue: 4000 },
    { month: 'Sep', revenue: 3000 },
    { month: 'Oct', revenue: 2000 },
    { month: 'Nov', revenue: 2780 },
    { month: 'Dec', revenue: 1890 },
  ];

  // Lấy tháng hiện tại
  const currentMonth = new Date().toLocaleString('default', { month: 'short' }); // 'Jan', 'Feb', 'Mar', ...

  const currentMonthData = data.find(item => item.month === currentMonth);

  const currentMonthRevenue = currentMonthData ? currentMonthData.revenue : 0;

  console.log(`Doanh thu tháng ${currentMonth}: ${currentMonthRevenue}`);

  const totalRevenued = listOrder.reduce(
    (acc, curr) => acc + curr.totalPrice,
    0
  );
  const deliveredRevenue = listOrder
    .filter(
      order =>
        order.status === 'delivered' || order.status === 'exchange_completed'
    )
    .reduce((acc, curr) => acc + curr.totalPrice, 0);

  const deliveredPercentage = Math.round(
    (deliveredRevenue / totalRevenued) * 100
  );

  const canceledRevenue = listOrder
    .filter(
      order =>
        order.status === 'canceled' || order.status === 'refund_completed'
    )
    .reduce((acc, curr) => acc + curr.totalPrice, 0);

  const canceledPercentage = Math.round(
    (canceledRevenue / totalRevenued) * 100
  );

  const haha = [
    { name: 'Thành công', value: deliveredPercentage },
    { name: 'Thất bại', value: canceledPercentage },
  ];
  const totalOrders = listOrder.length;
  const deliveredOrders = listOrder.filter(
    order =>
      order.status === 'delivered' || order.status === 'exchange_completed'
  ).length;
  const canceledOrders = listOrder.filter(
    order => order.status === 'canceled' || order.status === 'refund_completed'
  ).length;

  const successPercentage =
    Math.round((deliveredOrders / totalOrders) * 100 * 100) / 100;
  const failurePercentage =
    Math.round((canceledOrders / totalOrders) * 100 * 100) / 100;

  const hihi = [
    { name: 'Thành công', value: successPercentage },
    { name: 'Thất bại', value: failurePercentage },
  ];
  const totalRevenue = listOrder
    .filter(
      order =>
        order.status === 'delivered' || order.status === 'exchange_completed'
    )
    .map(order => order.totalPrice)
    .reduce((acc, curr) => acc + curr, 0);

  const COLORS = ['#0088FE', '#FF8042'];
  // Hàm tuỳ chỉnh để hiển thị label
  const renderLabel = ({ name, value }) => `${value}%`;
  return (
    <div className="h-screen overflow-y-scroll">
      <Header title="Doanh Thu" />
      <div className="flex flex-col gap-1 rounded-lg px-6 py-4">
        {/* Main Container */}
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-5 space-y-4">
            {/* Tổng doanh thu */}
            <div className="flex gap-3">
              <div className="w-[240px] rounded-lg bg-white p-4 shadow-md">
                <h2 className="mb-3 text-lg font-bold">Tổng doanh thu</h2>
                <p className="text-2xl font-bold text-red-500">
                  <CurrencyVND amount={totalRevenue} />
                </p>
              </div>
              <div className="w-[240px] rounded-lg bg-white p-4 shadow-md">
                <h2 className="mb-3 text-lg font-bold">Số đơn hàng</h2>
                <p className="text-xl font-semibold">{listOrder.length}</p>
              </div>
            </div>
            {/* tổng đơn hàng */}
            <div className="rounded-lg bg-white shadow-md">
              {/* <h2 className="mb-3 text-lg font-bold">Tổng đơn hàng</h2> */}
              <div className="flex items-center justify-center">
                <div className="w-1/2">
                  <p className="mb-2 font-semibold">Tổng đơn hàng</p>
                  <p className="font-bold text-green-500">
                    Thành công: {deliveredOrders}
                  </p>
                  <p className="font-bold text-red-500">
                    Thất bại: {canceledOrders}
                  </p>
                </div>
                {/* Biểu đồ tròn */}
                <PieChart width={200} height={200}>
                  <Pie
                    data={hihi}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={renderLabel} // Hiển thị nhãn và %
                    labelLine={true} // Hiển thị đường chỉ dẫn
                  >
                    {hihi.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </div>
            {/* Tổng tiền đơn hàng */}
            <div className="rounded-lg bg-white px-4 shadow-md">
              <div className="flex items-center">
                <div className="w-1/2">
                  <p className="mb-2 font-semibold">Tổng tiền đơn hàng</p>
                  <p className="font-bold text-green-500">
                    Thành công: <CurrencyVND amount={deliveredRevenue} />
                  </p>
                  <p className="font-bold text-red-500">
                    Thất bại: <CurrencyVND amount={canceledRevenue} />
                  </p>
                </div>
                <div className="flex w-1/2 justify-center">
                  {/* Tăng kích thước biểu đồ */}
                  <PieChart width={220} height={200}>
                    <Pie
                      data={haha}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      fill="#8884d8"
                      label={renderLabel} // Hiển thị nhãn
                      labelLine={true} // Vẽ đường nhãn
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-7 rounded-lg bg-white p-4 shadow-md">
            <h2 className="mb-3 text-lg font-bold">
              Biểu đồ doanh thu theo tháng hiện tại
            </h2>
            <div className="h-64 bg-gray-100">
              <DashboardNew />
            </div>
          </div>
        </div>
        <div>
          <DashboardOver />
        </div>
      </div>
    </div>
  );
}
