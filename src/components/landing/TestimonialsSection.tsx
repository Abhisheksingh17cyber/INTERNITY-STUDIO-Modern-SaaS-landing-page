'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, registerGSAPPlugins } from '@/lib/gsap';
import { Star, Quote } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';

registerGSAPPlugins();

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Alexander Rothschild',
    role: 'Art Collector',
    location: 'London',
    content: 'I\'ve owned Patek and AP, but nothing compares to the soul of an Internity movement. The craftsmanship is unparalleled.',
    rating: 5,
    watch: 'Sovereign Chronograph',
    image: '/watches/watch-1.png',
    featured: true,
  },
  {
    id: '2',
    name: 'Victoria Chen',
    role: 'CEO, Meridian Capital',
    location: 'Singapore',
    content: 'This is not just a watch — it is a statement of legacy. My board noticed it before anything else.',
    rating: 5,
    watch: 'Celestial Dress',
    image: '/watches/watch-6.png',
    featured: false,
  },
  {
    id: '3',
    name: 'James Harrington',
    role: 'Watch Enthusiast',
    location: 'New York',
    content: 'In thirty years of collecting, few pieces have moved me like an Internity. The movement is poetry in motion.',
    rating: 5,
    watch: 'Apex Skeleton',
    image: '/watches/watch-8.png',
    featured: false,
  },
  {
    id: '4',
    name: 'Sophia Al-Rashid',
    role: 'Fashion Director',
    location: 'Dubai',
    content: 'I gifted my father the Heritage Classic for his 60th. He called it the most meaningful gift he\'s ever received.',
    rating: 5,
    watch: 'Heritage Classic',
    image: '/watches/watch-10.png',
    featured: false,
  },
  {
    id: '5',
    name: 'Marcus Ellington',
    role: 'Private Equity Partner',
    location: 'Geneva',
    content: '14 months running, not a second lost. The titanium is virtually scratchproof. I haven\'t taken it off since day one.',
    rating: 5,
    watch: 'Eternal Diver',
    image: '/watches/watch-4.png',
    featured: false,
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered card reveal
      const cards = sectionRef.current!.querySelectorAll('.testimonial-card');
      gsap.set(cards, { y: 60, opacity: 0 });
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Stats counter
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
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featured = TESTIMONIALS.find((t) => t.featured)!;
  const others = TESTIMONIALS.filter((t) => !t.featured);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-charcoal relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/[0.02] to-transparent" />

      <div className="container-luxury relative">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/50 block mb-4">
            Collector Stories
          </span>
          <TextReveal as="h2" className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-gold tracking-wider uppercase mb-4">
            Trusted by Collectors Worldwide
          </TextReveal>
          <p className="text-silver-dark/60 font-body text-base md:text-lg max-w-xl mx-auto">
            Real stories from the people who wear Internity every day.
          </p>
        </div>

        {/* Featured testimonial — large card */}
        <div className="testimonial-card mb-8 md:mb-10">
          <div className="group relative bg-obsidian border border-gold/10 hover:border-gold/25 transition-all duration-500 gold-border-glow overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Watch image */}
              <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                <Image
                  src={featured.image}
                  alt={`${featured.name}'s ${featured.watch}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-obsidian/80 lg:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent lg:hidden" />
              </div>

              {/* Content */}
              <div className="lg:col-span-7 p-8 md:p-10 lg:p-14 flex flex-col justify-center">
                <Quote className="w-10 h-10 text-gold/20 mb-6" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: featured.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="font-display text-xl md:text-2xl lg:text-3xl text-silver/90 leading-relaxed mb-8 italic">
                  &ldquo;{featured.content}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-charcoal border-2 border-gold/20 flex items-center justify-center">
                    <span className="font-display text-base text-gold/70">
                      {featured.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-gold text-sm tracking-[0.15em] uppercase">
                      {featured.name}
                    </p>
                    <p className="font-body text-silver-dark/50 text-xs mt-0.5">
                      {featured.role} — {featured.location}
                    </p>
                    <p className="font-body text-gold/30 text-[10px] mt-0.5 tracking-wider">
                      Owns: {featured.watch}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial grid — 4 smaller cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {others.map((t) => (
            <div
              key={t.id}
              className="testimonial-card group relative bg-obsidian border border-gold/8 hover:border-gold/25 p-6 md:p-8 transition-all duration-500 gold-border-glow overflow-hidden"
            >
              {/* Shimmer overlay on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-gold/[0.03] to-transparent pointer-events-none" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-gold fill-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-silver/70 font-body text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Watch thumbnail + Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold/15 flex-shrink-0">
                  <Image
                    src={t.image}
                    alt={t.watch}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-gold text-xs tracking-[0.1em] uppercase truncate">
                    {t.name}
                  </p>
                  <p className="font-body text-silver-dark/40 text-[10px] mt-0.5 truncate">
                    {t.role} — {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

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
