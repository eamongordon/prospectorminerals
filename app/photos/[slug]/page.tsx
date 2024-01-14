import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';
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
            <Header />
            <div className='flex-col space-y-5 max-w-screen-xl mx-auto py-5'>
                <div className='flex items-center justify-start'>
                    <p className='text-5xl text-left px-8'>{photo.title ? photo.title : ""}</p>
                </div>
                <div className='grid grid-rows-1 grid-cols-1 gap-2 sm:gap-4 max-w-screen-xl aspect-[8/3] max-h-[500px] px-8 mx-auto'>
                    <div className='relative rounded-md row-span-1 col-span-1 flex flex-col items-center justify-center'>
                        <BlurImage
                            className={`rounded-xl z-0`}
                            src={photo.image ? photo.image : '/Cavansite-45.jpeg'}
                            fill
                            objectFit='cover'
                            blurDataURL={photo.imageBlurhash || undefined}
                            alt={photo.title ? photo.title : ""}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}