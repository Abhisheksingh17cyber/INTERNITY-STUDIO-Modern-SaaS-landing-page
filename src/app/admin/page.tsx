import DashboardCards from '@/components/admin/DashboardCards';
import RevenueChart from '@/components/admin/RevenueChart';
import OrdersTable from '@/components/admin/OrdersTable';
import RecentActivity from '@/components/admin/RecentActivity';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-silver uppercase tracking-wider mb-1">Dashboard</h1>
        <p className="font-body text-xs text-silver/30">Welcome back. Here&apos;s your store overview.</p>
      </div>

      <DashboardCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <RecentActivity />
      </div>

      <OrdersTable />
    </div>
  );
}
