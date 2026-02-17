'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { gsap, ScrollTrigger, registerGSAPPlugins } from '@/lib/gsap';

registerGSAPPlugins();

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export default function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState('100vh');

  useEffect(() => {
    if (!sectionRef.current || !stickyRef.current || !scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    const totalWidth = scrollContainer.scrollWidth - window.innerWidth;

    // Set the section height to match the horizontal scroll distance
    setSectionHeight(`${totalWidth + window.innerHeight}px`);

    const tween = gsap.to(scrollContainer, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
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

    // Recalculate on resize
    const onResize = () => {
      const newTotalWidth = scrollContainer.scrollWidth - window.innerWidth;
      setSectionHeight(`${newTotalWidth + window.innerHeight}px`);
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className={className} style={{ height: sectionHeight }}>
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        <div ref={scrollRef} className="horizontal-scroll-container h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
