'use client'

import { useEffect, useState, Fragment } from 'react'
import { useInView } from 'react-intersection-observer'
import { fetchMinerals } from '@/lib/actions';
import MineralCard from './mineral-card';
import { customAlphabet } from "nanoid";
import { Spinner, Button, Card, CardBody, CardFooter, Image as UIImage, Link } from "@nextui-org/react";
import BlurImage from '../blur-image';
import { useSearchParams } from 'next/navigation'
import Image from "next/image";

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
  sort,
  key,
  clearFilters
}: {
  filterObj: MineralsFilterObj | undefined
  initialPhotos: any[] | undefined
  initialCursor: number | undefined
  sort?: PhotosSortObj | undefined,
  key?: string | undefined,
  clearFilters?: any | undefined
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
    <ul
      key={key}
      role='list'
      className='w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
    >
      <>
        {
          photos?.map(mineral => (
            <li key={mineral.id} className='relative'>
              <div
                className='aspect-square relative flex flex-col items-center justify-center text-center group w-full overflow-hidden rounded-lg'
                id={mineral.id}
              >
              <BlurImage
                src="/Amazonite-106_horiz.jpeg"
                alt=''
                id={mineral.id}
                className={`rounded-lg`}
                fill={true}
                objectFit='cover'
                blurDataURL={"data:image/png;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoADIDASIAAhEBAxEB/8QAGwAAAwADAQEAAAAAAAAAAAAAAAYHBAUIAwL/xAAmEAACAgICAQMEAwAAAAAAAAABAgADBREEBiESEyIHMUGRFHGh/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDBQAE/8QAGxEAAgIDAQAAAAAAAAAAAAAAAAIBEQMhMQT/2gAMAwEAAhEDEQA/AOWEqdz4EzeNjLbSNKYzYHDDkFfEoGI6snxJSGiLZlXpOsf1e24A+gzM5HULlTYrP6l3wnXqFCgqIwW9Zotq0EEm00UxvD8OR+fg7qCdqZqLaWrOiJ0t2vqCIjsqf5In2jF/xbX+OtTlaykrQnwn0V8mEcUqHUeXWpTZEp/AyFK1Loic+YfINQw8xv4vYCqAeuUWTL9OFmnRZ+JmlVwAY24rJ+6o87nPXC7Bu0fOPvXuxIAu3k8lSP5cbpOyoZiheTxm+O9iQj6g4YhrGCyvUdgpenRcfaIvduZRfW+iJ511JsdggT49g7ePzCMdnt+439mEtZKhHSwr9p7DluPzCEYSok96cg6HfqM3XA7DZTr5GEIJDGjeU9wsVde4f3MDJdmfkKQXJhCChrkXzkmJJ3CEIaBZ/9k="}
              />
              </div>
            </li>
          ))
        }
        {
          photos?.length && photos.length > 0 ? (
            <></>
          ) : (
            <div className='flex-col items-center justify-center col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3'>
              <p className='w-full text-center'>No Minerals Found. Try adjusting your filters</p>
              <div className='flex items-center justify-center'>
                <Button className="flex" onClick={() => clearFilters ? clearFilters() : console.log("no clear func provided")}>
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