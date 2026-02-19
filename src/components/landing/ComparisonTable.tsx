'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, registerGSAPPlugins } from '@/lib/gsap';
import TextReveal from '@/components/animations/TextReveal';
import { Check, X } from 'lucide-react';
import {
  COMPARISON_WATCHES,
  COMPARISON_SPEC_ROWS,
  COMPARISON_FEATURE_ROWS,
} from '@/lib/constants';

registerGSAPPlugins();

export default function ComparisonTable() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !tableRef.current) return;

    const ctx = gsap.context(() => {
      // Watch column headers — stagger left to right
      const cols = tableRef.current!.querySelectorAll('.comparison-col');
      gsap.set(cols, { y: 40, opacity: 0 });
      gsap.to(cols, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: tableRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Spec & feature rows — stagger downward
      const rows = tableRef.current!.querySelectorAll('.comparison-row');
      gsap.set(rows, { y: 30, opacity: 0 });
      gsap.to(rows, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: rows[0],
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Section labels — slide in from left
      const labels = tableRef.current!.querySelectorAll('.comparison-row-label');
      gsap.set(labels, { opacity: 0, x: -20 });
      gsap.to(labels, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: tableRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-obsidian relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gold/[0.02] rounded-full blur-[200px] pointer-events-none" />

      <div className="container-luxury relative">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/50 block mb-4">
            Side by Side
          </span>
          <TextReveal
            as="h2"
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-gold tracking-wider uppercase mb-6"
            type="words"
            stagger={0.12}
          >
            Compare Our Timepieces
          </TextReveal>
          <p className="text-silver-dark/70 font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Every Internity watch tells a different story. Find the one that speaks to yours.
          </p>
        </div>

        {/* Table wrapper — horizontal scroll on mobile */}
        <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
          <div ref={tableRef} className="min-w-[700px]">
            {/* Header row: watch images + names + prices */}
            <div className="grid grid-cols-[180px_repeat(4,1fr)] md:grid-cols-[200px_repeat(4,1fr)] gap-0">
              {/* Empty top-left cell */}
              <div className="p-4" />

              {/* Watch columns */}
              {COMPARISON_WATCHES.map((watch) => (
                <div
                  key={watch.productId}
                  className="comparison-col p-4 text-center border-b border-gold/10"
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4">
                    <Image
                      src={watch.image}
                      alt={watch.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 96px, 128px"
                    />
                  </div>
                  <h3 className="font-display text-sm md:text-base text-gold tracking-wider normal-case mb-1">
                    {watch.name}
                  </h3>
                  <span className="font-display text-lg md:text-xl text-gold/80">
                    ${watch.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Spec rows */}
            <div className="mt-2">
              <div className="comparison-row-label px-4 py-3">
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/40">
                  Specifications
                </span>
              </div>

              {COMPARISON_SPEC_ROWS.map((row) => (
                <div
                  key={row.key}
                  className="comparison-row grid grid-cols-[180px_repeat(4,1fr)] md:grid-cols-[200px_repeat(4,1fr)] gap-0 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-300"
                >
                  <div className="p-4 flex items-center">
                    <span className="font-body text-xs md:text-sm text-silver-dark/60 tracking-wide">
                      {row.label}
                    </span>
                  </div>
                  {COMPARISON_WATCHES.map((watch) => (
                    <div
                      key={watch.productId}
                      className="p-4 text-center flex items-center justify-center"
                    >
                      <span className="font-body text-xs md:text-sm text-silver/80">
                        {watch.specs[row.key]}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Feature rows (boolean checkmark/x) */}
            <div className="mt-4">
              <div className="comparison-row-label px-4 py-3">
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/40">
                  Features
                </span>
              </div>

              {COMPARISON_FEATURE_ROWS.map((row) => (
                <div
                  key={row.key}
                  className="comparison-row grid grid-cols-[180px_repeat(4,1fr)] md:grid-cols-[200px_repeat(4,1fr)] gap-0 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-300"
                >
                  <div className="p-4 flex items-center">
                    <span className="font-body text-xs md:text-sm text-silver-dark/60 tracking-wide">
                      {row.label}
                    </span>
                  </div>
                  {COMPARISON_WATCHES.map((watch) => (
                    <div
                      key={watch.productId}
                      className="p-4 flex items-center justify-center"
                    >
                      {watch.features[row.key] ? (
                        <div className="w-7 h-7 flex items-center justify-center border border-gold/30 bg-gold/[0.08]">
                          <Check className="w-4 h-4 text-gold" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 flex items-center justify-center border border-white/[0.06]">
                          <X className="w-3.5 h-3.5 text-silver-dark/25" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
