'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { gsap, ScrollTrigger, registerGSAPPlugins } from '@/lib/gsap';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';

registerGSAPPlugins();

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Alexander Rothschild',
    role: 'Art Collector — London',
    content: 'The craftsmanship is unparalleled. My Internity timepiece has become the centerpiece of my collection. I\'ve owned Patek and AP, but nothing compares to the soul of an Internity movement.',
    rating: 5,
    watch: 'Sovereign Chronograph',
  },
  {
    id: '2',
    name: 'Victoria Chen',
    role: 'CEO, Meridian Capital — Singapore',
    content: 'Every detail speaks of dedication to perfection. This is not just a watch — it is a statement of legacy. My board noticed it before anything else at our last meeting.',
    rating: 5,
    watch: 'Celestial Dress',
  },
  {
    id: '3',
    name: 'James Harrington',
    role: 'Watch Enthusiast — New York',
    content: 'In thirty years of collecting, few pieces have moved me like an Internity. The movement is poetry in motion. The 72-hour power reserve is a game-changer.',
    rating: 5,
    watch: 'Apex Skeleton',
  },
  {
    id: '4',
    name: 'Sophia Al-Rashid',
    role: 'Fashion Director — Dubai',
    content: 'I gifted my father the Heritage Classic for his 60th birthday. He called it the most meaningful gift he\'s ever received. That tells you everything about this brand.',
    rating: 5,
    watch: 'Heritage Classic',
  },
  {
    id: '5',
    name: 'Marcus Ellington',
    role: 'Private Equity Partner — Geneva',
    content: 'I bought my Eternal Diver for a sailing trip and haven\'t taken it off since. 14 months running, not a second lost. The titanium is virtually scratchproof.',
    rating: 5,
    watch: 'Eternal Diver',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Counter animation for the stats
      gsap.fromTo(
        '.testimonial-stat',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const testimonial = TESTIMONIALS[current];
  const initials = testimonial.name.split(' ').map((n) => n[0]).join('');

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-charcoal relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/[0.02] to-transparent" />

      <div className="container-luxury relative">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/50 block mb-4">
            Collector Stories
          </span>
          <TextReveal as="h2" className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-gold tracking-wider uppercase">
            What Our Collectors Say
          </TextReveal>
        </div>

        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            {/* Quote icon */}
            <div className="w-14 h-14 mx-auto mb-8 flex items-center justify-center border border-gold/10">
              <Quote className="w-7 h-7 text-gold/30" />
            </div>

            {/* Testimonial content */}
            <div className="relative min-h-[240px] md:min-h-[200px] flex items-center justify-center">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.id}
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                    i === current
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="w-4 h-4 text-gold fill-gold" />
                    ))}
                  </div>

                  <p className="font-display text-lg md:text-2xl lg:text-3xl text-silver/80 leading-relaxed mb-8 italic text-center px-4">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    {/* Avatar initials */}
                    <div className="w-12 h-12 rounded-full bg-charcoal-dark border border-gold/20 flex items-center justify-center">
                      <span className="font-display text-sm text-gold/60">{t.name.split(' ').map((n) => n[0]).join('')}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-display text-gold text-sm tracking-[0.15em] uppercase">
                        {t.name}
                      </p>
                      <p className="font-body text-silver/30 text-xs mt-0.5">
                        {t.role}
                      </p>
                      <p className="font-body text-gold/30 text-[10px] mt-0.5 tracking-wider">
                        Owns: {t.watch}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={prev}
                className="w-10 h-10 border border-gold/15 flex items-center justify-center text-gold/40 hover:border-gold/40 hover:text-gold transition-colors duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? 'bg-gold w-6' : 'bg-silver/15 w-1.5 hover:bg-silver/30'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 border border-gold/15 flex items-center justify-center text-gold/40 hover:border-gold/40 hover:text-gold transition-colors duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Trust metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-20 pt-12 border-t border-gold/5">
          <div className="testimonial-stat text-center">
            <span className="font-display text-2xl md:text-3xl text-gold">4.9/5</span>
            <span className="block font-body text-[10px] tracking-[0.2em] uppercase text-silver/25 mt-1">Average Rating</span>
          </div>
          <div className="testimonial-stat text-center">
            <span className="font-display text-2xl md:text-3xl text-gold">12,000+</span>
            <span className="block font-body text-[10px] tracking-[0.2em] uppercase text-silver/25 mt-1">Happy Collectors</span>
          </div>
          <div className="testimonial-stat text-center">
            <span className="font-display text-2xl md:text-3xl text-gold">98%</span>
            <span className="block font-body text-[10px] tracking-[0.2em] uppercase text-silver/25 mt-1">Would Recommend</span>
          </div>
          <div className="testimonial-stat text-center">
            <span className="font-display text-2xl md:text-3xl text-gold">45+</span>
            <span className="block font-body text-[10px] tracking-[0.2em] uppercase text-silver/25 mt-1">Countries Served</span>
          </div>
        </div>
      </div>
    </section>
  );
}
