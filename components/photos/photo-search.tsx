'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Search as MagnifyingGlassIcon } from 'lucide-react'
import { useDebounce } from 'use-debounce';
import { Input } from '@nextui-org/react';

const Search = ({ search }: { search?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialRender = useRef(true)

  const [text, setText] = useState(search)
  const [query] = useDebounce(text, 500)

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

  return (
    <div className='relative'>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
        <MagnifyingGlassIcon
          className='h-5 w-5 text-gray-400'
          aria-hidden='true'
        />
      </div>
      <Input
        type="text"
        defaultValue={text || undefined}
        placeholder="Search"
        onChange={e => setText(e.target.value)}
        endContent={
          <MagnifyingGlassIcon />
        }
      />
    </div>
  )
}

export default Search