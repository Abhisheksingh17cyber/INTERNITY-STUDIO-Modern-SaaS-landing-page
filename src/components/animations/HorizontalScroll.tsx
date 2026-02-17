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
    const panels = scrollContainer.children;
    const totalWidth = scrollContainer.scrollWidth - window.innerWidth;

    const tween = gsap.to(scrollContainer, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
      },
    });

    // Animate each panel's content on enter
    Array.from(panels).forEach((panel, i) => {
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

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === containerRef.current) st.kill();
      });
    };
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={scrollRef} className="horizontal-scroll-container">
        {children}
      </div>
    </div>
  );
}
