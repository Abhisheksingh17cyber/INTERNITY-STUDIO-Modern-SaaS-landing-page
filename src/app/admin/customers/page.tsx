import CustomerTable from '@/components/admin/CustomerTable';

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-silver uppercase tracking-wider mb-1">Customers</h1>
        <p className="font-body text-xs text-silver/30">View and manage your customer base</p>
      </div>
      <CustomerTable />
    </div>
  );
}
