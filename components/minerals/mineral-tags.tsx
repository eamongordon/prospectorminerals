import type { MineralListItem } from "@/types/types";
import { Chip, Avatar } from "@nextui-org/react";
import Link from "next/link";

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
                            classNames={{ base: 'hover:opacity-80' }}
                            avatar={obj.image ?
                                <Avatar
                                    src={obj.image}
                                /> : undefined
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