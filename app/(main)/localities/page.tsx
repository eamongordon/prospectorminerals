import LocalitiesPageLayout from "@/components/localities/localities-page-layout"
import { fetchLocalities } from '@/lib/fetchers';
import type { MineralListItem } from '@/types/types';
import ClearFilters from '@/components/localities/clear-filters';
import LocalityMapWrapper from '@/components/localities/locality-map-wrapper';
import type { Metadata } from 'next'
import { convertLocalityDataToComponentType } from "@/types/prisma";

export const metadata: Metadata = {
    title: 'Localities',
    description: 'Explore worldwide localities and mines at Prospector Minerals. Find information, photos, and minerals of mineral, rock, and geology localities and mines.',
    openGraph: {
        images: ['/Fluorite-164_horiz-Optimized.jpg'],
        siteName: 'Prospector Minerals',
        url: '/localities'
    }
}

const Page = async (
    props: {
        searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }
) => {
    const searchParams = await props.searchParams;
    const name =
        typeof searchParams.name === 'string' ? searchParams.name : undefined
    const property =
        typeof searchParams.property === 'string' ? searchParams.property : undefined
    const order =
        typeof searchParams.order === 'string' ? searchParams.order : undefined
    const minerals =
        typeof searchParams.minerals === 'string' ? JSON.parse(searchParams.minerals) : undefined

    // New: location params
    const latitude =
        typeof searchParams.latitude === 'string' ? parseFloat(searchParams.latitude) : undefined;
    const longitude =
        typeof searchParams.longitude === 'string' ? parseFloat(searchParams.longitude) : undefined;
    const radius =
        typeof searchParams.radius === 'string' ? parseFloat(searchParams.radius) : undefined;
    const radiusUnit =
        typeof searchParams.radiusUnit === 'string' ? searchParams.radiusUnit : undefined;

    const filterObj = { name, latitude, longitude, radius, radiusUnit };
    const localities = await fetchLocalities({
        filterObj: {
            ...filterObj,
            minerals: minerals ? minerals.map((obj: MineralListItem) => obj.name) : undefined
        },
        cursor: undefined,
        limit: 100,
        ...(property && order ? { sortObj: { property: property, order: order } } : {})
    });
    const serializedKey = JSON.stringify({ filterObj, property, order });
    const modifiedLocalities = convertLocalityDataToComponentType(localities.results);

    return (
        <main>
            <LocalitiesPageLayout
                filterObj={{ ...filterObj, minerals: minerals }}
                localities={modifiedLocalities}
                mapElement={
                    <LocalityMapWrapper localities={modifiedLocalities} center={[25, 0]} zoom={2} />
                }
                clearButton={
                    <ClearFilters key={serializedKey} />
                }
            />
        </main >
    )
}

export default Page;
