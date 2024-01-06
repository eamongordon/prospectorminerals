import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import './globals.css';
import { Providers } from './providers';
import { Analytics } from "@vercel/analytics/react";

const inter = Work_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prospector Minerals',
  description: 'A comprehensive mineralogy resource.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Analytics/>
      </body>
    </html>
  )
}
