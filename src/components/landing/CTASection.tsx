'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger, registerGSAPPlugins } from '@/lib/gsap';
import MagneticButton from '@/components/animations/MagneticButton';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import { ArrowRight, Mail } from 'lucide-react';

registerGSAPPlugins();

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !glowRef.current) return;

    // Pulsing glow tied to scroll
    gsap.fromTo(
      glowRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1.2,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
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
    <section ref={sectionRef} className="section-padding bg-obsidian relative overflow-hidden">
      {/* Top gold accent line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      {/* Background glow */}
      <div ref={glowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.04] rounded-full blur-[120px]" />
      
      <div className="container-luxury relative">
        <ScrollReveal scale={0.95}>
          <div className="text-center py-8 md:py-12">
            <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/50 block mb-6">
              Begin Your Journey
            </span>
            <TextReveal as="h2" className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-gold tracking-wider uppercase mb-4 md:mb-6">
              Your Legacy Starts Now
            </TextReveal>
            <p className="text-silver-dark/70 font-body text-base md:text-lg max-w-xl mx-auto mb-4 leading-relaxed">
              Join 12,000+ collectors who chose to wear something extraordinary. 
              Every Internity watch ships with complimentary engraving and a lifetime warranty.
            </p>
            <p className="text-gold/40 font-body text-sm mb-10 md:mb-12">
              Free worldwide shipping · 30-day returns · Lifetime servicing
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link href="/products">
                <MagneticButton className="w-full sm:w-auto text-sm md:text-base px-8 md:px-12 py-4 md:py-5">
                  Shop the Collection
                  <ArrowRight className="w-5 h-5 ml-3 inline" />
                </MagneticButton>
              </Link>
              <Link href="/contact">
                <MagneticButton className="w-full sm:w-auto bg-transparent border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/60 text-sm md:text-base px-8 md:px-12 py-4 md:py-5">
                  <Mail className="w-4 h-4 mr-2 inline" />
                  Book a Private Viewing
                </MagneticButton>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
