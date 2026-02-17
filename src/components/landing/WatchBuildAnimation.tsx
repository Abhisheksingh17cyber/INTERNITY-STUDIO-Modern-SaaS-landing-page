'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, registerGSAPPlugins } from '@/lib/gsap';

registerGSAPPlugins();

const BUILD_STAGES = [
  {
    label: 'The Case',
    description: 'Grade-5 titanium, hand-polished to a mirror finish over 12 hours.',
  },
  {
    label: 'The Dial',
    description: 'Guilloché engraving — 1,200 lines per centimetre, applied by a single artisan.',
  },
  {
    label: 'The Movement',
    description: '312 components, 72-hour power reserve, assembled under 10× magnification.',
  },
  {
    label: 'The Hands',
    description: 'Dauphine hands in 18k gold, each balanced to ±0.05 mg for flawless sweep.',
  },
  {
    label: 'The Crown',
    description: 'Signed, knurled crown with triple gasket — 200 m water resistance.',
  },
];

export default function WatchBuildAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current!;
      const parts = container.querySelectorAll<HTMLElement>('.watch-part');
      const textPanels = container.querySelectorAll<HTMLElement>('.build-text');
      const progressBar = container.querySelector<HTMLElement>('.build-progress');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${window.innerHeight * 3}`,
          anticipatePin: 1,
          pinSpacing: true,
        },
      });

      // Progress bar
      if (progressBar) {
        tl.fromTo(progressBar, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0);
      }

      // Animate each watch part in sequence
      parts.forEach((part, i) => {
        const startPos = i / parts.length;
        const endPos = (i + 0.6) / parts.length;

        // Fade in part
        tl.fromTo(
          part,
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out' },
          startPos
        );

        // Text panel: fade in, then out
        if (textPanels[i]) {
          tl.fromTo(
            textPanels[i],
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' },
            startPos + 0.02
          );

          // Fade out text (except last) so next stage's text replaces it
          if (i < parts.length - 1) {
            tl.to(
              textPanels[i],
              { opacity: 0, y: -20, duration: 0.08 },
              endPos
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-obsidian"
    >
      {/* GSAP pins this container while scroll-synced animation plays */}
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[180px]" />
        </div>

        {/* Progress bar across top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-20">
          <div className="build-progress h-full bg-gradient-to-r from-gold/40 via-gold to-gold/40 origin-left" />
        </div>

        {/* Main content */}
        <div className="relative h-full flex items-center">
        <div className="container-luxury w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Watch visual — layered SVG parts */}
            <div className="relative flex items-center justify-center order-2 lg:order-1">
              <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px]">
                {/* Part 1: Case (outer ring) */}
                <svg
                  className="watch-part absolute inset-0 w-full h-full opacity-0"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  {/* Outer case */}
                  <circle cx="200" cy="200" r="180" stroke="#C6A75E" strokeWidth="2" opacity="0.6" />
                  <circle cx="200" cy="200" r="170" stroke="#C6A75E" strokeWidth="1" opacity="0.3" />
                  {/* Lugs */}
                  <rect x="175" y="8" width="50" height="25" rx="4" stroke="#C6A75E" strokeWidth="1.5" opacity="0.5" />
                  <rect x="175" y="367" width="50" height="25" rx="4" stroke="#C6A75E" strokeWidth="1.5" opacity="0.5" />
                </svg>

                {/* Part 2: Dial */}
                <svg
                  className="watch-part absolute inset-0 w-full h-full opacity-0"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  <circle cx="200" cy="200" r="155" stroke="#C6A75E" strokeWidth="0.5" opacity="0.3" />
                  <circle cx="200" cy="200" r="140" fill="#1D1D1D" stroke="#C6A75E" strokeWidth="0.5" opacity="0.8" />
                  {/* Hour indices */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180);
                    const x1 = 200 + Math.cos(angle) * 125;
                    const y1 = 200 + Math.sin(angle) * 125;
                    const x2 = 200 + Math.cos(angle) * 138;
                    const y2 = 200 + Math.sin(angle) * 138;
                    return (
                      <line
                        key={i}
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="#C6A75E"
                        strokeWidth={i % 3 === 0 ? 2 : 1}
                        opacity={i % 3 === 0 ? 0.8 : 0.4}
                      />
                    );
                  })}
                </svg>

                {/* Part 3: Movement (inner rings - caseback) */}
                <svg
                  className="watch-part absolute inset-0 w-full h-full opacity-0"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  {/* Mainspring barrel */}
                  <circle cx="200" cy="200" r="60" stroke="#C6A75E" strokeWidth="0.5" opacity="0.4" />
                  <circle cx="200" cy="200" r="40" stroke="#C6A75E" strokeWidth="0.5" opacity="0.3" />
                  {/* Gear teeth suggestion */}
                  {Array.from({ length: 24 }).map((_, i) => {
                    const angle = (i * 15) * (Math.PI / 180);
                    const x1 = 200 + Math.cos(angle) * 55;
                    const y1 = 200 + Math.sin(angle) * 55;
                    const x2 = 200 + Math.cos(angle) * 63;
                    const y2 = 200 + Math.sin(angle) * 63;
                    return (
                      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C6A75E" strokeWidth="0.8" opacity="0.25" />
                    );
                  })}
                  {/* Balance wheel */}
                  <circle cx="200" cy="130" r="20" stroke="#C6A75E" strokeWidth="0.5" opacity="0.35" />
                  <line x1="200" y1="110" x2="200" y2="150" stroke="#C6A75E" strokeWidth="0.5" opacity="0.3" />
                </svg>

                {/* Part 4: Hands */}
                <svg
                  className="watch-part absolute inset-0 w-full h-full opacity-0"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  {/* Hour hand */}
                  <polygon points="197,200 200,105 203,200" fill="#C6A75E" opacity="0.7" />
                  {/* Minute hand */}
                  <polygon points="198.5,200 200,72 201.5,200" fill="#C6A75E" opacity="0.5" />
                  {/* Second hand */}
                  <line x1="200" y1="220" x2="200" y2="85" stroke="#E6C77A" strokeWidth="0.8" opacity="0.4" />
                  {/* Center pinion */}
                  <circle cx="200" cy="200" r="5" fill="#C6A75E" opacity="0.8" />
                  <circle cx="200" cy="200" r="3" fill="#0D0D0D" />
                </svg>

                {/* Part 5: Crown */}
                <svg
                  className="watch-part absolute inset-0 w-full h-full opacity-0"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  {/* Crown at 3 o'clock */}
                  <rect x="375" y="192" width="18" height="16" rx="3" stroke="#C6A75E" strokeWidth="1.5" opacity="0.6" />
                  {/* Knurling grooves */}
                  <line x1="380" y1="194" x2="380" y2="206" stroke="#C6A75E" strokeWidth="0.5" opacity="0.3" />
                  <line x1="384" y1="194" x2="384" y2="206" stroke="#C6A75E" strokeWidth="0.5" opacity="0.3" />
                  <line x1="388" y1="194" x2="388" y2="206" stroke="#C6A75E" strokeWidth="0.5" opacity="0.3" />
                  {/* Brand logo (small I) */}
                  <text x="200" y="170" textAnchor="middle" fill="#C6A75E" opacity="0.3" fontSize="10" fontFamily="serif">INTERNITY</text>
                </svg>
              </div>
            </div>

            {/* Right: Text panels — stacked, faded in/out */}
            <div className="relative min-h-[200px] order-1 lg:order-2">
              <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/40 block mb-6">
                The Craft
              </span>

              {BUILD_STAGES.map((stage, i) => (
                <div
                  key={stage.label}
                  className="build-text absolute top-10 left-0 right-0 opacity-0"
                >
                  <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-gold tracking-wider uppercase mb-4">
                    {stage.label}
                  </h3>
                  <p className="text-silver-dark/70 font-body text-base md:text-lg leading-relaxed max-w-md">
                    {stage.description}
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-gold/30" />
                    <span className="text-gold/40 font-body text-xs tracking-[0.25em] uppercase">
                      Stage {i + 1} of {BUILD_STAGES.length}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
