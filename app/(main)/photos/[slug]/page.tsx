import PhotoSlugImage from '@/components/photos/photo-slug-image';
import { fetchPhotos } from '@/lib/actions';
import prisma from "@/lib/prisma";
import { notFound } from 'next/navigation';

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
                        alt={photo.title || undefined}
                        blurDataURL={photo.imageBlurhash || undefined}
                    />
                </div>
                <div className='flex-col items-center justify-start px-8 text-left space-y-3'>
                    <p className='text-4xl font-semibold'>{photo.title ? photo.title : ""}</p>
                    <p className='text-lg font-semibold'>{"Smoky Hawk Claim, Lake George Co., Colorado"}</p>
                    <p className='text-md'>{"6.0 x 4.3 x 2.5 cm"}</p>
                    <p className='text-md'>{photo.description ? photo.description : ""}</p>
                </div>
            </div>
        </main>
    )
}