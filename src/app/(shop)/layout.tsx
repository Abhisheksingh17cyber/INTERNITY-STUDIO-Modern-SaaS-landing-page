import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop | INTERNITY-WATCHES',
  description: 'Explore our curated collection of luxury timepieces.',
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
