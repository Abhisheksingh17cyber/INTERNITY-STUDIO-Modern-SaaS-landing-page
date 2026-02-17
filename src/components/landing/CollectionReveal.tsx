'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WATCH_CATEGORIES } from '@/lib/constants';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';

const COLLECTION_IMAGES: Record<string, string> = {
  dive: '/watches/watch-4.png',
  dress: '/watches/watch-6.png',
  chronograph: '/watches/watch-1.png',
  skeleton: '/watches/watch-8.png',
  'limited-edition': '/watches/watch-11.png',
};

export default function CollectionReveal() {
  const collections = WATCH_CATEGORIES.slice(0, 3);

  return (
    <section className="section-padding bg-obsidian">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/50 block mb-4">
            Discover
          </span>
          <TextReveal as="h2" className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gold tracking-wider uppercase">
            Our Collections
          </TextReveal>
        </div>

        <ScrollReveal stagger={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                href={`/collections?c=${collection.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-charcoal"
                data-cursor="expand"
              >
                {/* Background image */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  <Image
                    src={COLLECTION_IMAGES[collection.slug] || '/watches/watch-1.png'}
                    alt={collection.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-obsidian/50" />
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent">
                  <span className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/50 mb-3">
                    Collection
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-gold tracking-wider uppercase mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-silver/40 font-body text-sm mb-4">
                    {collection.description}
                  </p>
                  <span className="font-body text-xs tracking-[0.2em] uppercase text-gold/40 group-hover:text-gold transition-colors duration-300">
                    Explore →
                  </span>
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 border border-transparent group-hover:border-gold/20 transition-colors duration-500" />
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
