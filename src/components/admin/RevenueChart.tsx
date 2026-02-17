'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 18500 },
  { month: 'Feb', revenue: 22400 },
  { month: 'Mar', revenue: 19800 },
  { month: 'Apr', revenue: 28600 },
  { month: 'May', revenue: 32100 },
  { month: 'Jun', revenue: 27500 },
  { month: 'Jul', revenue: 35200 },
  { month: 'Aug', revenue: 31400 },
  { month: 'Sep', revenue: 38900 },
  { month: 'Oct', revenue: 42300 },
  { month: 'Nov', revenue: 45100 },
  { month: 'Dec', revenue: 48700 },
];

export default function RevenueChart() {
  return (
    <div className="bg-charcoal-dark border border-silver/5 rounded-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg text-silver uppercase tracking-wider">Revenue</h3>
        <span className="font-body text-xs text-silver/30">Last 12 months</span>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(229,228,226,0.05)" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(229,228,226,0.3)', fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(229,228,226,0.3)', fontSize: 11 }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '2px',
                color: '#E5E4E2',
                fontSize: '12px',
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#D4AF37"
              strokeWidth={2}
              fill="url(#goldGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
