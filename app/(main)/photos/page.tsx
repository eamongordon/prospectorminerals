import InfiniteScrollPhotos from '@/components/photos/infinite-scroll-photos';
import PhotosLayout from "@/components/photos/photos-layout";
import SortDropdown from '@/components/photos/sort-dropdown';
import { fetchPhotos } from '@/lib/actions';

const Page = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
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