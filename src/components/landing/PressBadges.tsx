'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, registerGSAPPlugins } from '@/lib/gsap';

registerGSAPPlugins();

const PRESS_LOGOS = [
  { name: 'Forbes', quote: '"Redefining luxury timepieces"' },
  { name: 'GQ', quote: '"The watch brand to watch"' },
  { name: 'Hodinkee', quote: '"A new standard in modern horology"' },
  { name: 'Robb Report', quote: '"Extraordinary craftsmanship"' },
  { name: 'Esquire', quote: '"Investment-grade artistry"' },
  { name: 'Vogue', quote: '"Timeless elegance redefined"' },
];

export default function PressBadges() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered badge reveal
      const badges = sectionRef.current!.querySelectorAll('.press-badge');
      gsap.set(badges, { y: 30, opacity: 0 });
      gsap.to(badges, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-obsidian border-y border-[rgba(255,255,255,0.08)]">
      <div className="container-luxury">
        {/* Header */}
        <p className="text-center font-body text-[10px] md:text-xs tracking-[0.5em] uppercase text-silver-dark/30 mb-10 md:mb-14">
          As Featured In
        </p>

        {/* Press logos grid — muted silver style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 items-center">
          {PRESS_LOGOS.map((press) => (
            <div
              key={press.name}
              className="press-badge group flex flex-col items-center text-center gap-3 py-4 transition-all duration-500"
            >
              {/* Logo name styled as muted silver text badge */}
              <span className="font-display text-xl md:text-2xl text-silver-dark/20 tracking-[0.15em] uppercase group-hover:text-silver-dark/50 transition-colors duration-500">
                {press.name}
              </span>
              <span className="font-body text-[10px] text-silver-dark/15 italic leading-tight max-w-[140px] group-hover:text-silver-dark/30 transition-colors duration-500 hidden md:block">
                {press.quote}
              </span>
            </div>
          ))}
        </div>

        {/* Trusted line */}
        <div className="text-center mt-10 md:mt-14">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-silver-dark/20">
            Trusted by 10,000+ collectors worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
