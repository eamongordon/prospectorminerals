import { Card, CardHeader, CardBody, CardFooter, Image as UIImage, Button } from "@nextui-org/react";
import Link from 'next/link';
//import BlurImage from './blur-ui-image';

export default function MineralCard({ name, id, image, blurDataURL }: { name: string, id: string, image?: string, blurDataURL?: string }) {
    return (
        <Link href={`/minerals/${id}`}>
            <Card isFooterBlurred className="w-full">
                <UIImage
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src="/Amazonite-106_horiz.jpeg"
                    fallbackSrc="data:image/png;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoADIDASIAAhEBAxEB/8QAGwAAAwADAQEAAAAAAAAAAAAAAAYHBAUIAwL/xAAmEAACAgICAQMEAwAAAAAAAAABAgADBREEBiESEyIHMUGRFHGh/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDBQAE/8QAGxEAAgIDAQAAAAAAAAAAAAAAAAIBEQMhMQT/2gAMAwEAAhEDEQA/AOWEqdz4EzeNjLbSNKYzYHDDkFfEoGI6snxJSGiLZlXpOsf1e24A+gzM5HULlTYrP6l3wnXqFCgqIwW9Zotq0EEm00UxvD8OR+fg7qCdqZqLaWrOiJ0t2vqCIjsqf5In2jF/xbX+OtTlaykrQnwn0V8mEcUqHUeXWpTZEp/AyFK1Loic+YfINQw8xv4vYCqAeuUWTL9OFmnRZ+JmlVwAY24rJ+6o87nPXC7Bu0fOPvXuxIAu3k8lSP5cbpOyoZiheTxm+O9iQj6g4YhrGCyvUdgpenRcfaIvduZRfW+iJ511JsdggT49g7ePzCMdnt+439mEtZKhHSwr9p7DluPzCEYSok96cg6HfqM3XA7DZTr5GEIJDGjeU9wsVde4f3MDJdmfkKQXJhCChrkXzkmJJ3CEIaBZ/9k="
                />
                <CardFooter className="absolute bg-white/30 bottom-0 z-10 justify-between">
                    <p className="mx-auto text-white text-lg font-semibold">{name}</p>
                </CardFooter>
            </Card >
        </Link>
    )
}