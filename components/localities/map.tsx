'use client'

//import './popup-style.css'
//import 'leaflet/dist/leaflet.css'
//import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState } from 'react'
import Link from 'next/link'
import { Link as UILink, Accordion, AccordionItem, Button } from '@nextui-org/react'
//import "leaflet-defaulticon-compatibility"
//import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

/*
export default function Map({ markers }: { markers?: any }) {

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

    return (
        <div>
            <SearchLocation />
            <GetMyLocation />
            <Button onClick={() => setStateMarkers([{title: 'New Marker', coords: [10, 10]}])}>More Markers</Button>
            <div className="flex w-full flex-col sm:flex-row">
                <div className="w-full sm:w-80">
                    <Accordion>
                        <AccordionItem key="hardness" aria-label="Hardness" title="Hardness">
                            <p>Some text</p>
                        </AccordionItem>

                    </Accordion>
                </div>
                <div className="flex-col items-center w-full">
                <MapContainer
                    className='w-full max-h-[400px] aspect-[5/3]'
                    
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
                    {/*@ts-expect-error}
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
*/

export default function Map({ markers }: { markers?: any }) {
    return null
}