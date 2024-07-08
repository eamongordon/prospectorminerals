"use client";

import { useEffect, useState } from "react";
import { fetchMinerals, fetchLocalities, fetchPhotos, fetchPosts } from "@/lib/actions";
import BlurImage from "../blur-image";
import { Chip, Input } from "@nextui-org/react";
import { Search as MagnifyingGlassIcon } from "lucide-react";
import { useDebounce } from "use-debounce";
import Link from "next/link";

type SearchResult = {
    type: string, name: string, image?: string, imageBlurhash?: string, slug: string
}

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [query] = useDebounce(searchTerm, 500);
    useEffect(() => {
        if (searchTerm) {
            fetchResults();
        }
    }, [query]);
    function fetchResults() {
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
        });
    }
    return (
        <div className="w-full relative">
            <div className="flex flex-col sm:absolute w-full sm:mt-[-30px]">
                <Input
                    type="text"
                    label="Search"
                    size="sm"
                    radius="md"
                    classNames={{ base: "w-full" }}
                    value={searchTerm || ""}
                    isClearable={searchTerm ? true : false}
                    onValueChange={setSearchTerm}
                    endContent={
                        searchTerm ? (null) : (<><div className='h-full flex items-center'><MagnifyingGlassIcon /></div></>)
                    }
                />
                <div className={`sm:bg-white sm:dark:bg-zinc-900 rounded-lg p-5 ${results.length > 0 ? "" : "hidden"}`}>
                    {results.length > 0 ?
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
                                            <div className="flex flex-col">
                                                <div className="justify-center items-center">
                                                    <p className="text-lg font-semibold">{result.name}</p>
                                                </div>
                                                <Chip size="md">{result.type}</Chip>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )
                        : (<></>)
                    }
                </div>
            </div>
        </div>
    )
}