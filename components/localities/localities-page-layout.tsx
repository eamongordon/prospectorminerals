'use client'

import type { LocalityDisplayFieldsetComponent } from "@/types/prisma";
import type { LocalitiesQueryParams, MineralListItem } from '@/types/types';
import { Accordion, AccordionItem, Button, Input, Tab, Tabs, Select, SelectItem } from "@heroui/react";
import { Filter, Search as MagnifyingGlassIcon, Map, Rows } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Children, cloneElement, useEffect, useRef, useState } from 'react';
import { useDebounce } from "use-debounce";
import { MineralAssociatesSearch } from "../minerals/mineral-associates-search";
import LocalityCard from './locality-card';

interface FiltersState {
    name?: string;
    minerals?: MineralListItem[];
    latitude?: number;
    longitude?: number;
    radius?: number;
    radiusUnit?: "km" | "mile";
}

export default function LocalitiesPageLayout({ filterObj, localities, mapElement, clearButton }: { filterObj: LocalitiesQueryParams, localities: LocalityDisplayFieldsetComponent[], mapElement: React.ReactElement, clearButton?: React.ReactElement }) {
    const { name, minerals, latitude, longitude, radius, radiusUnit } = Object(filterObj);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchText, setSearchText] = useState(name);
    const [latitudeText, setLatitudeText] = useState(latitude !== undefined ? String(latitude) : "");
    const [longitudeText, setLongitudeText] = useState(longitude !== undefined ? String(longitude) : "");
    const [radiusText, setRadiusText] = useState(
        radius !== undefined && radius !== null ? String(radius) : "500"
    );
    const [filters, setFilters] = useState<FiltersState>({
        name: name,
        minerals: minerals,
        latitude: latitude,
        longitude: longitude,
        radius: radius !== undefined && radius !== null ? radius : 500,
        radiusUnit: radiusUnit || "km",
    });

    const [isMobileFiltersOpen, setIsisMobileFiltersOpen] = useState(false);
    const [searchQuery] = useDebounce(searchText, 500);
    const [latitudeQuery] = useDebounce(latitudeText, 500);
    const [longitudeQuery] = useDebounce(longitudeText, 500);
    const [radiusQuery] = useDebounce(radiusText, 500);
    const [selectedTab, setSelectedTab] = useState<string | number>("map");

    const initialRenderFilters = useRef(true);
    const initialRenderSearchQuery = useRef(true);
    const initialRenderLatitude = useRef(true);
    const initialRenderLongitude = useRef(true);
    const initialRenderRadius = useRef(true);

    const updateFilter = (key: string, value: any) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        if (initialRenderSearchQuery.current) {
            initialRenderSearchQuery.current = false;
            return;
        }
        if (searchQuery !== filters.name) {
            updateFilter("name", searchQuery);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (initialRenderLatitude.current) {
            initialRenderLatitude.current = false;
            return;
        }
        if (
            (latitudeQuery === "" && filters.latitude !== undefined) ||
            (latitudeQuery !== "" && Number(latitudeQuery) !== filters.latitude)
        ) {
            updateFilter("latitude", latitudeQuery !== "" ? Number(latitudeQuery) : undefined);
        }
    }, [latitudeQuery]);

    useEffect(() => {
        if (initialRenderLongitude.current) {
            initialRenderLongitude.current = false;
            return;
        }
        if (
            (longitudeQuery === "" && filters.longitude !== undefined) ||
            (longitudeQuery !== "" && Number(longitudeQuery) !== filters.longitude)
        ) {
            updateFilter("longitude", longitudeQuery !== "" ? Number(longitudeQuery) : undefined);
        }
    }, [longitudeQuery]);

    useEffect(() => {
        if (initialRenderRadius.current) {
            initialRenderRadius.current = false;
            return;
        }
        if (
            (radiusQuery === "" && filters.radius !== 500) ||
            (radiusQuery !== "" && Number(radiusQuery) !== filters.radius)
        ) {
            updateFilter("radius", radiusQuery !== "" ? Number(radiusQuery) : 500);
        }
    }, [radiusQuery]);

    useEffect(() => {
        if (initialRenderFilters.current) {
            initialRenderFilters.current = false;
            return;
        }

        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (!filters.name) {
            current.delete("name");
        } else {
            current.set("name", searchText);
        }

        if (!filters.minerals) {
            current.delete("minerals");
        } else {
            current.set("minerals", JSON.stringify(filters.minerals));
        }

        // Location filters
        if (filters.latitude !== undefined && filters.longitude !== undefined && filters.radius !== undefined) {
            current.set("latitude", String(filters.latitude));
            current.set("longitude", String(filters.longitude));
            current.set("radius", String(filters.radius));
            current.set("radiusUnit", filters.radiusUnit || "km");
        } else {
            current.delete("latitude");
            current.delete("longitude");
            current.delete("radius");
            current.delete("radiusUnit");
        }

        const search = current.toString();
        const queryParam = search ? `?${search}` : "";
        router.push(`${pathname}${queryParam}`);
    }, [filters]);

    const autofillLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setLatitudeText(String(pos.coords.latitude));
                setLongitudeText(String(pos.coords.longitude));
            });
        }
    };

    const clearFilters = () => {
        setFilters({
            minerals: undefined,
            name: undefined,
            latitude: undefined,
            longitude: undefined,
            radius: 500,
            radiusUnit: "km",
        });
        setSearchText("");
        setLatitudeText("");
        setLongitudeText("");
        setRadiusText("500");
    };

    const renderChildren = () => {
        return Children.map(clearButton, (child) => {
            return cloneElement(child as React.ReactElement<any>, {
                clearFilters: () => clearFilters()
            });
        });
    };

    return (
        <div>
            <div className="flex w-full flex-col sm:flex-row">
                <div className="w-full sm:w-96 py-4 px-4 sm:p-2">
                    <Input
                        type="text"
                        label="Search"
                        size="sm"
                        radius="md"
                        value={searchText || ""}
                        isClearable={!!searchText}
                        onValueChange={setSearchText}
                        endContent={
                            !searchText && (<><div className='h-full flex items-center'><MagnifyingGlassIcon /></div></>)
                        }
                    />
                    <Button
                        className="sm:hidden h-11 w-full mb-2 mt-3 bg-default-100 hover:bg-default-200 justify-between px-3"
                        startContent={<Filter height={18} />}
                        endContent={
                            <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="1em" data-slot="selectorIcon" className="w-unit-4 h-unit-4 transition-transform duration-150 ease motion-reduce:transition-none data-[open=true]:rotate-180" data-open={isMobileFiltersOpen}><path d="m6 9 6 6 6-6"></path></svg>
                        }
                        onPress={() => setIsisMobileFiltersOpen((v) => !v)}
                    >{isMobileFiltersOpen ? "Close Filters" : "Open Filters"}</Button>
                    <div className={`${isMobileFiltersOpen ? "contents sm:contents" : "hidden sm:contents"}`}>
                        <Accordion>
                            <AccordionItem key="minerals" aria-label="Minerals" title="Minerals">
                                <MineralAssociatesSearch minerals={filters.minerals} onChange={(value) => updateFilter("minerals", value)} />
                            </AccordionItem>
                            <AccordionItem key="location" aria-label="Location" title="Location">
                                <div className="flex flex-col gap-4">
                                    <Input
                                        type="number"
                                        label="Latitude"
                                        value={latitudeText}
                                        onValueChange={setLatitudeText}
                                        placeholder="Latitude"
                                        min={-90}
                                        max={90}
                                    />
                                    <Input
                                        type="number"
                                        label="Longitude"
                                        value={longitudeText}
                                        onValueChange={setLongitudeText}
                                        placeholder="Longitude"
                                        min={-180}
                                        max={180}
                                    />
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="number"
                                            label="Radius"
                                            value={radiusText}
                                            onValueChange={setRadiusText}
                                            placeholder="Radius"
                                            min={1}
                                            max={1000}
                                            className="flex-1"
                                        />
                                        <Select
                                            className="w-24"
                                            label="Unit"
                                            defaultSelectedKeys={["km"]}
                                            value={filters.radiusUnit}
                                            onChange={e => updateFilter("radiusUnit", e.target.value as "km" | "mile")}
                                        >
                                            <SelectItem key="km">km</SelectItem>
                                            <SelectItem key="mile">mile</SelectItem>
                                        </Select>
                                    </div>
                                    <Button
                                        type="button"
                                        className="w-full"
                                        onPress={autofillLocation}
                                    >
                                        Use Current Location
                                    </Button>
                                    <Button
                                        type="button"
                                        className="w-full"
                                        onPress={clearFilters}
                                        variant="flat"
                                    >
                                        Clear Location Filters
                                    </Button>
                                </div>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
                <div className="flex-col items-center w-full">
                    <Tabs aria-label="Localities" classNames={
                        { base: 'flex justify-end', tabList: "w-72 absolute z-10 mt-2 mr-4 sm:m-2", panel: "py-0 px-0" }
                    }
                        onSelectionChange={setSelectedTab}
                        destroyInactiveTabPanel={false}
                        selectedKey={selectedTab}
                    >
                        <Tab key="map"
                            title={
                                <div className="flex items-center space-x-2">
                                    <Map height={20} />
                                    <span>Map</span>
                                </div>
                            }
                        >
                        </Tab>
                        <Tab key="list" title={
                            <div className="flex items-center space-x-2">
                                <Rows height={20} />
                                <span>List</span>
                            </div>
                        }>
                            <ul
                                role='list'
                                className='w-full flex flex-wrap mt-16 gap-4 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-wrap xl:flex-auto xl:grid-cols-none px-4 sm:p-2'
                            >
                                {localities.map((locality) => (
                                    <li key={locality.id} className='w-full xl:w-[311px]'>
                                        <LocalityCard name={locality.name} slug={locality.slug} blurDataURL={locality.photos.length > 0 && locality.photos[0].imageBlurhash ? locality.photos[0].imageBlurhash : undefined} image={locality.photos.length > 0 && locality.photos[0].image ? locality.photos[0].image : undefined} />
                                    </li>
                                )
                                )}
                            </ul >
                            {
                                localities?.length && localities.length > 0 ? (
                                    null
                                ) : (
                                    <div className='flex-col items-center justify-center w-full'>
                                        <p className='w-full text-center'>No Minerals Found. Try adjusting your filters.</p>
                                        <div className='flex items-center justify-center py-4'>
                                            {renderChildren()}
                                        </div>
                                    </div>
                                )
                            }
                        </Tab>
                    </Tabs>
                    <div className={`contents w-full max-h-[400px] aspect-[5/3] ${selectedTab !== "map" ? "hidden" : ""}`}>
                        {mapElement}
                    </div>
                </div>
            </div >
        </div >
    )
}
