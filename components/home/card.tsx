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
        <Link href={link}>
            <Card className="w-[330px] h-[240px] dark:border dark:border-gray-400">
                <BlurImage
                    alt="Card background"
                    height={330}
                    width={240}
                    className="z-0 w-full h-full object-cover brightness-50"
                    src={image ? image : "/Fluorite-164_horiz-Optimized.jpg"}
                    blurDataURL={blurDataURL ? blurDataURL : undefined}
                />
                <CardHeader className="absolute z-10 bottom-28 left-2">
                    <h2 className="text-white font-medium text-3xl">{title}</h2>
                </CardHeader>
                <CardBody className="absolute z-10 bottom-12 left-2">
                    <h2 className="text-white font-medium text-medium">{description}</h2>
                </CardBody>
                <CardFooter className="absolute z-10 bottom-1 left-2">
                    <button className="bg-transparent left-0 text-align-left inline-flex items-center text-white hover:text-gray-300">
                        {cta ? cta : 'Learn More'}
                        <ArrowRight className="ml-2" />
                    </button>
                </CardFooter>
            </Card>
        </Link>
    );
}
