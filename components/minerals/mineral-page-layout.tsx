"use client";

import { useState, useEffect, useRef, Children, cloneElement } from "react";
import { fetchMinerals } from '@/lib/actions'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Accordion, AccordionItem, Slider, CheckboxGroup, Checkbox, Input, Chip } from "@nextui-org/react";
import { Search as MagnifyingGlassIcon } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import InfiniteScrollMinerals from "./infinite-scroll-minerals";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7,
); // 7-character random string

type MineralsFilterObj = {
    name: string | undefined,
    minHardness?: number | undefined,
    maxHardness?: number | undefined,
    lusters?: string[] | undefined,
    streaks?: string[] | undefined,
    mineralClasses?: string[] | undefined,
    chemistry?: string[] | undefined,
    associates?: string[] | undefined
}

type PhotosSortObj = {
    property: string
    order: string
}

export default function MineralPageLayout({
    children,
    filterObj,
    initialPhotos,
    initialCursor,
    sort
}: {
    children: React.ReactNode;
    filterObj: MineralsFilterObj | undefined,
    initialPhotos: any[] | undefined,
    initialCursor: number | undefined
    sort?: PhotosSortObj | undefined
}) {
    /*
        const mapAccordionItems = (label: string, value: string, optionsArray: [], stateName: string) => {
            return (
                <CheckboxGroup
                    isRequired
                    description="Select lusters to filter by"
                    isInvalid={isLusterInvalid}
                    label="Select lusters"
                    defaultValue={optionsArray}
                    onValueChange={(value) => {
                        setIsLusterInvalid(value.length < 1);
                    }}
                >
                    {optionsArray.forEach((option) => {
                        <CheckboxGroup
                            isRequired
                            description="Select lusters to filter by"
                            isInvalid={isLusterInvalid}
                            label="Select lusters"
                            defaultValue={optionsArray}
                            onValueChange={(value) => {
                                setIsLusterInvalid(value.length < 1);
                            }}
                        >
                            {optionsArray.forEach(() => {
    
                            })}
                        </CheckboxGroup>
                    })}
                </CheckboxGroup>
            )
        }
    */
    const { name, minHardness, maxHardness, lusters, streaks, mineralClasses, chemistry, associates } = Object(filterObj);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const initialRender = useRef(true);
    const [searchText, setSearchText] = useState(name);
    /*
    const [initialPhotosState, setInitialPhotosState] = useState(initialPhotos); 
    const [initialCursorState, setInitialCursorState] = useState(initialCursor); 
    */
    const [lustersVal, setLustersVal] = useState<string[] | undefined>(lusters);
    let hardnessNewState = [];
    if (minHardness && maxHardness) {
        hardnessNewState.push(minHardness);
        hardnessNewState.push(maxHardness);
    }
    const [hardnessVal, setHardnessVal] = useState<number[] | undefined>(hardnessNewState.length > 0 ? hardnessNewState : undefined);
    const [isLusterInvalid, setIsLusterInvalid] = useState(false);
    const [searchQuery] = useDebounce(searchText, 500);
    /*
    const property =
        typeof searchParams.get("property") === 'string' ? searchParams.get("property") : undefined
    const order =
        typeof searchParams.get("order") === 'string' ? searchParams.get("order") : undefined
        */
    useEffect(() => {
        /*
        fetchMinerals({ filterObj: { name: name, lusters: lusters?.split(','), minHardness: Number(minHardness), maxHardness: Number(maxHardness) }, cursor: undefined, limit: 10, ...(property && order ? { sortObj: { property: property, order: order } } : {}) }).then((res) => {
            setInitialPhotosState(res.results);
            setInitialCursorState(res.next ? res.next : undefined);
        });
        console.log("did change")
        */
    }, [searchParams]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        if (!searchQuery) {
            current.delete("name");
        } else {
            current.set("name", searchQuery);
        }
        const search = current.toString();
        const queryParam = search ? `?${search}` : "";
        router.push(`${pathname}${queryParam}`);
    }, [searchQuery]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        if (!lustersVal) {
            current.delete("lusters");
        } else {
            current.set("lusters", lustersVal.join(','));
        }
        const search = current.toString();
        const queryParam = search ? `?${search}` : "";
        router.push(`${pathname}${queryParam}`);
    }, [lustersVal]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        if (!hardnessVal) {
            current.delete("minHardness");
            current.delete("maxHardness");
        } else {
            current.set("minHardness", hardnessVal[0].toString());
            current.set("maxHardness", hardnessVal[1].toString());
        }
        const search = current.toString();
        const queryParam = search ? `?${search}` : "";
        router.push(`${pathname}${queryParam}`);
        console.log(hardnessVal + "HAD")
    }, [hardnessVal]);

    const clearFilters = () => {
        setSearchText(undefined);
        setLustersVal(undefined);
        setHardnessVal(undefined);
    }

    const renderChildren = () => {
        return Children.map(children, (child) => {
            console.log(child);
            return cloneElement(child as React.ReactElement<any>, {
                clearFilters: () => clearFilters()
            });
        });
    };

    return (
        <>
            <div className="'w-full flex-col sm:flex-row">
                <div className="w-full sm:w-80">
                    <Input
                        type="text"
                        label="Search"
                        placeholder="Search"
                        value={searchText || ""}
                        labelPlacement="outside"
                        onChange={e => setSearchText(e.target.value)}
                        endContent={
                            <MagnifyingGlassIcon />
                        }
                    />
                    <Accordion>
                        <AccordionItem key="hardness" aria-label="Hardness" title="Hardness">
                            <Slider
                                label="Mohs Hardness"
                                step={1}
                                showTooltip={true}
                                color="foreground"
                                minValue={0}
                                maxValue={10}
                                defaultValue={[0, 10]}
                                value={hardnessVal || [0, 10]}
                                className="w-full pr-3"
                                onChangeEnd={value => setHardnessVal(value as number[])}
                            />
                        </AccordionItem>
                        <AccordionItem key="2" aria-label="Lusters" title="Lusters">
                            <CheckboxGroup
                                isRequired
                                color="default"
                                description="Select lusters to filter by"
                                isInvalid={isLusterInvalid}
                                label="Select lusters"
                                value={lustersVal || ["silky", "vitreous", "waxy", "submetallic", "metallic", "resinous", "pearly", "greasy", "dull", "adamantine"]}
                                defaultValue={["silky", "vitreous", "waxy", "submetallic", "metallic", "resinous", "pearly", "greasy", "dull", "adamantine"]}
                                onValueChange={(value) => {
                                    setIsLusterInvalid(value.length < 1);
                                    setLustersVal(value);
                                }}
                            >
                                <Checkbox value="silky">Silky</Checkbox>
                                <Checkbox value="vitreous">Vitreous</Checkbox>
                                <Checkbox value="waxy">Waxy</Checkbox>
                                <Checkbox value="submetallic">Submetallic</Checkbox>
                                <Checkbox value="metallic">Metallic</Checkbox>
                                <Checkbox value="resinous">Resinous</Checkbox>
                                <Checkbox value="pearly">Pearly</Checkbox>
                                <Checkbox value="greasy">Greasy</Checkbox>
                                <Checkbox value="dull">Dull</Checkbox>
                                <Checkbox value="adamantine">Adamantine</Checkbox>
                            </CheckboxGroup>
                        </AccordionItem>

                    </Accordion>
                </div>
            </div>
            <div className="flex-col items-center w-full">
                <div className="justify-start">
                    {
                        (searchText) ? (
                            <Chip onClose={() => setSearchText(undefined)} variant="bordered">
                                {`Name: ${searchText}`}
                            </Chip>
                        ) : (
                            <></>
                        )
                    }
                    {
                        (hardnessVal) ? (
                            <Chip onClose={() => setHardnessVal(undefined)} variant="bordered">
                                {`Hardness: ${hardnessVal[0].toString()} - ${hardnessVal[1].toString()}`}
                            </Chip>
                        ) : (
                            <></>
                        )
                    }
                    {
                        (lustersVal) ? (
                            <Chip onClose={() => setLustersVal(undefined)} variant="bordered">
                                {`Lusters: ${lustersVal.length}`}
                            </Chip>
                        ) : (
                            <></>
                        )
                    }
                </div>
                    {renderChildren()}
            </div>
        </>
    );
}
