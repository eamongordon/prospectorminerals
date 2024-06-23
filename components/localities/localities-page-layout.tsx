'use client'

import 'leaflet/dist/leaflet.css'
import './popup-styles.css';
import { Work_Sans } from 'next/font/google'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Tabs, Tab } from "@nextui-org/react";
import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useDebounce } from "use-debounce";
import { useInView } from 'react-intersection-observer';
import { fetchMinerals } from '@/lib/actions';
import { Link as UILink, Accordion, AccordionItem, Button, Chip, Listbox, ListboxItem, Spinner, Textarea, Avatar } from '@nextui-org/react'
import type { LocalitiesQueryParams, mineralListItem } from '@/types/types'
import type { Locality } from '@prisma/client'
import { Input } from '@nextui-org/react';
import { Search as MagnifyingGlassIcon, Filter } from 'lucide-react';
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import LocalityCard from './locality-card';
import { Children, cloneElement } from "react";
import { Map, Rows } from 'lucide-react';
import L from 'leaflet';
import { Card, CardHeader, CardBody, CardFooter, Image as UIImage } from "@nextui-org/react";
import Link from 'next/link';

const inter = Work_Sans({ subsets: ['latin'] })

//chore: update any definition for localities
export default function LocalitiesPageLayout({ markers, filterObj, localities, clearButton }: { markers?: any, filterObj: LocalitiesQueryParams, localities: Locality[], clearButton?: React.ReactElement }) {

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

    const singleLocalityKnownIcon = L.icon({
        iconUrl: '/localities/PM-Single-Locality-Pin_Light.png', // Replace with your icon's path
        iconSize: [35, 35], // Adjust based on your icon's dimensions
        iconAnchor: [17.5, 35], // Adjust to ensure the icon is centered on its coordinates
    });

    const singleLocalityEstimatedIcon = L.icon({
        iconUrl: '/localities/PM-Single-Locality-Pin-Dark.png', // Replace with your icon's path
        iconSize: [35, 35], // Adjust based on your icon's dimensions
        iconAnchor: [17.5, 35], // Adjust to ensure the icon is centered on its coordinates
    });

    const groupLocalityKnownIcon = L.icon({
        iconUrl: '/localities/PM-Group-Locality-Pin_Light.png', // Replace with your icon's path
        iconSize: [35, 35], // Adjust based on your icon's dimensions
        iconAnchor: [17.5, 35], // Adjust to ensure the icon is centered on its coordinates
    });

    const groupLocalityEstimatedIcon = L.icon({
        iconUrl: '/localities/PM-Group-Locality-Pin_Dark.png', // Replace with your icon's path
        iconSize: [35, 35], // Adjust based on your icon's dimensions
        iconAnchor: [17.5, 35], // Adjust to ensure the icon is centered on its coordinates
    });



    //OLD CODE TO MERGE
    const { name, minerals } = Object(filterObj);

    const initialChemistryRender = useRef(true);
    const [searchText, setSearchText] = useState(name);
    const [mineralList, setMineralList] = useState<mineralListItem[]>([])
    const [ref, inView] = useInView();
    const [chemistryInput, setChemistryInput] = useState("");
    const [chemistryQuery] = useDebounce(chemistryInput, 500);
    const [mineralsVal, setMineralsVal] = useState<any[] | undefined>(minerals);
    const [isMineralFocused, setIsMineralFocused] = useState(false);
    const [page, setPage] = useState<number | undefined>(undefined);
    const [isMobileFiltersOpen, setIsisMobileFiltersOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [searchQuery] = useDebounce(searchText, 500);
    const [noResultsLoading, setNoResultsLoading] = useState(false);

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

    useEffect(() => {
        if (initialChemistryRender.current) {
            initialChemistryRender.current = false
            return
        }
        console.log("UseEffectChemistryChange");
        //TO REMOVE
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        if (!mineralsVal) {
            current.delete("minerals");
        } else {
            current.set("minerals", JSON.stringify(mineralsVal));
        }
        //setChemistryInput("");
        const search = current.toString();
        const queryParam = search ? `?${search}` : "";
        router.push(`${pathname}${queryParam}`);
    }, [mineralsVal]);

    async function loadMorePhotos(isInput?: boolean) {
        if (isInput) {
            console.log("inputNum" + chemistryInput)
            const photosQuery = await fetchMinerals({ filterObj: { name: chemistryInput }, cursor: undefined, limit: 5 });
            setPage(photosQuery.next ? photosQuery.next : undefined)
            setMineralList(photosQuery.results);
        } else {
            if (page) {
                console.log("loadMoreMin")
                const photosQuery = await fetchMinerals({ filterObj: { name: chemistryInput }, cursor: page, limit: 5 });
                if (photosQuery.results?.length) {
                    setPage(photosQuery.next ? photosQuery.next : undefined)
                    setMineralList((prev: mineralListItem[] | undefined) => [
                        ...(prev?.length ? prev : []),
                        ...photosQuery.results
                    ]);
                };
            } else {
                console.log("noMoreMin")
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

    const clearFilters = () => {
        setNoResultsLoading(true);
        setSearchText(undefined);
        setMineralsVal(undefined);
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
                            <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="1em" data-slot="selectorIcon" className="w-unit-4 h-unit-4 transition-transform duration-150 ease motion-reduce:transition-none data-[open=true]:rotate-180" data-open={isMobileFiltersOpen}><path d="m6 9 6 6 6-6"></path></svg>
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
                                <div
                                    //contentEditable="true"
                                    onFocus={() => setIsMineralFocused(true)}
                                    onBlur={() => { setIsMineralFocused(false); console.log("blur") }}
                                >
                                    <Textarea
                                        type="text"
                                        label="Chemical Formulas"
                                        placeholder={!mineralsVal ? 'Try "Malachite' : ""}
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
                                            input: [mineralsVal ? 'mb-1' : null]
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
                                                let currentChemistry = mineralsVal ? [...mineralsVal] : [];
                                                currentChemistry?.pop();
                                                if (currentChemistry.length > 0) {
                                                    setMineralsVal(currentChemistry);
                                                } else {
                                                    setMineralsVal(undefined);
                                                }
                                            }

                                            setTimeout(() => {
                                                if (e.key === "Backspace" && e.currentTarget.value === chemistryInput) {
                                                    let currentChemistry = mineralsVal ? [...mineralsVal] : [];
                                                    currentChemistry?.pop();
                                                    if (currentChemistry.length > 0) {
                                                        setMineralsVal(currentChemistry);
                                                    } else {
                                                        setMineralsVal(undefined);
                                                    }
                                                }
                                            }, 200)

                                        }}
                                        //display chips below input, change to endContent
                                        endContent={
                                            (mineralsVal?.map((obj: mineralListItem, index) => {
                                                return (
                                                    <Chip className="mr-1 min-h-[28px]"
                                                        size="md"
                                                        onClose={() => {
                                                            const newArray = mineralsVal.filter((val) => val.name !== obj.name);
                                                            if (newArray.length === 0) {
                                                                setMineralsVal(undefined);
                                                            } else {
                                                                setMineralsVal(newArray);
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
                                            let currentChemistry = mineralsVal ? [...mineralsVal] : [];
                                            currentChemistry?.push(newObject);
                                            setMineralsVal(currentChemistry);
                                            setChemistryInput("");
                                        }}
                                        disabledKeys={mineralsVal?.map((val) => val.name)}
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
                            <MapContainer
                                className='w-full max-h-[400px] aspect-[5/3] z-0 py-0'
                                //@ts-expect-error
                                center={coord} zoom={2} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {
                                    localities.map((locality: Locality) => {
                                        return (
                                            <Marker key={locality.id} position={[Number(locality.longitude), Number(locality.latitude)]} icon={locality.type === 'Single' ? locality.coordinates_known ? singleLocalityKnownIcon : singleLocalityEstimatedIcon : locality.coordinates_known ? groupLocalityKnownIcon : groupLocalityEstimatedIcon} >
                                                <Popup className={`${inter.className} w-[200px]`} offset={[0, -21]}>
                                                    <div key={locality.id} className='flex items-center justify-center text-center w-full overflow-hidden rounded-xl'>
                                                        <Link href={`/minerals/`}>
                                                            <Card isFooterBlurred className="w-full">
                                                                <UIImage
                                                                    removeWrapper
                                                                    alt="Card example background"
                                                                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                                                                    src="/Amazonite-106_horiz.jpeg"
                                                                    fallbackSrc="data:image/png;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoADIDASIAAhEBAxEB/8QAGwAAAwADAQEAAAAAAAAAAAAAAAYHBAUIAwL/xAAmEAACAgICAQMEAwAAAAAAAAABAgADBREEBiESEyIHMUGRFHGh/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDBQAE/8QAGxEAAgIDAQAAAAAAAAAAAAAAAAIBEQMhMQT/2gAMAwEAAhEDEQA/AOWEqdz4EzeNjLbSNKYzYHDDkFfEoGI6snxJSGiLZlXpOsf1e24A+gzM5HULlTYrP6l3wnXqFCgqIwW9Zotq0EEm00UxvD8OR+fg7qCdqZqLaWrOiJ0t2vqCIjsqf5In2jF/xbX+OtTlaykrQnwn0V8mEcUqHUeXWpTZEp/AyFK1Loic+YfINQw8xv4vYCqAeuUWTL9OFmnRZ+JmlVwAY24rJ+6o87nPXC7Bu0fOPvXuxIAu3k8lSP5cbpOyoZiheTxm+O9iQj6g4YhrGCyvUdgpenRcfaIvduZRfW+iJ511JsdggT49g7ePzCMdnt+439mEtZKhHSwr9p7DluPzCEYSok96cg6HfqM3XA7DZTr5GEIJDGjeU9wsVde4f3MDJdmfkKQXJhCChrkXzkmJJ3CEIaBZ/9k="
                                                                />
                                                                <CardFooter className="absolute bg-white/30 bottom-0 z-10 flex justify-center items-center">
                                                                    <p className="mx-auto text-white text-lg font-semibold locality-card-text">{locality.name}</p>
                                                                </CardFooter>
                                                            </Card >
                                                        </Link>
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        )
                                    })
                                }

                                {/*@ts-expect-error*/}
                                <Marker position={coord} eventHandlers={{
                                    click: (e) => {
                                        console.log('marker clicked')
                                    },
                                    mousedown: (e) => {

                                    }
                                }}>
                                    <Popup className='request-popup'>
                                        <p className={`${inter.className}`}></p>
                                    </Popup>
                                </Marker>
                            </MapContainer>
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
                                {localities.map((locality: Locality) => (
                                    <li key={locality.id} className='relative flex flex-col items-center justify-center text-center group w-full overflow-hidden rounded-xl xl:w-[311px]'>
                                        <LocalityCard name={locality.name} id={locality.id} />
                                    </li>
                                )
                                )}
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
                            </ul >
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div >
    )

}
