'use client';

import { useRef } from 'react';
import { useGSAPAnimation } from '@/hooks/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ParallaxDivider() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAPAnimation((ctx) => {
    if (!containerRef.current) return;

    const layers = containerRef.current.querySelectorAll('.divider-layer');

    layers.forEach((layer, i) => {
      gsap.to(layer, {
        y: (i + 1) * -30,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    // Gold line draw
    gsap.fromTo(
      containerRef.current.querySelector('.gold-line'),
      { scaleX: 0 },
      {
        scaleX: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1,
        },
      }
    );
  }, [containerRef]);

  return (
    <div ref={containerRef} className="relative h-40 overflow-hidden bg-obsidian">
      {/* Layered gradient strips */}
      <div className="divider-layer absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="divider-layer absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-silver/10 to-transparent" />
      <div className="divider-layer absolute inset-x-0 top-2/3 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      {/* Center gold line that draws in */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-center">
        <div className="gold-line w-32 h-[1px] bg-gold origin-center" />
      </div>
    </div>
  );
}
