'use client';

import Link from 'next/link';
import MagneticButton from '@/components/animations/MagneticButton';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section-padding bg-charcoal-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-[120px]" />
      
      <div className="container-luxury relative">
        <ScrollReveal scale={0.95}>
          <div className="text-center py-12">
            <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/50 block mb-6">
              Begin Your Journey
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gold tracking-wider uppercase mb-6">
              Find Your Timepiece
            </h2>
            <p className="text-silver/40 font-body text-lg max-w-xl mx-auto mb-12 leading-relaxed">
              Every Internity watch tells a story. Discover the one that resonates with yours.
            </p>
            <Link href="/products">
              <MagneticButton className="text-base px-12 py-5">
                Explore the Collection
                <ArrowRight className="w-5 h-5 ml-3 inline" />
              </MagneticButton>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
