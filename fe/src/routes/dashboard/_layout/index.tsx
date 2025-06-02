import Header from '@/components/layoutAdmin/header/header';
import OrderList from '@/components/layoutAdmin/orderdashboard/dashboard-order';
import MyBarChart from '@/components/layoutAdmin/statistics/BarChart';
import DashboardOverview from '@/components/layoutAdmin/statistics/LineChar';
import PieChartExample from '@/components/layoutAdmin/statistics/PiaChart';
import ToDoList from '@/components/layoutAdmin/statistics/toDoList';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/_layout/')({
  component: ThongKe,
});

function ThongKe() {
  return (
    <div className="h-screen overflow-y-auto">
      <Header title="Dashboard" pathname="/" />
      <div className="overflow-y-hidden">
        <ToDoList />
        <DashboardOverview />
        <OrderList />
        <div className="flex justify-between overflow-y-hidden">
          <div className="flex-1">
            <MyBarChart />
          </div>
          <div className="flex-1">
            <PieChartExample />
          </div>
        </div>
      </div>
    </div>
  );
}
