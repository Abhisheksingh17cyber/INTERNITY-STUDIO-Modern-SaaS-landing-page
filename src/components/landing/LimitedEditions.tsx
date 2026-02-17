'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap, ScrollTrigger, registerGSAPPlugins } from '@/lib/gsap';
import TextReveal from '@/components/animations/TextReveal';
import { Clock, ArrowRight } from 'lucide-react';

registerGSAPPlugins();

const LIMITED_EDITIONS = [
  {
    name: 'Sovereign Noir',
    edition: '1 of 50',
    price: '$28,500',
    image: '/watches/watch-1.png',
    description: 'DLC-coated titanium case with midnight blue grand feu enamel dial. Only 50 pieces worldwide.',
    available: 12,
  },
  {
    name: 'Celestial Gold',
    edition: '1 of 25',
    price: '$45,000',
    image: '/watches/watch-6.png',
    description: '18k rose gold case with meteorite dial. Hand-engraved movement visible through sapphire caseback.',
    available: 7,
  },
  {
    name: 'Apex Tourbillon',
    edition: '1 of 10',
    price: '$85,000',
    image: '/watches/watch-8.png',
    description: 'Flying tourbillon in platinum case. 80-hour power reserve with hand-finished bridges.',
    available: 3,
  },
];

export default function LimitedEditions() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered card reveal with scale
      const cards = sectionRef.current!.querySelectorAll('.limited-card');
      gsap.set(cards, { y: 80, opacity: 0, scale: 0.95 });
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Slow zoom on images
      const images = sectionRef.current!.querySelectorAll('.limited-img');
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.12 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.limited-card'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-obsidian relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/[0.02] rounded-full blur-[200px] pointer-events-none" />

      <div className="container-luxury relative">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-body text-xs tracking-[0.5em] uppercase text-gold/50 block mb-4">
            <Clock className="w-3.5 h-3.5 inline mr-2 -mt-0.5" />
            Exclusivity Defined
          </span>
          <TextReveal as="h2" className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-gold tracking-wider uppercase mb-6">
            Limited Editions
          </TextReveal>
          <p className="text-silver-dark/50 font-body text-sm md:text-base max-w-xl mx-auto">
            Extraordinary timepieces produced in numbered runs. Once they&apos;re gone, they&apos;re gone forever.
          </p>
        </div>

        {/* Limited edition cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {LIMITED_EDITIONS.map((edition) => (
            <Link
              key={edition.name}
              href="/products"
              className="limited-card group relative bg-charcoal border border-[rgba(255,255,255,0.08)] hover:border-gold/25 transition-all duration-500 overflow-hidden gold-border-glow"
              data-cursor="expand"
            >
              {/* Image with scroll zoom */}
              <div className="relative aspect-square overflow-hidden">
                <div className="limited-img absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  <Image
                    src={edition.image}
                    alt={edition.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />

                {/* Edition badge */}
                <div className="absolute top-4 right-4 bg-gold/90 text-obsidian px-3 py-1">
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase font-bold">
                    {edition.edition}
                  </span>
                </div>

                {/* Availability indicator */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold animate-glow-pulse" />
                  <span className="font-body text-[10px] tracking-[0.15em] uppercase text-silver/60">
                    {edition.available} remaining
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="font-display text-xl md:text-2xl text-gold tracking-wider uppercase mb-3">
                  {edition.name}
                </h3>
                <p className="text-silver-dark/50 font-body text-sm leading-relaxed mb-4">
                  {edition.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl text-gold">{edition.price}</span>
                  <span className="font-body text-xs tracking-[0.15em] uppercase text-gold/40 group-hover:text-gold transition-colors duration-300 flex items-center gap-1">
                    Reserve
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
