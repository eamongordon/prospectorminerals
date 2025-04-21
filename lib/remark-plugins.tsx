import Link from "next/link";
import type { ReactNode, ImgHTMLAttributes } from "react";
import BlurImage from "@/components/blur-image";

export function replaceLinks({
  href,
  children,
}: {
  href?: string;
  children: ReactNode;
}) {
  // this is technically not a remark plugin but it
  // replaces internal links with <Link /> component
  // and external links with <a target="_blank" />
  return href?.startsWith("/") || href === "" ? (
    <Link href={href} className="cursor-pointer">
      {children}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children} ↗
    </a>
  );
}

export function replaceImgs(props: ImgHTMLAttributes<HTMLImageElement>) {
  // replace native <img> tags with <BlurImage />
  const src = typeof props.src === "string" ? props.src : "/Fluorite-164_horiz-Optimized.jpg";
  return <BlurImage {...props} src={src} alt={props.alt ?? ""} width={728} height={728} className="w-full rounded-xl md:rounded-2xl" />;
}