import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Link, Image } from "@nextui-org/react";
import { ArrowRight } from 'lucide-react';

export default function NavCard({
    title,
    description,
    cta,
    image,
    link
}: {
    title: string;
    description: string;
    cta?: string;
    image?: string;
    link: string
}) {
    return (
        <Card className="col-span-12 sm:col-span-4 w-[330px] h-[240px]">
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover brightness-50"
                src={image ? image : "/Fluorite-164_horiz-Optimized.jpg"}
            />
            <CardHeader className="absolute z-10 bottom-28 left-2">
                <h2 className="text-white font-medium text-3xl">{title}</h2>
            </CardHeader>
            <CardBody className="absolute z-10 bottom-12 left-2">
                <h2 className="text-white font-medium text-medium">{description}</h2>
            </CardBody>
            <CardFooter className="absolute z-10 bottom-1 left-2">
                <Link href={link}>
                    <button className="bg-transparent left-0 text-align-left inline-flex items-center text-white hover:text-gray-300">
                        {cta ? cta : 'Learn More'}
                        <ArrowRight className="ml-2" />
                    </button>
                </Link>
            </CardFooter>
        </Card>
    );
}
