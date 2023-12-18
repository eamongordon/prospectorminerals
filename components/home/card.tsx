import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Link, Image } from "@nextui-org/react";

export default function NavCard() {
    return (
        <Card className="max-w-[350px]">
            <Image
                removeWrapper
                alt="Card background"
                className="w-full h-48 object-cover rounded-br-none rounded-bl-none"
                src="/Fluorite-164_horiz-Optimized.jpg"
            />
            <CardHeader className="flex gap-3">
                <h2 className="font-medium text-3xl">Minerals</h2>
            </CardHeader>
            <CardBody>
                <p>Learn more about Minerals with our resources</p>
            </CardBody>
            <CardFooter>
                <Button as={Link} color="default" href="#" variant="flat">
                    Learn More
                </Button>
            </CardFooter>
        </Card>
    );
}
