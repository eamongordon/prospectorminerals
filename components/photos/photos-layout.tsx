'use client'

import { useEffect, useState, useRef, Children, cloneElement } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Search as MagnifyingGlassIcon } from 'lucide-react'
import { useDebounce } from 'use-debounce';
import { Input } from '@nextui-org/react';

export default function PhotosLayout({
    infiniteScrollElem,
    sortDropdownElem,
    search,
}: {
    infiniteScrollElem: React.ReactElement,
    sortDropdownElem: React.ReactElement,
    search: string | undefined,
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const initialRender = useRef(true)

    const [text, setText] = useState(search)
    const [query] = useDebounce(text, 500);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        // now you got a read/write object
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        // update as necessary
        if (!query) {
            current.delete("search");
        } else {
            current.set("search", query);
        }
        // cast to string
        const search = current.toString();
        // or const query = `${'?'.repeat(search.length && 1)}${search}`;
        const queryParam = search ? `?${search}` : "";

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
            <div className='mb-4 sm:mb-12 flex-row my-5 sm:flex sm:gap-x-10 items-center justify-between'>
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
                            placeholder="Search"
                            /*
                            Increase height of input
                            classNames={{
                                inputWrapper: "h-12"
                            }}
                            */
                            isClearable={text ? true : false}
                            onValueChange={setText}
                            endContent={
                                text ? (null): (<MagnifyingGlassIcon />)
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