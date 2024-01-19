import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { ArrowRight } from 'lucide-react';
import BlurImage from "../blur-image";
import Link from "next/link";

export default function NavCard({
    title,
    description,
    cta,
    image,
    link,
    blurDataURL
}: {
    title: string;
    description: string;
    cta?: string;
    image?: string;
    link: string;
    blurDataURL?: string;
}) {
    return (
        <div className="w-[330px] h-[240px] rounded-xl">
            <Link href={link}>
                <BlurImage
                    alt="Card background"
                    fill
                    className="z-0 w-full h-full object-cover brightness-50"
                    src={image ? image : "/Fluorite-164_horiz-Optimized.jpg"}
                    blurDataURL={blurDataURL ? blurDataURL : undefined}
                />
            </Link>
            <div className="absolute z-10 bottom-28 left-2">
                <Link href={link}>
                    <h2 className="text-white font-medium text-3xl">{title}</h2>
                </Link>
            </div>
            <div className="absolute z-10 bottom-12 left-2">
                <Link href={link}>
                    <h2 className="text-white font-medium text-medium">{description}</h2>
                </Link>
            </div>
            <div className="absolute z-10 bottom-1 left-2">
                <Link href={link}>
                    <button className="bg-transparent left-0 text-align-left inline-flex items-center text-white hover:text-gray-300">
                        {cta ? cta : 'Learn More'}
                        <ArrowRight className="ml-2" />
                    </button>
                </Link>
            </div>
        </div>
    );
}
