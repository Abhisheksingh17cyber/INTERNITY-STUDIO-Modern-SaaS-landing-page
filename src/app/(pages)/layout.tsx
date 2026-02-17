import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | INTERNITY-WATCHES',
};

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
