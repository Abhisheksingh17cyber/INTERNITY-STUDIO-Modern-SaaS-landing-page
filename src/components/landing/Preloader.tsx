'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, registerGSAPPlugins, splitTextIntoSpans } from '@/lib/gsap';
import { useUIStore } from '@/stores/uiStore';

registerGSAPPlugins();

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);
  const setPreloaderComplete = useUIStore((s) => s.setPreloaderComplete);

  useEffect(() => {
    // Only show once per session
    if (typeof window !== 'undefined' && sessionStorage.getItem('internity-preloader-done')) {
      setShow(false);
      setPreloaderComplete(true);
      return;
    }

    if (!containerRef.current || !brandRef.current || !progressRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('internity-preloader-done', 'true');
        setPreloaderComplete(true);
        setTimeout(() => setShow(false), 100);
      },
    });

    // Watch parts: SVG circles/rects representing watch case, dial, hands, crown, strap
    const parts = containerRef.current.querySelectorAll('.watch-part');
    const brandEl = brandRef.current;
    const progressEl = progressRef.current;

    // Initial states
    gsap.set(parts, { opacity: 0, scale: 0.3, rotation: () => gsap.utils.random(-90, 90) });
    gsap.set(brandEl, { opacity: 0 });

    // Progress bar animation
    tl.to(progressEl, {
      scaleX: 1,
      duration: 2.5,
      ease: 'power2.inOut',
    });

    // Watch parts assemble sequentially
    tl.to(
      parts,
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power4.out',
      },
      0.3
    );

    // Watch glow pulse after assembly
    tl.to('.watch-assembled', {
      boxShadow: '0 0 60px rgba(212, 175, 55, 0.4)',
      duration: 0.8,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1,
    });

    // Brand name reveal
    tl.add(() => {
      const chars = splitTextIntoSpans(brandEl, 'chars');
      gsap.fromTo(
        chars,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: 'power4.out',
        }
      );
    }, '-=0.3');

    // Hold
    tl.to({}, { duration: 0.6 });

    // Exit: slide everything up
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'power4.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [setPreloaderComplete]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="preloader flex-col gap-8"
    >
      {/* Watch Assembly Visual */}
      <div className="watch-assembled relative w-48 h-48 flex items-center justify-center">
        {/* Case - outer ring */}
        <div className="watch-part absolute inset-0 rounded-full border-2 border-gold/60" />
        
        {/* Dial background */}
        <div className="watch-part absolute inset-4 rounded-full bg-charcoal border border-gold/20" />
        
        {/* Hour markers */}
        <div className="watch-part absolute inset-6 rounded-full">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-3 bg-gold/80 left-1/2 top-0 origin-bottom"
              style={{
                transform: `rotate(${i * 30}deg) translateX(-50%)`,
                transformOrigin: '50% 66px',
              }}
            />
          ))}
        </div>
        
        {/* Hour hand */}
        <div className="watch-part absolute w-1 h-12 bg-gold rounded-full left-1/2 top-1/2 -translate-x-1/2 origin-bottom -translate-y-full rotate-[-30deg]" />
        
        {/* Minute hand */}
        <div className="watch-part absolute w-0.5 h-16 bg-gold/80 rounded-full left-1/2 top-1/2 -translate-x-1/2 origin-bottom -translate-y-full rotate-[60deg]" />
        
        {/* Crown */}
        <div className="watch-part absolute right-[-12px] top-1/2 -translate-y-1/2 w-3 h-5 bg-gold/60 rounded-r" />
        
        {/* Center dot */}
        <div className="watch-part absolute w-3 h-3 rounded-full bg-gold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Brand Name */}
      <div
        ref={brandRef}
        className="font-display text-gold text-2xl tracking-[0.5em] uppercase mt-8"
      >
        INTERNITY
      </div>

      {/* Progress Bar */}
      <div className="w-48 h-px bg-charcoal-light mt-6 overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gold origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  );
}
