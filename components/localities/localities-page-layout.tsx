'use client'

import './popup-style.css'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useDebounce } from "use-debounce";
import { useInView } from 'react-intersection-observer';
import { fetchMinerals } from '@/lib/actions';
import { Link as UILink, Accordion, AccordionItem, Button, Chip, Listbox, ListboxItem, Spinner, Textarea, Avatar } from '@nextui-org/react'
import { LocalitiesQueryParams, mineralListItem } from '@/types/types'
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"


export default function LocalitiesPageLayout({ markers, filterObj, mineralSearchComp }: { markers?: any, filterObj: LocalitiesQueryParams, mineralSearchComp: React.ReactElement }) {
    const [coord, setCoord] = useState([51.505, -0.09])
    const [stateMarkers, setStateMarkers] = useState(markers);

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

    const { chemistry } = Object(filterObj);

    const initialChemistryRender = useRef(true);

    const [mineralList, setMineralList] = useState<mineralListItem[]>([])
    const [ref, inView] = useInView();
    const [chemistryInput, setChemistryInput] = useState("");
    const [chemistryQuery] = useDebounce(chemistryInput, 500);
    const [chemistryVal, setChemistryVal] = useState<any[] | undefined>(chemistry);
    const [isMineralFocused, setIsMineralFocused] = useState(false);
    const [page, setPage] = useState<number | undefined>(undefined);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    console.log(chemistryVal);

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
            current.set("chemistry", JSON.stringify(chemistryVal));
        }
        //setChemistryInput("");
        const search = current.toString();
        const queryParam = search ? `?${search}` : "";
        router.push(`${pathname}${queryParam}`);
    }, [chemistryVal]);

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
                    setMineralList((prev: any[] | undefined) => [
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

    useEffect(() => {
        console.log(chemistryVal);
    }, [chemistryVal])

    return (
        <div>
            <SearchLocation />
            <GetMyLocation />
            <Button onClick={() => setStateMarkers([{ title: 'New Marker', coords: [10, 10] }])}>More Markers</Button>
            <div className="flex w-full flex-col sm:flex-row">
                <div className="w-full sm:w-80">
                    <Accordion>
                        <AccordionItem key="1" aria-label="Hardness" title="Hardness">
                            <p>Some text</p>
                        </AccordionItem>
                        <AccordionItem key="2" aria-label="Minerals" title="Minerals">
                        </AccordionItem>
                        <AccordionItem key="3" aria-label="Other" title="Other">
                            <div
                                //contentEditable="true"
                                onFocus={() => setIsMineralFocused(true)}
                                onBlur={() => { setIsMineralFocused(false); console.log("blur") }}
                            >
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
                                        innerWrapper: ['flex flex-wrap'],
                                        //display chips below input, add margin
                                        input: [chemistryVal ? 'mb-1' : null]
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
                                    //display chips below input, change to endContent
                                    endContent={
                                        (chemistryVal?.map((obj: mineralListItem, index) => {
                                            return (
                                                <Chip className="mr-1 min-h-[28px]"
                                                    size="md"
                                                    onClose={() => {
                                                        const newArray = chemistryVal.filter((val) => val.name !== obj.name);
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
                                        let currentChemistry = chemistryVal ? [...chemistryVal] : [];
                                        currentChemistry?.push(newObject);
                                        setChemistryVal(currentChemistry);
                                        setChemistryInput("");
                                    }}
                                    disabledKeys={chemistryVal?.map((val) => val.name)}
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
                    </Accordion>
                </div>
                <div className="flex-col items-center w-full">
                    <MapContainer
                        className='w-full max-h-[400px] aspect-[5/3] z-0'
                        //@ts-expect-error
                        center={coord} zoom={2} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {
                            stateMarkers.map((marker: any) => {
                                return (
                                    <Marker key={marker.title} position={marker.coords} >
                                        <Popup>
                                            A pretty CSS3 popup. <br /> Easily customizable.
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
                                <p className='text-lg'>Large Tezt</p>
                                <UILink href='/'>This is a link</UILink>
                                <button className='w-full h-full bg-teal-200'>Large Tezt</button>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div >
    )

}