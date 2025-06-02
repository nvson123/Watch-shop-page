import { useFetchOrderAll } from '@/data/oder/useOderList';
import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Product {
  name: string;
  quantity: number;
}

const MyBarChart = () => {
  const { listOrder, loading, error } = useFetchOrderAll(); // Lấy danh sách đơn hàng từ hook
  const [productStats, setProductStats] = useState<
    { name: string; quantity: number }[]
  >([]);

  useEffect(() => {
    if (listOrder.length > 0) {
      // Tính tổng số lượng sản phẩm đã bán từ tất cả các đơn hàng
      const productMap: Record<string, number> = {};

      listOrder.forEach(order => {
        // Kiểm tra nếu items tồn tại và là một mảng
        if (Array.isArray(order.items)) {
          order.items.forEach((item: Product) => {
            // Nếu sản phẩm đã có trong productMap thì cộng thêm quantity
            if (productMap[item.name]) {
              productMap[item.name] += item.quantity;
            } else {
              // Nếu chưa có, thêm mới vào productMap
              productMap[item.name] = item.quantity;
            }
          });
        }
      });

      // Chuyển đổi từ productMap thành mảng { name, quantity }
      const productList = Object.keys(productMap).map(name => ({
        name,
        quantity: productMap[name],
      }));

      // Sắp xếp theo số lượng sản phẩm bán ra giảm dần và lấy top 10
      const sortedProductList = productList
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 10);

      setProductStats(sortedProductList);
    }
  }, [listOrder]);

  // Hiển thị biểu đồ nếu dữ liệu đã được lấy thành công
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="m-6 rounded-lg bg-white p-6 pb-20 shadow">
      <h2 className="m-6 text-xl font-semibold">Sản phẩm bán chạy</h2>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={productStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MyBarChart;
