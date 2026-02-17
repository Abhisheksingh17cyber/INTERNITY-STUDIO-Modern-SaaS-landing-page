'use client';

import { X, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuickView() {
  const product = useUIStore((s) => s.quickViewProduct) as Product | null;
  const setQuickView = useUIStore((s) => s.setQuickViewProduct);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    if (!product) return;
    addItem({
      productId: product._id || product.slug,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '/watches/watch-1.png',
      slug: product.slug,
      quantity: 1,
    });
    setQuickView(null);
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickView(null)}
            className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-charcoal-dark z-50 overflow-hidden"
          >
            <button
              onClick={() => setQuickView(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center text-silver/40 hover:text-gold transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-square bg-charcoal">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-dark to-obsidian" />
                {product.images?.[0] ? (
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="400px" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-gold/20 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border border-gold/30" />
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-8 flex flex-col justify-center">
                <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold/50 block mb-2">
                  {product.category}
                </span>
                <h2 className="font-display text-2xl text-gold uppercase tracking-wider mb-2">{product.name}</h2>
                <p className="font-display text-xl text-silver mb-4">{formatPrice(product.price)}</p>
                <p className="font-body text-sm text-silver/40 leading-relaxed mb-8 line-clamp-3">
                  {product.description || 'An exquisite timepiece crafted with precision and passion.'}
                </p>

                <div className="space-y-3">
                  <button
                    onClick={handleAdd}
                    disabled={product.stock === 0}
                    className="w-full h-11 bg-gold text-obsidian font-body text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-gold/90 transition-colors disabled:opacity-40"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={() => setQuickView(null)}
                    className="w-full h-11 border border-silver/10 text-silver/50 font-body text-xs tracking-widest uppercase flex items-center justify-center hover:border-gold/30 hover:text-gold transition-colors"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
