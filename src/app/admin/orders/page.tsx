import OrdersTable from '@/components/admin/OrdersTable';

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-silver uppercase tracking-wider mb-1">Orders</h1>
        <p className="font-body text-xs text-silver/30">View and manage customer orders</p>
      </div>
      <OrdersTable />
    </div>
  );
}
