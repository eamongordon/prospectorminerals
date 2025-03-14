import type { Metadata } from 'next'
import { workSansClassName } from '@/lib/utils';
import './globals.css';
import { Providers } from './providers';
import { Analytics } from "@vercel/analytics/react";
import { baseUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: {
    template: '%s | Prospector Minerals',
    default: 'Prospector Minerals'
  },
  description: 'A comprehensive mineralogy resource.',
  metadataBase: new URL(baseUrl),
  openGraph: {
    images: ['/Fluorite-164_horiz-Optimized.jpg'],
    siteName: 'Prospector Minerals',
    url: '/'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${workSansClassName} bg-white text-black dark:bg-black dark:text-white`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
