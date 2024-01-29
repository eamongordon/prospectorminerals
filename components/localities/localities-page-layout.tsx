'use client'

import './popup-style.css'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Link as UILink, Accordion, AccordionItem, Button, Chip, Autocomplete, AutocompleteItem, Input, Avatar } from '@nextui-org/react'
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { fetchMinerals } from '@/lib/actions'


export default function LocalitiesPageLayout({ markers }: { markers?: any }) {

    const [coord, setCoord] = useState([51.505, -0.09])
    const [stateMarkers, setStateMarkers] = useState(markers);
    const [chemistryVal, setChemistryVal] = useState<any[] | undefined>(undefined);
    const [chemistryInput, setChemistryInput] = useState("");
    const [mineralList, setMineralList] = useState<any[]>([])

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

    const initialRender = useRef(true);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        fetchMinerals({ filterObj: { name: chemistryInput } }).then((res) => {
            setMineralList(res.results)
        })
    }, [mineralList]);


    const mineralsQuery = async () => {

    };

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
                            <Autocomplete
                                type="text"
                                label="Chemical Formulas"
                                description='Type an element or formula and hit "enter"'
                                placeholder={!chemistryInput ? 'Try "Cu" or "SiO2"' : ""}
                                inputValue={chemistryInput || ""}
                                labelPlacement="outside"
                                defaultItems={mineralList}
                                size="md"
                                onInputChange={(e) => { setChemistryInput(e) }}
                                onKeyDown={(e) => {
                                    /*
                                    if (e.key === "Enter") {
                                        let currentChemistry = chemistryVal ? [...chemistryVal] : [];
                                        currentChemistry?.push(e.currentTarget.value);
                                        setChemistryVal(currentChemistry);
                                        setChemistryInput("");
                                    } else if (e.key === "Backspace") {
                                        let currentChemistry = chemistryVal ? [...chemistryVal] : [];
                                        currentChemistry?.pop();
                                        if (currentChemistry.length > 0) {
                                            setChemistryVal(currentChemistry);
                                        } else {
                                            setChemistryVal(undefined);
                                        }
                                    }
                                    */
                                }}
                                startContent={
                                    (chemistryVal?.map((val, index) => {
                                        return (
                                            <Chip className="mr-1"
                                                onClose={() => {
                                                    const newArray = chemistryVal.filter((chemval) => chemval.id !== val.id);
                                                    if (newArray.length === 0) {
                                                        setChemistryVal(undefined);
                                                    } else {
                                                        setChemistryVal(newArray);
                                                    }
                                                }}
                                                avatar={
                                                    <Avatar
                                                        name="JW"
                                                        src={val.image}
                                                    />
                                                }
                                                key={index}
                                                variant="bordered"
                                            >
                                                {val.name}
                                            </Chip>
                                        )
                                    }))
                                }
                            >
                                {(item) =>
                                    <AutocompleteItem
                                        onPress={() => {
                                            setChemistryInput("");
                                            let currentChemistry = chemistryVal ? [...chemistryVal] : [];
                                            currentChemistry?.push({name: item.name, image: 'https://flagcdn.com/ar.svg', id: item.id});
                                            setChemistryVal(currentChemistry);

                                        }}
                                        startContent={<Avatar alt="Argentina" className="w-6 h-6" src="https://flagcdn.com/ar.svg" />}
                                        key={item.id}>
                                        {item.name}
                                    </AutocompleteItem>
                                }
                            </Autocomplete>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className="flex-col items-center w-full">
                    <MapContainer
                        className='w-full max-h-[400px] aspect-[5/3]'
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