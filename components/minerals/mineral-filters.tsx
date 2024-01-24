"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Accordion, AccordionItem, Slider, CheckboxGroup, Checkbox, Input, Chip } from "@nextui-org/react";
import { Search as MagnifyingGlassIcon } from 'lucide-react';
import { useDebounce } from 'use-debounce';

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

export default function MineralPageLayout({
    filterObj,
    handleInput
}: {
    filterObj: MineralsFilterObj | undefined,
    handleInput?: any
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
    const [lustersVal, setLustersVal] = useState<string[] | undefined>(lusters);
    let hardnessNewState = [];
    if (minHardness && maxHardness) {
        hardnessNewState.push(minHardness);
        hardnessNewState.push(maxHardness);
    }
    const [hardnessVal, setHardnessVal] = useState<number[] | undefined>(hardnessNewState.length > 0 ? hardnessNewState : undefined);
    const [isLusterInvalid, setIsLusterInvalid] = useState(false);
    const [searchQuery] = useDebounce(searchText, 500);

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
        if (handleInput) {
        handleInput(searchQuery);
        }
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
    }, [hardnessVal]);

    useEffect(() => {
        if (!name) {
            setSearchText("");
        }
        if (!minHardness && !maxHardness) {
            let hardnessNewState = [];
            if (minHardness && maxHardness) {
                hardnessNewState.push(0);
                hardnessNewState.push(10);
            }

            setHardnessVal(hardnessNewState.length > 0 ? hardnessNewState.map(Number) : undefined);
        }
        if (!lusters) {
            setLustersVal(undefined);
        }
        console.log("searchParamChange" + name);
    }, [searchParams]);

    return (
        <>
            <div className="w-80">
                <Input
                    type="text"
                    label="Search"
                    placeholder="Search"
                    value={searchText}
                    labelPlacement="outside"
                    onChange={e => setSearchText(e.target.value)}
                    endContent={
                        <MagnifyingGlassIcon />
                    }
                />
                <Accordion>
                    <AccordionItem key="hardness" aria-label="Hardness" title="Hardness">
                        <Slider
                            label="Hardness"
                            step={1}
                            showTooltip={true}
                            color="foreground"
                            minValue={0}
                            maxValue={10}
                            defaultValue={[0, 10]}
                            className="max-w-[220px]"
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
                            defaultValue={["silky", "vitreous", "waxy", "submetallic", "metallic", "resinous", "pearly", "greasy", "dull", "adamantine"]}
                            value={lustersVal}
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
        </>
    );
}
