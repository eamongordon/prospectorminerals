import dynamic from 'next/dynamic'

const DynamicMap = dynamic(() => import('@/components/localities/map'), {
  ssr: false
});

export default function Home() {
  return (
    <main>
     <DynamicMap />
    </main>
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