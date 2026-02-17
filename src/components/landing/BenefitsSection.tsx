'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, registerGSAPPlugins } from '@/lib/gsap';
import TextReveal from '@/components/animations/TextReveal';
import { Shield, Wrench, TrendingUp, Gem } from 'lucide-react';

registerGSAPPlugins();

const BENEFITS = [
  {
    icon: Shield,
    title: 'Lifetime Warranty',
    description: 'Every Internity watch is backed by a lifetime warranty. Free servicing, free repairs, forever. Because confidence in quality should be absolute.',
    stat: 'Unlimited',
    statLabel: 'Coverage',
  },
  {
    icon: Wrench,
    title: 'Complimentary Servicing',
    description: 'Annual tune-ups by our certified watchmakers keep your movement running at peak precision. We handle the logistics — you just enjoy the time.',
    stat: 'Every Year',
    statLabel: 'Free Service',
  },
  {
    icon: TrendingUp,
    title: 'Value That Grows',
    description: 'Internity timepieces have historically appreciated 8–12% annually. It\'s not just a watch — it\'s a wearable asset that outperforms most investments.',
    stat: '8–12%',
    statLabel: 'Annual Growth',
  },
  {
    icon: Gem,
    title: 'White-Glove Concierge',
    description: 'From personalized engraving to private viewings, our 24/7 concierge team ensures every moment of your ownership experience is extraordinary.',
    stat: '24/7',
    statLabel: 'Availability',
  },
];

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered card reveal
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.benefit-card');
        gsap.set(cards, { y: 50, opacity: 0 });
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Parallax image
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Subtle parallax float on scroll
        gsap.to(imageRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-obsidian relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gold/[0.02] rounded-full blur-[150px]" />

      <div className="container-luxury relative">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/50 block mb-4">
            Beyond the Watch
          </span>
          <TextReveal as="h2" className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-gold tracking-wider uppercase mb-6">
            The Ownership Experience
          </TextReveal>
          <p className="text-silver-dark/70 font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            When you choose Internity, you don&apos;t just buy a watch. You join a circle of collectors 
            who demand — and receive — the extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Benefits cards */}
          <div ref={cardsRef} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="benefit-card group relative bg-charcoal p-6 md:p-8 gold-border-glow hover-lift cursor-default overflow-hidden"
                >
                  {/* Shimmer overlay on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-gold/[0.04] to-transparent pointer-events-none" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center border border-gold/20 group-hover:border-gold/40 group-hover:bg-gold/[0.05] transition-all duration-500">
                      <Icon className="w-5 h-5 text-gold/60 group-hover:text-gold group-hover:scale-110 transition-all duration-500" />
                    </div>
                    <div>
                      <span className="font-display text-lg text-gold">{benefit.stat}</span>
                      <span className="block font-body text-[9px] tracking-[0.15em] uppercase text-silver/25">{benefit.statLabel}</span>
                    </div>
                  </div>
                  <h3 className="font-display text-base text-gold/90 tracking-wider mb-2 normal-case">
                    {benefit.title}
                  </h3>
                  <p className="text-silver-dark/60 font-body text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Side image with parallax */}
          <div ref={imageRef} className="lg:col-span-5 hidden lg:block">
            <div className="relative aspect-[3/4] bg-charcoal overflow-hidden gold-border-glow sticky top-32">
              <Image
                src="/watches/watch-8.png"
                alt="Internity Apex Skeleton — mechanical artistry"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 0vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-obsidian/20 pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/40">Featured</span>
                <p className="font-display text-xl text-gold tracking-wider mt-1">Apex Skeleton</p>
                <p className="font-body text-xs text-silver/30 mt-1">From $22,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
