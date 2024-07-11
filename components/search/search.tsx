"use client";

import { useEffect, useRef, useState } from "react";
import { fetchMinerals, fetchLocalities, fetchPhotos, fetchPosts } from "@/lib/actions";
import BlurImage from "../blur-image";
import { Button, Chip, Input, Skeleton } from "@nextui-org/react";
import { Search as MagnifyingGlassIcon } from "lucide-react";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SearchResult = {
    type: "Mineral" | "Photo" | "Locality" | "Article", name: string, image?: string, imageBlurhash?: string, slug: string
}

export default function Search({ isHero }: { isHero?: boolean }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [query] = useDebounce(searchTerm, 500);
    const [resultsLoading, setResultsLoading] = useState(false);
    const initialLoad = useRef(false);
    const [isFocused, setIsFocused] = useState(false);
    const [focusedSlug, setFocusedSlug] = useState<string | undefined>(undefined);

    const getLabel = (defaultLabel: string, isSmallerThanMd: boolean) => {
        const promptSuggestionLabel = `Try "Malachite" or "Tsumeb Mine"`;
        if (isFocused) {
            if (resultsLoading) {
                return "Loading Results...";
            } else {
                if (query) {
                    return `Results for "${query}"`;
                } else {
                    return promptSuggestionLabel;
                }
            }
        } else {
            if (isSmallerThanMd) {
                if (query) {
                    return `Results for "${query}"`;
                } else {
                    return defaultLabel;
                }
            } else {
                return defaultLabel;
            }
        }
    }

    useEffect(() => {
        if (searchTerm || initialLoad.current) {
            fetchResults();
        } else {
            if (initialLoad.current) {
                setResults([]);
            }
        }
    }, [query]);

    const MAX_RESULTS_LENGTH = 3;

    useEffect(() => {
        console.log("isFocused");
        console.log(isFocused)
    }, [isFocused]);

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
            allResults.length = allResults.length > MAX_RESULTS_LENGTH ? MAX_RESULTS_LENGTH : allResults.length;
            setResults(allResults);
        });
    }

    useEffect(() => {
        if (resultsLoading) {
            setResultsLoading(false);
        }
        console.log("RESULTSCHANGE")
    }, [results])

    const router = useRouter();

    const getLink = (type: "Mineral" | "Photo" | "Locality" | "Article", slug: string) => {
        return type === "Mineral" ? `/minerals/${slug}` : type === "Photo" ? `/photos/${slug}` : type === "Locality" ? `/localities/${slug}` : `/articles/${slug}`;
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!resultsLoading && results.length) {
            const currentItemIndex = results.findIndex((obj) => obj.slug === focusedSlug);
            switch (event.key) {
                case 'ArrowDown':
                    if (currentItemIndex + 1 === results.length) {
                        setFocusedSlug(undefined);
                    } else {
                        const nextItem = results[currentItemIndex + 1];
                        setFocusedSlug(nextItem.slug);

                    }
                    break;
                case 'ArrowUp':
                    if (currentItemIndex === 0) {
                        setFocusedSlug(undefined);
                    } else if (currentItemIndex === -1) {
                        const lastItem = results[results.length - 1];
                        setFocusedSlug(lastItem.slug)
                    } else {
                        const nextItem = results[currentItemIndex - 1];
                        setFocusedSlug(nextItem.slug);
                    }
                    break;
                case 'Enter':
                    const currentItem = results[currentItemIndex]
                    router.push(getLink(currentItem.type, currentItem.slug));
                    break;
                default:
                    break;
            }
        }
        if (event.key === 'Escape') {
            setResultsLoading(true);
            blurAllChildElements();
            setSearchTerm("");
        }
    };

    const parentDivRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null); // Ref for the input element

    const checkFocus = () => {
        // Delay the check to allow focus event to complete
        setTimeout(() => {
            if (parentDivRef.current && parentDivRef.current.contains(document.activeElement)) {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
                setIsFocused(true);
            } else {
                if (inputRef.current) {
                    inputRef.current.blur();
                }
                setIsFocused(false);
            }
        }, 0); // A timeout of 0 ms is often enough to delay the execution until after the current event stack
    };

    const blurAllChildElements = () => {
        if (parentDivRef.current) {
            // Select all child elements
            const allChildElements = parentDivRef.current.querySelectorAll('*');
            // Iterate over each element and blur it
            allChildElements.forEach(element => {
                if (element instanceof HTMLElement) {
                    element.blur();
                }
            });
        }
    };

    useEffect(() => {
        // Add event listeners to the document to track focus changes
        document.addEventListener('focusin', checkFocus);
        document.addEventListener('focusout', checkFocus);

        return () => {
            // Cleanup the event listeners
            document.removeEventListener('focusin', checkFocus);
            document.removeEventListener('focusout', checkFocus);
        };
    }, []);

    return (
        <div className="relative" ref={parentDivRef}>
            <div className={`w-full relative flex flex-col ${!isHero ? "mb-2" : ""}`}
                tabIndex={-1}
            >
                <Input
                    type="text"
                    label={<><p className="block sm:hidden">{getLabel("Search...", true)}</p><p className="hidden sm:block md:hidden">{getLabel("Search Minerals, Localities, and more...", true)}</p><p className="hidden md:block">{getLabel("Search Minerals, Localities, and more...", false)}</p></>}
                    size="sm"
                    radius="md"
                    classNames={{ base: `w-full`, inputWrapper: `${isHero && (initialLoad.current || !initialLoad.current && resultsLoading) && isFocused ? "rounded-b-none" : ""}` }}
                    value={searchTerm || ""}
                    isClearable={searchTerm ? true : false}
                    onValueChange={(value) => { setResultsLoading(true); setSearchTerm(value) }}
                    endContent={
                        searchTerm ? (null) : (<><div className='h-full flex items-center'><MagnifyingGlassIcon /></div></>)
                    }
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                />
                <div className="relative">
                    <div className={`${isHero ? "bg-white dark:bg-zinc-900" : "sm:bg-white sm:dark:bg-zinc-900"} ${!isHero ? "md:absolute" : ""}  w-full rounded-medium ${isHero && (initialLoad.current || !initialLoad.current && resultsLoading) ? "rounded-t-none sm:rounded-medium" : ""} ${isFocused ? "sm:rounded-t-none sm:block" : isHero ? "hidden" : ""} ${!initialLoad.current && !resultsLoading ? "" : "p-5"}`}>
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
                        {!resultsLoading && results.length ?
                            (
                                <ul className="flex flex-col rounded-lg gap-4">
                                    {results.map((result) => (
                                        <li key={result.slug} className={`hover:opacity-70 ${focusedSlug === result.slug ? "opacity-60" : ""}`}>
                                            <Link className="flex flex-row gap-4" href={getLink(result.type, result.slug)}>
                                                <BlurImage
                                                    src={result.image || "/Amazonite-106_horiz.jpeg"}
                                                    alt={result.name || "Photo"}
                                                    blurDataURL={result.imageBlurhash}
                                                    quality={25}
                                                    width={100}
                                                    height={100}
                                                    className="rounded-lg object-cover aspect-[3/2]"
                                                />
                                                <div className="flex flex-col justify-center">
                                                    <div className="justify-center items-center">
                                                        <p className="text-lg font-semibold">{result.name}</p>
                                                    </div>
                                                    <Chip variant="flat" size="md">{result.type}</Chip>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (<></>)
                        }
                        {initialLoad.current && !resultsLoading && !results.length ? (
                            <div className='flex-col items-center justify-center'>
                                <p className='w-full text-center'>No Results Found. Try adjusting your filters.</p>
                                <div className='flex items-center justify-center py-4'>
                                    <Button className="flex" isLoading={resultsLoading} onClick={() => { setResultsLoading(true); setSearchTerm(""); }}>
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