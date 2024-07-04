"use client";

import { fetchMinerals } from '@/lib/actions';
import type { MineralDisplayFieldset } from "@/types/prisma";
import { MineralListItem } from '@/types/types';
import { Avatar, Chip, Listbox, ListboxItem, Spinner, Textarea } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDebounce } from "use-debounce";

export function MineralAssociatesSearch({ minerals, onChange }: { minerals?: MineralListItem[], onChange: any }) {
    const [mineralsVal, setMineralsVal] = useState<MineralListItem[] | undefined>(minerals);
    const [mineralList, setMineralList] = useState<MineralDisplayFieldset[]>([])
    const [ref, inView] = useInView();
    const [chemistryInput, setChemistryInput] = useState<string | undefined>(undefined);
    const [isMineralFocused, setIsMineralFocused] = useState(false);
    const [page, setPage] = useState<number | undefined>(undefined);
    const [chemistryQuery] = useDebounce(chemistryInput, 500);

    useEffect(() => {
        onChange(mineralsVal);
    }, [mineralsVal]);
    
    useEffect(() => {
       if (minerals) {
            setIsMineralFocused(false)
       }
    }, [minerals]);

    const initialRender = useRef(true);
    const initialLoad = useRef(false);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        console.log("CHEMISTRYQUERYCHANGE");
        console.log(chemistryQuery ? chemistryQuery : "NOQUERY")
        loadMorePhotos(true);
    }, [chemistryQuery]);

    useEffect(() => {
        console.log("REFinView");
        console.log(inView);
        console.log(page ? "HASPAGE" : "NOPAGE")
        if (inView && page) {
            loadMorePhotos();
        }
    }, [inView])

    async function loadMorePhotos(isInput?: boolean) {
        if (isInput) {
            console.log("inputNum" + chemistryInput)
            const photosQuery = await fetchMinerals({ filterObj: { name: chemistryInput }, cursor: undefined, limit: 5 });
            if (!initialLoad.current) {
                initialLoad.current = true;
            }
            console.log(photosQuery.results)
            setPage(photosQuery.next ? photosQuery.next : undefined)
            setMineralList(photosQuery.results);
        } else {
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
    }

    return (<div
        //contentEditable="true"
        onFocus={() => setIsMineralFocused(true)}
        onBlur={() => { setIsMineralFocused(false); console.log("blur") }}
    >
        <Textarea
            type="text"
            label="Minerals"
            placeholder={!minerals ? 'Try "Malachite"' : ""}
            value={chemistryInput || ""}
            /*
            classNames={{
                innerWrapper: ['overflow-x-auto', 'overflow-y-clip'],
                input: ['min-w-8']
            }}
        */
            classNames={{
                innerWrapper: ['flex flex-wrap'],
                //display chips below input, add margin
                input: [minerals ? 'mb-1' : null]
                //input: [`${`w-[${chemistryInput.length * 10}px]`} flex-none`]
            }}
            minRows={1}
            size="md"
            onValueChange={(value) => { setChemistryInput(value); }}
            onKeyDown={(e) => {
                /*
                if (e.key === "Enter") {
                    let currentChemistry = chemistryVal ? [...chemistryVal] : [];
                    currentChemistry?.push(e.currentTarget.value);
                    console.log(e.currentTarget.value.toString())
                    setChemistryVal(currentChemistry);
                    setChemistryInput("");
                    e.preventDefault();
                }
                */
                if (e.key === "Backspace" && !e.currentTarget.value.length) {
                    let currentChemistry = minerals ? [...minerals] : [];
                    currentChemistry?.pop();
                    if (currentChemistry.length > 0) {
                        setMineralsVal(currentChemistry);
                    } else {
                        setMineralsVal(undefined);
                    }
                }

                setTimeout(() => {
                    if (e.key === "Backspace" && e.currentTarget.value === chemistryInput) {
                        let currentChemistry = minerals ? [...minerals] : [];
                        currentChemistry?.pop();
                        if (currentChemistry.length > 0) {
                            setMineralsVal(currentChemistry);
                        } else {
                            setMineralsVal(undefined);
                        }
                    }
                }, 200)

            }}
            //display chips below input, change to endContent
            endContent={
                (minerals?.map((obj: any, index) => {
                    return (
                        <Chip className="mr-1 min-h-[28px]"
                            size="md"
                            onClose={() => {
                                const newArray = minerals.filter((val) => val.name !== obj.name);
                                if (newArray.length === 0) {
                                    setMineralsVal(undefined);
                                } else {
                                    setMineralsVal(newArray);
                                }
                                //setTimeout(() => {
                                console.log("cheminput - " + chemistryInput)
                                //}, 200)
                            }}
                            key={index}
                            variant="bordered"
                            avatar={ obj.image ? 
                                <Avatar
                                    src={obj.image}
                                /> : undefined
                            }
                        >
                            {obj.name}
                        </Chip>
                    )
                }))
            }
        />
        <Listbox
            items={mineralList}
            aria-label="Dynamic Actions"
            onAction={(key) => {
                const MineralListItem = mineralList.find((mineral) => mineral.name === key) as MineralDisplayFieldset;
                const newObject = {
                    name: MineralListItem.name,
                    image: MineralListItem.photos.length > 0 && MineralListItem.photos[0].photo.image ? MineralListItem.photos[0].photo.image : undefined,
                }
                let currentChemistry = minerals ? [...minerals] : [];
                currentChemistry?.push(newObject);
                setMineralsVal(currentChemistry);
                setChemistryInput("");
            }}
            disabledKeys={minerals?.map((val) => val.name)}
            classNames={{
                base: `${isMineralFocused ? "" : "hidden"} max-h-[150px] overflow-auto no-scrollbar subpixel-antialiased outline-none box-border text-small bg-content1 shadow-md rounded-large w-full p-1`,
                list: initialLoad.current ? "" : "hidden"
            }}
            emptyContent={
                initialLoad.current ? <>No results found.</> : <></>
            }
            bottomContent={
                <div
                    ref={ref}
                    className={`${!page && initialLoad.current ? "hidden" : ""} my-2 flex items-center justify-center col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3`}
                >
                    <Spinner />
                </div>
            }
        >
            {(item) => (
                <ListboxItem
                    startContent={item.photos.length > 0 && item.photos[0].photo.image ? <Avatar alt={item.name} className="w-6 h-6" src={item.photos[0].photo.image} /> : undefined}
                    key={item.name}
                /*
                endContent={chemistryVal?.includes(item.key) ? (
                    <Check height={12} />
                ) : (<></>)}
                */
                >
                    {item.name}
                </ListboxItem>
            )}

        </Listbox>
    </div>)
}