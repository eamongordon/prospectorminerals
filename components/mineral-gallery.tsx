import Image from 'next/image';

interface galleryItem {
    title?: string;
    caption?: string;
};

export default function Gallery({ data }: { data?: galleryItem[] }) {
    return (
        <div className="grid grid-rows-2 grid-flow-col gap-4 max-w-screen-lg">
            <div className="row-span-2 col-span-2">
                <Image
                    src="/NativeCopper-15_horiz.jpeg"
                    alt="Picture of the author"
                    height={800}
                    width={600}
                    objectFit='cover'
                />
            </div>
            <div>
                <Image
                    src="/Cavansite-45.jpeg"
                    height={400}
                    width={600}
                    objectFit='cover'
                    alt="Picture of the author"
                />
            </div>
            <div>
                <Image
                    src="/Krohnkite-110_horiz.jpeg"
                    alt="Picture of the author"
                    height={400}
                    width={600}
                    objectFit='cover'
                />
            </div>
        </div>
    )
}