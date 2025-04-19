'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import MineralCard from './mineral-card';
import { Spinner, Button } from "@heroui/react";
import type { MineralsFilterObj, PhotosSortObj, MineralListItem } from '@/types/types';
import type { MineralDisplayFieldset } from '@/types/prisma';

export default function InfiniteScrollPhotos({
  filterObj,
  initialPhotos,
  initialCursor,
  sort,
  limit,
  clearFilters
}: {
  filterObj?: MineralsFilterObj
  initialPhotos?: MineralDisplayFieldset[],
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
      console.log("loadMoreMin");
      const queryParams = new URLSearchParams({
        ...(filterObj ? { filter: JSON.stringify(filterObj.associates ? { 
          ...filterObj, 
          associates: filterObj.associates.map((associateObj) => (associateObj as MineralListItem).name) 
        } : filterObj) } : {}),
        cursor: page.toString(),
        limit: (limit || 10).toString(),
        ...(sort ? { sortBy: sort.property, sort: sort.order } : {}),
        fieldset: "display",
      });

      const response = await fetch(`/api/minerals?${queryParams.toString()}`);
      if (response.ok) {
        const photosQuery = await response.json();
        setPage(photosQuery.next ? photosQuery.next : undefined);
        setPhotos((prev: MineralDisplayFieldset[] | undefined) => [
          ...(prev?.length ? prev : []),
          ...photosQuery.results,
        ]);
      } else {
        console.error("Failed to fetch minerals from API");
      }
    } else {
      console.log("noMoreMin");
    }
  }

  useEffect(() => {
    if (inView && page) {
      loadMorePhotos()
    }
  }, [inView]);

  return (
    <ul
      role='list'
      className='w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
    >
      <>
        {
          photos?.map(mineral => (
            <li key={mineral.id}>
              <MineralCard name={mineral.name} slug={mineral.slug} blurDataURL={mineral.photos.length > 0 && mineral.photos[0].photo.imageBlurhash ? mineral.photos[0].photo.imageBlurhash : undefined} image={mineral.photos.length > 0 && mineral.photos[0].photo.image ? mineral.photos[0].photo.image : undefined} />
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
                <Button className="flex" isLoading={noPhotosLoading} onPress={() => { if (clearFilters) { setNoPhotosLoading(true); clearFilters(); } }}>
                  Clear Filters
                </Button>
              </div>
            </div>
          )
        }
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