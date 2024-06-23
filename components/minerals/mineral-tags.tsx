import { mineralListItem } from "@/types/types";
import { Chip, Avatar } from "@nextui-org/react";
import Link from "next/link";

export default function MineralTags({ tags }: { tags: mineralListItem[] }) {
    return (
        <>
            {(tags?.map((obj: mineralListItem, index) => {
                return (
                    <Link href={`/minerals/${obj.id}`} key={index}>
                        <Chip className="mr-1 min-h-[28px]"
                            size="lg"
                            key={index}
                            variant="bordered"
                            avatar={
                                <Avatar
                                    name="JW"
                                    src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
                                />
                            }
                        >
                            {obj.name}
                        </Chip>
                    </Link>
                )
            }))}
        </>
    )
}