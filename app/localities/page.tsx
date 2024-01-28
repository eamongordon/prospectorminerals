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
    return null;
    /*
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
    */
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
/*
  import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7,
); // 7-character random string



const Page = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const search =
        typeof searchParams.search === 'string' ? searchParams.search : undefined
    const property =
        typeof searchParams.property === 'string' ? searchParams.property : undefined
    const order =
        typeof searchParams.order === 'string' ? searchParams.order : undefined
    //const photosQuery = await fetchPhotos({ filterObj: { name: search }, cursor: undefined, limit: 10, ...(property && order ? { sortObj: { property: property, order: order } } : {}) });
    return (
        <main>
            <Header />
            <div className="flex justify-center items-center">
                <section className='flex-col justify-center items-center py-4 px-6 w-full max-w-screen-xl'>
                    
                    <PhotosLayout
                        infiniteScrollElem={<InfiniteScrollPhotos search={search} initialPhotos={photosQuery.results} initialCursor={photosQuery.next ? photosQuery.next : undefined} {...(property && order ? { sort: { property: property, order: order } } : {})} key={nanoid()} />}
                        search={search}
                        sortDropdownElem={<SortDropdown {...(property && order ? { sort: `${property},${order}` } : {})} />}
                    />
                </section>
            </div>
            <Footer />
        </main >
    )
}

export default Page;
*/