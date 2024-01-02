"use client";

import Image from 'next/image';
import { useState } from 'react';

interface galleryItem {
    title?: string;
    caption?: string;
};

export default function Gallery({ data }: { data: galleryItem[] }) {
    const [hoverItem, setHoverItem] = useState("");
    function handleHoverIn(itemId: string) {
        setHoverItem(itemId);
    };
    function handleHoverOut(itemId: string) {
        setHoverItem("");
    };
    return (
        <div className={`${data.length >= 3 ? "grid grid-rows-2 grid-cols-3 gap-2 sm:gap-4 max-w-screen-xl aspect-[8/3] max-h-[500px] px-8 mx-auto" : data.length === 2 ? "grid grid-rows-1 grid-cols-2 gap-2 sm:gap-4 max-w-screen-xl aspect-[8/3] max-h-[500px] px-8 mx-auto" : "grid grid-rows-1 grid-cols-1 gap-2 sm:gap-4 max-w-screen-xl aspect-[8/3] max-h-[500px] px-8 mx-auto"}`}>
            <div
                className={`${data.length >= 3 ? "relative rounded-md row-span-2 col-span-2 flex flex-col items-center justify-center" : "relative rounded-md row-span-1 col-span-1 flex flex-col items-center justify-center"}`}
                id="image1"
                onMouseEnter={(e) => handleHoverIn(e.currentTarget.id)}
                onMouseLeave={(e) => handleHoverOut(e.currentTarget.id)}
            >
                <Image
                    className={hoverItem === 'image1' ? `rounded-xl z-0 brightness-50 blur-sm` : `rounded-xl z-0`}
                    src="/Amazonite-106_horiz.jpeg"
                    alt="Picture of the author"
                    objectFit='cover'
                    fill={true}
                />
                {hoverItem === 'image1' ? (
                    <>
                        <h3 className="text-sm sm:text-xl z-10 font-medium text-white">{data[0]?.title}</h3>
                        <p className="text-sm sm:text-md z-10 text-white">{data[0]?.caption}</p>
                    </>
                ) : (
                    <></>
                )
                }
            </div>
            <div 
                className={`${data.length >= 3 ? "relative row-span-1 col-span-1 flex flex-col items-center justify-center" : data.length === 2 ? "relative row-span-1 col-span-1 flex flex-col items-center justify-center" : "hidden" }`}
                id="image2"
                onMouseEnter={(e) => handleHoverIn(e.currentTarget.id)}
                onMouseLeave={(e) => handleHoverOut(e.currentTarget.id)}
            >
                <Image
                    className={hoverItem === 'image2' ? `rounded-xl z-0 brightness-50 blur-sm` : `rounded-xl z-0`}
                    src="/Cavansite-45.jpeg"
                    fill={true}
                    objectFit='cover'
                    alt="Picture of the author"
                />
                {hoverItem === 'image2' ? (
                    <>
                        <h3 className="text-sm sm:text-xl z-10 font-medium text-white">{data[1]?.title}</h3>
                        <p className="text-sm sm:text-md z-10 text-white">{data[1]?.caption}</p>
                    </>
                ) : (
                    <></>
                )
                }
            </div>
            <div 
                className={`${data.length >= 3 ? "relative row-span-1 col-span-1 flex flex-col items-center justify-center" : "hidden"}`}
                id="image3"
                onMouseEnter={(e) => handleHoverIn(e.currentTarget.id)}
                onMouseLeave={(e) => handleHoverOut(e.currentTarget.id)}
            >
                <Image
                    className={hoverItem === 'image3' ? `rounded-xl z-0 brightness-50 blur-sm` : `rounded-xl z-0`}
                    src="/Krohnkite-110_horiz.jpeg"
                    alt="Picture of the author"
                    fill={true}
                    objectFit='cover'
                />
                {hoverItem === 'image3' ? (
                    <>
                        <h3 className="text-sm sm:text-xl z-10 font-medium text-white">{data[2]?.title}</h3>
                        <p className="text-sm sm:text-md z-10 text-white">{data[2]?.caption}</p>
                    </>
                ) : (
                    <></>
                )
                }
            </div>
        </div>
    )
}