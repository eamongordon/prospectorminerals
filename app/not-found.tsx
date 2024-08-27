import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <Header />
      <div className="grid h-[calc(100svh-64px)] place-content-center px-4">
        <div className="text-center">
          <h1 className="text-9xl sm:text-[164px] font-black bg-clip-text text-transparent bg-[url('/small_Fluorite-164_horiz-Optimized_350x263.jpeg')]">404</h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">Uh-oh!</p>

          <p className="mt-4 text-gray-500">We can&apos;t find that page.</p>

          <Button
            href="/"
            className="mt-6"
            as={Link}
          >
            Go Back Home
          </Button>
        </div>
      </div>
      <Footer />
    </main>
  )
}