"use client"

import { Card, CardFooter, Skeleton } from "@nextui-org/react";
import 'leaflet/dist/leaflet.css';
import { workSansClassName } from "@/lib/utils";
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import BlurImage from '../blur-image';
import './popup-styles.css';
import type { LocalityDisplayFieldsetComponent } from '@/types/prisma';
import dynamic from "next/dynamic";

export default function LocalityMap({ localities, center, zoom }: { localities: LocalityDisplayFieldsetComponent[], center: [number, number], zoom: number }) {
    // Dynamically import React Leaflet components with SSR disabled
    const MapContainer = useMemo(() => dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {
        ssr: false,
        loading: () => <Skeleton className='w-full max-h-[400px] aspect-[5/3]'></Skeleton>
    }), []);

    const TileLayer = useMemo(() => dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), {
        ssr: false,
    }), []);

    const Marker = useMemo(() => dynamic(() => import('react-leaflet').then(mod => mod.Marker), {
        ssr: false,
    }), []);

    const Popup = useMemo(() => dynamic(() => import('react-leaflet').then(mod => mod.Popup), {
        ssr: false,
    }), []);

    const [icons, setIcons] = useState({
        singleLocalityKnownIcon: null,
        singleLocalityEstimatedIcon: null,
        groupLocalityKnownIcon: null,
        groupLocalityEstimatedIcon: null,
    });

    useEffect(() => {
        const L = require('leaflet');
        const newIcons = {
            singleLocalityKnownIcon: L.icon({ iconUrl: '/localities/PM-Single-Locality-Pin_Light.png', iconSize: [35, 35], iconAnchor: [17.5, 35] }),
            singleLocalityEstimatedIcon: L.icon({ iconUrl: '/localities/PM-Single-Locality-Pin-Dark.png', iconSize: [35, 35], iconAnchor: [17.5, 35] }),
            groupLocalityKnownIcon: L.icon({ iconUrl: '/localities/PM-Group-Locality-Pin_Light.png', iconSize: [35, 35], iconAnchor: [17.5, 35] }),
            groupLocalityEstimatedIcon: L.icon({ iconUrl: '/localities/PM-Group-Locality-Pin_Dark.png', iconSize: [35, 35], iconAnchor: [17.5, 35] }),
        };
        setIcons(newIcons);
    }, []);

    return (
        <MapContainer
            className='w-full max-h-[400px] aspect-[5/3] z-0 py-0'
            center={center} zoom={zoom} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {localities.map((locality) => {
                return (<Marker key={locality.id} position={[Number(locality.latitude), Number(locality.longitude)]} icon={locality.type === 'Single' ? locality.coordinates_known ? icons.singleLocalityKnownIcon! : icons.singleLocalityEstimatedIcon! : locality.coordinates_known ? icons.groupLocalityKnownIcon! : icons.groupLocalityEstimatedIcon!} >
                    <Popup className={`${workSansClassName} w-[200px]`} offset={[0, -21]}>
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
    )
}