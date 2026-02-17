'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Heart, Share2, Shield, Truck, RotateCcw, Minus, Plus } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'shipping'>('description');
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({
      id: product._id || product.slug,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '/placeholder-watch.jpg',
      quantity,
    });
  };

  const specs = product.specs
    ? Object.entries(product.specs instanceof Map ? Object.fromEntries(product.specs) : product.specs)
    : [];

  return (
    <section className="section-padding bg-obsidian">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <ScrollReveal direction="left">
            <div>
              <div className="relative aspect-square bg-charcoal rounded-sm overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-dark to-obsidian" />
                {product.images?.[activeImage] ? (
                  <Image
                    src={product.images[activeImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full border-2 border-gold/20 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border border-gold/30 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-gold/50" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-20 h-20 bg-charcoal rounded-sm overflow-hidden border-2 transition-colors ${
                        i === activeImage ? 'border-gold' : 'border-transparent hover:border-gold/30'
                      }`}
                    >
                      <Image src={img} alt="" width={80} height={80} className="object-cover w-full h-full" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Product Info */}
          <div>
            <ScrollReveal>
              <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold/50 block mb-3">
                {product.category}
              </span>
            </ScrollReveal>

            <TextReveal as="h1" className="font-display text-3xl md:text-4xl lg:text-5xl text-gold uppercase tracking-wider mb-4">
              {product.name}
            </TextReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-display text-2xl text-silver mb-8">
                {formatPrice(product.price)}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="font-body text-silver/50 leading-relaxed mb-8">
                {product.description}
              </p>
            </ScrollReveal>

            {/* Quantity + Add to Cart */}
            <ScrollReveal delay={0.4}>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border border-silver/10 rounded-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-silver/50 hover:text-gold transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-body text-silver text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-silver/50 hover:text-gold transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={product.stock === 0}
                  className="flex-1 h-12 bg-gold text-obsidian font-body text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-gold/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                </button>

                <button className="w-12 h-12 border border-silver/10 flex items-center justify-center text-silver/40 hover:text-gold hover:border-gold/30 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="w-12 h-12 border border-silver/10 flex items-center justify-center text-silver/40 hover:text-gold hover:border-gold/30 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </ScrollReveal>

            {/* Trust badges */}
            <ScrollReveal delay={0.5}>
              <div className="grid grid-cols-3 gap-4 py-8 border-t border-b border-silver/10 mb-8">
                {[
                  { icon: Shield, label: '2 Year Warranty' },
                  { icon: Truck, label: 'Free Shipping' },
                  { icon: RotateCcw, label: '30 Day Returns' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="text-center">
                    <Icon className="w-5 h-5 text-gold/60 mx-auto mb-2" />
                    <span className="text-[10px] font-body tracking-wider uppercase text-silver/40">{label}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Tabs */}
            <ScrollReveal delay={0.6}>
              <div className="flex gap-6 border-b border-silver/10 mb-6">
                {(['description', 'specs', 'shipping'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-xs font-body tracking-[0.3em] uppercase transition-colors border-b-2 ${
                      activeTab === tab
                        ? 'text-gold border-gold'
                        : 'text-silver/40 border-transparent hover:text-silver/60'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="min-h-[120px]">
                {activeTab === 'description' && (
                  <p className="font-body text-sm text-silver/40 leading-relaxed">
                    {product.description || 'Crafted with meticulous attention to detail, this timepiece embodies the essence of luxury watchmaking. Each component is precision-engineered and hand-assembled by master craftsmen.'}
                  </p>
                )}
                {activeTab === 'specs' && (
                  <div className="space-y-3">
                    {specs.length > 0 ? (
                      specs.map(([key, val]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-silver/5">
                          <span className="font-body text-xs tracking-wider uppercase text-silver/40">{key}</span>
                          <span className="font-body text-sm text-silver/60">{String(val)}</span>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-3">
                        {[
                          ['Case Material', 'Stainless Steel'],
                          ['Movement', 'Swiss Automatic'],
                          ['Water Resistance', '100m'],
                          ['Case Diameter', '42mm'],
                          ['Crystal', 'Sapphire'],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between py-2 border-b border-silver/5">
                            <span className="font-body text-xs tracking-wider uppercase text-silver/40">{k}</span>
                            <span className="font-body text-sm text-silver/60">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-4 font-body text-sm text-silver/40 leading-relaxed">
                    <p>Complimentary express shipping on all orders. Your timepiece will be carefully packaged in our signature presentation box.</p>
                    <p>Estimated delivery: 3-5 business days (domestic), 7-14 business days (international).</p>
                    <p>All shipments are fully insured and require a signature upon delivery.</p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
