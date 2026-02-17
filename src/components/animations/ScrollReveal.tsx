'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap, ScrollTrigger, registerGSAPPlugins } from '@/lib/gsap';
import { ANIMATION } from '@/lib/constants';

registerGSAPPlugins();

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  scale?: number;
  triggerStart?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  distance = 60,
  duration = ANIMATION.duration.normal,
  delay = 0,
  stagger = 0,
  scale = 1,
  triggerStart = ANIMATION.scrollTrigger.start,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const targets = stagger > 0 ? el.children : el;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      scale: scale !== 1 ? 0.95 : 1,
    };

    switch (direction) {
      case 'up':
        fromVars.y = distance;
        break;
      case 'down':
        fromVars.y = -distance;
        break;
      case 'left':
        fromVars.x = distance;
        break;
      case 'right':
        fromVars.x = -distance;
        break;
    }

    gsap.set(targets, fromVars);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: triggerStart,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    });

    tl.to(targets, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration,
      delay,
      stagger: stagger > 0 ? stagger : 0,
      ease: ANIMATION.ease.luxury,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
