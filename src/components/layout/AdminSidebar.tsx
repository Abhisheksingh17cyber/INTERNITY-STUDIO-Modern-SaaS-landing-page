'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BarChart3,
  Watch,
  ChevronLeft,
  LogOut,
} from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { cn } from '@/lib/utils';

const ADMIN_LINKS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { adminSidebarOpen, toggleAdminSidebar } = useUIStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: adminSidebarOpen ? 260 : 72 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 top-0 bottom-0 bg-charcoal border-r border-charcoal-light z-30 flex flex-col"
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-charcoal-light h-16">
        {adminSidebarOpen && (
          <Link href="/admin" className="flex items-center gap-2">
            <Watch className="w-6 h-6 text-gold" />
            <span className="font-display text-gold text-xs tracking-[0.2em] uppercase">
              Admin
            </span>
          </Link>
        )}
        <button
          onClick={toggleAdminSidebar}
          className="p-1.5 text-silver/40 hover:text-gold transition-colors ml-auto"
        >
          <ChevronLeft
            className={cn('w-5 h-5 transition-transform', !adminSidebarOpen && 'rotate-180')}
          />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-4">
        {ADMIN_LINKS.map((link) => {
          const isActive =
            link.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 mx-2 mb-1 rounded transition-all duration-200',
                isActive
                  ? 'bg-gold/10 text-gold'
                  : 'text-silver/50 hover:text-silver hover:bg-charcoal-light'
              )}
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              {adminSidebarOpen && (
                <span className="text-sm font-body truncate">{link.label}</span>
              )}
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-gold ml-auto flex-shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-charcoal-light">
        <Link
          href="/"
          className="flex items-center gap-3 px-2 py-2 text-silver/30 hover:text-silver/60 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {adminSidebarOpen && <span className="text-sm">Back to Site</span>}
        </Link>
      </div>
    </motion.aside>
  );
}
