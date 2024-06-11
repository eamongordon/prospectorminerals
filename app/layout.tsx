import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import './globals.css';
import { Providers } from './providers';
import { Analytics } from "@vercel/analytics/react";
import { headers } from 'next/headers'
import Header from '@/components/header';
import Footer from '@/components/footer';

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
  const headersList = headers();
  const useragent = headersList.get('User-Agent');
  return (
    <html lang="en">
      {/*Stop Input Autozoom on iPhone*/}
      {useragent?.includes('iPhone') ?
        (<head><meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1" /></head>) : (null)
      }
      <body className={`${inter.className} bg-gradient-to-b from-[rgb(214,219,220)] to-white text-black dark:bg-gradient-to-b dark:from-black dark:to-black dark:text-white`}>
      <Header/>
        <Providers>{children}</Providers>
        <Analytics />
        <Footer/>
      </body>
    </html>
  )
}
