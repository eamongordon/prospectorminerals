'use client'

//import './popup-style.css'
//import 'leaflet/dist/leaflet.css'
//import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState } from 'react'
import Link from 'next/link'
import { Link as UILink, Accordion, AccordionItem, Button } from '@nextui-org/react'
//import "leaflet-defaulticon-compatibility"
//import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"


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

    return (<></>
    )
}