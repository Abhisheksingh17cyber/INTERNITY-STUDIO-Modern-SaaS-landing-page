'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap, ScrollTrigger, registerGSAPPlugins } from '@/lib/gsap';
import { WATCH_CATEGORIES } from '@/lib/constants';
import TextReveal from '@/components/animations/TextReveal';

registerGSAPPlugins();

const COLLECTION_IMAGES: Record<string, string> = {
  dive: '/watches/watch-4.png',
  dress: '/watches/watch-6.png',
  chronograph: '/watches/watch-1.png',
  skeleton: '/watches/watch-8.png',
  'limited-edition': '/watches/watch-11.png',
};

export default function CollectionReveal() {
  const collections = WATCH_CATEGORIES.slice(0, 3);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Slow zoom-in on scroll for each collection image
      const images = sectionRef.current!.querySelectorAll('.collection-img');
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.15 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.collection-card'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      });

      // Staggered card fade-in
      const cards = sectionRef.current!.querySelectorAll('.collection-card');
      gsap.set(cards, { y: 80, opacity: 0 });
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-obsidian">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/50 block mb-4">
            Discover
          </span>
          <TextReveal as="h2" className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gold tracking-wider uppercase">
            Our Collections
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections?c=${collection.slug}`}
              className="collection-card group relative aspect-[3/4] overflow-hidden bg-charcoal"
              data-cursor="expand"
            >
              {/* Background image with scroll zoom */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="collection-img absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <Image
                    src={COLLECTION_IMAGES[collection.slug] || '/watches/watch-1.png'}
                    alt={collection.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
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
                <p className="text-silver-dark/70 font-body text-sm mb-4">
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
      </div>
    </section>
  );
}
