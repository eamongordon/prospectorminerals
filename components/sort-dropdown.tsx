'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Select, SelectItem } from "@heroui/react";

const defaultSortOptions = [
    { label: "Default", value: "default" },
    { label: "A - Z", value: "name,asc" },
    { label: "Z - A", value: "name,desc" },
    { label: "Recently Updated", value: "updatedAt,desc" },
];

export default function SortDropdown({ sort, sortOptions }: { sort?: string, sortOptions?: { label: string, value: string }[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const initialRender = useRef(true);
    const [query, setQuery] = useState(sort);
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        // now you got a read/write object
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        // update as necessary
        if (!query) {
            current.delete("property");
            current.delete("order");
        } else {
            const orderArray = query.split(",");
            const property = orderArray.length > 0 ? orderArray[0] : undefined;
            const order = orderArray.length > 1 ? orderArray[1] : undefined;
            if (property) {
                current.set("property", property);
            }
            if (order) {
                current.set("order", order);
            }
        }
        // cast to string
        const search = current.toString();
        // or const query = `${'?'.repeat(search.length && 1)}${search}`;
        const queryParam = search ? `?${search}` : "";

        router.push(`${pathname}${queryParam}`);

    }, [query])

    return (
        <div className='relative'>
            <Select
                label="Sort By"
                size="sm"
                radius='md'
                aria-label="Sort By"
                defaultSelectedKeys={query ? [query] : undefined}
                onChange={(event) => {
                    if (event.target.value && event.target.value !== "default") {
                        setQuery(event.target.value)
                    } else {
                        setQuery(undefined);
                    }
                }
                }
            >
                {(sortOptions || defaultSortOptions).map((item) => (
                    <SelectItem key={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </Select>
        </div>
    )
}
