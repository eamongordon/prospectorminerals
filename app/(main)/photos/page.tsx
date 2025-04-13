import InfiniteScrollPhotos from '@/components/photos/infinite-scroll-photos';
import PhotosLayout from "@/components/photos/photos-layout";
import SortDropdown from '@/components/sort-dropdown';
import { fetchPhotos } from '@/lib/fetchers';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photos',
  description: 'A searchable photo gallery of minerals from worldwide localities.',
  openGraph: {
    images: ['/Fluorite-164_horiz-Optimized.jpg'],
    siteName: 'Prospector Minerals',
    url: '/photos'
  }
}

const Page = async (
    props: {
        searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }
) => {
    const searchParams = await props.searchParams;
    const search =
        typeof searchParams.search === 'string' ? searchParams.search : undefined
    const property =
        typeof searchParams.property === 'string' ? searchParams.property : undefined
    const order =
        typeof searchParams.order === 'string' ? searchParams.order : undefined
    const filterObj = { name: search };
    const photosQuery = await fetchPhotos({ filterObj: filterObj, cursor: undefined, limit: 10, ...(property && order ? { sortObj: { property: property, order: order } } : {}) });
    const serializedKey = JSON.stringify({ filterObj, property, order });
    return (
        <main>
            <div className="flex justify-center items-center">
                <section className='flex-col justify-center items-center py-4 px-6 w-full max-w-screen-xl'>
                    <PhotosLayout
                        infiniteScrollElem={
                            <InfiniteScrollPhotos
                                search={search}
                                initialPhotos={photosQuery.results}
                                initialCursor={photosQuery.next ? photosQuery.next : undefined} {...(property && order ? { sort: { property: property, order: order } } : {})}
                                key={serializedKey} />
                        }
                        search={search}
                        sortDropdownElem={
                            <SortDropdown {...(property && order ? { sort: `${property},${order}` } : {})} />
                        }
                    />
                </section>
            </div>
        </main >
    )
}

export default Page;