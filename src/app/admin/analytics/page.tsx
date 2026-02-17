import RevenueChart from '@/components/admin/RevenueChart';
import DashboardCards from '@/components/admin/DashboardCards';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-silver uppercase tracking-wider mb-1">Analytics</h1>
        <p className="font-body text-xs text-silver/30">Performance metrics and insights</p>
      </div>
      <DashboardCards />
      <RevenueChart />
    </div>
  );
}
