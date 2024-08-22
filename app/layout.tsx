import { baseUrl } from '@/lib/utils';
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const workSans = Work_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prospector Minerals',
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
    <html lang="en">
      <body className={`${workSans.className} bg-gradient-to-b from-[rgb(214,219,220)] to-white text-black dark:bg-none dark:bg-black dark:text-white`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
