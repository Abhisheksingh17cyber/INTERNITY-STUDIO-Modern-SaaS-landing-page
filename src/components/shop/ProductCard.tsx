'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const setQuickView = useUIStore((s) => s.setQuickViewProduct);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product._id || product.slug,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '/placeholder-watch.jpg',
      quantity: 1,
    });
  };

  return (
    <ScrollReveal delay={index * 0.1} direction="up">
      <div className="group relative">
        <Link href={`/products/${product.slug}`}>
          {/* Image Container */}
          <div className="relative aspect-square bg-charcoal rounded-sm overflow-hidden mb-4">
            {/* Placeholder gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-dark to-obsidian" />

            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-gold/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-gold/30" />
                </div>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-obsidian/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setQuickView(product);
                }}
                className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:border-gold hover:text-obsidian transition-all duration-300 translate-y-4 group-hover:translate-y-0"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={handleAddToCart}
                className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:border-gold hover:text-obsidian transition-all duration-300 translate-y-4 group-hover:translate-y-0 delay-75"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>

            {/* Badges */}
            {product.featured && (
              <span className="absolute top-3 left-3 bg-gold text-obsidian text-[10px] font-body font-semibold tracking-widest uppercase px-3 py-1">
                Featured
              </span>
            )}
            {product.stock === 0 && (
              <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-body font-semibold tracking-widest uppercase px-3 py-1">
                Sold Out
              </span>
            )}
          </div>

          {/* Info */}
          <div>
            <span className="text-[10px] font-body tracking-[0.3em] uppercase text-gold/50 block mb-1">
              {product.category}
            </span>
            <h3 className="font-display text-lg text-silver group-hover:text-gold transition-colors duration-300 mb-1">
              {product.name}
            </h3>
            <p className="font-body text-sm text-silver/40">
              {formatPrice(product.price)}
            </p>
          </div>
        </Link>
      </div>
    </ScrollReveal>
  );
}
