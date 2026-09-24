import type { Metadata } from 'next';
import QueryProvider from '@/components/admin/QueryProvider';

export const metadata: Metadata = {
  title: 'SOGA Admin',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
