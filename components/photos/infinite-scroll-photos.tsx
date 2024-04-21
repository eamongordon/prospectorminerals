'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { fetchPhotos } from '@/lib/actions';
import { Spinner, Button } from "@nextui-org/react";
import BlurImage from '../blur-image';
import { PhotosSortObj } from '@/types/types';

export default function InfiniteScrollPhotos({
  search,
  initialPhotos,
  initialCursor,
  sort,
  key,
  clearFilters
}: {
  search?: string,
  initialPhotos?: any[],
  initialCursor?: number,
  sort?: PhotosSortObj,
  key?: string,
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
    // now you got a read/write object
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    // update as necessary
    if (!text) {
      current.delete("search");
    }
    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const queryParam = search ? `?${search}` : "";
    router.push(`${pathname}${queryParam}`);
  }, [text])

  async function loadMorePhotos() {
    if (page) {
      const photosQuery = await fetchPhotos({ filterObj: { name: search }, cursor: page, limit: 10, ...(sort ? { sortObj: sort } : {}), });
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
      className='w-full grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5'
    >
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
        {
          photos?.length && photos.length > 0 ? (
            <></>
          ) : (
            <>
              <div className='flex-col items-center justify-center col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-5'>
                <p className='w-full text-center'>No Photos Found. Try adjusting your filters.</p>
                <div className='flex items-center justify-center py-4'>
                  <Button isLoading={noPhotosLoading} className="flex" onClick={() => {if (clearFilters) {setNoPhotosLoading(true); clearFilters();}}}>
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