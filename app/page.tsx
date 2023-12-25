import Image from 'next/image';
import HeaderComp from '@/components/header';
import Hero from '@/components/home/hero';
import { Spacer } from "@nextui-org/react";
import dynamic from 'next/dynamic';

const FooterComp = dynamic(() => import('@/components/footer'));
const Card = dynamic(() => import('@/components/home/card-new'));

const cardItemList = [
  {
    title: 'Learn',
    description: 'A starting place for mineralogy research.',
    cta: 'Get Started',
    image: '/Cavansite-45.jpeg'
  },
  {
    title: 'Minerals',
    description: 'Learn more about Minerals with our resources.',
    cta: 'Learn More',
    image: '/Krohnkite-110_horiz.jpeg'
  },
  {
    title: 'Localities',
    description: 'Information and resources detailing localities.',
    cta: 'Learn More',
    image: '/Optimized-DeathValley-Floor (1).jpg'
  },
  {
    title: 'Articles',
    description: 'In-depth Educational Articles on mineralogy-related topics.',
    cta: 'Read More',
    image: '/NativeCopper-15_horiz.jpeg'
  },
  {
    title: 'Photos',
    description: 'Photos of mineral specimens from worldwide localities.',
    cta: 'View Photos',
    image: '/Amazonite-106_horiz.jpeg'
  },
  {
    title: 'Members',
    description: 'Join and gain access to all we have to offer. For Free.',
    cta: 'Log In or Sign Up',
    image: '/AluminoAdamite-Smithsonite_horiz.jpeg'
  },
]

export default function Home() {
  return (
    <main>
      <HeaderComp />
      <Hero />
      <Spacer y={40} />
      <div className='max-w-[1024px] mx-auto gap-4 grid grid-cols-1 w-600 md:grid-cols-2 lg:grid-cols-3 justify-items-center'>
        {
          cardItemList.map((obj, index) => (
            <div key={index}>
             <Card title={obj.title} description={obj.description} cta={obj.cta} image={obj.image} link="#" />
            </div>
          ))
        }
      </div>
      <Spacer y={40} />
      <FooterComp />
    </main>
  )
}
