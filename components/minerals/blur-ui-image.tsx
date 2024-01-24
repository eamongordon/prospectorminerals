"use client";

import cn from "clsx";
import Image from "next/image";
import { Image as UIImage } from "@nextui-org/react";
import { useState } from "react";

import type { ComponentProps } from "react";

export default function BlurImage(props: ComponentProps<typeof Image>) {
  const [isLoading, setLoading] = useState(true);

  return (
    //@ts-expect-error
    <UIImage
      {...props}
      alt={props.alt}
      className={cn(
        props.className,
        "duration-700 ease-in-out",
        isLoading ? "scale-105 blur-lg" : "scale-100 blur-0",
      )}
      onLoad={() => setLoading(false)}
    />
  );
}
