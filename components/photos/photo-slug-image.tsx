"use client"

import BlurImage from "../blur-image";
import { useState } from "react";

export default function PhotoSlugImage({ src, blurDataURL, alt }: { src?: string, blurDataURL?: string, alt?: string }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <BlurImage
            onClick={() => setExpanded(!expanded)}
            className={`rounded-xl z-0`}
            src={src ? src : '/Cavansite-45.jpeg'}
            objectFit='cover'
            blurDataURL={blurDataURL || undefined}
            alt={alt ? alt : ""}
            {...expanded ? {height: 200, width: 200, style: {
                width: '100%',
                height: 'auto', // Allow the height to adjust automatically
            }} : {fill: true}}
        />
    )
}