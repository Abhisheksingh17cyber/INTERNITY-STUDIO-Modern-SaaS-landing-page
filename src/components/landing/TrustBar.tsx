'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, registerGSAPPlugins } from '@/lib/gsap';

registerGSAPPlugins();

const PRESS_MENTIONS = [
  { name: 'Hodinkee', quote: '"A new standard in modern horology"' },
  { name: 'Robb Report', quote: '"Extraordinary craftsmanship"' },
  { name: 'GQ', quote: '"The watch brand to watch"' },
  { name: 'Forbes', quote: '"Redefining luxury timepieces"' },
  { name: 'Esquire', quote: '"Investment-grade artistry"' },
];

const TRUST_STATS = [
  { value: '45+', label: 'Countries' },
  { value: '24/7', label: 'Concierge' },
  { value: '5 ★', label: 'Avg. Rating' },
  { value: '100%', label: 'Authentic' },
];

export default function TrustBar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !logosRef.current) return;

    // Infinite marquee for press mentions
    const logos = logosRef.current;
    const totalWidth = logos.scrollWidth / 2;

    gsap.to(logos, {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => x % totalWidth),
      },
    });

    // Fade in on scroll
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-charcoal border-y border-gold/10 py-10 md:py-14 overflow-hidden">
      <div className="container-luxury mb-8 md:mb-10">
        <p className="text-center font-body text-[10px] md:text-xs tracking-[0.4em] uppercase text-silver/20 mb-6">
          As Featured In
        </p>
        {/* Trust stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="font-display text-lg md:text-xl text-gold">{stat.value}</span>
              <span className="block font-body text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-silver/25 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling press marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-obsidian to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-obsidian to-transparent z-10" />
        <div ref={logosRef} className="flex items-center gap-8 md:gap-14 whitespace-nowrap">
          {[...PRESS_MENTIONS, ...PRESS_MENTIONS].map((press, i) => (
            <div key={`${press.name}-${i}`} className="flex items-center gap-3 flex-shrink-0">
              <span className="font-display text-base md:text-lg text-gold/30 tracking-wider uppercase">{press.name}</span>
              <span className="font-body text-xs text-silver/15 italic hidden md:inline">{press.quote}</span>
              <span className="text-gold/10 text-lg">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
