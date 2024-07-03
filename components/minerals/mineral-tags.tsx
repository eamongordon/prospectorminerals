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
                                    src={obj.image}
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