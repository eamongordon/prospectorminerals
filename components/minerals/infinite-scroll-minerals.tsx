'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { fetchMinerals } from '@/lib/actions';
import MineralCard from './mineral-card';
import { customAlphabet } from "nanoid";
import { Spinner, Button} from "@nextui-org/react";
import type { MineralsFilterObj, PhotosSortObj } from '@/types/types';
import type { Mineral } from '@prisma/client';

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

export default function InfiniteScrollPhotos({
  filterObj,
  initialPhotos,
  initialCursor,
  sort,
  limit,
  clearFilters
}: {
  filterObj?: MineralsFilterObj
  initialPhotos?: Mineral[],
  initialCursor?: number,
  sort?: PhotosSortObj,
  limit?: number,
  clearFilters?: Function
}) {

  const [photos, setPhotos] = useState(initialPhotos);
  const [page, setPage] = useState(initialCursor || undefined);
  const [ref, inView] = useInView();
  const [noPhotosLoading, setNoPhotosLoading] = useState(false);

  async function loadMorePhotos() {
    if (page) {
      console.log("loadMoreMin")
      const photosQuery = await fetchMinerals({ ...(filterObj ? { filterObj: filterObj } : {}) || {}, cursor: page, limit: limit ? limit : 10, ...(sort ? { sortObj: sort } : {}), });
      if (photosQuery.results?.length) {
        setPage(photosQuery.next ? photosQuery.next : undefined)
        setPhotos((prev: Mineral[] | undefined) => [
          ...(prev?.length ? prev : []),
          ...photosQuery.results
        ]);
      };
    } else {
      console.log("noMoreMin")
    }
  }

  // TODO: wrap loadMoreMovies in useCallback and pass it to the dep array
  useEffect(() => {
    console.log("ref");
    console.log(ref);
    console.log("inView");
    console.log(inView);
    if (inView && page) {
      loadMorePhotos()
    }
  }, [inView])

  return (
    <ul
      role='list'
      className='w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
    >
      <>
        {
          photos?.map(mineral => (
            <li key={mineral.id} className='relative flex flex-col items-center justify-center text-center group w-full overflow-hidden rounded-xl'>
                <MineralCard name={mineral.name} slug={mineral.id}/>
            </li>
          ))
        }
        {
          photos?.length && photos.length > 0 ? (
            <></>
          ) : (
            <div className='flex-col items-center justify-center col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3'>
              <p className='w-full text-center'>No Minerals Found. Try adjusting your filters.</p>
              <div className='flex items-center justify-center py-4'>
                <Button className="flex" isLoading={noPhotosLoading} onClick={() => {if (clearFilters) {setNoPhotosLoading(true); clearFilters();}}}>
                  Clear Filters
                </Button>
              </div>
            </div>
          )
        }

        {/* loading spinner */}
        <div
          ref={ref}
          className={`${!page ? "hidden" : ""} mt-16 mb-16 flex items-center justify-center col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3`}
        >
          <Spinner />
        </div>
      </>
    </ul>
  )
}