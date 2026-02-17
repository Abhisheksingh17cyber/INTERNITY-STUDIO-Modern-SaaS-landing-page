'use client';

import { use } from 'react';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft, Truck, Package, MapPin } from 'lucide-react';
import Link from 'next/link';

// Mock single order data
const mockOrder = {
  orderNumber: 'INT-003',
  status: 'processing',
  date: '2024-01-13',
  customer: { name: 'Robert Nakamura', email: 'robert.n@email.com', phone: '+1 555-0123' },
  shippingAddress: { street: '123 Luxury Ave', city: 'Beverly Hills', state: 'CA', zip: '90210', country: 'US' },
  items: [
    { name: 'Chronos Elite', quantity: 1, price: 24500 },
  ],
  subtotal: 24500,
  shipping: 0,
  tax: 1960,
  total: 26460,
};

const statusColors: Record<string, string> = {
  pending: 'text-yellow-400 bg-yellow-400/10',
  processing: 'text-blue-400 bg-blue-400/10',
  shipped: 'text-purple-400 bg-purple-400/10',
  delivered: 'text-emerald-400 bg-emerald-400/10',
  cancelled: 'text-red-400 bg-red-400/10',
};

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/orders" className="text-silver/30 hover:text-gold transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl text-silver uppercase tracking-wider mb-1">
            Order #{mockOrder.orderNumber}
          </h1>
          <p className="font-body text-xs text-silver/30">{mockOrder.date}</p>
        </div>
        <span className={`ml-auto px-3 py-1 text-[10px] font-body tracking-wider uppercase rounded-sm ${statusColors[mockOrder.status]}`}>
          {mockOrder.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-charcoal-dark border border-silver/5 rounded-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Package className="w-4 h-4 text-gold/50" />
              <h3 className="font-display text-lg text-silver uppercase tracking-wider">Items</h3>
            </div>
            <div className="space-y-4">
              {mockOrder.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-silver/5 last:border-0">
                  <div>
                    <span className="font-body text-sm text-silver">{item.name}</span>
                    <span className="font-body text-xs text-silver/30 ml-2">x{item.quantity}</span>
                  </div>
                  <span className="font-body text-sm text-silver/60">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-silver/10 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-body text-silver/40">Subtotal</span>
                <span className="font-body text-silver/60">{formatPrice(mockOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-body text-silver/40">Shipping</span>
                <span className="font-body text-gold/60">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-body text-silver/40">Tax</span>
                <span className="font-body text-silver/60">{formatPrice(mockOrder.tax)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-silver/10">
                <span className="font-display text-silver uppercase">Total</span>
                <span className="font-display text-lg text-gold">{formatPrice(mockOrder.total)}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-charcoal-dark border border-silver/5 rounded-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Truck className="w-4 h-4 text-gold/50" />
              <h3 className="font-display text-lg text-silver uppercase tracking-wider">Order Timeline</h3>
            </div>
            <div className="space-y-4">
              {[
                { status: 'Order placed', date: 'Jan 13, 2024 at 2:30 PM', active: true },
                { status: 'Payment confirmed', date: 'Jan 13, 2024 at 2:31 PM', active: true },
                { status: 'Processing', date: 'Jan 13, 2024 at 3:00 PM', active: true },
                { status: 'Shipped', date: 'Pending', active: false },
                { status: 'Delivered', date: 'Pending', active: false },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${step.active ? 'bg-gold' : 'bg-silver/10'}`} />
                  <div>
                    <span className={`font-body text-sm ${step.active ? 'text-silver' : 'text-silver/20'}`}>{step.status}</span>
                    <span className="font-body text-[10px] text-silver/20 block">{step.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer & Shipping */}
        <div className="space-y-6">
          <div className="bg-charcoal-dark border border-silver/5 rounded-sm p-6">
            <h3 className="font-display text-lg text-silver uppercase tracking-wider mb-4">Customer</h3>
            <div className="space-y-2">
              <p className="font-body text-sm text-silver">{mockOrder.customer.name}</p>
              <p className="font-body text-xs text-silver/40">{mockOrder.customer.email}</p>
              <p className="font-body text-xs text-silver/40">{mockOrder.customer.phone}</p>
            </div>
          </div>

          <div className="bg-charcoal-dark border border-silver/5 rounded-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-gold/50" />
              <h3 className="font-display text-lg text-silver uppercase tracking-wider">Shipping</h3>
            </div>
            <div className="font-body text-sm text-silver/50 leading-relaxed">
              <p>{mockOrder.shippingAddress.street}</p>
              <p>{mockOrder.shippingAddress.city}, {mockOrder.shippingAddress.state} {mockOrder.shippingAddress.zip}</p>
              <p>{mockOrder.shippingAddress.country}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button className="w-full h-10 bg-gold text-obsidian font-body text-xs font-semibold tracking-widest uppercase hover:bg-gold/90 transition-colors">
              Mark as Shipped
            </button>
            <button className="w-full h-10 border border-silver/10 text-silver/40 font-body text-xs tracking-widest uppercase hover:border-gold/30 hover:text-gold transition-colors">
              Print Invoice
            </button>
            <button className="w-full h-10 border border-red-500/20 text-red-400/50 font-body text-xs tracking-widest uppercase hover:border-red-500/40 hover:text-red-400 transition-colors">
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
