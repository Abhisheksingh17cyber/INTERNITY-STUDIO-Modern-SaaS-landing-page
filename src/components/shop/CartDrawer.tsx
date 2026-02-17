'use client';

import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-charcoal-dark z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-silver/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <h2 className="font-display text-lg text-silver uppercase tracking-wider">
                  Cart ({getItemCount()})
                </h2>
              </div>
              <button
                onClick={toggleCart}
                className="w-9 h-9 flex items-center justify-center text-silver/40 hover:text-gold transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-silver/10 mx-auto mb-4" />
                  <p className="font-body text-silver/30 text-sm mb-6">Your cart is empty</p>
                  <button
                    onClick={toggleCart}
                    className="font-body text-xs tracking-[0.3em] uppercase text-gold hover:text-gold/80 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.productId} className="flex gap-4">
                    <div className="w-20 h-20 bg-charcoal rounded-sm overflow-hidden flex-shrink-0">
                      <Image src={item.image || '/watches/watch-1.png'} alt={item.name} width={80} height={80} className="object-cover w-full h-full" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-sm text-silver truncate">{item.name}</h3>
                      <p className="font-body text-xs text-gold/60 mt-1">{formatPrice(item.price)}</p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-silver/10 rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                            className="w-7 h-7 flex items-center justify-center text-silver/40 hover:text-gold transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-body text-silver text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-silver/40 hover:text-gold transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-silver/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-silver/10 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs tracking-[0.2em] uppercase text-silver/40">Subtotal</span>
                  <span className="font-display text-lg text-silver">{formatPrice(getTotal())}</span>
                </div>
                <p className="font-body text-[10px] text-silver/30">Shipping & taxes calculated at checkout</p>

                <Link
                  href="/checkout"
                  onClick={toggleCart}
                  className="w-full h-12 bg-gold text-obsidian font-body text-sm font-semibold tracking-widest uppercase flex items-center justify-center hover:bg-gold/90 transition-colors"
                >
                  Checkout
                </Link>

                <button
                  onClick={toggleCart}
                  className="w-full text-center font-body text-xs tracking-[0.3em] uppercase text-silver/40 hover:text-gold transition-colors py-2"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
