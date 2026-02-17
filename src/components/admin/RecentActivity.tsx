'use client';

import { ShoppingBag, Package, User, TrendingUp, Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'order' | 'product' | 'customer' | 'system';
  message: string;
  time: string;
}

const activities: Activity[] = [
  { id: '1', type: 'order', message: 'New order #INT-007 placed by Michael Torres — $15,800', time: '5 min ago' },
  { id: '2', type: 'customer', message: 'New customer registered: Lisa Park', time: '12 min ago' },
  { id: '3', type: 'product', message: 'Stock updated: Chronos Elite — 24 units remaining', time: '1 hour ago' },
  { id: '4', type: 'order', message: 'Order #INT-005 marked as delivered', time: '2 hours ago' },
  { id: '5', type: 'system', message: 'Monthly analytics report generated', time: '3 hours ago' },
  { id: '6', type: 'product', message: 'New product added: Tempus Noir', time: '5 hours ago' },
  { id: '7', type: 'order', message: 'Order #INT-004 shipped via Express', time: '6 hours ago' },
];

const iconMap = {
  order: ShoppingBag,
  product: Package,
  customer: User,
  system: TrendingUp,
};

const colorMap = {
  order: 'text-gold bg-gold/10',
  product: 'text-blue-400 bg-blue-400/10',
  customer: 'text-emerald-400 bg-emerald-400/10',
  system: 'text-purple-400 bg-purple-400/10',
};

export default function RecentActivity() {
  return (
    <div className="bg-charcoal-dark border border-silver/5 rounded-sm">
      <div className="flex items-center justify-between p-6 border-b border-silver/5">
        <h3 className="font-display text-lg text-silver uppercase tracking-wider">Recent Activity</h3>
        <Clock className="w-4 h-4 text-silver/20" />
      </div>
      <div className="p-6 space-y-4">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type];
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${colorMap[activity.type]}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm text-silver/60 leading-relaxed">{activity.message}</p>
                <span className="font-body text-[10px] text-silver/20">{activity.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
