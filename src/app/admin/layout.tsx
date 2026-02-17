import { Metadata } from 'next';
import AdminSidebar from '@/components/layout/AdminSidebar';

export const metadata: Metadata = {
  title: 'Admin | INTERNITY-WATCHES',
  description: 'INTERNITY-WATCHES Admin Dashboard',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-obsidian">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">{children}</main>
    </div>
  );
}
