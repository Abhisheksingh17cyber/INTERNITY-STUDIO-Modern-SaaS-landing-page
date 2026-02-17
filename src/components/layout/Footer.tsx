'use client';

import Link from 'next/link';
import { Watch, Instagram, Twitter, Facebook } from 'lucide-react';
import NewsletterForm from '@/components/shared/NewsletterForm';
import ScrollReveal from '@/components/animations/ScrollReveal';

const footerLinks = {
  shop: [
    { label: 'All Watches', href: '/products' },
    { label: 'Dive Collection', href: '/collections?c=dive' },
    { label: 'Dress Collection', href: '/collections?c=dress' },
    { label: 'Chronograph', href: '/collections?c=chronograph' },
    { label: 'Limited Edition', href: '/collections?c=limited-edition' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Heritage', href: '/about#heritage' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/contact' },
  ],
  support: [
    { label: 'Shipping & Returns', href: '/contact' },
    { label: 'Warranty', href: '/contact' },
    { label: 'Care Guide', href: '/contact' },
    { label: 'FAQ', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-charcoal-light">
      <ScrollReveal>
        <div className="container-luxury py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <Watch className="w-7 h-7 text-gold" />
                <span className="font-display text-gold text-lg tracking-[0.3em] uppercase">
                  Internity
                </span>
              </Link>
              <p className="text-silver/50 text-sm leading-relaxed mb-8 max-w-sm">
                Crafting exceptional timepieces that transcend generations. Each Internity watch is a 
                testament to the art of precision, heritage, and timeless elegance.
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 flex items-center justify-center border border-charcoal-light text-silver/40 
                               hover:text-gold hover:border-gold/30 transition-all duration-300"
                    data-cursor="expand"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="font-display text-gold text-xs tracking-[0.3em] uppercase mb-6">
                Shop
              </h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-silver/40 text-sm hover:text-gold transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-display text-gold text-xs tracking-[0.3em] uppercase mb-6">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-silver/40 text-sm hover:text-gold transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-2 lg:col-span-1">
              <h4 className="font-display text-gold text-xs tracking-[0.3em] uppercase mb-6">
                Newsletter
              </h4>
              <p className="text-silver/40 text-sm mb-4">
                Be the first to know about new collections and exclusive offers.
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="line-gold mt-16 mb-8" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-silver/20 text-xs tracking-wider">
              © {new Date().getFullYear()} INTERNITY WATCHES. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/contact" className="text-silver/20 text-xs hover:text-silver/50 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-silver/20 text-xs hover:text-silver/50 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
