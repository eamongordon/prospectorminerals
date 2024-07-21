import type { MineralListItem } from "@/types/types";
import { Chip } from "@nextui-org/react";
import Link from "next/link";
import BlurImage from "../blur-image";

export default function MineralTags({ tags }: { tags: MineralListItem[] }) {
    return (
        <div className="flex flex-row flex-wrap gap-2">
            {(tags?.map((obj: MineralListItem, index) => {
                return (
                    <Link href={`/minerals/${obj.slug}`} key={index}>
                        <Chip className="min-h-[28px]"
                            size="lg"
                            key={index}
                            variant="solid"
                            classNames={{ base: 'hover:opacity-80', avatar: 'rounded-full object-cover' }}
                            avatar={obj.image ?
                                <BlurImage
                                    width={24}
                                    height={24}
                                    quality={25}
                                    alt={obj.name}
                                    src={obj.image}
                                    blurDataURL={obj.imageBlurhash || undefined}
                                />
                                : undefined
                            }
                        >
                            {obj.name}
                        </Chip>
                    </Link>
                )
            }))}
        </div>
    )
}