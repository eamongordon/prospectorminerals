"use client"

import BlurImage from "../blur-image";
import { useState } from "react";
import { Expand, Minimize } from "lucide-react";

export default function PhotoSlugImage({ src, blurDataURL, alt }: { src?: string, blurDataURL?: string, alt?: string }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className='group relative flex items-center justify-center aspect-video' onClick={() => setExpanded(!expanded)}>
            <BlurImage
                className={`rounded-xl z-0 object-cover group-hover:brightness-50 group-hover:blur-sm`}
                src={src ? src : '/Cavansite-45.jpeg'}
                blurDataURL={blurDataURL || undefined}
                alt={alt ? alt : ""}
                {...expanded ? {
                    height: 1000, width: 1000, style: {
                        width: '100%',
                        height: 'auto', // Allow the height to adjust automatically
                    }
                } : { fill: true }}
            />
            <div className="absolute text-white inset-0 flex gap-2 justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                {expanded ? (<Minimize />) : (<Expand />)}
                <h3 className="text-sm sm:text-xl font-medium">Click to {expanded ? "Collapse" : "Expand"}</h3>
            </div>
        </div>
    )
}