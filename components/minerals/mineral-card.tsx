import { Card, CardHeader, CardBody, CardFooter, Image as UIImage, Button } from "@nextui-org/react";
import Link from 'next/link';
import BlurImage from "../blur-image";
import Image from "next/image";

export default function MineralCard({ name, id, image, blurDataURL }: { name: string, id: string, image?: string, blurDataURL?: string }) {
    return (
        <Link href={`/minerals/${id}`}>
            <Card isFooterBlurred className="w-full">
                <UIImage
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src="/Amazonite-106_horiz.jpeg"
                />
                <CardFooter className="absolute bg-white/30 bottom-0 z-10 justify-between">
                    <p className="mx-auto text-white text-lg font-semibold">{name}</p>
                </CardFooter>
            </Card >
        </Link>
    )
}