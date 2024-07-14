import MineralTags from '@/components/minerals/mineral-tags';
import PhotoSlugImage from '@/components/photos/photo-slug-image';
import { fetchPhotos } from '@/lib/actions';
import { MineralListItem } from '@/types/types';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next'
import prisma from '@/lib/prisma';

type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const result = await prisma.photo.findUnique({
        where: {
            id: params.slug
        },
        select: {
            name: true,
            description: true,
            image: true,
            imageBlurhash: true
        }
    });
    
    const parentData = await parent;
    const previousImages = parentData.openGraph?.images || [];
    return {
        title: `${result?.name} | Prospector Minerals`,
        description: result?.description,
        openGraph: {
            ...parentData.openGraph,
            images: result?.image ? [result.image, ...previousImages] : previousImages,
            url: `/photos/${params.slug}`
        },
    }
}

export default async function Page({ params }: Props) {
    const photoResult = await fetchPhotos({ filterObj: { id: params.slug }, cursor: undefined, limit: 1, fieldset: 'full' });
    let photo;
    if (photoResult.results.length === 0) {
        return notFound();
    } else {
        photo = photoResult.results[0];
    }
    return (
        <main>
            <div className='flex-col space-y-5 max-w-screen-md mx-auto py-5'>
                <div className='mx-auto px-8'>
                    <PhotoSlugImage
                        src={photo.image || undefined}
                        alt={photo.name || undefined}
                        blurDataURL={photo.imageBlurhash || undefined}
                    />
                </div>
                <div className='flex-col items-center justify-start px-8 text-left space-y-3'>
                    <p className='text-4xl font-semibold'>{photo.name ? photo.name : ""}</p>
                    <p className='text-lg font-semibold'>{photo.locality ? photo.locality.name : photo.locality_fallback}</p>
                    {photo.specimen_height && photo.specimen_length && photo.specimen_width ?
                        <p className='text-md'>{`${photo.specimen_length} x ${photo.specimen_width} x ${photo.specimen_height} cm`}</p>
                        : null}
                    <p className='text-md'>{photo.description ? photo.description : ""}</p>
                    {photo.minerals.length ?
                        <>
                            <h2 className='text-2xl font-semibold'>Minerals In this Photo</h2>
                            <MineralTags tags={photo.minerals.map((obj) => { return { name: obj.mineral.name, image: obj.mineral.photos[0].photo.image, slug: obj.mineral.slug } as MineralListItem })} />
                        </> : null}
                </div>
            </div>
        </main>
    )
}