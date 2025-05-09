"use client";

import { useMemo } from 'react';
import LocalityMap from './locality-map';
import dynamic from 'next/dynamic';
import { Skeleton } from '@heroui/react';

export default function LocalityMapWrapper(props: React.ComponentProps<typeof LocalityMap>) {
    // This is a workaround to avoid server-side rendering of the leaflet map
    const Map = useMemo(() => dynamic(
        () => import('./locality-map'),
        {
            loading: () => <Skeleton className="w-full max-h-[400px] aspect-[5/3]" />,
            ssr: false
        }
    ), []);

    return <Map {...props} />;
}