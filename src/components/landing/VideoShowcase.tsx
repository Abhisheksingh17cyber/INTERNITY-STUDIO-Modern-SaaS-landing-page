'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, registerGSAPPlugins } from '@/lib/gsap';
import TextReveal from '@/components/animations/TextReveal';
import { Volume2, VolumeX } from 'lucide-react';

registerGSAPPlugins();

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || !videoRef.current) return;

    const video = videoRef.current;

    // Set very low volume
    video.volume = 0.08;

    // ScrollTrigger: play video when in view, pause when out
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        video.play().catch(() => {});
        setIsPlaying(true);
      },
      onLeave: () => {
        video.pause();
        setIsPlaying(false);
      },
      onEnterBack: () => {
        video.play().catch(() => {});
        setIsPlaying(true);
      },
      onLeaveBack: () => {
        video.pause();
        setIsPlaying(false);
      },
    });

    // Parallax overlay fade
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'top top',
      scrub: true,
      onUpdate: (self) => {
        if (overlayRef.current) {
          const opacity = 1 - self.progress * 0.6;
          gsap.set(overlayRef.current, { opacity });
        }
      },
    });

    // Scale video slightly on scroll for depth
    gsap.fromTo(
      video,
      { scale: 1.15 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    return () => {
      trigger.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[80vh] md:h-screen overflow-hidden bg-obsidian"
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover scale-[1.15]"
        src="/videos/watch-ad.mp4"
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        aria-label="INTERNITY-WATCHES cinematic watch advertisement"
      />

      {/* Dark gradient overlays for text readability */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-obsidian/50 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 via-transparent to-obsidian/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {/* Top accent */}
        <div className="mb-8">
          <span className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/50 block mb-3">
            The Art of Time
          </span>
          <div className="w-12 h-px bg-gold/30 mx-auto" />
        </div>

        <TextReveal
          as="h2"
          type="chars"
          className="font-display text-3xl md:text-5xl lg:text-6xl text-white tracking-wider uppercase leading-[1.1] max-w-4xl"
          stagger={0.02}
          duration={0.8}
        >
          Precision in Motion
        </TextReveal>

        <div className="mt-6 md:mt-8 max-w-xl">
          <TextReveal
            as="p"
            type="words"
            className="font-body text-sm md:text-base text-silver/50 leading-relaxed"
            stagger={0.03}
            duration={0.6}
          >
            Every second tells the story of uncompromising craftsmanship — 312 components,
            hand-finished to perfection, working in silent harmony.
          </TextReveal>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-10 flex items-center gap-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold/40 animate-glow-pulse" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/30" />
        </div>
      </div>

      {/* Mute/Unmute toggle */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-20 w-10 h-10 rounded-full border border-silver/10 bg-obsidian/60 backdrop-blur-sm flex items-center justify-center text-silver/40 hover:text-gold hover:border-gold/30 transition-all duration-300 group"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 group-hover:scale-110 transition-transform" />
        ) : (
          <Volume2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Playing indicator */}
      {isPlaying && !isMuted && (
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-1.5">
          <div className="flex items-end gap-[2px] h-3">
            <div className="w-[2px] bg-gold/40 rounded-full animate-bounce h-1" style={{ animationDelay: '0ms', animationDuration: '600ms' }} />
            <div className="w-[2px] bg-gold/40 rounded-full animate-bounce h-2" style={{ animationDelay: '150ms', animationDuration: '600ms' }} />
            <div className="w-[2px] bg-gold/40 rounded-full animate-bounce h-3" style={{ animationDelay: '300ms', animationDuration: '600ms' }} />
            <div className="w-[2px] bg-gold/40 rounded-full animate-bounce h-1.5" style={{ animationDelay: '450ms', animationDuration: '600ms' }} />
          </div>
          <span className="font-body text-[9px] tracking-[0.2em] uppercase text-silver/20">
            Sound On
          </span>
        </div>
      )}

      {/* Vignette edges */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: 'inset 0 0 150px rgba(5,5,5,0.8)',
      }} />
    </section>
  );
}
