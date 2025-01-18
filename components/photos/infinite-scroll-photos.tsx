'use client'

import { fetchPhotos } from '@/lib/actions'
import { PhotoDisplayFieldset } from '@/types/prisma'
import type { PhotosSortObj } from '@/types/types'
import { Button, Skeleton, Spinner } from "@heroui/react"
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import BlurImage from '../blur-image'

export default function InfiniteScrollPhotos({
  search,
  initialPhotos,
  initialCursor,
  sort,
  clearFilters
}: {
  search?: string,
  initialPhotos?: PhotoDisplayFieldset[],
  initialCursor?: number,
  sort?: PhotosSortObj,
  clearFilters?: Function | undefined
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [photos, setPhotos] = useState(initialPhotos);
  const [page, setPage] = useState(initialCursor || undefined);
  const [ref, inView] = useInView();
  const [hoverItem, setHoverItem] = useState("");
  const initialRender = useRef(true)
  const [text, setText] = useState(search)
  const [noPhotosLoading, setNoPhotosLoading] = useState(false);

  function handleHoverIn(itemId: string) {
    setHoverItem(itemId);
  };
  function handleHoverOut(itemId: string) {
    setHoverItem("");
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    if (!text) {
      current.delete("search");
    }
    const search = current.toString();
    const queryParam = search ? `?${search}` : "";
    router.push(`${pathname}${queryParam}`);
  }, [text])

  // TODO: Wrap loadMorePhotos in useCallback
  async function loadMorePhotos() {
    if (page) {
      const photosQuery = await fetchPhotos({ filterObj: { name: search }, cursor: page, limit: 10, ...(sort ? { sortObj: sort } : {}), });
      setPage(photosQuery.next ? photosQuery.next : undefined)
      setPhotos((prev: PhotoDisplayFieldset[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...photosQuery.results
      ]);
    } else {
    }
  }

  useEffect(() => {
    if (inView && page) {
      loadMorePhotos()
    }
  }, [inView])

  return (
    <ul
      role='list'
      className='w-full grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5'
    >
      <>
        {photos?.map(photo => (
          <li key={photo.id} className='relative'>
            <Link href={`/photos/${photo.id}`}>
              <div
                className='relative flex flex-col items-center justify-center text-center group aspect-square w-full overflow-hidden rounded-lg'
                id={photo.id}
                onMouseEnter={(e) => handleHoverIn(e.currentTarget.id)}
                onMouseLeave={(e) => handleHoverOut(e.currentTarget.id)}
              >
                <Skeleton
                  className='h-full w-full absolute' />
                {photo.image && (
                  <BlurImage
                    src={photo.image}
                    alt={photo.name || "Photo"}
                    width={300}
                    height={300}
                    quality={50}
                    id={photo.id}
                    className={`${hoverItem === photo.id ? "brightness-50 blur-sm" : ""} absolute rounded-lg w-full h-full object-cover`}
                    blurDataURL={photo.imageBlurhash || undefined}
                  />
                )}
                {hoverItem === photo.id ? (
                  <>
                    <h3 className="text-sm sm:text-xl z-10 font-medium text-white px-2">{photo?.name}</h3>
                    <p className="text-sm sm:text-md z-10 text-white px-2">{photo?.locality?.name || photo.locality_fallback}</p>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </Link>
          </li>
        ))}
        {
          photos?.length && photos.length > 0 ? (
            <></>
          ) : (
            <>
              <div className='flex-col items-center justify-center col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-5'>
                <p className='w-full text-center'>No Photos Found. Try adjusting your filters.</p>
                <div className='flex items-center justify-center py-4'>
                  <Button isLoading={noPhotosLoading} className="flex" onPress={() => { if (clearFilters) { setNoPhotosLoading(true); clearFilters(); } }}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            </>
          )
        }
        {/* loading spinner */}
        <div
          ref={ref}
          className={`${!page ? "hidden" : ""} mt-16 mb-16 flex items-center justify-center col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-5`}
        >
          <Spinner />
        </div>
      </>
    </ul>
  )
}