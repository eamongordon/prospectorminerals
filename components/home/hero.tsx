import React from 'react'
import Image from 'next/image'
import BlurImage from '../blur-image';
import FlouriteBanner from '@/public/Fluorite-164_horiz-Optimized.jpg';

export default function Hero() {
    return (
        <div
            className="w-full h-screen flex justify-center items-center overflow-hidden relative bg-black">
            <BlurImage
                src={FlouriteBanner}
                alt="Hero Image"
                className="opacity-60 object-cover"
                width={0}
                height={0}
                fill
                sizes="100vw"
                placeholder="blur"
                blurDataURL="data:image/png;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAmADIDASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAAQBAgMFBgf/xAAgEAACAgEFAAMAAAAAAAAAAAAAAQIDEQQSEyExIkFR/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAEDAgX/xAAYEQEBAQEBAAAAAAAAAAAAAAAAARExAv/aAAwDAQACEQMRAD8A+e2WN9FqH8kW4W2SoOJ06vT9c+is1uyLQswbqxYNQ4wuqTTOXqql2dS6zpnL1VnbFaekeFfgF+QDGE9PDDItisMTq1GPsm3UZj6UgZ2T2smueRKybcjamePQglMWRbTOdqI9j07lhiF1qbCwYx2AHIgMhvOTiy0JOXoAOitVWsZMbZOPgAKdLyVnfLLFp2tsAKVS8Z8jAAJMP//Z"
                priority={true}
            />
            <div className="flex flex-col justify-center items-center px-3">
                <h1 className=" text-center text-3xl md:text-5xl text-white font-bold drop-shadow-lg">WELCOME TO <br />
                    <span className="text-primary">PROSPECTOR MINERALS</span>
                </h1>
                <p className="mt-5 text-center text-lg text-white opacity-90">Welcome to Prospector Minerals, a comprehensive mineralogy resource.</p>
            </div>
        </div>
    )
}