"use client";

import { Listbox, ListboxItem, Spinner, Avatar, Chip, Textarea } from "@nextui-org/react";
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchMinerals } from '@/lib/actions';
import { useDebounce } from "use-debounce";

export default function MineralSelect({
    initialPhotos,
    initialCursor
}: {
    initialPhotos: any[] | undefined
    initialCursor: number | undefined
}) {
    const [mineralList, setMineralList] = useState<any[]>(initialPhotos || [])
    const [ref, inView] = useInView();
    const [chemistryInput, setChemistryInput] = useState("");
    const [chemistryQuery] = useDebounce(chemistryInput, 500);
    const [chemistryVal, setChemistryVal] = useState<string[] | undefined>([]);
    const [page, setPage] = useState<number | undefined>(initialCursor || undefined);

    async function loadMorePhotos(isInput?: boolean) {
        if (isInput) {
            console.log("inputNum" + chemistryInput)
            const photosQuery = await fetchMinerals({ filterObj: { name: chemistryInput }, cursor: undefined, limit: 5 });
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

    const initialRender = useRef(true);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        console.log("chemistryKey");
        loadMorePhotos(true);
    }, [chemistryQuery]);

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
        <>
            <Textarea
                type="text"
                label="Chemical Formulas"
                //description='Type an element or formula and hit "enter"'
                placeholder={!chemistryVal ? 'Try "Cu" or "SiO2"' : ""}
                value={chemistryInput || ""}
                /*
                classNames={{
                    innerWrapper: ['overflow-x-auto', 'overflow-y-clip'],
                    input: ['min-w-8']
                }}
            */
                classNames={{
                    innerWrapper: ['flex flex-wrap'],
                    //input: [`${`w-[${chemistryInput.length * 10}px]`} flex-none`]
                }}
                minRows={1}
                labelPlacement="outside"
                size="md"
                onValueChange={(value) => { setChemistryInput(value); }}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        setChemistryInput("");
                    }
                }}
                onKeyDown={(e) => {
                    /*
                    if (e.key === "Enter") {
                        let currentChemistry = chemistryVal ? [...chemistryVal] : [];
                        currentChemistry?.push(e.currentTarget.value.replace('↵', ''));
                        console.log(e.currentTarget.value.toString())
                        setChemistryVal(currentChemistry);
                        setChemistryInput("");
                    }
                    */
                    if (e.key === "Backspace" && !e.currentTarget.value.length) {
                        let currentChemistry = chemistryVal ? [...chemistryVal] : [];
                        currentChemistry?.pop();
                        if (currentChemistry.length > 0) {
                            setChemistryVal(currentChemistry);
                        } else {
                            setChemistryVal(undefined);
                        }
                    }

                    setTimeout(() => {
                        if (e.key === "Backspace" && e.currentTarget.value === chemistryInput) {
                            let currentChemistry = chemistryVal ? [...chemistryVal] : [];
                            currentChemistry?.pop();
                            if (currentChemistry.length > 0) {
                                setChemistryVal(currentChemistry);
                            } else {
                                setChemistryVal(undefined);
                            }
                        }
                    }, 200)

                }}
                startContent={
                    (chemistryVal?.map((val: string, index) => {
                        return (
                            <Chip className="mr-1 min-h-[28px] mb-1"
                                size="md"
                                onClose={() => {
                                    const newArray = chemistryVal.filter((chemval) => chemval !== val);
                                    if (newArray.length === 0) {
                                        setChemistryVal(undefined);
                                    } else {
                                        setChemistryVal(newArray);
                                    }
                                    //setTimeout(() => {
                                    console.log("cheminput - " + chemistryInput)
                                    //}, 200)
                                }}
                                key={index}
                                variant="bordered"
                                avatar={
                                    <Avatar
                                      name="JW"
                                      src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
                                    />
                                  }
                            >
                                {val}
                            </Chip>
                        )
                    }))
                }
            />
            <Listbox
                items={mineralList}
                aria-label="Dynamic Actions"
                onAction={(key) => {
                    let currentChemistry = chemistryVal ? [...chemistryVal] : [];
                    currentChemistry?.push(key as string);
                    setChemistryVal(currentChemistry);
                    setChemistryInput("");
                }}
                disabledKeys={chemistryVal}
                classNames={{
                    base: "max-w-xs max-h-[150px] overflow-scroll no-scrollbar",
                    list: "",
                }}
                bottomContent={
                    <div
                        ref={ref}
                        className={`${!page ? "hidden" : ""} my-2 flex items-center justify-center col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3`}
                    >
                        <Spinner />
                    </div>
                }
            >
                {(item) => (
                    <ListboxItem
                        startContent={<Avatar alt="Argentina" className="w-6 h-6" src="https://flagcdn.com/ar.svg" />}
                        key={item.name}
                    >
                        {item.name}
                    </ListboxItem>
                )}

            </Listbox>
        </>
    )
}