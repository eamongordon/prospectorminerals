import Image from 'next/image';
import Card from '@/components/home/card';
import HeaderComp from '@/components/header';
import Hero from '@/components/home/hero';
import { Spacer } from "@nextui-org/react";

export default function Home() {
  return (
    <main>
      <HeaderComp />
      <Hero />
      <Spacer y={40} />
      <Card />
    </main>
  )
}
