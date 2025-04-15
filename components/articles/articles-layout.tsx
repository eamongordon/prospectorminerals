'use client'

import { useEffect, useState, useRef, Children, cloneElement } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Search as MagnifyingGlassIcon } from 'lucide-react'
import { useDebounce } from 'use-debounce';
import { Input } from "@heroui/react";
import { ArticlesFilterObj } from '@/types/types';

export default function ArticlesLayout({
    infiniteScrollElem,
    sortDropdownElem,
    filterObj,
}: {
    infiniteScrollElem: React.ReactElement,
    sortDropdownElem: React.ReactElement,
    filterObj: ArticlesFilterObj,
}) {
    const { title } = Object(filterObj);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const initialRender = useRef(true)

    const [text, setText] = useState(title)
    const [query] = useDebounce(text, 500);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        if (!query) {
            current.delete("title");
        } else {
            current.set("title", query);
        }
        const title = current.toString();
        const queryParam = title ? `?${title}` : "";

        router.push(`${pathname}${queryParam}`);
    }, [query])

    const clearFilters = () => {
        setText(undefined);
    }
    
    const renderChildren = () => {
        return Children.map(infiniteScrollElem, (child) => {
            return cloneElement(child as React.ReactElement<any>, {
                clearFilters: () => clearFilters()
            });
        });
    };

    return (
        <>
            <div className='mb-4 sm:mb-12 flex-row sm:my-5 sm:flex sm:gap-x-10 items-center justify-between'>
                <div className='py-2 sm:basis-2/3'>
                    <div className='relative'>
                        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                            <MagnifyingGlassIcon
                                className='h-5 w-5 text-gray-400'
                                aria-hidden='true'
                            />
                        </div>
                        <Input
                            type="text"
                            value={text || ""}
                            label="Search"
                            size="sm"
                            radius='md'
                            isClearable={text ? true : false}
                            onValueChange={setText}
                            endContent={
                                !text && (<><div className='h-full flex items-center'><MagnifyingGlassIcon /></div></>)
                            }
                        />
                    </div>
                </div>
                <div className='py-2 sm:basis-1/3'>
                    {sortDropdownElem}
                </div>
            </div>
            {renderChildren()}
        </>
    )
}