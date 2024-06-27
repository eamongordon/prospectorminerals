"use client"

import 'leaflet/dist/leaflet.css'
import './popup-styles.css';
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { Work_Sans } from 'next/font/google'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import Link from 'next/link';
import { Card, CardFooter, Skeleton, Image as UIImage } from "@nextui-org/react";
import { Locality } from '@prisma/client';
import { Suspense } from 'react';

const inter = Work_Sans({ subsets: ['latin'] })

export default function LocalityMap({ localities, center, zoom }: { localities: Locality[], center: [number, number], zoom: number}) {
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
    return (
        <Suspense fallback={<Skeleton className='h-[400px] w-full'></Skeleton>}>
        <MapContainer
            className='w-full max-h-[400px] aspect-[5/3] z-0 py-0'
            center={center} zoom={zoom} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {localities.map((locality: Locality) => {
                return (<Marker key={locality.id} position={[Number(locality.longitude), Number(locality.latitude)]} icon={locality.type === 'Single' ? locality.coordinates_known ? singleLocalityKnownIcon : singleLocalityEstimatedIcon : locality.coordinates_known ? groupLocalityKnownIcon : groupLocalityEstimatedIcon} >
                    <Popup className={`${inter.className} w-[200px]`} offset={[0, -21]}>
                        <div key={locality.id} className='flex items-center justify-center text-center w-full overflow-hidden rounded-xl'>
                            <Link href={`/localities/${locality.id}`}>
                                <Card isFooterBlurred className="w-full">
                                    <UIImage
                                        removeWrapper
                                        alt={locality.name}
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
                </Marker>)
            })}
        </MapContainer>
        </Suspense>
    )
}