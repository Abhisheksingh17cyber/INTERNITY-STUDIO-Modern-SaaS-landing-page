'use client';

import { useState, useEffect, useCallback } from 'react';
import { MOCK_TESTIMONIALS } from '@/lib/constants';
import { Quote } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % MOCK_TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  return (
    <section
      className="section-padding bg-charcoal relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/[0.02] to-transparent" />

      <div className="container-luxury relative">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            {/* Quote icon */}
            <div className="w-16 h-16 mx-auto mb-10 flex items-center justify-center">
              <Quote className="w-10 h-10 text-gold/20" />
            </div>

            {/* Testimonial content */}
            <div className="relative min-h-[200px] flex items-center justify-center">
              {MOCK_TESTIMONIALS.map((testimonial, i) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                    i === current
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <p className="font-display text-xl md:text-2xl lg:text-3xl text-silver/80 leading-relaxed mb-8 italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div>
                    <p className="font-display text-gold text-sm tracking-[0.2em] uppercase">
                      {testimonial.name}
                    </p>
                    <p className="font-body text-silver/30 text-xs mt-1">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-3 mt-12">
              {MOCK_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-gold w-6' : 'bg-silver/20 hover:bg-silver/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
