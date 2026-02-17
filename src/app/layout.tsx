import type { Metadata, Viewport } from 'next';
import { playfair, inter } from '@/lib/fonts';
import SmoothScroll from '@/components/shared/SmoothScroll';
import CustomCursor from '@/components/shared/CustomCursor';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/shop/CartDrawer';
import QuickView from '@/components/shop/QuickView';
import PageTransition from '@/components/layout/PageTransition';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'INTERNITY-WATCHES | Luxury Timepieces',
    template: '%s | INTERNITY-WATCHES',
  },
  description:
    'Discover exquisite luxury timepieces crafted with Swiss precision. INTERNITY-WATCHES — where heritage meets innovation.',
  keywords: ['luxury watches', 'Swiss watches', 'timepieces', 'Internity', 'horology'],
  authors: [{ name: 'INTERNITY-WATCHES' }],
  openGraph: {
    title: 'INTERNITY-WATCHES | Luxury Timepieces',
    description: 'Discover exquisite luxury timepieces crafted with Swiss precision.',
    type: 'website',
    locale: 'en_US',
    siteName: 'INTERNITY-WATCHES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INTERNITY-WATCHES | Luxury Timepieces',
    description: 'Discover exquisite luxury timepieces crafted with Swiss precision.',
  },
};

export const viewport: Viewport = {
  themeColor: '#0C0C0E',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-obsidian text-silver antialiased">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <PageTransition>
            <main className="min-h-screen">{children}</main>
          </PageTransition>
          <Footer />
          <CartDrawer />
          <QuickView />
        </SmoothScroll>
      </body>
    </html>
  );
}
