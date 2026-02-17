'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, registerGSAPPlugins } from '@/lib/gsap';
import TextReveal from '@/components/animations/TextReveal';
import { AlertTriangle, CheckCircle, ArrowDown } from 'lucide-react';

registerGSAPPlugins();

const PROBLEMS = [
  {
    title: 'Mass-Produced Mediocrity',
    description: 'Most luxury watches are assembled on production lines with minimal human touch — identical pieces rolling off conveyor belts.',
  },
  {
    title: 'Depreciating Value',
    description: 'Fashion watches lose 60–80% of their value the moment you walk out the store. They\'re disposable, not heirloom-worthy.',
  },
  {
    title: 'No Story to Tell',
    description: 'A generic timepiece says nothing about who you are. It\'s a commodity, not a conversation piece.',
  },
];

const SOLUTIONS = [
  {
    title: 'One Watchmaker, One Watch',
    description: 'Every Internity timepiece is assembled start-to-finish by a single master craftsman. 312 components, 40 hours of dedicated handwork.',
  },
  {
    title: 'Investment-Grade Craft',
    description: 'Our watches appreciate — not depreciate. COSC-certified movements, 904L steel, sapphire crystal. Built to outlast generations.',
  },
  {
    title: 'Your Legacy, Defined',
    description: 'Each watch carries a unique serial and provenance card. A piece that tells your story and becomes part of your family heritage.',
  },
];

export default function ProblemSolution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const problemsRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Problems animate in from left
      if (problemsRef.current) {
        const cards = problemsRef.current.querySelectorAll('.problem-card');
        gsap.set(cards, { x: -60, opacity: 0 });
        gsap.to(cards, {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: problemsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Arrow bounces
      if (arrowRef.current) {
        gsap.fromTo(
          arrowRef.current,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: arrowRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Solutions animate in from right
      if (solutionsRef.current) {
        const cards = solutionsRef.current.querySelectorAll('.solution-card');
        gsap.set(cards, { x: 60, opacity: 0 });
        gsap.to(cards, {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: solutionsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-charcoal-dark relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-red-900/[0.03] to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/[0.03] to-transparent" />

      <div className="container-luxury relative">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/50 block mb-4">
            The Internity Difference
          </span>
          <TextReveal as="h2" className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-gold tracking-wider uppercase">
            Not All Timepieces Are Equal
          </TextReveal>
        </div>

        {/* Problems */}
        <div ref={problemsRef} className="mb-10 md:mb-12">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-red-400/60 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            The Problem With Most Watches
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {PROBLEMS.map((problem) => (
              <div
                key={problem.title}
                className="problem-card bg-obsidian/50 border border-red-900/10 p-6 md:p-8 hover:border-red-900/20 transition-colors duration-300"
              >
                <h3 className="font-display text-base md:text-lg text-silver/70 tracking-wider mb-3 normal-case">
                  {problem.title}
                </h3>
                <p className="text-silver/30 font-body text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Transition arrow */}
        <div ref={arrowRef} className="flex justify-center my-8 md:my-10">
          <div className="flex flex-col items-center gap-2">
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/30">There&apos;s a better way</span>
            <ArrowDown className="w-5 h-5 text-gold/40 animate-bounce" />
          </div>
        </div>

        {/* Solutions */}
        <div ref={solutionsRef}>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold/60 mb-6 flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5" />
            The Internity Solution
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {SOLUTIONS.map((solution) => (
              <div
                key={solution.title}
                className="solution-card bg-charcoal border border-gold/10 p-6 md:p-8 hover:border-gold/30 gold-border-glow transition-colors duration-300"
              >
                <h3 className="font-display text-base md:text-lg text-gold tracking-wider mb-3 normal-case">
                  {solution.title}
                </h3>
                <p className="text-silver/40 font-body text-sm leading-relaxed">
                  {solution.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
