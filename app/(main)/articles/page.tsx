import InfiniteScrollArticles from '@/components/articles/infinite-scroll-articles';
import ArticlesLayout from "@/components/articles/articles-layout";
import SortDropdown from '@/components/photos/sort-dropdown';
import { fetchPosts } from '@/lib/actions';
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Articles | Prospector Minerals',
    description: 'Detailed, comprehensive mineralogy articles covering Minerals, Localities, Chemical Properties, News, and More.',
}

const selectOptions = [
    { label: "Default", value: "default" },
    { label: 'Recently Published', value: 'publishedAt,desc' },
    { label: 'Recently Updated', value: 'updatedAt,desc' },
    { label: "A - Z", value: "title,asc" },
    { label: "Z - A", value: "title,desc" },
]

const Page = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const title =
        typeof searchParams.title === 'string' ? searchParams.title : undefined
    const property =
        typeof searchParams.property === 'string' ? searchParams.property : undefined
    const order =
        typeof searchParams.order === 'string' ? searchParams.order : undefined
    const filterObj = { title: title };
    const photosQuery = await fetchPosts({ filterObj: filterObj, cursor: undefined, limit: 10, ...(property && order ? { sortObj: { property: property, order: order } } : {}) });
    const serializedKey = JSON.stringify({ filterObj, property, order });
    return (
        <main>
            <div className="flex justify-center items-center">
                <section className='flex-col justify-center items-center py-4 px-6 w-full max-w-screen-xl'>
                    <ArticlesLayout
                        infiniteScrollElem={
                            <InfiniteScrollArticles
                                filterObj={filterObj}
                                initialPhotos={photosQuery.results}
                                initialCursor={photosQuery.next ? photosQuery.next : undefined} {...(property && order ? { sort: { property: property, order: order } } : {})}
                                key={serializedKey} />
                        }
                        sortDropdownElem={
                            <SortDropdown sortOptions={selectOptions} {...(property && order ? { sort: `${property},${order}` } : {})} />
                        }
                        filterObj={filterObj}
                    />
                </section>
            </div>
        </main >
    )
}

export default Page;