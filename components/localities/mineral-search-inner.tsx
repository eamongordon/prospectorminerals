//Move into main locality component. Place chemistryVal (The selected minerals) as query param with object containing mineral name and image

"use client";

import { Listbox, ListboxItem, Spinner, Avatar, Chip, Textarea } from "@nextui-org/react";
import { useState, useEffect, useRef } from 'react';
import { Check } from "lucide-react";
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
    const [mineralList, setMineralList] = useState<mineralListItem[]>(initialPhotos || [])
    const [ref, inView] = useInView();
    const [chemistryInput, setChemistryInput] = useState("");
    const [chemistryQuery] = useDebounce(chemistryInput, 500);
    const [chemistryVal, setChemistryVal] = useState<any[] | undefined>(undefined);
    const [isMineralFocused, setIsMineralFocused] = useState(false);
    const [page, setPage] = useState<number | undefined>(initialCursor || undefined);

    type mineralListItem = {
        name: string,
        image?: string
    }

    async function loadMorePhotos(isInput?: boolean) {
        if (isInput) {
            console.log("inputNum" + chemistryInput)
            const photosQuery = await fetchMinerals({ filterObj: { name: chemistryInput }, cursor: undefined, limit: 5 });
            setPage(photosQuery.next ? photosQuery.next : undefined)
            setMineralList(photosQuery.results);
        } else {
            if (page) {
                console.log("loadMoreLocalities")
                const photosQuery = await fetchMinerals({ filterObj: { name: chemistryInput }, cursor: page, limit: 5 });
                if (photosQuery.results?.length) {
                    setPage(photosQuery.next ? photosQuery.next : undefined)
                    setMineralList((prev: any[] | undefined) => [
                        ...(prev?.length ? prev : []),
                        ...photosQuery.results
                    ]);
                };
            } else {
                console.log("noMoreLocalities")
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

    useEffect(() => {
        console.log(chemistryVal);
    }, [chemistryVal])

    return (
        <>
            <div
                //contentEditable="true"
                onFocus={() => setIsMineralFocused(true)}
                onBlur={() => { setIsMineralFocused(false); console.log("blur") }}
            >
                <Textarea
                    type="text"
                    label="Chemical Formulas"
                    description='Type an element or formula and hit "enter"'
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
                        //display chips below input, add margin
                        input: [chemistryVal ? 'mb-1' : null]
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
                    //display chips below input, change to endContent
                    endContent={
                        (chemistryVal?.map((obj: mineralListItem, index) => {
                            return (
                                <Chip className="mr-1 min-h-[28px]"
                                    size="md"
                                    onClose={() => {
                                        const newArray = chemistryVal.filter((val) => val.name !== obj.name);
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
                                    {obj.name}
                                </Chip>
                            )
                        }))
                    }
                />
                <Listbox
                    items={mineralList}
                    emptyContent={
                        <>No results found.</>
                    }
                    aria-label="Dynamic Actions"
                    onAction={(key) => {
                        const mineralListItem = mineralList.find((mineral) => mineral.name === key) as mineralListItem;
                        const newObject = {
                            name: mineralListItem.name,
                            image: 'https://i.pravatar.cc/300?u=a042581f4e29026709d',
                        }
                        let currentChemistry = chemistryVal ? [...chemistryVal] : [];
                        currentChemistry?.push(newObject);
                        setChemistryVal(currentChemistry);
                        setChemistryInput("");
                    }}
                    disabledKeys={chemistryVal?.map((val) => val.name)}
                    classNames={{
                        base: `${isMineralFocused ? "" : "hidden"} max-h-[150px] overflow-auto no-scrollbar subpixel-antialiased outline-none box-border text-small bg-content1 shadow-md rounded-large w-full p-1`,
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
            </div>
        </>
    )
}