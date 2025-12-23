import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Manrope } from 'next/font/google';
import clsx from 'clsx';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FloatingActions from '../components/layout/FloatingActions';
import { baseMetadata, baseViewport } from '@lib/seo';
import OrganizationSchema from '../components/schema/OrganizationSchema';
import SnowOverlay from '../components/common/SnowOverlay';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = baseViewport;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className={clsx(manrope.className, 'bg-surface text-ink')}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingActions />
        <SnowOverlay />
        <OrganizationSchema />
      </body>
    </html>
  );
}
