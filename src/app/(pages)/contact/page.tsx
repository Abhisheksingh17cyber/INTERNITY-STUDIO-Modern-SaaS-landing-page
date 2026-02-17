'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import GoogleMap from '@/components/shared/GoogleMap';

const contactInfo = [
  { icon: MapPin, label: 'Address', value: '123 Luxury Avenue\nBeverly Hills, CA 90210' },
  { icon: Phone, label: 'Phone', value: '+1 (310) 555-0199' },
  { icon: Mail, label: 'Email', value: 'concierge@internity-watches.com' },
  { icon: Clock, label: 'Hours', value: 'Mon–Sat: 10AM – 7PM\nSun: By Appointment' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) =>
    setFormData((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    'w-full h-11 bg-charcoal border border-silver/10 rounded-sm px-4 font-body text-sm text-silver placeholder:text-silver/20 focus:outline-none focus:border-gold/50 transition-colors';

  return (
    <div className="bg-obsidian">
      {/* Header */}
      <section className="section-padding text-center">
        <div className="container-luxury">
          <ScrollReveal>
            <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/50 block mb-4">Get in Touch</span>
          </ScrollReveal>
          <TextReveal as="h1" className="font-display text-4xl md:text-5xl lg:text-6xl text-gold uppercase tracking-wider mb-6">
            Contact Us
          </TextReveal>
          <ScrollReveal delay={0.3}>
            <p className="font-body text-silver/40 max-w-lg mx-auto">
              Our concierge team is here to assist you with any inquiry, from product information to private viewings.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-padding pt-0">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <div>
              <div className="space-y-8 mb-12">
                {contactInfo.map(({ icon: Icon, label, value }, i) => (
                  <ScrollReveal key={label} delay={i * 0.1}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gold/10 rounded-sm flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-gold/60" />
                      </div>
                      <div>
                        <span className="font-body text-xs tracking-[0.2em] uppercase text-gold/50 block mb-1">{label}</span>
                        <p className="font-body text-sm text-silver/60 whitespace-pre-line">{value}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Map */}
              <ScrollReveal delay={0.4}>
                <div className="h-72 rounded-sm overflow-hidden border border-silver/5">
                  <GoogleMap />
                </div>
              </ScrollReveal>
            </div>

            {/* Form */}
            <ScrollReveal delay={0.2}>
              {submitted ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-6">
                      <Send className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-display text-2xl text-gold uppercase tracking-wider mb-3">Message Sent</h3>
                    <p className="font-body text-silver/40">Our team will respond within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="font-body text-xs tracking-[0.2em] uppercase text-silver/40 block mb-2">Name</label>
                    <input type="text" value={formData.name} onChange={(e) => update('name', e.target.value)} className={inputClass} placeholder="Your name" required />
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-[0.2em] uppercase text-silver/40 block mb-2">Email</label>
                    <input type="email" value={formData.email} onChange={(e) => update('email', e.target.value)} className={inputClass} placeholder="your@email.com" required />
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-[0.2em] uppercase text-silver/40 block mb-2">Subject</label>
                    <select value={formData.subject} onChange={(e) => update('subject', e.target.value)} className={inputClass} required>
                      <option value="" className="bg-charcoal">Select a subject</option>
                      <option value="product" className="bg-charcoal">Product Inquiry</option>
                      <option value="service" className="bg-charcoal">Service & Repair</option>
                      <option value="appointment" className="bg-charcoal">Book an Appointment</option>
                      <option value="other" className="bg-charcoal">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-[0.2em] uppercase text-silver/40 block mb-2">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => update('message', e.target.value)}
                      rows={6}
                      className={`${inputClass} h-auto py-3 resize-none`}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-12 bg-gold text-obsidian font-body text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-gold/90 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
