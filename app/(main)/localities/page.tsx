import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Skeleton } from '@nextui-org/react';
import LocalitiesPageLayout from "@/components/localities/localities-page-layout"
import MineralSelect from "@/components/localities/mineral-search-inner"
import { fetchLocalities, fetchMinerals } from '@/lib/actions';
import type { LocalitiesQueryParams } from '@/types/types';

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
    const name =
        typeof searchParams.name === 'string' ? searchParams.name : undefined
    const property =
        typeof searchParams.property === 'string' ? searchParams.property : undefined
    const order =
        typeof searchParams.order === 'string' ? searchParams.order : undefined
    const minerals =
        typeof searchParams.minerals === 'string' ? JSON.parse(searchParams.minerals) : undefined
    /*
    const Map = useMemo(() => dynamic(
        () => import('@/components/localities/map'),
        {
            loading: () => <Skeleton className='h-[200px] w-[200px]' />,
            ssr: false
        }
    ), [])
    */
    const filterObj = { name: name };
    const localities = await fetchLocalities({ filterObj: {...filterObj, minerals: minerals.map((obj : {name: string, image: string}) => obj.name)}, cursor: undefined, limit: 100, ...(property && order ? { sortObj: { property: property, order: order } } : {}) });
    return (
        <main>
            <LocalitiesPageLayout
                markers={markers}
                filterObj={{...filterObj, minerals: minerals}}
                localities={localities.results}
            />
        </main >
    )
}

export default Page;
