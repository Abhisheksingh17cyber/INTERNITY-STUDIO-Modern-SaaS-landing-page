'use client';

import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import CountUp from '@/components/animations/CountUp';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface DashboardCard {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change: number;
  icon: React.ElementType;
}

const cards: DashboardCard[] = [
  { title: 'Revenue', value: 284500, prefix: '$', change: 12.5, icon: DollarSign },
  { title: 'Orders', value: 156, change: 8.2, icon: ShoppingBag },
  { title: 'Customers', value: 2340, change: 15.3, icon: Users },
  { title: 'Avg. Order Value', value: 1823, prefix: '$', change: -2.1, icon: TrendingUp },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <ScrollReveal key={card.title} delay={i * 0.1}>
          <div className="bg-charcoal-dark border border-silver/5 rounded-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-body text-xs tracking-[0.2em] uppercase text-silver/40">
                {card.title}
              </span>
              <card.icon className="w-4 h-4 text-gold/50" />
            </div>
            <div className="font-display text-2xl text-silver mb-2">
              {card.prefix}
              <CountUp target={card.value} />
              {card.suffix}
            </div>
            <span
              className={`font-body text-xs ${
                card.change >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {card.change >= 0 ? '+' : ''}
              {card.change}% from last month
            </span>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
