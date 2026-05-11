import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'NAOMI FASHION HUB | SEE IT THEN BE IT',
  description: 'NAOMI FASHION HUB - Premium avatar customization studio. Located at MPAMA EGBU OWERRI NORTH LGA. Contact: 08163002468 | ogueriamarachi0@gmail.com',
  keywords: ['avatar','fashion','bitmoji','3d avatar','ready player me','naomi fashion hub'],
  authors: [{ name: 'NAOMI FASHION HUB' }],
  openGraph: { title: 'NAOMI FASHION HUB', description: 'SEE IT THEN BE IT', type: 'website', locale: 'en_NG' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/></head>
      <body className="bg-naomi-bg text-white antialiased overflow-hidden">{children}</body>
    </html>
  );
}
