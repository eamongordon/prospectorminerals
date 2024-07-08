"use client";

import { useEffect, useRef, useState } from "react";
import { fetchMinerals, fetchLocalities, fetchPhotos, fetchPosts } from "@/lib/actions";
import BlurImage from "../blur-image";
import { Button, Chip, Input, Skeleton } from "@nextui-org/react";
import { Search as MagnifyingGlassIcon } from "lucide-react";
import { useDebounce } from "use-debounce";
import Link from "next/link";

type SearchResult = {
    type: string, name: string, image?: string, imageBlurhash?: string, slug: string
}

export default function Search({ isHero }: { isHero?: boolean }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [query] = useDebounce(searchTerm, 500);
    const [noResultsLoading, setNoResultsLoading] = useState(false);
    const [resultsLoading, setResultsLoading] = useState(false);
    const initialLoad = useRef(false);
    useEffect(() => {
        if (searchTerm || initialLoad.current) {
            fetchResults();
        } else {
            if (initialLoad.current) {
                setResults([]);
            }
        }
    }, [query]);
    function fetchResults() {
        console.log("fetchRes")
        initialLoad.current = true;
        Promise.all([
            fetchMinerals({ filterObj: { name: query }, limit: 3, fieldset: 'display' }),
            fetchLocalities({ filterObj: { name: query }, limit: 3, fieldset: 'display' }),
            fetchPosts({ filterObj: { title: query }, limit: 3, fieldset: 'display' }),
            fetchPhotos({ filterObj: { name: query }, limit: 3, fieldset: 'display' })
        ]).then(([minerals, localities, posts, photos]) => {
            let allResults: SearchResult[] = [];
            minerals.results.forEach((mineral) => {
                allResults.push({ slug: mineral.slug, type: "Mineral", name: mineral.name, image: mineral.photos.length > 0 && mineral.photos[0].photo.image ? mineral.photos[0].photo.image : undefined });
            });
            photos.results.forEach((photo) => {
                allResults.push({ slug: photo.id, type: "Photo", name: photo.name!, image: photo.image!, imageBlurhash: photo.imageBlurhash! });
            });
            localities.results.forEach((locality) => {
                allResults.push({ slug: locality.slug, type: "Locality", name: locality.name, image: locality.photos.length > 0 && locality.photos[0].image ? locality.photos[0].image : undefined, imageBlurhash: locality.photos.length > 0 && locality.photos[0].imageBlurhash ? locality.photos[0].imageBlurhash : undefined });
            });
            posts.results.forEach((post) => {
                allResults.push({ slug: post.slug, type: "Article", name: post.title!, image: post.image!, imageBlurhash: post.imageBlurhash! });
            });
            allResults.length = 3;
            setResults(allResults);
            if (resultsLoading) {
                setResultsLoading(false);
            }
            if (noResultsLoading) {
                setNoResultsLoading(false);
            }
        });
    }
    return (
        <div className="relative">
            <div className="w-full relative flex flex-col">
                <Input
                    type="text"
                    label="Search"
                    size="sm"
                    radius="md"
                    classNames={{ base: `w-full`, inputWrapper: `${initialLoad.current || !initialLoad.current && resultsLoading ? "rounded-b-none" : ""}` }}
                    value={searchTerm || ""}
                    isClearable={searchTerm ? true : false}
                    onValueChange={(value) => {setResultsLoading(true); setSearchTerm(value)}}
                    endContent={
                        searchTerm ? (null) : (<><div className='h-full flex items-center'><MagnifyingGlassIcon /></div></>)
                    }
                />
                <div className="relative">
                    <div className={`${isHero ? "bg-white dark:bg-zinc-900" : "sm:bg-white sm:dark:bg-zinc-900"} sm:absolute w-full rounded-medium ${initialLoad.current || !initialLoad.current && resultsLoading ? "rounded-t-none" : ""} ${!initialLoad.current && !resultsLoading ? "" : "p-5"}`}>
                        {resultsLoading ? (
                            <div className="flex flex-col rounded-lg gap-4">
                                <>
                                    {[...Array(3)].map((_, index) => (
                                        <div key={index} className="flex flex-row gap-4 h-[66.7px]">
                                            <Skeleton className="w-[100px] aspect-3/2 rounded-lg shrink-0" />
                                            <div className="flex flex-col justify-center w-full gap-2">
                                                <Skeleton className="h-[20px] w-full rounded-lg" />
                                                <Skeleton className="h-[25px] w-[72px] rounded-full" />
                                            </div>
                                        </div>
                                    ))}
                                </>
                            </div>
                        ) : (<></>)}
                        {!resultsLoading && results.length && results[0] ?
                            (
                                <ul className="flex flex-col rounded-lg gap-4">
                                    {results.map((result) => (
                                        <li key={result.slug} className="hover:opacity-70">
                                            <Link className="flex flex-row gap-4" href={result.type === "Mineral" ? `/minerals/${result.slug}` : result.type === "Photo" ? `/photos/${result.slug}` : result.type === "Locality" ? `/localities/${result.slug}` : `/articles/${result.slug}`}>
                                                <BlurImage
                                                    src={result.image!}
                                                    alt={result.name}
                                                    blurDataURL={result.imageBlurhash}
                                                    width={100}
                                                    height={100}
                                                    className="rounded-lg object-cover aspect-[3/2]"
                                                />
                                                <div className="flex flex-col justify-center">
                                                    <div className="justify-center items-center">
                                                        <p className="text-lg font-semibold">{result.name}</p>
                                                    </div>
                                                    <Chip size="md">{result.type}</Chip>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (<></>)
                        }
                        {initialLoad.current && !resultsLoading && !results[0] ? (
                            <div className='flex-col items-center justify-center'>
                                <p className='w-full text-center'>No Results Found. Try adjusting your filters.</p>
                                <div className='flex items-center justify-center py-4'>
                                    <Button className="flex" isLoading={noResultsLoading} onClick={() => { setNoResultsLoading(true); setSearchTerm(""); }}>
                                        Clear Filters
                                    </Button>
                                </div>
                            </div>
                        ) : (<></>)}
                    </div>
                </div>
            </div>
        </div>
    )
}