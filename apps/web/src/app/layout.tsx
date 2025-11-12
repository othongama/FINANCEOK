import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Finance Blog - Professional Financial Insights',
  description: 'Your trusted source for financial news, analysis, and insights',
  keywords: ['finance', 'blog', 'investment', 'economics', 'money'],
  authors: [{ name: 'Finance Blog Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://financeblog.com',
    title: 'Finance Blog',
    description: 'Professional Financial Insights',
    siteName: 'Finance Blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finance Blog',
    description: 'Professional Financial Insights',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
