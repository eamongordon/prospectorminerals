import { Button, Card, CardBody, CardFooter, CardHeader, Image, Link } from "@nextui-org/react";

export default function NavCard({
    title,
    description,
    cta
}: {
    title: string;
    description: string;
    cta?: string;
}) {
    return (
        <Card className="max-w-[350px]">
            <Image
                removeWrapper
                alt="Card background"
                className="w-full h-48 object-cover rounded-br-none rounded-bl-none"
                src="/Fluorite-164_horiz-Optimized.jpg"
            />
            <CardHeader className="flex gap-3">
                <h2 className="font-medium text-3xl">{title}</h2>
            </CardHeader>
            <CardBody>
                <p>{description}</p>
            </CardBody>
            <CardFooter>
                <Button as={Link} color="default" href="#" variant="flat">
                    {cta ? cta : 'Learn More'}
                </Button>
            </CardFooter>
        </Card>
    );
}
