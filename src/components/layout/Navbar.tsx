'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Watch, ArrowRight } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const itemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) return null;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'glass-morphism py-3' : 'bg-transparent py-6'
        )}
      >
        <nav className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" data-cursor="expand">
            <Watch className="w-7 h-7 text-gold transition-transform duration-500 group-hover:rotate-12" />
            <span className="font-display text-gold text-lg tracking-[0.3em] uppercase">
              Internity
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-body text-sm tracking-wider uppercase transition-colors duration-300',
                  pathname === link.href ? 'text-gold' : 'text-silver/70 hover:text-gold'
                )}
                data-cursor="expand"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <Link
              href="/products"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-gold text-obsidian text-xs tracking-[0.15em] uppercase font-body font-semibold hover:bg-gold-light transition-colors duration-300"
              data-cursor="expand"
            >
              Shop Now
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={openCart}
              className="relative p-2 text-silver/70 hover:text-gold transition-colors"
              data-cursor="expand"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-obsidian text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-silver/70 hover:text-gold transition-colors"
              data-cursor="expand"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-obsidian/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'font-display text-3xl tracking-[0.2em] uppercase transition-colors',
                      pathname === link.href ? 'text-gold' : 'text-silver/60 hover:text-gold'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
