'use client'

import { useEffect, useState, Fragment } from 'react'
import { useInView } from 'react-intersection-observer'
import { fetchMinerals } from '@/lib/actions';
import MineralCard from './mineral-card';
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

type MineralsFilterObj = {
  name: string | undefined,
  minHardness?: number | undefined,
  maxHardness?: number | undefined,
  lusters?: string[] | undefined,
  streaks?: string[] | undefined,
  mineralClasses?: string[] | undefined,
  chemistry?: string[] | undefined,
  associates?: string[] | undefined
}

export default function InfiniteScrollPhotos({
  filterObj,
  initialPhotos,
  initialCursor,
  sort
}: {
  filterObj: MineralsFilterObj | undefined
  initialPhotos: any[] | undefined,
  initialCursor: number | undefined
  sort?: PhotosSortObj | undefined
}) {

  const [photos, setPhotos] = useState(initialPhotos);
  const [page, setPage] = useState(initialCursor || undefined);
  const [ref, inView] = useInView();

  async function loadMorePhotos() {
    if (page) {
      const photosQuery = await fetchMinerals({ ...(filterObj ? { filterObj: filterObj } : {}) || {}, cursor: page, limit: 10, ...(sort ? { sortObj: sort } : {}), });
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
      {photos?.map(mineral => (
        <li key={mineral.id} className='relative'>
          <div
            className='relative flex flex-col items-center justify-center text-center group aspect-square w-full overflow-hidden rounded-lg'
            id={mineral.id}
          >
            <MineralCard name={mineral.name} />
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