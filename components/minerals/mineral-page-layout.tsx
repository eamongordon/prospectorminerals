"use client";

import { useState, useEffect, useRef, Children, cloneElement } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Accordion, AccordionItem, Slider, CheckboxGroup, Checkbox, Input, Chip, Button, Textarea } from "@heroui/react";
import { Search as MagnifyingGlassIcon, Filter, Camera } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import type { MineralsFilterObj, MineralListItem } from "@/types/types";
import { MineralAssociatesSearch } from "./mineral-associates-search";
import * as tf from '@tensorflow/tfjs';

interface FiltersState {
    name?: string;
    lusters?: string[];
    hardness?: [number, number];
    mineralClasses?: string[];
    crystalSystems?: string[];
    chemistry?: string[];
    associates?: MineralListItem[];
    ids?: string[];
}

export default function MineralPageLayout({
    infiniteScrollElem,
    sortDropdownElem,
    filterObj
}: {
    infiniteScrollElem: React.ReactElement,
    sortDropdownElem: React.ReactElement,
    filterObj?: MineralsFilterObj
}) {
    const { name, minHardness, maxHardness, lusters, mineralClasses, crystalSystems, chemistry, associates, ids } = Object(filterObj);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isMobileFiltersOpen, setIsisMobileFiltersOpen] = useState(false);

    const initialRenderFilters = useRef(true);
    const initialRenderSearchQuery = useRef(true);

    const [searchText, setSearchText] = useState(name);
    const [filters, setFilters] = useState<FiltersState>({
        name: name,
        lusters: lusters,
        hardness: (minHardness != null && maxHardness != null) ? [minHardness, maxHardness] : undefined,
        mineralClasses: mineralClasses,
        crystalSystems: crystalSystems,
        chemistry: chemistry,
        associates: associates,
        ids: ids,
    });

    const [imageSearch, setImageSearch] = useState<File | null>(null);
    const [searchQuery] = useDebounce(searchText, 500);
    const [isImageSearchLoading, setIsImageSearchLoading] = useState(false);

    useEffect(() => {
        if (initialRenderSearchQuery.current) {
            initialRenderSearchQuery.current = false;
            return;
        }
        if (searchQuery !== filters.name) {
            updateFilter("name", searchQuery);
        }
    }, [searchQuery]);

    const updateFilter = (key: string, value: any) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        if (initialRenderFilters.current) {
            initialRenderFilters.current = false;
            return;
        }

        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (!searchText) {
            current.delete("name");
        } else {
            current.set("name", searchText);
        }

        if (!filters.lusters) {
            current.delete("lusters");
        } else {
            current.set("lusters", filters.lusters.join(','));
        }

        if (!filters.mineralClasses) {
            current.delete("mineralClasses");
        } else {
            current.set("mineralClasses", filters.mineralClasses.join(','));
        }

        if (!filters.crystalSystems) {
            current.delete("crystalSystems");
        } else {
            current.set("crystalSystems", filters.crystalSystems.join(','));
        }

        if (!filters.chemistry) {
            current.delete("chemistry");
        } else {
            current.set("chemistry", filters.chemistry.join(','));
        }

        if (!filters.hardness) {
            current.delete("minHardness");
            current.delete("maxHardness");
        } else {
            current.set("minHardness", filters.hardness[0].toString());
            current.set("maxHardness", filters.hardness[1].toString());
        }

        if (!filters.associates) {
            current.delete("associates");
        } else {
            current.set("associates", JSON.stringify(filters.associates));
        }

        if (!filters.ids) {
            current.delete("ids");
            if (imageSearch) {
                setImageSearch(null);
            }
        } else {
            current.set("ids", JSON.stringify(filters.ids));
        }

        const search = current.toString();
        const queryParam = search ? `?${search}` : "";
        router.push(`${pathname}${queryParam}`);
    }, [filters]);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImageSearch(file);
            setIsImageSearchLoading(true);
            try {
                const model = await tf.loadLayersModel('/model/model.json');
                const imageBitmap = await createImageBitmap(file);
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 128;
                canvas.height = 128;
                ctx?.drawImage(imageBitmap, 0, 0, 128, 128);

                const imageData = ctx?.getImageData(0, 0, 128, 128);

                if (!imageData) {
                    throw new Error("Failed to extract image data");
                }

                const tensor = tf.browser
                    .fromPixels(imageData)
                    .resizeBilinear([128, 128])
                    .div(255.0)
                    .expandDims(0);

                const predictionTensor = model.predict(tensor) as tf.Tensor;
                const predictionArray = (await predictionTensor.array()) as number[][];

                const uniqueMinerals = await fetch('/model/data/minerals.json').then((res) => res.json());

                const mineralIds = predictionArray[0]
                    .map((value, index) => (value > 0.2 ? uniqueMinerals[index].id : null))
                    .filter((label) => label !== null);

                if (mineralIds.length > 0) {
                    updateFilter("ids", mineralIds);
                }

                tf.dispose([tensor, predictionTensor]);
                model.dispose();
            } catch (error) {
                console.error("Error during image search:", error);
            } finally {
                setIsImageSearchLoading(false);
            }
        }
    };

    const clearFilters = () => {
        setFilters({
            lusters: undefined,
            hardness: undefined,
            mineralClasses: undefined,
            crystalSystems: undefined,
            chemistry: undefined,
            associates: undefined,
            ids: undefined,
            name: undefined
        });
        setSearchText(undefined);
    };

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
                            !searchText ?
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
                                <div className='h-full flex items-center'>
                                    <MagnifyingGlassIcon />
                                </div>
                            </>
                            : undefined
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
                            <AccordionItem key="hardness" aria-label="Hardness" title="Hardness" subtitle={filters.hardness ? `${filters.hardness[0].toString()} - ${filters.hardness[1].toString()}` : null}>
                                <Slider
                                    label="Mohs Hardness"
                                    step={1}
                                    showTooltip={true}
                                    color="foreground"
                                    minValue={0}
                                    maxValue={10}
                                    value={filters.hardness || [0, 10]}
                                    className="w-full pr-3"
                                    onChangeEnd={value => updateFilter("hardness", value as number[])}
                                />
                            </AccordionItem>
                            <AccordionItem key="lusters" aria-label="Lusters" title="Lusters" subtitle={filters.lusters ? `${filters.lusters.length} Selected` : null}>
                                <CheckboxGroup
                                    isRequired
                                    color="default"
                                    description="Select lusters to filter by"
                                    label="Select lusters"
                                    value={filters.lusters || ["Silky", "Vitreous", "Waxy", "Submetallic", "Metallic", "Resinous", "Pearly", "Greasy", "Dull", "Adamantine"]}
                                    onValueChange={(value) => updateFilter("lusters", value)}
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
                            <AccordionItem key="mineralClasses" aria-label="Mineral Class" title="Mineral Class" subtitle={filters.mineralClasses ? `${filters.mineralClasses.length} Selected` : null}>
                                <CheckboxGroup
                                    isRequired
                                    color="default"
                                    description="Select mineral classes to filter by"
                                    label="Select mineral classes"
                                    value={filters.mineralClasses || ["Silicates", "Phosphates", "Carbonates", "Sulfates", "Sulfides", "Halides", "Oxides", "Native Elements"]}
                                    onValueChange={(value) => updateFilter("mineralClasses", value)}
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
                            <AccordionItem key="crystalSystems" aria-label="Crystal Systems" title="Crystal Systems" subtitle={filters.crystalSystems ? `${filters.crystalSystems.length} Selected` : null}>
                                <CheckboxGroup
                                    isRequired
                                    color="default"
                                    description="Select crystal systems to filter by"
                                    label="Select crystal systems"
                                    value={filters.crystalSystems || ["Tetragonal", "Isometric", "Hexagonal", "Triclinic", "Monoclinic", "Trigonal", "Orthorhombic"]}
                                    onValueChange={(value) => updateFilter("crystalSystems", value)}
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
                            <AccordionItem key="chemistry" aria-label="Chemistry" title="Chemistry" subtitle={filters.chemistry ? `${filters.chemistry.join(', ')}` : null}>
                                <Textarea
                                    type="text"
                                    label="Chemical Formulas"
                                    description='Type an element or formula and hit "enter"'
                                    placeholder={!filters.chemistry ? 'Try "Cu" or "SiO2"' : ""}
                                    value={filters.chemistry?.join(', ') || ""}
                                    classNames={{
                                        innerWrapper: ['flex flex-wrap'],
                                        input: [filters.chemistry ? 'mb-1' : null]
                                    }}
                                    minRows={1}
                                    size="md"
                                    onValueChange={(value) => updateFilter("chemistry", value.split(', '))}
                                    endContent={
                                        (filters.chemistry?.map((val: string, index) => {
                                            return (
                                                <Chip className="mr-1 min-h-[28px]"
                                                    size="md"
                                                    onClose={() => {
                                                        const newArray = filters.chemistry?.filter((chemval) => chemval !== val);
                                                        updateFilter("chemistry", newArray);
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
                            <AccordionItem key="associates" aria-label="Associates" title="Associates" subtitle={filters.associates ? filters.associates.map((associate: MineralListItem) => associate.name).join(", ") : null}>
                                <MineralAssociatesSearch minerals={filters.associates} onChange={(value) => updateFilter("associates", value)} />
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
            <div className="flex-col items-center w-full overflow-clip">
                <div className='mb-4 md:mb-5 flex flex-col-reverse md:flex-row md:gap-8 items-center justify-between'>
                    <div className="w-full md:w-2/3 flex gap-1 flex-wrap pt-1 sm:pb-2 sm:pt-2 md:pt-0">
                        {
                            (filters.name) ? (
                                <Chip onClose={() => setSearchText(undefined)} variant="bordered">
                                    {`Name: ${filters.name}`}
                                </Chip>
                            ) : (
                                <></>
                            )
                        }
                        {
                            (filters.hardness) ? (
                                <Chip onClose={() => updateFilter("hardness", undefined)} variant="bordered">
                                    {`Hardness: ${filters.hardness[0].toString()} - ${filters.hardness[1].toString()}`}
                                </Chip>
                            ) : (
                                <></>
                            )
                        }
                        {
                            (filters.lusters) ? (
                                <Chip onClose={() => updateFilter("lusters", undefined)} variant="bordered">
                                    {`Lusters: ${filters.lusters.length}`}
                                </Chip>
                            ) : (
                                <></>
                            )
                        }
                        {
                            (filters.mineralClasses) ? (
                                <Chip onClose={() => updateFilter("mineralClasses", undefined)} variant="bordered">
                                    {`Mineral Classes: ${filters.mineralClasses.length}`}
                                </Chip>
                            ) : (
                                <></>
                            )
                        }
                        {
                            (filters.crystalSystems) ? (
                                <Chip onClose={() => updateFilter("crystalSystems", undefined)} variant="bordered">
                                    {`Crystal Systems: ${filters.crystalSystems.length}`}
                                </Chip>
                            ) : (
                                <></>
                            )
                        }
                        {
                            (filters.chemistry) ? (
                                <Chip onClose={() => updateFilter("chemistry", undefined)} variant="bordered">
                                    {`Chemistry: ${filters.chemistry.join(', ')}`}
                                </Chip>
                            ) : (
                                <></>
                            )
                        }
                        {
                            (filters.associates) ? (
                                <Chip onClose={() => updateFilter("associates", undefined)} variant="bordered">
                                    {`Associates: ${filters.associates.map((associate: MineralListItem) => associate.name).join(", ")}`}
                                </Chip>
                            ) : (
                                <></>
                            )
                        }
                        {
                            (imageSearch || filters.ids) ? (
                                <Chip
                                    style={{ minWidth: "auto" }}
                                    classNames={{ avatar: "rounded-full", base: "truncate", content: "truncate" }}
                                    avatar={imageSearch ?
                                        (<img
                                            className="object-cover h-full w-full"
                                            src={URL.createObjectURL(imageSearch)}
                                            alt="Uploaded Image"
                                        />) : undefined
                                    }
                                    onClose={() => updateFilter("ids", undefined)}
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