'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap, ScrollTrigger, registerGSAPPlugins } from '@/lib/gsap';

registerGSAPPlugins();

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export default function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const scrollContainer = scrollRef.current;

    const ctx = gsap.context(() => {
      const totalWidth = scrollContainer.scrollWidth - window.innerWidth;

      const tween = gsap.to(scrollContainer, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollContainer.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          pinSpacing: true,
        },
      });

      // Animate each panel's content on enter
      const panels = scrollContainer.children;
      Array.from(panels).forEach((panel) => {
        gsap.fromTo(
          panel,
          { opacity: 0.5, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: panel as HTMLElement,
              containerAnimation: tween,
              start: 'left center',
              end: 'center center',
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`relative h-screen overflow-hidden bg-obsidian ${className}`} style={{ zIndex: 1 }}>
      <div ref={scrollRef} className="horizontal-scroll-container h-full">
        {children}
      </div>
    </div>
  );
}
