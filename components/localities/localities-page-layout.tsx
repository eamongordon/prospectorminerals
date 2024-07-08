'use client'

import { Tabs, Tab } from "@nextui-org/react";
import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useDebounce } from "use-debounce";
import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import type { LocalitiesQueryParams, MineralListItem } from '@/types/types'
import { Input } from '@nextui-org/react';
import { Search as MagnifyingGlassIcon, Filter } from 'lucide-react';
import LocalityCard from './locality-card';
import { Children, cloneElement } from "react";
import { Map, Rows } from 'lucide-react';
import { MineralAssociatesSearch } from "../minerals/mineral-associates-search";
import { LocalityDisplayFieldset } from "@/types/prisma";

//chore: update any definition for localities
export default function LocalitiesPageLayout({ filterObj, localities, mapElement, clearButton }: { filterObj: LocalitiesQueryParams, localities: LocalityDisplayFieldset[], mapElement: React.ReactElement, clearButton?: React.ReactElement }) {

    const [coord, setCoord] = useState([51.505, -0.09])

    const SearchLocation = () => {
        return (
            <div className="search-location">
                <input type="text" placeholder="Search Location" />
            </div>
        )
    }

    const GetMyLocation = () => {
        const getMyLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    setCoord([position.coords.latitude, position.coords.longitude])
                })
            } else {
                console.log("Geolocation is not supported by this browser.")
            }
        }

        return (
            <div className="get-my-location">
                <button onClick={getMyLocation}>Get My Location</button>
            </div>
        )
    }

    //OLD CODE TO MERGE
    const { name, minerals } = Object(filterObj);

    const initialChemistryRender = useRef(true);
    const [searchText, setSearchText] = useState(name);
    const [isMobileFiltersOpen, setIsisMobileFiltersOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [searchQuery] = useDebounce(searchText, 500);
    const [noResultsLoading, setNoResultsLoading] = useState(false);

    function handleMineralsChange(mineralsValReturn: MineralListItem[]) {
        console.log("CHANGED ASSOCIATES");
        console.log(mineralsValReturn);
        setAssociatesVal(mineralsValReturn);
    }

    const [associatesVal, setAssociatesVal] = useState<any>(minerals);

    useEffect(() => {
        if (initialChemistryRender.current) {
            initialChemistryRender.current = false
            return
        }
        console.log("UseEffectChemistryChange");
        //TO REMOVE
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        if (!associatesVal) {
            current.delete("minerals");
        } else {
            current.set("minerals", JSON.stringify(associatesVal));
        }
        //setChemistryInput("");
        const search = current.toString();
        const queryParam = search ? `?${search}` : "";
        router.push(`${pathname}${queryParam}`);
    }, [associatesVal]);

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

    //console.log(chemistryVal);

    const initialRender = useRef(true);

    const clearFilters = () => {
        setNoResultsLoading(true);
        setSearchText(undefined);
        setNoResultsLoading(false);
    }

    const renderChildren = () => {
        return Children.map(clearButton, (child) => {
            return cloneElement(child as React.ReactElement<any>, {
                clearFilters: () => { clearFilters(); setNoResultsLoading(true) }
            });
        });
    };

    /*
    const cloneAndAddClassName = (element: React.ReactElement, additionalClassName: string): ReactElement => {
        return cloneElement(element, {
            className: `${element.props.className || ''} ${additionalClassName}`
        });
    };

    const updatedLocalityCard = cloneAndAddClassName(<LocalityCard name={locality.name} id={locality.id} />, 'locality-card-text');
*/

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
                        isClearable={searchText ? true : false}
                        /*
                        classNames={{
                            inputWrapper: ["h-12 sm:h-auto"]
                        }}
                        */
                        onValueChange={setSearchText}
                        endContent={
                            searchText ? (null) : (<><div className='h-full flex items-center'><MagnifyingGlassIcon /></div></>)
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
                            <AccordionItem key="minerals" aria-label="Minerals" title="Minerals">
                                <MineralAssociatesSearch minerals={associatesVal} onChange={handleMineralsChange} />
                            </AccordionItem>
                            <AccordionItem key="Extra dev" aria-label="Extra dev" title="Extra dev">
                                <SearchLocation />
                                <GetMyLocation />
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
                <div className="flex-col items-center w-full">
                    <Tabs aria-label="Localities" classNames={
                        { base: 'flex justify-end', tabList: "w-48 absolute z-10 mt-2 mr-4 sm:m-2", panel: "py-0 px-0" }
                    }>
                        <Tab key="map"
                            title={
                                <div className="flex items-center space-x-2">
                                    <Map height={20} />
                                    <span>Map</span>
                                </div>
                            }
                        >
                            {mapElement}
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
                                    <li key={locality.id} className='relative flex flex-col items-center justify-center text-center group w-full overflow-hidden rounded-xl xl:w-[311px]'>
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
                </div>
            </div >
        </div >
    )

}
