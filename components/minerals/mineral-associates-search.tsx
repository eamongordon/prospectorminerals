"use client";

import { fetchMinerals } from '@/lib/actions';
import type { MineralDisplayFieldset } from "@/types/prisma";
import { MineralListItem } from '@/types/types';
import { Chip, Listbox, ListboxItem, Spinner, Textarea } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDebounce } from "use-debounce";
import BlurImage from '../blur-image';

export function MineralAssociatesSearch({ minerals, onChange }: { minerals?: MineralListItem[], onChange: (items: MineralListItem[] | undefined ) => void }) {
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
        loadMorePhotos(true);
    }, [chemistryQuery]);

    useEffect(() => {
        if (inView && page) {
            loadMorePhotos();
        } else if (inView && !page && !initialLoad.current) {
            loadMorePhotos(true);
        }
    }, [inView])

    async function loadMorePhotos(isInput?: boolean) {
        console.log("loadMoreAssociatesResults")
        if (isInput) {
            const photosQuery = await fetchMinerals({ filterObj: { name: chemistryQuery }, cursor: undefined, limit: 5 });
            if (!initialLoad.current) {
                initialLoad.current = true;
            }
            setPage(photosQuery.next ? photosQuery.next : undefined)
            setMineralList(photosQuery.results);
        } else {
            if (page) {
                const photosQuery = await fetchMinerals({ filterObj: { name: chemistryInput }, cursor: page, limit: 5 });
                if (photosQuery.results?.length) {
                    setPage(photosQuery.next ? photosQuery.next : undefined)
                    setMineralList((prev: any[] | undefined) => [
                        ...(prev?.length ? prev : []),
                        ...photosQuery.results
                    ]);
                };
            }
        }
    }

    return (
        <div
            onFocus={() => setIsMineralFocused(true)}
            onBlur={() => { setIsMineralFocused(false); }}
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
                    if (e.key === "Enter") {
                        e.preventDefault();
                    }
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
                    (minerals?.map((obj: MineralListItem, index) => {
                        return (
                            <Chip 
                                classNames={{ base: 'mr-1 min-h-[28px]', avatar: 'rounded-full object-cover' }}
                                size="md"
                                onClose={() => {
                                    const newArray = minerals.filter((val) => val.name !== obj.name);
                                    if (newArray.length === 0) {
                                        setMineralsVal(undefined);
                                    } else {
                                        setMineralsVal(newArray);
                                    }
                                }}
                                key={index}
                                variant="flat"
                                avatar={obj.image ?
                                    <BlurImage
                                        width={24}
                                        height={24}
                                        quality={50}
                                        alt={obj.name}
                                        className="rounded-full object-cover"
                                        src={obj.image}
                                        blurDataURL={obj.imageBlurhash || undefined}
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
                aria-label="Filter by Minerals"
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
                    base: `${isMineralFocused ? "" : "hidden"} max-h-[150px] overflow-auto subpixel-antialiased outline-none box-border text-small bg-content1 shadow-md rounded-large w-full p-1`,
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
                        startContent={item.photos.length > 0 && item.photos[0].photo.image ?
                            <BlurImage
                                width={24}
                                height={24}
                                quality={50}
                                alt={item.name}
                                className="rounded-full h-6 w-6 object-cover"
                                src={item.photos[0].photo.image}
                                blurDataURL={item.photos[0].photo.imageBlurhash || undefined}
                            /> : undefined}
                        key={item.name}
                    >
                        {item.name}
                    </ListboxItem>
                )}

            </Listbox>
        </div>)
}