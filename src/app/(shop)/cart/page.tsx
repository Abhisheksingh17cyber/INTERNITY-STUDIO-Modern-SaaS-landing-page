'use client';

import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore();

  if (items.length === 0) {
    return (
      <section className="section-padding bg-obsidian min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-silver/10 mx-auto mb-6" />
          <h1 className="font-display text-3xl text-silver uppercase tracking-wider mb-4">Your Cart is Empty</h1>
          <p className="font-body text-silver/40 mb-8">Discover our collection of luxury timepieces</p>
          <Link href="/products" className="inline-flex items-center gap-2 h-12 px-8 bg-gold text-obsidian font-body text-sm font-semibold tracking-widest uppercase hover:bg-gold/90 transition-colors">
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    );
  }

  const subtotal = getTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <section className="section-padding bg-obsidian min-h-screen">
      <div className="container-luxury">
        <TextReveal as="h1" className="font-display text-3xl md:text-4xl text-gold uppercase tracking-wider text-center mb-12">
          Shopping Cart
        </TextReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, i) => (
              <ScrollReveal key={item.productId} delay={i * 0.1}>
                <div className="flex gap-6 p-6 bg-charcoal-dark rounded-sm">
                  <div className="w-24 h-24 bg-charcoal rounded-sm overflow-hidden flex-shrink-0">
                    <Image src={item.image || '/watches/watch-1.png'} alt={item.name} width={96} height={96} className="object-cover w-full h-full" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display text-lg text-silver mb-1">{item.name}</h3>
                    <p className="font-body text-sm text-gold/60 mb-4">{formatPrice(item.price)}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-silver/10 rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                          className="w-9 h-9 flex items-center justify-center text-silver/40 hover:text-gold transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-body text-silver text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-silver/40 hover:text-gold transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-body text-silver">{formatPrice(item.price * item.quantity)}</span>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-silver/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Summary */}
          <div>
            <ScrollReveal delay={0.2}>
              <div className="bg-charcoal-dark p-6 rounded-sm sticky top-24">
                <h3 className="font-display text-lg text-silver uppercase tracking-wider mb-6">Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="font-body text-silver/40">Items ({getItemCount()})</span>
                    <span className="font-body text-silver/60">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-body text-silver/40">Shipping</span>
                    <span className="font-body text-gold/60">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-body text-silver/40">Estimated Tax</span>
                    <span className="font-body text-silver/60">{formatPrice(tax)}</span>
                  </div>
                </div>
                <div className="flex justify-between pt-4 border-t border-silver/10 mb-6">
                  <span className="font-display text-silver uppercase tracking-wider">Total</span>
                  <span className="font-display text-xl text-gold">{formatPrice(total)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full h-12 bg-gold text-obsidian font-body text-sm font-semibold tracking-widest uppercase flex items-center justify-center hover:bg-gold/90 transition-colors mb-3"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/products"
                  className="block w-full text-center font-body text-xs tracking-[0.3em] uppercase text-silver/40 hover:text-gold transition-colors py-2"
                >
                  Continue Shopping
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
