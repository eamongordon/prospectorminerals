import prisma from "@/lib/prisma";
import { notFound } from 'next/navigation';
import BlurImage from '@/components/blur-image';

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
    const photo = await prisma.photo.findUnique({
        where: {
            id: params.slug
        }
    })
    if (!photo) {
        return notFound()
    }
    return (
        <main>
            <div className='flex-col space-y-5 max-w-screen-md mx-auto py-5'>
                <div className='mx-auto px-8'>
                    <div className='relative rounded-md row-span-1 col-span-1 flex flex-col items-center justify-center aspect-video max-w-screen-md'>
                        <BlurImage
                            className={`rounded-xl z-0`}
                            fill
                            src={photo.image ? photo.image : '/Cavansite-45.jpeg'}
                            objectFit='cover'
                            blurDataURL={photo.imageBlurhash || undefined}
                            alt={photo.title ? photo.title : ""}
                        />
                    </div>
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