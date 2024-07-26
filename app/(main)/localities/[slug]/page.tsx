import LocalityMap from '@/components/localities/locality-map';
import PropertyTable from '@/components/property-table';
import Gallery from '@/components/minerals/mineral-gallery';
import MineralTags from '@/components/minerals/mineral-tags';
import { fetchLocalities } from '@/lib/actions';
import { Skeleton } from '@nextui-org/react';
import { notFound } from "next/navigation";
import { Suspense } from 'react';
import { MineralListItem } from '@/types/types';
import type { Metadata, ResolvingMetadata } from 'next'
import prisma from '@/lib/prisma';
import { convertLocalityDataToComponentType } from '@/types/prisma';

type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const result = await prisma.locality.findUnique({
        where: {
            slug: params.slug
        },
        select: {
            name: true,
            description: true,
            photos: {
                select: {
                    image: true
                }
            }
        }
    });

    const parentData = await parent;
    const previousImages = parentData.openGraph?.images || [];
    return {
        title: `${result?.name} | Prospector Minerals`,
        description: result?.description,
        openGraph: {
            ...parentData.openGraph,
            images: result?.photos[0]?.image ? [result?.photos[0]?.image] : previousImages,
            url: `/localities/${params.slug}`
        },
    }
}

const galleryData = [
    {
        title: "Amazonite",
        caption: "Smoky Hawk Mine, Routte Co., Colorado"
    },
    {
        title: "Cavansite",
        caption: "Pune, Maharashtra Province, India"
    },
    {
        title: "Krohnkite",
        caption: "Chuquicamata Mine, El Loa Province, Chile"
    }
];

export default async function Page({ params }: { params: { slug: string } }) {
    const localityResult = await fetchLocalities({ filterObj: { slug: params.slug }, cursor: undefined, limit: 1, fieldset: 'full' });
    if (localityResult.results.length === 0) {
        return notFound();
    }
    const convertedLocalityResult = convertLocalityDataToComponentType(localityResult.results);
    const locality = convertedLocalityResult[0];
    let tableData = [];
    if (locality.longitude) {
        tableData.push({ property: "Longitude", value: locality.longitude.toString() });
    }
    if (locality.latitude) {
        tableData.push({ property: "Latitude", value: locality.latitude.toString() });
    }
    if (locality.type) {
        tableData.push({ property: "Type", value: locality.type === 'Single' ? "Mine" : "Mining District" });
    }
    return (
        <main>
            <div className='px-6 max-w-screen-xl mx-auto py-1 sm:py-3'>
                <h1 className='font-semibold text-4xl sm:text-6xl py-4'>{locality.name}</h1>
            </div>
            <Suspense fallback={<Skeleton className='h-[400px] w-full' />}>
                <LocalityMap localities={[locality]} center={[locality.latitude as unknown as number, locality.longitude as unknown as number]} zoom={6} />
            </Suspense>
            <div className='px-6 max-w-screen-xl mx-auto space-y-6 my-6 sm:space-y-10 sm:my-10'>
                <p>{locality.description}</p>
                <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
                    <div className='w-full md:w-2/3'>
                        <Gallery data={locality.photos.map((obj) => { return { id: obj.id, title: obj.name ? obj.name : undefined, caption: obj.locality ? obj.locality.name : obj.locality_fallback || undefined, image: obj.image ? obj.image : undefined, blurDataURL: obj.imageBlurhash ? obj.imageBlurhash : undefined } })} />
                    </div>
                    <div className='w-full md:w-1/3'>
                        <PropertyTable data={tableData} />
                    </div>
                </div>
                {locality.minerals.length > 0 ?
                    <div className="space-y-2">
                        <h2 className="font-semibold text-3xl sm:text-4xl mb-4">Minerals</h2>
                        <MineralTags tags={locality.minerals.map((mineral) => { return { slug: mineral.slug, name: mineral.name, image: mineral.photos.length > 0 && mineral.photos[0].photo.image ? mineral.photos[0].photo.image : undefined, imageBlurhash:  mineral.photos.length > 0 && mineral.photos[0].photo.imageBlurhash ? mineral.photos[0].photo.imageBlurhash : undefined} as MineralListItem })} />
                    </div> : null}
            </div>
        </main>
    );
};