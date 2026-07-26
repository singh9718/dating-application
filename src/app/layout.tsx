import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: { default: 'DateFlow', template: '%s | DateFlow' },
  description: 'Plan personalised dates with your partner — no guesswork, just love.',
  openGraph: {
    title: 'DateFlow',
    description: 'Plan personalised dates with your partner — no guesswork, just love.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans antialiased">{children}</body>
    </html>
  );
}
