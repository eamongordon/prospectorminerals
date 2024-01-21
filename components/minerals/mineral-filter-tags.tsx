"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Chip } from "@nextui-org/react";
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

export default function MineralFilterTags({
    filterObj
}: {
    filterObj: MineralsFilterObj | undefined
}) {
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


    const name =
    typeof searchParams.get("name") === 'string' ? searchParams.get("name") : undefined;
    const lusters =
        typeof searchParams.get("lusters") === 'string' ? searchParams.get("lusters") : undefined
    const minHardness =
        typeof searchParams.get("minHardness") === 'string' ? searchParams.get("minHardness") : undefined
    const maxHardness =
        typeof searchParams.get("maxHardness") === 'string' ? searchParams.get("maxHardness") : undefined


    const [searchText, setSearchText] = useState(name);
    const [lustersVal, setLustersVal] = useState<string[] | undefined>(lusters?.split(',') as string[] | undefined);
    let hardnessNewState = [];
    if (minHardness && maxHardness) {
        hardnessNewState.push(minHardness);
        hardnessNewState.push(maxHardness);
    }
    const [hardnessVal, setHardnessVal] = useState<number[] | undefined>(hardnessNewState.length > 0 ? hardnessNewState.map(Number) : undefined);
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        if (!searchText) {
            current.delete("name");
        } else {
            current.set("name", searchText);
        }
        const search = current.toString();
        const queryParam = search ? `?${search}` : "";
        router.push(`${pathname}${queryParam}`);
    }, [searchText]);

    useEffect(() => {
        setSearchText(name);
        let hardnessNewState = [];
        if (minHardness && maxHardness) {
            hardnessNewState.push(minHardness);
            hardnessNewState.push(maxHardness);
        }
        setHardnessVal(hardnessNewState.length > 0 ? hardnessNewState.map(Number) : undefined);
        setLustersVal(lusters?.split(',') as string[] | undefined);
    }, [searchParams]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        if (!lustersVal) {
            current.delete("lusters");
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
        }
        const search = current.toString();
        const queryParam = search ? `?${search}` : "";
        router.push(`${pathname}${queryParam}`);
    }, [hardnessVal]);

    return (
        <>
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
        </>
    );
}
