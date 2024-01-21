"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Accordion, AccordionItem, Slider, CheckboxGroup, Checkbox, Input } from "@nextui-org/react";
import { Search as MagnifyingGlassIcon } from 'lucide-react';
import { useDebounce } from 'use-debounce';

export default function MineralFilters({ name, lusters, hardness }: { name?: string, lusters?:string[] | undefined, hardness?:number[] | undefined }) {
    const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
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
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const initialRender = useRef(true);
    const [searchText, setSearchText] = useState(name);
    const [lustersVal, setLustersVal] = useState<String[] | undefined>(lusters);
    const [hardnessVal, setHardnessVal] = useState<number[] | undefined>(hardness);
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
            current.delete("hardness");
        } else {
            current.set("hardness", hardnessVal.join(','));
        }
        const search = current.toString();
        const queryParam = search ? `?${search}` : "";
        router.push(`${pathname}${queryParam}`);
    }, [hardnessVal]);

    return (
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
                        value={hardnessVal}
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
                <AccordionItem key="3" aria-label="Streak" title="Streak">
                    {defaultContent}
                </AccordionItem>

            </Accordion>
        </div>
    );
}
