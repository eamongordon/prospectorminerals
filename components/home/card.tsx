import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
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
        <Card as={Link} href={link} className="w-full h-[240px] dark:border dark:border-gray-400 relative justify-end px-2">
            <BlurImage
                alt="Card background"
                height={330}
                width={240}
                className="z-0 w-full h-full absolute inset-0 object-cover brightness-50"
                src={image ? image : "/Fluorite-164_horiz-Optimized.jpg"}
                blurDataURL={blurDataURL ? blurDataURL : undefined}
            />
            <CardHeader className="z-10 pb-1">
                <h2 className="text-white font-medium text-3xl">{title}</h2>
            </CardHeader>
            <CardBody className="z-10 flex-none pb-2 max-w-full">
                <h2 className="text-white font-medium text-medium">{description}</h2>
            </CardBody>
            <CardFooter className="z-10 pb-4">
                <button className="bg-transparent left-0 text-align-left inline-flex items-center text-white hover:text-gray-300">
                    {cta ? cta : 'Learn More'}
                    <ArrowRight className="ml-2" />
                </button>
            </CardFooter>
        </Card>
    );
}
