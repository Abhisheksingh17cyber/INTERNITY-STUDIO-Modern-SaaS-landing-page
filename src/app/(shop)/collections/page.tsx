'use client';

import Link from 'next/link';
import { WATCH_CATEGORIES } from '@/lib/constants';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import MagneticButton from '@/components/animations/MagneticButton';

const collectionData: Record<string, { description: string; gradient: string }> = {
  dive: {
    description: 'Built for depths unknown. Professional dive watches engineered for extreme underwater exploration.',
    gradient: 'from-blue-900/30 via-charcoal to-obsidian',
  },
  dress: {
    description: 'Refined elegance for distinguished occasions. Ultra-thin cases with minimalist dials.',
    gradient: 'from-gold/10 via-charcoal to-obsidian',
  },
  chronograph: {
    description: 'Precision timing meets bold design. Multi-function chronographs for the discerning collector.',
    gradient: 'from-silver/10 via-charcoal to-obsidian',
  },
  sport: {
    description: 'Performance meets luxury. Robust sports watches designed for an active lifestyle.',
    gradient: 'from-emerald-900/20 via-charcoal to-obsidian',
  },
  aviation: {
    description: 'Born from the skies. Pilot watches with precision instruments and bold legibility.',
    gradient: 'from-slate-800/30 via-charcoal to-obsidian',
  },
  limited: {
    description: 'Exclusive editions for the distinguished collector. Once they are gone, they are gone forever.',
    gradient: 'from-gold/20 via-charcoal to-obsidian',
  },
};

export default function CollectionsPage() {
  return (
    <section className="section-padding bg-obsidian min-h-screen">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/50 block mb-4">
              Discover
            </span>
          </ScrollReveal>
          <TextReveal as="h1" className="font-display text-4xl md:text-5xl lg:text-6xl text-gold uppercase tracking-wider mb-4">
            Collections
          </TextReveal>
          <ScrollReveal delay={0.3}>
            <p className="font-body text-silver/40 max-w-lg mx-auto">
              Explore our curated collections, each embodying a distinct philosophy of watchmaking excellence.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WATCH_CATEGORIES.map((cat, i) => {
            const data = collectionData[cat] || {
              description: 'Explore this collection of exceptional timepieces.',
              gradient: 'from-charcoal to-obsidian',
            };
            return (
              <ScrollReveal key={cat} delay={i * 0.1}>
                <Link
                  href={`/products?category=${cat}`}
                  className="group block relative aspect-[3/4] bg-charcoal rounded-sm overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${data.gradient}`} />

                  {/* Watch icon placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-gold/10 group-hover:border-gold/30 transition-colors duration-500 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border border-gold/5 group-hover:border-gold/15 transition-colors duration-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-xl text-gold uppercase tracking-wider mb-2 capitalize">
                      {cat}
                    </h3>
                    <p className="font-body text-xs text-silver/30 leading-relaxed line-clamp-2 mb-4">
                      {data.description}
                    </p>
                    <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/50 group-hover:text-gold transition-colors duration-300">
                      Explore &rarr;
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
