import { Card, CardFooter } from "@nextui-org/react";
import Link from 'next/link';
import BlurImage from "../blur-image";

export default function LocalityCard({ name, slug, image, blurDataURL }: { name: string, slug: string, image?: string, blurDataURL?: string }) {
    return (
        <Link href={`/localities/${slug}`}>
            <Card isFooterBlurred className="w-full text-center">
                <BlurImage
                    width={300}
                    height={300}
                    quality={50}
                    alt={name || "Photo"}
                    className="object-cover w-full h-full scale-125 -translate-y-6 aspect-[5/4]"
                    src={image ? image : "/Amazonite-106_horiz.jpeg"}
                    blurDataURL={blurDataURL}
                />
                <CardFooter className="absolute bg-white/30 bottom-0 z-10 justify-between">
                    <p className="mx-auto text-white text-lg font-semibold">{name}</p>
                </CardFooter>
            </Card >
        </Link>
    )
}