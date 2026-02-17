'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MOCK_PRODUCTS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import HorizontalScroll from '@/components/animations/HorizontalScroll';
import CountUp from '@/components/animations/CountUp';
import TextReveal from '@/components/animations/TextReveal';

export default function ShowcaseSection() {
  const featured = MOCK_PRODUCTS.filter((p) => p.featured);

  return (
    <section className="bg-charcoal-dark relative">
      {/* Section header */}
      <div className="section-padding pb-0">
        <div className="container-luxury text-center">
          <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/50 block mb-4">
            Featured Collection
          </span>
          <TextReveal as="h2" className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gold tracking-wider uppercase mb-8">
            Signature Timepieces
          </TextReveal>
        </div>
      </div>

      {/* Horizontal scroll showcase */}
      <HorizontalScroll>
        {featured.map((product, i) => (
          <div
            key={product.id}
            className="horizontal-scroll-panel px-8 md:px-16"
          >
            <Link
              href={`/products/${product.slug}`}
              className="group block w-full max-w-3xl"
              data-cursor="expand"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Watch visual */}
                <div className="relative aspect-square bg-charcoal flex items-center justify-center overflow-hidden gold-border-glow">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent pointer-events-none" />
                  {/* Glow on hover */}
                  <div className="absolute -inset-8 bg-gold/0 group-hover:bg-gold/5 rounded-full blur-3xl transition-colors duration-700" />
                  
                  {/* Number index */}
                  <span className="absolute top-6 left-6 font-display text-gold/10 text-7xl md:text-8xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <span className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/40 block mb-3">
                    {product.category}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-gold tracking-wider uppercase mb-4">
                    {product.name}
                  </h3>
                  <p className="text-silver/40 font-body text-sm leading-relaxed mb-6 line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-6">
                    <span className="font-display text-2xl text-gold">
                      <CountUp end={product.price} prefix="$" />
                    </span>
                    <span className="font-body text-xs tracking-[0.2em] uppercase text-gold/40 group-hover:text-gold transition-colors">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </HorizontalScroll>

      {/* Gold line */}
      <div className="container-luxury py-4">
        <div className="line-gold" />
      </div>
    </section>
  );
}
