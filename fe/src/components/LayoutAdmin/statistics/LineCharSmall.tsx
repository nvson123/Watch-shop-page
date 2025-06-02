import { useState, useEffect } from 'react';
import {
  useFetchOrderAll,
  useFetchSuccessfulOrderCount,
} from '@/data/oder/useOderList';
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
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from 'date-fns';

const DashboardOver = () => {
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

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [currentYearRevenue, setCurrentYearRevenue] = useState([]);
  const [deliveredOrdersCount, setDeliveredOrdersCount] = useState(0);
  const [canceledOrdersCount, setCanceledOrdersCount] = useState(0);
  const [totalOrdersCount, setTotalOrdersCount] = useState(0);

  const handleYearChange = event => {
    setSelectedYear(Number(event.target.value));
    setSelectedMonth(0); // Reset tháng khi đổi năm
  };

  const handleMonthChange = event => {
    setSelectedMonth(Number(event.target.value));
  };

  useEffect(() => {
    const selectedYearStart = startOfYear(new Date(selectedYear, 0, 1));
    const selectedYearEnd = endOfYear(new Date(selectedYear, 11, 31));

    let allDaysInMonth = [];
    let allMonthsInYear = [];

    if (selectedMonth > 0) {
      const selectedMonthStart = startOfMonth(
        new Date(selectedYear, selectedMonth - 1)
      );
      const selectedMonthEnd = endOfMonth(selectedMonthStart);

      allDaysInMonth = eachDayOfInterval({
        start: selectedMonthStart,
        end: selectedMonthEnd,
      });
    } else {
      allMonthsInYear = eachMonthOfInterval({
        start: selectedYearStart,
        end: selectedYearEnd,
      });
    }

    let revenueByDayOrMonth = {};
    let deliveredCount = 0;
    let canceledCount = 0;
    let totalCount = 0;

    listOrder.forEach(order => {
      const orderDate = parseISO(order.createdAt);
      const day = format(orderDate, 'yyyy-MM-dd');
      const month = format(orderDate, 'yyyy-MM');

      if (
        isWithinInterval(orderDate, {
          start: selectedYearStart,
          end: selectedYearEnd,
        })
      ) {
        totalCount++;

        if (selectedMonth > 0) {
          if (
            isWithinInterval(orderDate, {
              start: allDaysInMonth[0],
              end: allDaysInMonth[allDaysInMonth.length - 1],
            })
          ) {
            if (order.status === 'delivered') {
              if (!revenueByDayOrMonth[day])
                revenueByDayOrMonth[day] = {
                  revenue: 0,
                  delivered: 0,
                  canceled: 0,
                };
              revenueByDayOrMonth[day].revenue += order.totalPrice;
              revenueByDayOrMonth[day].delivered++;
              deliveredCount++;
            } else if (order.status === 'canceled') {
              if (!revenueByDayOrMonth[day])
                revenueByDayOrMonth[day] = {
                  revenue: 0,
                  delivered: 0,
                  canceled: 0,
                };
              revenueByDayOrMonth[day].canceled++;
              canceledCount++;
            }
          }
        } else {
          if (!revenueByDayOrMonth[month])
            revenueByDayOrMonth[month] = {
              revenue: 0,
              delivered: 0,
              canceled: 0,
            };
          if (order.status === 'delivered') {
            revenueByDayOrMonth[month].revenue += order.totalPrice;
            revenueByDayOrMonth[month].delivered++;
            deliveredCount++;
          } else if (order.status === 'canceled') {
            revenueByDayOrMonth[month].canceled++;
            canceledCount++;
          }
        }
      }
    });

    setDeliveredOrdersCount(deliveredCount);
    setCanceledOrdersCount(canceledCount);
    setTotalOrdersCount(totalCount);

    const chartData =
      selectedMonth > 0
        ? allDaysInMonth.map(day => {
            const dayString = format(day, 'yyyy-MM-dd');
            return {
              day: dayString,
              revenue: revenueByDayOrMonth[dayString]?.revenue || 0,
              delivered: revenueByDayOrMonth[dayString]?.delivered || 0,
              canceled: revenueByDayOrMonth[dayString]?.canceled || 0,
            };
          })
        : allMonthsInYear.map(month => {
            const monthString = format(month, 'yyyy-MM');
            return {
              month: monthString,
              revenue: revenueByDayOrMonth[monthString]?.revenue || 0,
              delivered: revenueByDayOrMonth[monthString]?.delivered || 0,
              canceled: revenueByDayOrMonth[monthString]?.canceled || 0,
            };
          });

    console.log('Chart Data:', chartData); // Debug log to check data
    setCurrentYearRevenue(chartData);
  }, [listOrder, selectedYear, selectedMonth]);

  if (orderLoading || deliveredCountLoading) return <p>Loading...</p>;
  if (orderError || deliveredCountError)
    return <p>Error: {orderError?.message || deliveredCountError?.message}</p>;

  return (
    <div className="mt-2 h-screen rounded-lg bg-white p-8 shadow-md">
      <div className="flex justify-between">
        <h2 className="mb-4 text-xl font-semibold">
          Biểu đồ thống kê doanh thu lọc theo tháng, năm
        </h2>
        <div className="flex gap-4">
          <div>
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="rounded-md border px-3 py-2.5"
            >
              {[...Array(2026 - 2000)].map((_, index) => {
                const year = 2000 + index;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="rounded-md border px-3 py-2.5"
            >
              <option value={0}>Tất cả tháng</option>
              {[...Array(12)].map((_, index) => (
                <option key={index} value={index + 1}>
                  Tháng {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Phần biểu đồ */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="200%">
          <LineChart data={currentYearRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={selectedMonth > 0 ? 'day' : 'month'} />
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
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="delivered"
              stroke="#4CAF50"
              name="Đơn hàng thành công"
              activeDot={{ r: 8 }}
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

export default DashboardOver;
