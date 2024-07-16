"use client"

import { Card, CardFooter, Skeleton } from "@nextui-org/react";
import L from 'leaflet';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import 'leaflet/dist/leaflet.css';
import { Work_Sans } from 'next/font/google';
import Link from 'next/link';
import { Suspense } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import BlurImage from '../blur-image';
import './popup-styles.css';
import type { LocalityDisplayFieldsetComponent } from '@/types/prisma';

const inter = Work_Sans({ subsets: ['latin'] })

export default function LocalityMap({ localities, center, zoom }: { localities: LocalityDisplayFieldsetComponent[], center: [number, number], zoom: number }) {
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
                {localities.map((locality) => {
                    return (<Marker key={locality.id} position={[Number(locality.latitude), Number(locality.longitude)]} icon={locality.type === 'Single' ? locality.coordinates_known ? singleLocalityKnownIcon : singleLocalityEstimatedIcon : locality.coordinates_known ? groupLocalityKnownIcon : groupLocalityEstimatedIcon} >
                        <Popup className={`${inter.className} w-[200px]`} offset={[0, -21]}>
                            <div key={locality.id}>
                                <Link href={`/localities/${locality.slug}`}>
                                    <Card isFooterBlurred className="w-full">
                                        <BlurImage
                                            width={300}
                                            height={300}
                                            quality={50}
                                            alt={locality.name || "Photo"}
                                            className="object-cover w-full h-full scale-125 -translate-y-6 aspect-[5/4]"
                                            src={locality.photos.length > 0 && locality.photos[0].image ? locality.photos[0].image : "/Amazonite-106_horiz.jpeg"}
                                            blurDataURL={locality.photos.length > 0 && locality.photos[0].imageBlurhash ? locality.photos[0].imageBlurhash : undefined}
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