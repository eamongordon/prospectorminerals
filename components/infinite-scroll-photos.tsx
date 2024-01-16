'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { fetchPhotos } from '@/lib/actions';
import Image from 'next/image'
import { customAlphabet } from "nanoid";
import {Spinner} from "@nextui-org/react";
import BlurImage from './blur-image';

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

export default function InfiniteScrollPhotos({
  search,
  initialPhotos,
  initialCursor
}: {
  search: string | undefined
  initialPhotos: any[] | undefined,
  initialCursor: number | undefined
}) {
  const [photos, setPhotos] = useState(initialPhotos)
  const [page, setPage] = useState(initialCursor || undefined);
  const [ref, inView] = useInView()

  async function loadMorePhotos() {
    if (page) {
      const photosQuery = await fetchPhotos({ filterObj: { name: search }, cursor: page, limit: 10 });
      if (photosQuery.results?.length) {
        setPage(photosQuery.next ? photosQuery.next : undefined)
        setPhotos((prev: any[] | undefined) => [
          ...(prev?.length ? prev : []),
          ...photosQuery.results
        ]);
      };
    } else {

    }
  }

  // TODO: wrap loadMoreMovies in useCallback and pass it to the dep array
  useEffect(() => {
    if (inView && page) {
      loadMorePhotos()
    }
  }, [inView])

  return (
    <>
      {photos?.map(photo => (
        <li key={nanoid()} className='relative'>
          <div className='group aspect-square w-full overflow-hidden rounded-lg bg-gray-100'>
            {photo.image && (
              <BlurImage
                src={photo.image}
                alt=''
                className='w-full object-cover group-hover:opacity-75'
                width={300}
                height={300}
                blurDataURL={photo.blurDataURL}
              />
            )}
            <p>{photo.title}</p>
          </div>
        </li>
      ))}

      {/* loading spinner */}
      <div
        ref={ref}
        className={`${!page ? "hidden": ""} col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4`}
      >
        <Spinner/>
      </div>
    </>
  )
}