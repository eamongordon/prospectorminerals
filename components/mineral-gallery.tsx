"use client";

import Image from 'next/image';
import {useState} from 'react';

interface galleryItem {
    title?: string;
    caption?: string;
};

export default function Gallery({ data }: { data?: galleryItem[] }) {
    const [hover, setHover] = useState(false);
    return (
        <div className="grid grid-rows-2 grid-cols-3 gap-2 sm:gap-4 max-w-screen-xl aspect-[8/3] max-h-[500px] px-8 mx-auto">
            <div className="relative rounded-md row-span-2 col-span-2">
                <Image
                    className='rounded-xl'
                    src="/Amazonite-106_horiz.jpeg"
                    alt="Picture of the author"
                    objectFit='cover'
                    fill={true}
                />
            </div>
            <div className="relative row-span-1 col-span-1">
                <Image
                    className='rounded-xl'
                    src="/Cavansite-45.jpeg"
                    fill={true}
                    objectFit='cover'
                    alt="Picture of the author"
                />
            </div>
            <div className="relative row-span-1 col-span-1">
                <Image
                    className='rounded-xl'
                    src="/Krohnkite-110_horiz.jpeg"
                    alt="Picture of the author"
                    fill={true}
                    objectFit='cover'
                />
            </div>
        </div>
    )
}