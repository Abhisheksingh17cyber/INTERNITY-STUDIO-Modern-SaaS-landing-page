'use client';

import { Eye, MoreHorizontal } from 'lucide-react';
import { ORDER_STATUSES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

interface OrderRow {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  total: number;
  status: string;
  items: number;
}

const mockOrders: OrderRow[] = [
  { id: '1', orderNumber: 'INT-001', customer: 'James Chen', date: '2024-01-15', total: 12500, status: 'delivered', items: 1 },
  { id: '2', orderNumber: 'INT-002', customer: 'Sarah Mitchell', date: '2024-01-14', total: 8900, status: 'shipped', items: 2 },
  { id: '3', orderNumber: 'INT-003', customer: 'Robert Nakamura', date: '2024-01-13', total: 24500, status: 'processing', items: 1 },
  { id: '4', orderNumber: 'INT-004', customer: 'Elena Vasquez', date: '2024-01-12', total: 6700, status: 'pending', items: 3 },
  { id: '5', orderNumber: 'INT-005', customer: 'Thomas Wright', date: '2024-01-11', total: 15800, status: 'delivered', items: 1 },
  { id: '6', orderNumber: 'INT-006', customer: 'Ava Moretti', date: '2024-01-10', total: 31200, status: 'shipped', items: 2 },
];

const statusColors: Record<string, string> = {
  pending: 'text-yellow-400 bg-yellow-400/10',
  processing: 'text-blue-400 bg-blue-400/10',
  shipped: 'text-purple-400 bg-purple-400/10',
  delivered: 'text-emerald-400 bg-emerald-400/10',
  cancelled: 'text-red-400 bg-red-400/10',
};

export default function OrdersTable() {
  return (
    <div className="bg-charcoal-dark border border-silver/5 rounded-sm overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-silver/5">
        <h3 className="font-display text-lg text-silver uppercase tracking-wider">Recent Orders</h3>
        <button className="font-body text-xs tracking-[0.2em] uppercase text-gold/50 hover:text-gold transition-colors">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-silver/5">
              {['Order', 'Customer', 'Date', 'Items', 'Total', 'Status', ''].map((h) => (
                <th key={h} className="text-left px-6 py-3 font-body text-[10px] tracking-[0.3em] uppercase text-silver/30">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b border-silver/5 hover:bg-silver/[0.02] transition-colors">
                <td className="px-6 py-4 font-body text-sm text-gold/70">{order.orderNumber}</td>
                <td className="px-6 py-4 font-body text-sm text-silver/60">{order.customer}</td>
                <td className="px-6 py-4 font-body text-xs text-silver/30">{order.date}</td>
                <td className="px-6 py-4 font-body text-sm text-silver/40">{order.items}</td>
                <td className="px-6 py-4 font-body text-sm text-silver">{formatPrice(order.total)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-1 text-[10px] font-body tracking-wider uppercase rounded-sm ${statusColors[order.status] || 'text-silver/40 bg-silver/5'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-silver/20 hover:text-gold transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
