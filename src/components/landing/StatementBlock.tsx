'use client';

import TextReveal from '@/components/animations/TextReveal';

export default function StatementBlock() {
  return (
    <section className="section-padding bg-charcoal relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212,175,55,0.5) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />
      
      <div className="container-luxury relative">
        <div className="max-w-5xl mx-auto text-center py-12 md:py-20">
          <TextReveal
            as="h2"
            type="chars"
            className="text-statement font-display font-bold text-gold tracking-wider leading-[1.1]"
            stagger={0.015}
            duration={0.6}
          >
            Time is the Ultimate Luxury
          </TextReveal>
          
          <div className="line-gold max-w-32 mx-auto mt-12 mb-8" />
          
          <TextReveal
            as="p"
            type="words"
            className="text-silver-dark/70 font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            delay={0.3}
          >
            In a world that moves ever faster, an Internity timepiece is your invitation to pause, appreciate, and savor the extraordinary craftsmanship of every passing second.
          </TextReveal>
        </div>
      </div>
    </section>
  );
}
