'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, registerGSAPPlugins } from '@/lib/gsap';
import TextReveal from '@/components/animations/TextReveal';
import { Clock, Award, Globe, Gem, Star, Landmark } from 'lucide-react';

registerGSAPPlugins();

const MILESTONES = [
  {
    year: '1947',
    title: 'The Beginning',
    description: 'Master watchmaker Henri Duval establishes Internity in a small atelier in Geneva, crafting his first movement entirely by hand.',
    icon: Clock,
  },
  {
    year: '1963',
    title: 'COSC Certification',
    description: 'Internity becomes one of the youngest maisons to achieve COSC certification for chronometric precision on every movement.',
    icon: Award,
  },
  {
    year: '1982',
    title: 'Global Recognition',
    description: 'The Sovereign collection launches, earning the Grand Prix d\'Horlogerie and establishing Internity as a globally recognized name.',
    icon: Globe,
  },
  {
    year: '1999',
    title: 'Material Innovation',
    description: 'Pioneering the use of 904L steel and proprietary alloys, Internity sets new standards for case durability and finishing.',
    icon: Gem,
  },
  {
    year: '2015',
    title: '10,000th Timepiece',
    description: 'A milestone of meticulous craft — each of the 10,000 watches assembled by a single master watchmaker from start to finish.',
    icon: Star,
  },
  {
    year: '2024',
    title: 'The Modern Legacy',
    description: 'Internity opens its digital atelier, bringing 77 years of Swiss heritage to a new generation of discerning collectors worldwide.',
    icon: Landmark,
  },
];

export default function HeritageTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the vertical gold line drawing down
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );

      // Stagger each milestone card
      const items = timelineRef.current!.querySelectorAll('.timeline-item');
      items.forEach((item, i) => {
        const isLeft = i % 2 === 0;
        gsap.set(item, { x: isLeft ? -50 : 50, opacity: 0 });
        gsap.to(item, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Animate year nodes
      const nodes = timelineRef.current!.querySelectorAll('.timeline-node');
      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-charcoal relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/[0.02] rounded-full blur-[200px]" />

      <div className="container-luxury relative">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/50 block mb-4">
            Our Journey
          </span>
          <TextReveal as="h2" className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-gold tracking-wider uppercase mb-6">
            A Heritage of Excellence
          </TextReveal>
          <p className="text-silver-dark/70 font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            From a single atelier in Geneva to the wrists of collectors across 45+ countries — 
            every chapter of our story is defined by an obsession with perfection.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Center vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px]">
            <div ref={lineRef} className="w-full h-full bg-gradient-to-b from-gold/40 via-gold/20 to-gold/40 origin-top" />
          </div>

          {/* Milestones */}
          <div className="space-y-12 md:space-y-16">
            {MILESTONES.map((milestone, i) => {
              const Icon = milestone.icon;
              const isLeft = i % 2 === 0;

              return (
                <div key={milestone.year} className="relative">
                  {/* Center node */}
                  <div className="timeline-node absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 bg-obsidian border border-gold/30 flex items-center justify-center z-10">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gold rounded-full" />
                  </div>

                  {/* Content card */}
                  <div
                    className={`timeline-item ml-14 md:ml-0 md:w-[calc(50%-40px)] ${
                      isLeft ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8 md:text-left'
                    }`}
                  >
                    <div className="group bg-obsidian border border-gold/10 p-6 md:p-8 hover:border-gold/25 transition-all duration-500 gold-border-glow">
                      <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-10 h-10 flex items-center justify-center border border-gold/15 group-hover:border-gold/30 transition-colors duration-500">
                          <Icon className="w-5 h-5 text-gold/50 group-hover:text-gold transition-colors duration-500" />
                        </div>
                        <span className="font-display text-2xl md:text-3xl text-gold/80">{milestone.year}</span>
                      </div>
                      <h3 className="font-display text-base md:text-lg text-gold tracking-wider mb-3 normal-case">
                        {milestone.title}
                      </h3>
                      <p className="text-silver-dark/60 font-body text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
