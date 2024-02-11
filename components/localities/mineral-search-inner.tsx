"use client";

import { Listbox, ListboxItem, Spinner, Avatar } from "@nextui-org/react";
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchMinerals } from '@/lib/actions';

export default function MineralSelect({
    initialPhotos,
    initialCursor
}: {
    initialPhotos: any[] | undefined
    initialCursor: number | undefined
}) {
    const [mineralList, setMineralList] = useState<any[]>([])
    const [ref, inView] = useInView();
    const [chemistryInput, setChemistryInput] = useState("");
    const [page, setPage] = useState<number | undefined>(initialCursor || undefined);
    async function loadMorePhotos() {
        if (page) {
            console.log("loadMoreMin")
            const photosQuery = await fetchMinerals({ filterObj: { name: chemistryInput }, cursor: page, limit: 5 });
            if (photosQuery.results?.length) {
                setPage(photosQuery.next ? photosQuery.next : undefined)
                setMineralList((prev: any[] | undefined) => [
                    ...(prev?.length ? prev : []),
                    ...photosQuery.results
                ]);
            };
        } else {
            console.log("noMoreMin")
        }
    }

    const initialRender = useRef(true);
    useEffect(() => {
        console.log("ref");
        console.log(ref);
        console.log("inView");
        console.log(inView);
        if (inView && page) {
            loadMorePhotos()
        }
    }, [inView])

    return (
        <Listbox
            items={mineralList}
            aria-label="Dynamic Actions"
            onAction={(key) => alert(key)}
            classNames={{
                base: "max-w-xs",
                list: "max-h-[300px] overflow-scroll",
            }}
            bottomContent={
                <div
                    ref={ref}
                    className={`${!page ? "hidden" : ""} mt-16 mb-16 flex items-center justify-center col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3`}
                >
                    <Spinner />
                </div>
            }
        >
            {(item) => (
                <ListboxItem
                    startContent={<Avatar alt="Argentina" className="w-6 h-6" src="https://flagcdn.com/ar.svg" />}
                    key={item.number}
                >
                    {item.name}
                </ListboxItem>
            )}

        </Listbox>
    )
}