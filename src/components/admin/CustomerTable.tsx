'use client';

import { Eye, Mail, MoreHorizontal } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface CustomerRow {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
}

const mockCustomers: CustomerRow[] = [
  { id: '1', name: 'James Chen', email: 'james.chen@email.com', totalOrders: 5, totalSpent: 47500, lastOrder: '2024-01-15' },
  { id: '2', name: 'Sarah Mitchell', email: 'sarah.m@email.com', totalOrders: 3, totalSpent: 28900, lastOrder: '2024-01-14' },
  { id: '3', name: 'Robert Nakamura', email: 'robert.n@email.com', totalOrders: 8, totalSpent: 124500, lastOrder: '2024-01-13' },
  { id: '4', name: 'Elena Vasquez', email: 'elena.v@email.com', totalOrders: 2, totalSpent: 14200, lastOrder: '2024-01-12' },
  { id: '5', name: 'Thomas Wright', email: 'thomas.w@email.com', totalOrders: 6, totalSpent: 82300, lastOrder: '2024-01-11' },
  { id: '6', name: 'Ava Moretti', email: 'ava.moretti@email.com', totalOrders: 4, totalSpent: 56800, lastOrder: '2024-01-10' },
  { id: '7', name: 'David Park', email: 'david.park@email.com', totalOrders: 1, totalSpent: 8900, lastOrder: '2024-01-09' },
];

export default function CustomerTable() {
  return (
    <div className="bg-charcoal-dark border border-silver/5 rounded-sm overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-silver/5">
        <h3 className="font-display text-lg text-silver uppercase tracking-wider">Customers</h3>
        <span className="font-body text-xs text-silver/30">{mockCustomers.length} total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-silver/5">
              {['Customer', 'Email', 'Orders', 'Total Spent', 'Last Order', ''].map((h) => (
                <th key={h} className="text-left px-6 py-3 font-body text-[10px] tracking-[0.3em] uppercase text-silver/30">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map((customer) => (
              <tr key={customer.id} className="border-b border-silver/5 hover:bg-silver/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                      <span className="font-body text-[10px] text-gold font-semibold">
                        {customer.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                    <span className="font-body text-sm text-silver">{customer.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-body text-xs text-silver/40">{customer.email}</td>
                <td className="px-6 py-4 font-body text-sm text-silver/60">{customer.totalOrders}</td>
                <td className="px-6 py-4 font-body text-sm text-gold/70">{formatPrice(customer.totalSpent)}</td>
                <td className="px-6 py-4 font-body text-xs text-silver/30">{customer.lastOrder}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="text-silver/20 hover:text-gold transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-silver/20 hover:text-gold transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
