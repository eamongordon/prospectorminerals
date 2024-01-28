import dynamic from 'next/dynamic';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useMemo } from 'react';
import { Skeleton } from '@nextui-org/react';

const markers = [
    {
        title: "Marker 1",
        coords: [35, 35]
    }, {
        title: "Marker 2",
        coords: [50, 50]
    }
];

export default function Home() {
    const DynamicMap = useMemo(() => dynamic(
        () => import('@/components/localities/map'),
        {
            loading: () => (<Skeleton className="h-80 w-80" />),
            ssr: false
        }
    ), []);
    return (
        <>
            <Header />
            <main>
                <DynamicMap markers={markers} />
            </main>
            <Footer />
        </>
    )
}
/*
'use client';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';

export default function MyPage() {
    const Map = useMemo(() => dynamic(
      () => import('@/components/localities/map'),
      { 
        loading: () => <p>A map is loading</p>,
        ssr: false
      }
    ), [])
  
    return <div>
      <Map center={[51.505, -0.09]} zoom={13}/>
    </div>
  }
  */