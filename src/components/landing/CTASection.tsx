'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger, registerGSAPPlugins } from '@/lib/gsap';
import MagneticButton from '@/components/animations/MagneticButton';
import TextReveal from '@/components/animations/TextReveal';
import { ArrowRight } from 'lucide-react';

registerGSAPPlugins();

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !glowRef.current) return;

    const ctx = gsap.context(() => {
      // Pulsing glow tied to scroll
      gsap.fromTo(
        glowRef.current,
        { scale: 0.6, opacity: 0 },
        {
          scale: 1.3,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Button shimmer
      if (btnRef.current) {
        gsap.fromTo(
          btnRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-obsidian relative overflow-hidden py-32 md:py-44">
      {/* Top gold accent line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      {/* Background glow — large centered */}
      <div ref={glowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/[0.04] rounded-full blur-[180px] pointer-events-none" />
      
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(198,167,94,0.5) 1px, transparent 0)`,
        backgroundSize: '50px 50px',
      }} />
      
      <div className="container-luxury relative text-center">
        {/* Massive headline */}
        <TextReveal
          as="h2"
          type="chars"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold text-gold tracking-wider uppercase leading-[0.9] mb-8 md:mb-12"
          stagger={0.02}
          duration={0.8}
        >
          Own a Legacy.
        </TextReveal>

        <div className="line-gold max-w-24 mx-auto mb-8 md:mb-10" />

        <p className="text-silver-dark/60 font-body text-base md:text-lg max-w-lg mx-auto mb-4 leading-relaxed">
          Join 12,000+ collectors who chose to wear something extraordinary.
          Every watch ships with complimentary engraving and a lifetime warranty.
        </p>
        <p className="text-silver-dark/30 font-body text-xs md:text-sm mb-12 md:mb-16 tracking-wide">
          Free worldwide shipping · 30-day returns · Lifetime servicing
        </p>
        
        {/* Gold shimmer CTA button */}
        <div ref={btnRef}>
          <Link href="/products">
            <MagneticButton className="inline-flex items-center gap-3 text-base md:text-lg px-12 md:px-16 py-5 md:py-6 bg-gold-gradient text-obsidian font-bold tracking-[0.1em] uppercase hover:shadow-[0_0_40px_rgba(198,167,94,0.4)] transition-shadow duration-500 relative overflow-hidden group">
              {/* Shimmer sweep */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <span className="relative">Explore Collection</span>
              <ArrowRight className="w-5 h-5 relative" />
            </MagneticButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
