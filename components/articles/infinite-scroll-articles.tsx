'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { fetchPosts } from '@/lib/actions';
import { customAlphabet } from "nanoid";
import { Spinner, Button } from "@nextui-org/react";
import type { ArticlesFilterObj, MineralsFilterObj, PhotosSortObj } from '@/types/types';
import type { Post } from '@prisma/client';
import BlurImage from '../blur-image';
import Link from 'next/link';
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
      className='w-full'
    >
      <>
        {
          articles?.length && articles.length > 0 ? (
            articles?.map(article => (
              <li key={article.id}>
                <Link href={`/articles/${article.slug}`} className='flex w-full flex-col sm:flex-row gap-8'>
                  {article.image ? (
                    <div className="w-full sm:w-[45%] h-52 sm:h-80"> {/* This div ensures BlurImage can be styled to fill its parent */}
                      <BlurImage
                        alt='Article Image'
                        src={article.image}
                        width={500}
                        height={350}
                        className="w-full h-full object-cover rounded-xl"
                        blurDataURL={article.imageBlurhash || undefined}
                      // Add a className here if you need to apply specific styles
                      />
                    </div>
                  ) : null}
                  <div className={`${article.image ? "w-[55%]" : ""} flex flex-col justify-center gap-4`}>
                    <p className="text-sm opacity-70">
                      {new Date(article.createdAt).toLocaleDateString('en-US', {
                        month: 'short', // "Feb"
                        day: '2-digit', // "23"
                        year: 'numeric', // "2024"
                      })}
                    </p>
                    <h3 className="text-4xl font-bold">{article.title}</h3>
                    <p className="text-lg">{article.description}</p>
                  </div>
                </Link>
              </li>
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