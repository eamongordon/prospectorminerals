import type { Metadata } from 'next'
import { workSansClassName } from '@/lib/utils';
import './globals.css';
import { Providers } from './providers';
import { Analytics } from "@vercel/analytics/react";
import Script from 'next/script'
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
        <Script
          src="https://cdn.cookieless.tech/tracking.js"
          data-site-id="8d1abeb0-46c9-4145-bcd5-e1b1e7efbee8"
          strategy="afterInteractive"
        />
        <Analytics />
      </body>
    </html>
  )
}
