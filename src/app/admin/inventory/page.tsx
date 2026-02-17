import InventoryManager from '@/components/admin/InventoryManager';

export default function AdminInventoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-silver uppercase tracking-wider mb-1">Inventory</h1>
        <p className="font-body text-xs text-silver/30">Track stock levels and manage inventory</p>
      </div>
      <InventoryManager />
    </div>
  );
}
