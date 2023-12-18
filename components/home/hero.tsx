import React from 'react'
import Image from 'next/image'
import FlouriteBanner from '@/public/Fluorite-164_horiz-Optimized.jpg';

export default function Hero() {
    return (
        <div
            className="w-full h-screen flex justify-center items-center overflow-hidden relative bg-black">
            <Image
                src={FlouriteBanner}
                alt="Hero Image"
                className="opacity-60 object-cover"
                fill
                priority={true}
            />
            <div className="flex flex-col justify-center items-center px-3">
                <h1 className=" text-center text-3xl md:text-5xl text-white font-bold drop-shadow-lg">WELCOME TO <br />
                    <span className="text-primary">MY COMPANY</span>
                </h1>
                <p className="mt-5 text-center text-lg text-white opacity-90">Making tomorrows widgets today...</p>
            </div>
        </div>
    )
}