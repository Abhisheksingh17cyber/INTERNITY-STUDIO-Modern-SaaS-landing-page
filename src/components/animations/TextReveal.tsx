'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, splitTextIntoSpans, registerGSAPPlugins } from '@/lib/gsap';
import { ANIMATION } from '@/lib/constants';

registerGSAPPlugins();

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  type?: 'chars' | 'words' | 'lines';
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  y?: number;
  triggerStart?: string;
  once?: boolean;
}

export default function TextReveal({
  children,
  as: Tag = 'p',
  type = 'words',
  className = '',
  stagger = ANIMATION.stagger.normal,
  duration = ANIMATION.duration.normal,
  delay = 0,
  y = 60,
  triggerStart = ANIMATION.scrollTrigger.start,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const elements = splitTextIntoSpans(el, type);

    gsap.set(elements, { y, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: triggerStart,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    });

    tl.to(elements, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: ANIMATION.ease.luxury,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return <Tag ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>} className={className}>{children}</Tag>;
}
