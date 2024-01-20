import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import Link from 'next/link';

export default function MineralCard({ name }: { name: string }) {
    return (
        <Link href="/photos">
            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src="/Amazonite-106_horiz.jpeg"
                />
                <CardFooter className="absolute bg-white/30 bottom-0 z-10 justify-between">
                    <p className="mx-auto text-lg font-semibold">{name}</p>
                </CardFooter>
            </Card >
        </Link>
    )
}