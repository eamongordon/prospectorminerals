'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { fetchPosts } from '@/lib/actions';
import { customAlphabet } from "nanoid";
import { Spinner, Button } from "@nextui-org/react";
import type { ArticlesFilterObj, MineralsFilterObj, PhotosSortObj } from '@/types/types';
import type { Post } from '@prisma/client';

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

export default function InfiniteScrollArticles({
  filterObj,
  initialPhotos,
  initialCursor,
  sort,
  limit,
  clearFilters
}: {
  filterObj?: ArticlesFilterObj
  initialPhotos?: Post[],
  initialCursor?: number,
  sort?: PhotosSortObj,
  limit?: number,
  clearFilters?: Function
}) {

  const [articles, setArticles] = useState(initialPhotos);
  const [page, setPage] = useState(initialCursor || undefined);
  const [ref, inView] = useInView();
  const [noPhotosLoading, setNoPhotosLoading] = useState(false);

  async function loadMoreArticles() {
    if (page) {
      const articlesQuery = await fetchPosts({ filterObj: filterObj, cursor: page, limit: limit ? limit : 10, ...(sort ? { sortObj: sort } : {}), fieldset: "display" });
      if (articlesQuery.results?.length) {
        setPage(articlesQuery.next ? articlesQuery.next : undefined)
        setArticles((prev: Post[] | undefined) => [
          ...(prev?.length ? prev : []),
          ...articlesQuery.results
        ]);
      };
    }
  }

  useEffect(() => {
    if (inView && page) {
      loadMoreArticles()
    }
  }, [inView])
  return (
    <ul
      role='list'
      className='w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
    >
      <>
        {
          articles?.length && articles.length > 0 ? (
            articles?.map(article => (
              <p>{article.title}</p>
            ))
          ) : (
            <div className='flex-col items-center justify-center col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3'>
              <p className='w-full text-center'>No Articles Found. Try adjusting your filters.</p>
              <div className='flex items-center justify-center py-4'>
                <Button className="flex" isLoading={noPhotosLoading} onClick={() => { if (clearFilters) { setNoPhotosLoading(true); clearFilters(); } }}>
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