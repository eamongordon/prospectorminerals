'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search as MagnifyingGlassIcon } from 'lucide-react'
import { useDebounce } from 'use-debounce';
import { Input } from '@nextui-org/react';

const Search = ({ search }: { search?: string }) => {
  const router = useRouter()
  const initialRender = useRef(true)

  const [text, setText] = useState(search)
  const [query] = useDebounce(text, 250)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    if (!query) {
      router.push(`/photos`)
    } else {
      router.push(`/photos?search=${query}`)
    }
  }, [query])

  return (
    <div className='relative rounded-md shadow-sm'>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
        <MagnifyingGlassIcon
          className='h-5 w-5 text-gray-400'
          aria-hidden='true'
        />
      </div>
      <Input
        type="text"
        value={text}
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