'use client'

import { useEffect, useState, Fragment } from 'react'
import { useInView } from 'react-intersection-observer'
import { fetchPhotos } from '@/lib/actions';
import Image from 'next/image'
import { customAlphabet } from "nanoid";
import { Spinner } from "@nextui-org/react";
import BlurImage from '../blur-image';

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

type PhotosSortObj = {
  property: string
  order: string
}

export default function InfiniteScrollPhotos({
  search,
  initialPhotos,
  initialCursor,
  sort
}: {
  search: string | undefined
  initialPhotos: any[] | undefined,
  initialCursor: number | undefined
  sort?: PhotosSortObj | undefined
}) {

  const [photos, setPhotos] = useState(initialPhotos);
  const [page, setPage] = useState(initialCursor || undefined);
  const [ref, inView] = useInView();
  const [hoverItem, setHoverItem] = useState("");
  function handleHoverIn(itemId: string) {
    setHoverItem(itemId);
  };
  function handleHoverOut(itemId: string) {
    setHoverItem("");
  };

  async function loadMorePhotos() {
    if (page) {
      const photosQuery = await fetchPhotos({ filterObj: { name: search }, cursor: page, limit: 10, ...(sort ? { sortObj: sort } : {}),});
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
        <li key={photo.id} className='relative'>
          <div
            className='relative flex flex-col items-center justify-center text-center group aspect-square w-full overflow-hidden rounded-lg'
            id={photo.id}
            onMouseEnter={(e) => handleHoverIn(e.currentTarget.id)}
            onMouseLeave={(e) => handleHoverOut(e.currentTarget.id)}
          >
            {photo.image && (
              <BlurImage
                src="/Cavansite-45.jpeg"
                alt=''
                id={photo.id}
                className={`${hoverItem === photo.id ? "brightness-50 blur-sm" : ""} rounded-lg`}
                fill={true}
                objectFit='cover'
                blurDataURL={photo.blurDataURL}
              />
            )}
            {hoverItem === photo.id ? (
              <>
                <h3 className="text-sm sm:text-xl z-10 font-medium text-white px-2">{photo?.title}</h3>
                <p className="text-sm sm:text-md z-10 text-white px-2">{photo?.number}</p>
              </>
            ) : (
              <></>
            )}
          </div>
        </li>
      ))}

      {/* loading spinner */}
      <div
        ref={ref}
        className={`${!page ? "hidden" : ""} mt-16 mb-16 flex items-center justify-center col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-5`}
      >
        <Spinner />
      </div>
    </>
  )
}