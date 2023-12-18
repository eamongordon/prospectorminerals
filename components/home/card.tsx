import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

export default function NavCard() {
    return (
        <Card className="col-span-12 sm:col-span-4 w-[300px]">
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="/Fluorite-164_horiz-Optimized.jpg"
            />
            <CardHeader className="z-10 top-1">
                <h2 className="text-white font-medium text-xxl">Minerals</h2>
            </CardHeader>
            <CardBody className="z-10 top-3">
                <h2 className="text-white font-medium text-medium">Learn more about Minerals with our resources.</h2>
            </CardBody>
            <CardFooter className="z-10 top-5">
                <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/nextui-org/nextui"
                >
                    Read More
                </Link>
            </CardFooter>
        </Card>
    );
}
