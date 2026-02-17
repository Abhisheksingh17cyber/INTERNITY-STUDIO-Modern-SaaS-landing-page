'use client';

import { Watch, Shield, Gem, Clock, Award, Sparkles, LucideIcon } from 'lucide-react';
import { FEATURES } from '@/lib/constants';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';

const iconMap: Record<string, LucideIcon> = {
  Watch, Shield, Gem, Clock, Award, Sparkles,
};

export default function FeaturesGrid() {
  return (
    <section className="section-padding bg-obsidian relative">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/50 block mb-4">
            Why Choose Internity
          </span>
          <TextReveal as="h2" className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gold tracking-wider uppercase">
            Exceptional in Every Detail
          </TextReveal>
        </div>

        {/* Features Grid */}
        <ScrollReveal stagger={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => {
              const Icon = iconMap[feature.icon] || Watch;
              return (
                <div
                  key={feature.title}
                  className="group bg-charcoal p-8 md:p-10 gold-border-glow hover-lift cursor-default"
                  data-cursor="expand"
                >
                  <div className="w-14 h-14 flex items-center justify-center mb-6 border border-gold/20 group-hover:border-gold/40 transition-colors duration-500">
                    <Icon className="w-7 h-7 text-gold/70 group-hover:text-gold transition-colors duration-500" />
                  </div>
                  <h3 className="font-display text-lg text-gold tracking-wider mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-silver/40 font-body text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
