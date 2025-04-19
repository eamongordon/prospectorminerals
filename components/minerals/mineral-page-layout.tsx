"use client";

import { useState, useEffect, useRef, Children, cloneElement } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Accordion, AccordionItem, Slider, CheckboxGroup, Checkbox, Input, Chip, Button, Textarea } from "@heroui/react";
import { Search as MagnifyingGlassIcon, Filter, Camera } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import type { MineralsFilterObj, MineralListItem } from "@/types/types";
import { MineralAssociatesSearch } from "./mineral-associates-search";
import * as tf from '@tensorflow/tfjs';

export default function MineralPageLayout({
    infiniteScrollElem,
    sortDropdownElem,
    filterObj
}: {
    infiniteScrollElem: React.ReactElement,
    sortDropdownElem: React.ReactElement,
    filterObj?: MineralsFilterObj
}) {
    const { name, minHardness, maxHardness, lusters, mineralClasses, crystalSystems, chemistry, associates } = Object(filterObj);
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
    const initialAssociatesRender = useRef(true);
    const [searchText, setSearchText] = useState(name);
    const [lustersVal, setLustersVal] = useState<string[] | undefined>(lusters);
    const [hardnessVal, setHardnessVal] = useState<number[] | undefined>((minHardness != null && maxHardness != null) ? [minHardness, maxHardness] : undefined);
    const [mineralClassVal, setMineralClassVal] = useState<string[] | undefined>(mineralClasses);
    const [crystalSystemsVal, setCrystalSystemsVal] = useState<string[] | undefined>(crystalSystems);
    const [isMineralClassInvalid, setIsMineralClassInvalid] = useState(false);
    const [isCrystalSystemsInvalid, setIsCrystalSystemsInvalid] = useState(false);
    const [chemistryVal, setChemistryVal] = useState<string[] | undefined>(chemistry);
    const [chemistryInput, setChemistryInput] = useState("");
    const [associatesVal, setAssociatesVal] = useState<MineralListItem[] | undefined>(associates);
    const [isLusterInvalid, setIsLusterInvalid] = useState(false);
    const [searchQuery] = useDebounce(searchText, 500);
    const [imageSearch, setImageSearch] = useState<File | null>(null);
    const [isImageSearchLoading, setIsImageSearchLoading] = useState(false);

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const ids = current.get("ids");

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        const current = new URLSearchParams(Array.from(searchParams.entries()));
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
        const current = new URLSearchParams(Array.from(searchParams.entries()));
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
        const current = new URLSearchParams(Array.from(searchParams.entries()));
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
        const current = new URLSearchParams(Array.from(searchParams.entries()));
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
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        if (!chemistryVal) {
            current.delete("chemistry");
        } else {
            current.set("chemistry", chemistryVal.join(','));
        }
        const search = current.toString();
        const queryParam = search ? `?${search}` : "";
        router.push(`${pathname}${queryParam}`);
    }, [chemistryVal]);

    useEffect(() => {
        if (initialHardnessRender.current) {
            initialHardnessRender.current = false
            return
        }
        const current = new URLSearchParams(Array.from(searchParams.entries()));
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
        if (initialAssociatesRender.current) {
            initialAssociatesRender.current = false
            return
        }
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        if (!associatesVal) {
            current.delete("associates");
        } else {
            current.set("associates", JSON.stringify(associatesVal));
        }
        const search = current.toString();
        const queryParam = search ? `?${search}` : "";
        router.push(`${pathname}${queryParam}`);
    }, [associatesVal]);

    useEffect(() => {
        // Remove imageSearch after IDs are removed from query params
        if (!ids && imageSearch) {
            setImageSearch(null);
        }
    }, [ids]);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImageSearch(file);
            setIsImageSearchLoading(true);
            try {
                // Load the model
                const model = await tf.loadLayersModel('/model/model.json');

                // Decode the image using a canvas
                const imageBitmap = await createImageBitmap(file);
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 128; // Resize to match the model's input shape
                canvas.height = 128;
                ctx?.drawImage(imageBitmap, 0, 0, 128, 128);

                // Extract pixel data
                const imageData = ctx?.getImageData(0, 0, 128, 128);

                if (!imageData) {
                    throw new Error("Failed to extract image data");
                }

                const tensor = tf.browser
                    .fromPixels(imageData) // Adjust dimensions
                    .resizeBilinear([128, 128])
                    .div(255.0)
                    .expandDims(0);

                // Make predictions
                const predictionTensor = model.predict(tensor) as tf.Tensor;
                const predictionArray = (await predictionTensor.array()) as number[][];

                const uniqueMinerals = await fetch('/model/data/minerals.json').then((res) => res.json());

                // Map predictions to IDs
                const mineralIds = predictionArray[0]
                    .map((value, index) => (value > 0.2 ? uniqueMinerals[index].id : null))
                    .filter((label) => label !== null);

                if (mineralIds.length > 0) {
                    const current = new URLSearchParams(Array.from(searchParams.entries()));
                    current.set("ids", JSON.stringify(mineralIds)); // Update the ids filter
                    const search = current.toString();
                    const queryParam = search ? `?${search}` : "";
                    router.push(`${pathname}${queryParam}`);
                }
            } catch (error) {
                console.error("Error during image search:", error);
            } finally {
                setIsImageSearchLoading(false); // Set loading state to false
            }

        }
    };

    const clearFilters = () => {
        setSearchText(undefined);
        setLustersVal(undefined);
        setHardnessVal(undefined);
        setMineralClassVal(undefined);
        setCrystalSystemsVal(undefined);
        setChemistryVal(undefined);
        setAssociatesVal(undefined);
        setImageSearch(null);
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
                        label="Search"
                        size="sm"
                        radius="md"
                        value={searchText || ""}
                        isClearable={searchText ? true : false}
                        onValueChange={setSearchText}
                        endContent={
                            <>
                                <div className='h-full flex items-center mr-3'>
                                    <Button as="label" preventFocusOnPress htmlFor="image-upload" variant="light" isIconOnly isLoading={isImageSearchLoading} className="cursor-pointer">
                                        <Camera className="text-gray-500 hover:text-gray-700 dark:text-gray-300 hover:dark:text-gray-100" />
                                    </Button>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                                {!searchText && (
                                    <div className='h-full flex items-center'>
                                        <MagnifyingGlassIcon />
                                    </div>
                                )}
                            </>
                        }
                    />
                    <Button
                        className="sm:hidden h-11 w-full mb-2 mt-3 bg-default-100 hover:bg-default-200 justify-between px-3"
                        startContent={<Filter height={18} />}
                        endContent={
                            <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="1em" data-slot="selectorIcon" className="w-unit-4 h-unit-4 transition-transform duration-150 ease motion-reduce:transition-none data-[open=true]:rotate-180" data-open={isMobileFiltersOpen}><path d="m6 9 6 6 6-6"></path></svg>
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
                            <AccordionItem key="hardness" aria-label="Hardness" title="Hardness" subtitle={hardnessVal ? `${hardnessVal[0].toString()} - ${hardnessVal[1].toString()}` : null}>
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
                            <AccordionItem key="lusters" aria-label="Lusters" title="Lusters" subtitle={lustersVal ? `${lustersVal.length} Selected` : null}>
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
                            <AccordionItem key="mineralClasses" aria-label="Mineral Class" title="Mineral Class" subtitle={mineralClassVal ? `${mineralClassVal.length} Selected` : null}>
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
                            <AccordionItem key="crystalSystems" aria-label="Crystal Systems" title="Crystal Systems" subtitle={crystalSystemsVal ? `${crystalSystemsVal.length} Selected` : null}>
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
                            <AccordionItem key="chemistry" aria-label="Chemistry" title="Chemistry" subtitle={chemistryVal ? `${chemistryVal.join(', ')}` : null}>
                                <Textarea
                                    type="text"
                                    label="Chemical Formulas"
                                    description='Type an element or formula and hit "enter"'
                                    placeholder={!chemistryVal ? 'Try "Cu" or "SiO2"' : ""}
                                    value={chemistryInput || ""}
                                    classNames={{
                                        innerWrapper: ['flex flex-wrap'],
                                        //display chips below input, add margin
                                        input: [chemistryVal ? 'mb-1' : null]
                                    }}
                                    minRows={1}
                                    size="md"
                                    onValueChange={(value) => { setChemistryInput(value); }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            if (e.currentTarget.value.length) {
                                                let currentChemistry = chemistryVal ? [...chemistryVal] : [];
                                                currentChemistry?.push(e.currentTarget.value);
                                                setChemistryVal(currentChemistry);
                                                setChemistryInput("");
                                            }
                                            e.preventDefault();
                                        }
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
                                    endContent={
                                        (chemistryVal?.map((val: string, index) => {
                                            return (
                                                <Chip className="mr-1 min-h-[28px]"
                                                    size="md"
                                                    onClose={() => {
                                                        const newArray = chemistryVal.filter((chemval) => chemval !== val);
                                                        if (newArray.length === 0) {
                                                            setChemistryVal(undefined);
                                                        } else {
                                                            setChemistryVal(newArray);
                                                        }
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
                            <AccordionItem key="associates" aria-label="Associates" title="Associates" subtitle={associatesVal ? associatesVal.map((associate: MineralListItem) => associate.name).join(", ") : null}>
                                <MineralAssociatesSearch minerals={associatesVal} onChange={setAssociatesVal} />
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
            <div className="flex-col items-center w-full">
                <div className='mb-4 md:mb-5 flex flex-col-reverse md:flex-row md:gap-x-10 items-center justify-between'>
                    <div className="w-full md:w-2/3 flex gap-1 flex-wrap pt-1 sm:pb-2 sm:pt-2 md:pt-0">
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
                        {
                            (mineralClassVal) ? (
                                <Chip onClose={() => setMineralClassVal(undefined)} variant="bordered">
                                    {`Mineral Classes: ${mineralClassVal.length}`}
                                </Chip>
                            ) : (
                                <></>
                            )
                        }
                        {
                            (crystalSystemsVal) ? (
                                <Chip onClose={() => setCrystalSystemsVal(undefined)} variant="bordered">
                                    {`Crystal Systems: ${crystalSystemsVal.length}`}
                                </Chip>
                            ) : (
                                <></>
                            )
                        }
                        {
                            (chemistryVal) ? (
                                <Chip onClose={() => setChemistryVal(undefined)} variant="bordered">
                                    {`Chemistry: ${chemistryVal.join(', ')}`}
                                </Chip>
                            ) : (
                                <></>
                            )
                        }
                        {
                            (associatesVal) ? (
                                <Chip onClose={() => setAssociatesVal(undefined)} variant="bordered">
                                    {`Associates: ${associatesVal.map((associate: MineralListItem) => associate.name).join(", ")}`}
                                </Chip>
                            ) : (
                                <></>
                            )
                        }
                        {
                            (imageSearch || ids) ? (
                                <Chip
                                    classNames={{ avatar: "rounded-full", base: "min-w-auto", content: "truncate" }}
                                    avatar={imageSearch ?
                                        (<img
                                            className="object-cover h-full w-full"
                                            src={URL.createObjectURL(imageSearch)}
                                            alt="Uploaded Image"
                                        />) : undefined
                                    }
                                    onClose={() => {
                                        const current = new URLSearchParams(Array.from(searchParams.entries()));
                                        current.delete("ids");
                                        const search = current.toString();
                                        const queryParam = search ? `?${search}` : "";
                                        router.push(`${pathname}${queryParam}`);
                                    }}
                                    variant="bordered"
                                >
                                    {imageSearch ? `Image: ${imageSearch.name}` : "Image"}
                                </Chip>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                    <div className="pb-2 w-full md:w-1/3">
                        {sortDropdownElem}
                    </div>
                </div>
                {renderChildren()}
            </div>
        </>
    );
}