import Image from 'next/image';
import Card from '@/components/home/card';
import HeaderComp from '@/components/header';
import FooterComp from '@/components/footer';
import Hero from '@/components/home/hero';
import { Spacer } from "@nextui-org/react";

const cardItemList = [
  {
    title: 'Learn',
    description: 'A starting place for mineralogy research.',
    cta: 'Get Started'
  },
  {
    title: 'Minerals',
    description: 'Learn more about Minerals with our resources.',
    cta: 'Learn More'
  },
  {
    title: 'Localities',
    description: 'Information and resources detailing localities.',
    cta: 'Learn More'
  },
  {
    title: 'Articles',
    description: 'In-depth Educational Articles on mineralogy-related topics.',
    cta: 'Read More'
  },
  {
    title: 'Photos',
    description: 'Photos of mineral specimens from worldwide localities.',
    cta: 'View Photos'
  },
  {
    title: 'Members',
    description: 'Join and gain access to all we have to offer. For Free.',
    cta: 'Log In or Sign Up'
  },
]

export default function Home() {
  return (
    <main>
      <HeaderComp />
      <Hero />
      <Spacer y={40} />
      <div className='max-w-[1024px] mx-auto gap-4 grid grid-cols-1 w-600 sm:grid-cols-3 justify-items-center'>
        {
          cardItemList.map((obj, index) => (
            <div key={index}>
             <Card title={obj.title} description={obj.description} cta={obj.cta} />
            </div>
          ))
        }
      </div>
      <FooterComp />
    </main>
  )
}
