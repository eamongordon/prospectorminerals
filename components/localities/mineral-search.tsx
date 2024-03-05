import { Listbox, ListboxItem, Spinner, Avatar } from "@nextui-org/react";
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchMinerals } from '@/lib/actions';

export default async function mineralSelectWraper() {
    const photosQuery = await fetchMinerals({ filterObj: undefined, cursor: undefined, limit: 10 });
    /*
    const [mineralList, setMineralList] = useState<any[]>([])
    const [ref, inView] = useInView();
    const mineralsIsFetched = useRef(false);
    const [chemistryInput, setChemistryInput] = useState("");
    const [page, setPage] = useState<number | undefined>(undefined);
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
    return (
        <Listbox
            items={mineralList}
            aria-label="Dynamic Actions"
            onAction={(key) => alert(key)}
            classNames={{
                base: "max-w-xs",
                list: "max-h-[300px] overflow-auto",
            }}
            bottomContent={
                <div
                    ref={ref}
                    className={`${!page && mineralsIsFetched.current ? "hidden" : ""} mt-16 mb-16 flex items-center justify-center col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3`}
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
    */
   return null;
}