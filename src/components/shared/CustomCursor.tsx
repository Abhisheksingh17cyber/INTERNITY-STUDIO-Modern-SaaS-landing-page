'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useIsMobile } from '@/hooks/useMediaQuery';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const cursor = cursorRef.current;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      gsap.to(cursor, {
        x: mouseX - cursor.offsetWidth / 2,
        y: mouseY - cursor.offsetHeight / 2,
        duration: 0.5,
        ease: 'power4.out',
      });
      requestAnimationFrame(animate);
    };

    const onMouseEnterInteractive = () => {
      cursor.classList.add('expanded');
    };

    const onMouseLeaveInteractive = () => {
      cursor.classList.remove('expanded');
    };

    const onMouseEnterDocument = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
    };

    const onMouseLeaveDocument = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnterDocument);
    document.addEventListener('mouseleave', onMouseLeaveDocument);

    // Add listeners to all interactive elements
    const addInteractiveListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [data-cursor="expand"], input, textarea, select, [role="button"]'
      );
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
      return interactives;
    };

    let interactives = addInteractiveListeners();

    // Re-add listeners when DOM changes (for SPAs)
    const observer = new MutationObserver(() => {
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
      interactives = addInteractiveListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const animFrame = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnterDocument);
      document.removeEventListener('mouseleave', onMouseLeaveDocument);
      cancelAnimationFrame(animFrame);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return <div ref={cursorRef} className="custom-cursor" style={{ opacity: 0 }} />;
}
