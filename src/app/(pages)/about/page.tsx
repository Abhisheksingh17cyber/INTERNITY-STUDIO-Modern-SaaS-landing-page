'use client';

import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import CountUp from '@/components/animations/CountUp';
import ParallaxImage from '@/components/animations/ParallaxImage';

const stats = [
  { value: 1987, label: 'Founded' },
  { value: 150, suffix: '+', label: 'Master Artisans' },
  { value: 45, label: 'Countries' },
  { value: 100, suffix: '%', label: 'Swiss Made' },
];

const values = [
  {
    title: 'Heritage',
    description:
      'For over three decades, Internity has been at the forefront of horological innovation. Our legacy is built on an unwavering commitment to excellence passed down through generations of master watchmakers.',
  },
  {
    title: 'Craftsmanship',
    description:
      'Every Internity timepiece is assembled by hand in our atelier, where traditional watchmaking techniques meet cutting-edge technology. Each watch undergoes over 500 hours of meticulous development.',
  },
  {
    title: 'Innovation',
    description:
      'We push the boundaries of what is possible in watchmaking. Our in-house movements are developed with proprietary materials and mechanisms that set new standards for precision and durability.',
  },
  {
    title: 'Sustainability',
    description:
      'We are committed to responsible luxury. From ethically sourced materials to carbon-neutral manufacturing, every Internity watch is created with respect for our planet.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-obsidian">
      {/* Hero */}
      <section className="section-padding min-h-[60vh] flex items-center justify-center relative">
        <div className="container-luxury text-center">
          <ScrollReveal>
            <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/50 block mb-4">Our Story</span>
          </ScrollReveal>
          <TextReveal as="h1" className="font-display text-4xl md:text-5xl lg:text-7xl text-gold uppercase tracking-wider mb-6">
            The Art of Time
          </TextReveal>
          <ScrollReveal delay={0.3}>
            <p className="font-body text-silver/40 max-w-2xl mx-auto text-lg leading-relaxed">
              Since 1987, Internity has crafted timepieces that transcend the ordinary. 
              Each watch is a harmonious blend of Swiss precision, artistic vision, and enduring legacy.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-silver/5">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="font-display text-3xl md:text-4xl text-gold mb-2">
                    <CountUp end={stat.value} />
                    {stat.suffix}
                  </div>
                  <span className="font-body text-xs tracking-[0.3em] uppercase text-silver/30">{stat.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Divider */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-obsidian to-charcoal-dark" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 rounded-full border border-gold/10 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border border-gold/5 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border border-gold/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-gold/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/50 block mb-4">Our Philosophy</span>
            </ScrollReveal>
            <TextReveal as="h2" className="font-display text-3xl md:text-4xl text-gold uppercase tracking-wider">
              What We Stand For
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.15}>
                <div className="p-8 border border-silver/5 rounded-sm hover:border-gold/10 transition-colors duration-500">
                  <h3 className="font-display text-xl text-gold uppercase tracking-wider mb-4">{value.title}</h3>
                  <p className="font-body text-silver/40 leading-relaxed">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-charcoal-dark text-center">
        <div className="container-luxury">
          <TextReveal as="h2" className="font-display text-3xl md:text-4xl text-gold uppercase tracking-wider mb-6">
            Visit Our Atelier
          </TextReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-body text-silver/40 max-w-lg mx-auto mb-8">
              Experience the art of Internity watchmaking firsthand. 
              Schedule a private consultation at our flagship atelier.
            </p>
            <a
              href="/contact"
              className="inline-flex h-12 px-10 bg-gold text-obsidian font-body text-sm font-semibold tracking-widest uppercase items-center hover:bg-gold/90 transition-colors"
            >
              Book a Visit
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
