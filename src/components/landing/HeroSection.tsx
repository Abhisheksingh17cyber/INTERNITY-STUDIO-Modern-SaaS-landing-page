'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap, ScrollTrigger, registerGSAPPlugins, splitTextIntoSpans } from '@/lib/gsap';
import MagneticButton from '@/components/animations/MagneticButton';
import { ArrowRight, Play } from 'lucide-react';

registerGSAPPlugins();

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const watchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    const tl = gsap.timeline({ delay: 3.5 }); // After preloader

    // Split and animate heading
    const chars = splitTextIntoSpans(headingRef.current, 'chars');
    gsap.set(chars, { y: 100, opacity: 0, rotateX: -90 });

    tl.to(chars, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1,
      stagger: 0.02,
      ease: 'power4.out',
    });

    // Tagline reveal
    if (taglineRef.current) {
      gsap.set(taglineRef.current, { y: 30, opacity: 0 });
      tl.to(
        taglineRef.current,
        { y: 0, opacity: 1, duration: 0.7, ease: 'power4.out' },
        '-=0.5'
      );
    }

    // Subtitle fade in
    if (subRef.current) {
      gsap.set(subRef.current, { y: 40, opacity: 0 });
      tl.to(
        subRef.current,
        { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' },
        '-=0.4'
      );
    }

    // CTA slide in
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { y: 30, opacity: 0 });
      tl.to(
        ctaRef.current,
        { y: 0, opacity: 1, duration: 0.6, ease: 'power4.out' },
        '-=0.3'
      );
    }

    // Stats counter bar
    if (statsRef.current) {
      gsap.set(statsRef.current, { y: 20, opacity: 0 });
      tl.to(
        statsRef.current,
        { y: 0, opacity: 1, duration: 0.6, ease: 'power4.out' },
        '-=0.2'
      );
    }

    // Watch visual float in
    if (watchRef.current) {
      gsap.set(watchRef.current, { scale: 0.8, opacity: 0, rotation: -15 });
      tl.to(
        watchRef.current,
        { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'power4.out' },
        '-=0.8'
      );
    }

    // Scroll-triggered parallax — synced text + watch movement
    if (sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (headingRef.current) {
            gsap.set(headingRef.current, { y: progress * -120, opacity: 1 - progress * 0.9 });
          }
          if (taglineRef.current) {
            gsap.set(taglineRef.current, { y: progress * -80, opacity: 1 - progress });
          }
          if (subRef.current) {
            gsap.set(subRef.current, { y: progress * -60, opacity: 1 - progress });
          }
          if (watchRef.current) {
            gsap.set(watchRef.current, { y: progress * -50, scale: 1 - progress * 0.2, rotation: progress * 10 });
          }
        },
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian to-charcoal-dark" />
      
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-center min-h-screen py-24 md:py-32">
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/60 block mb-4">
                Swiss Craftsmanship Since 1947
              </span>
            </div>

            <h1
              ref={headingRef}
              className="text-hero font-display font-bold text-gold leading-[0.9] tracking-wider uppercase mb-4 md:mb-6"
            >
              Own a Legacy on Your Wrist
            </h1>

            <p
              ref={taglineRef}
              className="font-display text-lg md:text-2xl text-gold/70 tracking-wide mb-4 md:mb-6"
            >
              Because mass-produced watches can&apos;t tell your story.
            </p>

            <p
              ref={subRef}
              className="text-silver/60 font-body text-base md:text-lg leading-relaxed max-w-lg mb-8 md:mb-10"
            >
              312 hand-finished components. 72-hour power reserve. COSC-certified precision. 
              Each Internity timepiece is assembled by a single master watchmaker in our 
              Swiss atelier — so no two are ever identical.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 md:mb-10">
              <Link href="/products">
                <MagneticButton className="w-full sm:w-auto text-sm md:text-base px-6 md:px-8 py-3.5 md:py-4">
                  Shop the Collection
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </MagneticButton>
              </Link>
              <Link href="/about">
                <MagneticButton className="w-full sm:w-auto bg-transparent border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/60 text-sm md:text-base px-6 md:px-8 py-3.5 md:py-4">
                  <Play className="w-3.5 h-3.5 mr-2 inline" />
                  Our Story
                </MagneticButton>
              </Link>
            </div>

            {/* Trust stats bar */}
            <div ref={statsRef} className="flex flex-wrap gap-6 md:gap-8 border-t border-gold/10 pt-6">
              <div>
                <span className="font-display text-xl md:text-2xl text-gold">75+</span>
                <span className="block font-body text-[10px] md:text-xs tracking-[0.2em] uppercase text-silver/30 mt-1">Years Heritage</span>
              </div>
              <div>
                <span className="font-display text-xl md:text-2xl text-gold">12K+</span>
                <span className="block font-body text-[10px] md:text-xs tracking-[0.2em] uppercase text-silver/30 mt-1">Collectors</span>
              </div>
              <div>
                <span className="font-display text-xl md:text-2xl text-gold">99.8%</span>
                <span className="block font-body text-[10px] md:text-xs tracking-[0.2em] uppercase text-silver/30 mt-1">Precision Rate</span>
              </div>
            </div>
          </div>

          {/* Watch Visual */}
          <div ref={watchRef} className="flex items-center justify-center lg:justify-end order-first lg:order-last">
            <div className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px]">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full border border-gold/10 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-gold/5 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
              
              {/* Watch image */}
              <div className="absolute inset-8 rounded-full overflow-hidden border border-gold/20 flex items-center justify-center">
                <Image
                  src="/watches/watch-1.png"
                  alt="Internity Sovereign Chronograph"
                  fill
                  className="object-cover scale-110 group-hover:scale-115 transition-transform duration-1000"
                  priority
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 420px, 500px"
                />
                {/* Subtle overlay for blending */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 via-transparent to-obsidian/10 pointer-events-none" />
              </div>

              {/* Crown */}
              <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-3 md:w-4 h-6 md:h-8 bg-gradient-to-r from-gold/60 to-gold/30 rounded-r-sm" />
              
              {/* Shadow/glow */}
              <div className="absolute -inset-8 rounded-full bg-gold/5 blur-3xl animate-glow-pulse pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-silver/20">
          Scroll
        </span>
        <div className="w-px h-10 md:h-12 bg-gradient-to-b from-gold/40 to-transparent animate-bounce" />
      </div>
    </section>
  );
}
