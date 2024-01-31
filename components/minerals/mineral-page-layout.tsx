"use client";

import { useState, useEffect, useRef, Children, cloneElement } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Accordion, AccordionItem, Slider, CheckboxGroup, Checkbox, Input, Chip, Button, Textarea } from "@nextui-org/react";
import { Search as MagnifyingGlassIcon, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { useDebounce } from 'use-debounce';

type MineralsFilterObj = {
    name: string | undefined,
    minHardness?: number | undefined,
    maxHardness?: number | undefined,
    lusters?: string[] | undefined,
    streaks?: string[] | undefined,
    mineralClasses?: string[] | undefined,
    crystalSystems?: string[] | undefined,
    chemistry?: string[] | undefined,
    associates?: string[] | undefined
}

type PhotosSortObj = {
    property: string
    order: string
}

export default function MineralPageLayout({
    infiniteScrollElem,
    sortDropdownElem,
    filterObj,
    initialPhotos,
    initialCursor,
    sort
}: {
    infiniteScrollElem: React.ReactElement,
    sortDropdownElem: React.ReactElement,
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
    const { name, minHardness, maxHardness, lusters, streaks, mineralClasses, crystalSystems, chemistry, associates } = Object(filterObj);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isMobileFiltersOpen, setIsisMobileFiltersOpen] = useState(false);

    const initialRender = useRef(true);
    const initialLusterRender = useRef(true);
    const initialMineralClassRender = useRef(true);
    const initialCrystalSystemsRender = useRef(true);
    const initialHardnessRender = useRef(true);
    const initialChemistryRender = useRef(true);
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
    const [mineralClassVal, setMineralClassVal] = useState<string[] | undefined>(mineralClasses);
    const [crystalSystemsVal, setCrystalSystemsVal] = useState<string[] | undefined>(crystalSystems);
    const [isMineralClassInvalid, setIsMineralClassInvalid] = useState(false);
    const [isCrystalSystemsInvalid, setIsCrystalSystemsInvalid] = useState(false);
    const [chemistryVal, setChemistryVal] = useState<string[] | undefined>(chemistry);
    const [chemistryInput, setChemistryInput] = useState("");
    const [isLusterInvalid, setIsLusterInvalid] = useState(false);
    const [searchQuery] = useDebounce(searchText, 500);
    /*
    const property =
        typeof searchParams.get("property") === 'string' ? searchParams.get("property") : undefined
    const order =
        typeof searchParams.get("order") === 'string' ? searchParams.get("order") : undefined
        */

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
        if (initialLusterRender.current) {
            //TO REMOVE
            console.log("initialRenderLusters");
            initialLusterRender.current = false
            return
        }
        //TO REMOVE
        console.log("afterInitialRenderLusters");
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
        if (initialMineralClassRender.current) {
            initialMineralClassRender.current = false
            return
        }
        //TO REMOVE
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        if (!mineralClassVal) {
            current.delete("mineralClasses");
        } else {
            current.set("mineralClasses", mineralClassVal.join(','));
        }
        const search = current.toString();
        const queryParam = search ? `?${search}` : "";
        router.push(`${pathname}${queryParam}`);
    }, [mineralClassVal]);

    useEffect(() => {
        if (initialCrystalSystemsRender.current) {
            initialCrystalSystemsRender.current = false
            return
        }
        //TO REMOVE
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        if (!crystalSystemsVal) {
            current.delete("crystalSystems");
        } else {
            current.set("crystalSystems", crystalSystemsVal.join(','));
        }
        const search = current.toString();
        const queryParam = search ? `?${search}` : "";
        router.push(`${pathname}${queryParam}`);
    }, [crystalSystemsVal]);

    useEffect(() => {
        if (initialChemistryRender.current) {
            initialChemistryRender.current = false
            return
        }
        console.log("UseEffectChemistryChange");
        //TO REMOVE
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        if (!chemistryVal) {
            current.delete("chemistry");
        } else {
            current.set("chemistry", chemistryVal.join(','));
        }
        //setChemistryInput("");
        const search = current.toString();
        const queryParam = search ? `?${search}` : "";
        router.push(`${pathname}${queryParam}`);
    }, [chemistryVal]);

    useEffect(() => {
        if (initialHardnessRender.current) {
            initialHardnessRender.current = false
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

    const clearFilters = () => {
        setSearchText(undefined);
        setLustersVal(undefined);
        setHardnessVal(undefined);
        setMineralClassVal(undefined);
        setCrystalSystemsVal(undefined);
        setChemistryVal(undefined);
    }

    const renderChildren = () => {
        return Children.map(infiniteScrollElem, (child) => {
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
                        placeholder="Search"
                        value={searchText || ""}
                        labelPlacement="outside"
                        size="md"
                        onChange={e => setSearchText(e.target.value)}
                        endContent={
                            <MagnifyingGlassIcon />
                        }
                    />
                    <Button
                        className="sm:hidden h-11 w-full mb-2 mt-3 bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-600 hover:bg-gray-200 justify-between px-3"
                        startContent={<Filter height={18} />}
                        endContent={
                            isMobileFiltersOpen ? (<ChevronUp />) : (<ChevronDown />)
                        }
                        onPress={() => {
                            if (isMobileFiltersOpen) {
                                setIsisMobileFiltersOpen(false);
                            } else {
                                setIsisMobileFiltersOpen(true);
                            }
                        }}
                    >{isMobileFiltersOpen ? "Close Filters" : "Open Filters"}</Button>
                    <div className={`${isMobileFiltersOpen ? "contents sm:contents" : "hidden sm:contents"}`}>
                        <Accordion>
                            <AccordionItem key="hardness" aria-label="Hardness" title="Hardness">
                                <Slider
                                    label="Mohs Hardness"
                                    step={1}
                                    showTooltip={true}
                                    color="foreground"
                                    minValue={0}
                                    maxValue={10}
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
                                    value={lustersVal || ["Silky", "Vitreous", "Waxy", "Submetallic", "Metallic", "Resinous", "Pearly", "Greasy", "Dull", "Adamantine"]}
                                    onValueChange={(value) => {
                                        setIsLusterInvalid(value.length < 1);
                                        setLustersVal(value);
                                    }}
                                >
                                    <Checkbox value="Silky">Silky</Checkbox>
                                    <Checkbox value="Vitreous">Vitreous</Checkbox>
                                    <Checkbox value="Waxy">Waxy</Checkbox>
                                    <Checkbox value="Submetallic">Submetallic</Checkbox>
                                    <Checkbox value="Metallic">Metallic</Checkbox>
                                    <Checkbox value="Resinous">Resinous</Checkbox>
                                    <Checkbox value="Pearly">Pearly</Checkbox>
                                    <Checkbox value="Greasy">Greasy</Checkbox>
                                    <Checkbox value="Dull">Dull</Checkbox>
                                    <Checkbox value="Adamantine">Adamantine</Checkbox>
                                </CheckboxGroup>
                            </AccordionItem>
                            <AccordionItem key="3" aria-label="Mineral Class" title="Mineral Class">
                                <CheckboxGroup
                                    isRequired
                                    color="default"
                                    description="Select mineral classes to filter by"
                                    isInvalid={isMineralClassInvalid}
                                    label="Select mineral classes"
                                    value={mineralClassVal || ["Silicates", "Phosphates", "Carbonates", "Sulfates", "Sulfides", "Halides", "Oxides", "Native Elements"]}
                                    onValueChange={(value) => {
                                        setIsMineralClassInvalid(value.length < 1);
                                        setMineralClassVal(value);
                                    }}
                                >
                                    <Checkbox value="Silicates">Silicates</Checkbox>
                                    <Checkbox value="Phosphates">Phosphates</Checkbox>
                                    <Checkbox value="Carbonates">Carbonates</Checkbox>
                                    <Checkbox value="Sulfates">Sulfates</Checkbox>
                                    <Checkbox value="Sulfides">Sulfides</Checkbox>
                                    <Checkbox value="Halides">Halides</Checkbox>
                                    <Checkbox value="Oxides">Oxides</Checkbox>
                                    <Checkbox value="Native Elements">Native Elements</Checkbox>
                                </CheckboxGroup>
                            </AccordionItem>
                            <AccordionItem key="4" aria-label="Crystal Systems" title="Crystal Systems">
                                <CheckboxGroup
                                    isRequired
                                    color="default"
                                    description="Select crystal systems to filter by"
                                    isInvalid={isCrystalSystemsInvalid}
                                    label="Select crystal systems"
                                    value={crystalSystemsVal || ["Tetragonal", "Isometric", "Hexagonal", "Triclinic", "Monoclinic", "Trigonal", "Orthorhombic"]}
                                    onValueChange={(value) => {
                                        setIsCrystalSystemsInvalid(value.length < 1);
                                        setCrystalSystemsVal(value);
                                    }}
                                >
                                    <Checkbox value="Tetragonal">Tetragonal</Checkbox>
                                    <Checkbox value="Isometric">Isometric</Checkbox>
                                    <Checkbox value="Hexagonal">Hexagonal</Checkbox>
                                    <Checkbox value="Triclinic">Triclinic</Checkbox>
                                    <Checkbox value="Monoclinic">Monoclinic</Checkbox>
                                    <Checkbox value="Trigonal">Trigonal</Checkbox>
                                    <Checkbox value="Orthorhombic">Orthorhombic</Checkbox>
                                </CheckboxGroup>
                            </AccordionItem>
                            <AccordionItem key="5" aria-label="Chemistry" title="Chemistry">
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
                                        innerWrapper: ['flex flex-wrap']
                                    }}
                                    minRows={1}
                                    labelPlacement="outside"
                                    size="md"
                                    onValueChange={(value) => { setChemistryInput(value);}}
                                    onKeyUp={(e) => {
                                        if (e.key === "Enter") {
                                            let currentChemistry = chemistryVal ? [...chemistryVal] : [];
                                            currentChemistry?.push(e.currentTarget.value);
                                            setChemistryVal(currentChemistry);
                                            setChemistryInput("");
                                        } else if (e.key === "Backspace" && !chemistryInput.length) {
                                            let currentChemistry = chemistryVal ? [...chemistryVal] : [];
                                            currentChemistry?.pop();
                                            if (currentChemistry.length > 0) {
                                                setChemistryVal(currentChemistry);
                                            } else {
                                                setChemistryVal(undefined);
                                            }
                                        }
                                    }}
                                    startContent={
                                        (chemistryVal?.map((val:string, index) => {
                                            return (
                                                <Chip className="mr-1"
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
                                                >
                                                    {val}
                                                </Chip>
                                            )
                                        }))
                                    }
                                />
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
            <div className="flex-col items-center w-full">
                <div className='mb-4 sm:mb-5 flex-row sm:flex sm:gap-x-10 items-center justify-between'>
                    <div className={`sm:basis-2/3 justify-start pt-1 sm:pt-0`}>
                        {
                            (searchText) ? (
                                <Chip className="mr-1 mb-3 sm:mb-1" onClose={() => setSearchText(undefined)} variant="bordered">
                                    {`Name: ${searchText}`}
                                </Chip>
                            ) : (
                                <></>
                            )
                        }
                        {
                            (hardnessVal) ? (
                                <Chip className="mr-1 mb-3 sm:mb-1" onClose={() => setHardnessVal(undefined)} variant="bordered">
                                    {`Hardness: ${hardnessVal[0].toString()} - ${hardnessVal[1].toString()}`}
                                </Chip>
                            ) : (
                                <></>
                            )
                        }
                        {
                            (lustersVal) ? (
                                <Chip className="mr-1 mb-3 sm:mb-1" onClose={() => setLustersVal(undefined)} variant="bordered">
                                    {`Lusters: ${lustersVal.length}`}
                                </Chip>
                            ) : (
                                <></>
                            )
                        }
                        {
                            (mineralClassVal) ? (
                                <Chip className="mr-1 mb-3 sm:mb-1" onClose={() => setMineralClassVal(undefined)} variant="bordered">
                                    {`Mineral Classes: ${mineralClassVal.length}`}
                                </Chip>
                            ) : (
                                <></>
                            )
                        }
                        {
                            (crystalSystemsVal) ? (
                                <Chip className="mr-1 mb-3 sm:mb-1" onClose={() => setCrystalSystemsVal(undefined)} variant="bordered">
                                    {`Crystal Systems: ${crystalSystemsVal.length}`}
                                </Chip>
                            ) : (
                                <></>
                            )
                        }
                        {
                            (chemistryVal) ? (
                                <Chip className="mr-1 mb-3 sm:mb-1" onClose={() => setChemistryVal(undefined)} variant="bordered">
                                    {`Chemistry: ${chemistryVal.join(', ')}`}
                                </Chip>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                    <div className="pb-2 sm:basis-1/3">
                        {sortDropdownElem}
                    </div>
                </div>
                {renderChildren()}
            </div>
        </>
    );
}