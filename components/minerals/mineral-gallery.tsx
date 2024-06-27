"use client";

import Image from 'next/image';

type galleryItem = {
    title?: string;
    caption?: string;
};

export default function Gallery({ data }: { data: galleryItem[] }) {
    return (
        <div className={`${data.length >= 3 ? "grid grid-rows-2 grid-cols-3 gap-2 sm:gap-4 max-w-screen-xl aspect-[2/1] sm:aspect-[8/3] max-h-[500px] mx-auto" : data.length === 2 ? "grid grid-rows-1 grid-cols-2 gap-2 sm:gap-4 max-w-screen-xl aspect-[8/3] max-h-[500px] px-8 mx-auto" : "grid grid-rows-1 grid-cols-1 gap-2 sm:gap-4 max-w-screen-xl aspect-[8/3] max-h-[500px] px-8 mx-auto"}`}>
            <div
                className={`group ${data.length >= 3 ? "relative rounded-md row-span-2 col-span-2 flex flex-col items-center justify-center" : "relative rounded-md row-span-1 col-span-1 flex flex-col items-center justify-center"}`}
                id="image1"
            >
                <Image
                    className={"group-hover:brightness-50 group-hover:blur-sm rounded-xl z-0"}
                    src="/Amazonite-106_horiz.jpeg"
                    alt="Sample Image"
                    objectFit='cover'
                    fill={true}
                />
                <>
                    <h3 className="text-center group-hover:block hidden text-sm sm:text-xl z-10 font-medium text-white">{data[0]?.title}</h3>
                    <p className="text-center group-hover:block hidden text-sm sm:text-md z-10 text-white">{data[0]?.caption}</p>
                </>
            </div>
            <div
                className={`group ${data.length >= 3 ? "relative row-span-1 col-span-1 flex flex-col items-center justify-center" : data.length === 2 ? "relative row-span-1 col-span-1 flex flex-col items-center justify-center" : "hidden"}`}
                id="image2"
            >
                <Image
                    className="group-hover:brightness-50 group-hover:blur-sm rounded-xl"
                    src="/Cavansite-45.jpeg"
                    fill={true}
                    objectFit='cover'
                    alt="Sample Image"
                />

                <>
                    <h3 className="text-center group-hover:block hidden text-sm sm:text-xl z-10 font-medium text-white">{data[1]?.title}</h3>
                    <p className="text-center group-hover:block hidden text-sm sm:text-md z-10 text-white">{data[1]?.caption}</p>
                </>
            </div>
            <div
                className={`group ${data.length >= 3 ? "relative row-span-1 col-span-1 flex flex-col items-center justify-center" : "hidden"}`}
                id="image3"
            >
                <Image
                    className={"group-hover:brightness-50 group-hover:blur-sm rounded-xl z-0"}
                    src="/Krohnkite-110_horiz.jpeg"
                    alt="Sample Image"
                    fill={true}
                    objectFit='cover'
                />
                <>
                    <h3 className="text-center group-hover:block hidden text-sm sm:text-xl z-10 font-medium text-white">{data[2]?.title}</h3>
                    <p className="text-center group-hover:block hidden text-sm sm:text-md z-10 text-white">{data[2]?.caption}</p>
                </>
            </div>
        </div>
    )
}