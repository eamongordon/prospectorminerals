import LocalitiesPageLayout from "@/components/localities/localities-page-layout"
import { fetchLocalities } from '@/lib/actions';
import type { mineralListItem } from '@/types/types';
import ClearFilters from '@/components/localities/clear-filters';
import LocalityMap from '@/components/localities/locality-map';
import { Skeleton } from '@nextui-org/react';
import { Suspense } from 'react'

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
    const localities = await fetchLocalities({ filterObj: { ...filterObj, minerals: minerals ? minerals.map((obj: mineralListItem) => obj.name) : undefined }, cursor: undefined, limit: 100, ...(property && order ? { sortObj: { property: property, order: order } } : {}) });
    //TODO: make Button re-render with new key
    const serializedKey = JSON.stringify({ filterObj, property, order });
    return (
        <main>
            <LocalitiesPageLayout
                filterObj={{ ...filterObj, minerals: minerals }}
                localities={localities.results}
                mapElement={<Suspense fallback={<Skeleton className='h-[400px] w-full' />}><LocalityMap localities={localities.results} center={[25, 0]} zoom={2} /></Suspense>}
                clearButton={
                    <ClearFilters key={serializedKey} />
                }
            />
        </main >
    )
}

export default Page;
