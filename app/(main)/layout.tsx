import { Work_Sans } from 'next/font/google'
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>
    <Header />
    {children}
    <Footer />
  </>)
}
