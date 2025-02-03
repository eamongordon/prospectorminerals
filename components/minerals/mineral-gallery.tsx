"use client";

import Link from 'next/link';
import BlurImage from '../blur-image';

export type GalleryItem = {
    title?: string;
    caption?: string;
    image?: string;
    blurDataURL?: string;
    id?: string;
};

export default function Gallery({ data }: { data: GalleryItem[] }) {
    return (
        <div className={`${data.length >= 3 ? "grid grid-rows-2 grid-cols-3 gap-2 sm:gap-4 max-w-screen-xl aspect-[2/1] sm:aspect-[8/3] max-h-[500px] mx-auto" : data.length === 2 ? "grid grid-rows-1 grid-cols-2 gap-2 sm:gap-4 max-w-screen-xl aspect-[8/3] max-h-[500px] mx-auto" : data.length > 0 ? "grid grid-rows-1 grid-cols-1 gap-2 sm:gap-4 max-w-screen-xl aspect-[8/3] max-h-[500px] mx-auto" : "hidden"}`}>
            {data[0]?.id ? (
                <Link
                    href={`/photos/${data[0].id}`}
                    className={`group ${data.length >= 3 ? "relative rounded-md row-span-2 col-span-2 flex flex-col items-center justify-center" : "relative rounded-md row-span-1 col-span-1 flex flex-col items-center justify-center"}`}
                >
                    <BlurImage
                        width={750}
                        height={500}
                        alt={data[0]?.title || "Photo"}
                        className={"group-hover:brightness-50 group-hover:blur-sm rounded-xl z-0 w-full h-full object-cover absolute"}
                        src={data[0]?.image || "/Amazonite-106_horiz.jpeg"}
                        blurDataURL={data[0]?.blurDataURL}
                    />
                    <div className='relative'>
                        <h3 className="text-center group-hover:block hidden text-base sm:text-xl z-10 font-medium text-white">{data[0]?.title}</h3>
                        <p className="text-center group-hover:block hidden text-sm sm:text-base z-10 text-white">{data[0]?.caption}</p>
                    </div>
                </Link>
            ) : (
                <div
                    className={`group ${data.length >= 3 ? "relative rounded-md row-span-2 col-span-2 flex flex-col items-center justify-center" : "relative rounded-md row-span-1 col-span-1 flex flex-col items-center justify-center"}`}
                >
                    <BlurImage
                        width={750}
                        height={500}
                        alt={data[0]?.title || "Photo"}
                        className={"group-hover:brightness-50 group-hover:blur-sm rounded-xl z-0 w-full h-full object-cover absolute"}
                        src={data[0]?.image || "/Amazonite-106_horiz.jpeg"}
                        blurDataURL={data[0]?.blurDataURL}
                        priority={true}
                    />
                    <div className='relative'>
                        <h3 className="text-center group-hover:block hidden text-base sm:text-xl z-10 font-medium text-white">{data[0]?.title}</h3>
                        <p className="text-center group-hover:block hidden text-sm sm:text-base z-10 text-white">{data[0]?.caption}</p>
                    </div>
                </div>
            )}
            {data[1]?.id ? (
                <Link
                    href={`/photos/${data[1].id}`}
                    className={`group ${data.length >= 3 ? "relative row-span-1 col-span-1 flex flex-col items-center justify-center" : data.length === 2 ? "relative row-span-1 col-span-1 flex flex-col items-center justify-center" : "hidden"}`}
                >
                    <BlurImage
                        width={625}
                        height={475}
                        alt={data[1]?.title || "Photo"}
                        className={"group-hover:brightness-50 group-hover:blur-sm rounded-xl z-0 w-full h-full object-cover absolute"}
                        src={data[1]?.image || "/Amazonite-106_horiz.jpeg"}
                        blurDataURL={data[1]?.blurDataURL}
                    />
                    <div className='relative'>
                        <h3 className="text-center group-hover:block hidden text-base sm:text-xl z-10 font-medium text-white">{data[1]?.title}</h3>
                        <p className="text-center group-hover:block hidden text-sm sm:text-base z-10 text-white">{data[1]?.caption}</p>
                    </div>
                </Link>
            ) : (
                <div
                    className={`group ${data.length >= 3 ? "relative row-span-1 col-span-1 flex flex-col items-center justify-center" : data.length === 2 ? "relative row-span-1 col-span-1 flex flex-col items-center justify-center" : "hidden"}`}
                >
                    <BlurImage
                        width={625}
                        height={475}
                        alt={data[1]?.title || "Photo"}
                        className={"group-hover:brightness-50 group-hover:blur-sm rounded-xl z-0 w-full h-full object-cover absolute"}
                        src={data[1]?.image || "/Amazonite-106_horiz.jpeg"}
                        blurDataURL={data[1]?.blurDataURL}
                    />
                    <div className='relative'>
                        <h3 className="text-center group-hover:block hidden text-base sm:text-xl z-10 font-medium text-white">{data[1]?.title}</h3>
                        <p className="text-center group-hover:block hidden text-sm sm:text-base z-10 text-white">{data[1]?.caption}</p>
                    </div>
                </div>
            )}
            {data[2]?.id ? (
                <Link
                    className={`group ${data.length >= 3 ? "relative row-span-1 col-span-1 flex flex-col items-center justify-center" : "hidden"}`}
                    href={`/photos/${data[2].id}`}
                >
                    <BlurImage
                        width={400}
                        height={225}
                        alt={data[2]?.title || "Photo"}
                        className={"group-hover:brightness-50 group-hover:blur-sm rounded-xl z-0 w-full h-full object-cover absolute"}
                        src={data[2]?.image || "/Amazonite-106_horiz.jpeg"}
                        blurDataURL={data[2]?.blurDataURL}
                    />
                    <div className='relative'>
                        <h3 className="text-center group-hover:block hidden text-base sm:text-xl z-10 font-medium text-white">{data[2]?.title}</h3>
                        <p className="text-center group-hover:block hidden text-sm sm:text-base z-10 text-white">{data[2]?.caption}</p>
                    </div>
                </Link>
            ) : (
                <div
                    className={`group ${data.length >= 3 ? "relative row-span-1 col-span-1 flex flex-col items-center justify-center" : "hidden"}`}
                    id="image3"
                >
                    <BlurImage
                        width={400}
                        height={225}
                        alt={data[2]?.title || "Photo"}
                        className={"group-hover:brightness-50 group-hover:blur-sm rounded-xl z-0 w-full h-full object-cover absolute"}
                        src={data[2]?.image || "/Amazonite-106_horiz.jpeg"}
                        blurDataURL={data[2]?.blurDataURL}
                    />
                    <div className='relative'>
                        <h3 className="text-center group-hover:block hidden text-base sm:text-xl z-10 font-medium text-white">{data[2]?.title}</h3>
                        <p className="text-center group-hover:block hidden text-sm sm:text-base z-10 text-white">{data[2]?.caption}</p>
                    </div>
                </div>
            )}
        </div >
    )
}