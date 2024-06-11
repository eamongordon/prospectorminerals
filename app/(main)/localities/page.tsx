import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Skeleton } from '@nextui-org/react';
import LocalitiesPageLayout from "@/components/localities/localities-page-layout"
import MineralSelect from "@/components/localities/mineral-search-inner"
import { fetchMinerals } from '@/lib/actions';
import { LocalitiesQueryParams } from '@/types/types';

const markers = [
    {
        title: "Marker 1",
        coords: [35, 35]
    }, {
        title: "Marker 2",
        coords: [50, 50]
    }
];

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
    const chemistry =
        typeof searchParams.chemistry === 'string' ? JSON.parse(searchParams.chemistry) : undefined
    const photosQuery = await fetchMinerals({ filterObj: undefined, cursor: undefined, limit: 5 });
    /*
    const Map = useMemo(() => dynamic(
        () => import('@/components/localities/map'),
        {
            loading: () => <Skeleton className='h-[200px] w-[200px]' />,
            ssr: false
        }
    ), [])
    */
    //const photosQuery = await fetchPhotos({ filterObj: { name: search }, cursor: undefined, limit: 10, ...(property && order ? { sortObj: { property: property, order: order } } : {}) });
    const filterObj = { chemistry: chemistry } as LocalitiesQueryParams;
    return (
        <main>
            <LocalitiesPageLayout
                markers={markers}
                filterObj={filterObj}
                mineralSearchComp={
                    <MineralSelect
                        initialPhotos={photosQuery.results}
                        initialCursor={photosQuery.next ? photosQuery.next : undefined}
                    />
                } />
        </main >
    )
}

export default Page;
