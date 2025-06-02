import { useFetchOrderAll } from '@/data/oder/useOderList';
import { useEffect, useState } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const PieChartExample = () => {
  const [pieData, setPieData] = useState<{ name: string; value: number }[]>([]);
  const { listOrder, loading, error } = useFetchOrderAll();

  useEffect(() => {
    if (listOrder && listOrder.length > 0) {
      const locationCounts: Record<string, number> = {};

      listOrder.forEach(order => {
        const location = order.customerInfo.city;

        if (locationCounts[location]) {
          locationCounts[location]++;
        } else {
          locationCounts[location] = 1;
        }
      });

      // Chuyển dữ liệu nhóm thành mảng phù hợp với PieChart
      const formattedData = Object.keys(locationCounts).map(location => ({
        name: location,
        value: locationCounts[location],
      }));

      setPieData(formattedData); // Cập nhật dữ liệu cho PieChart
    }
  }, [listOrder]); // Đảm bảo dữ liệu sẽ được cập nhật khi listOrder thay đổi

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Màu sắc cho từng phần trong biểu đồ
  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#FF6347',
    '#ADFF2F',
  ];

  return (
    <div className="m-6 mb-8 rounded-lg bg-white p-6 pb-20 shadow">
      <h2 className="m-6 text-xl font-semibold">
        Tỉnh thành mua nhiều sản phẩm
      </h2>
      <div style={{ width: '100%', height: 400 }} className="">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartExample;
