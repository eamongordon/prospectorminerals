import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7,
); // 7-character random string

import { fetchPhotos } from '@/lib/actions'
import SortDropdown from '@/components/photos/sort-dropdown';
import InfiniteScrollPhotos from '@/components/photos/infinite-scroll-photos';
import PhotosLayout from "@/components/photos/photos-layout";

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
    const photosQuery = await fetchPhotos({ filterObj: { name: search }, cursor: undefined, limit: 10, ...(property && order ? { sortObj: { property: property, order: order } } : {}) });
    return (
        <main>
            <div className="flex justify-center items-center">
                <section className='flex-col justify-center items-center py-4 px-6 w-full max-w-screen-xl'>
                    <PhotosLayout
                        infiniteScrollElem={<InfiniteScrollPhotos search={search} initialPhotos={photosQuery.results} initialCursor={photosQuery.next ? photosQuery.next : undefined} {...(property && order ? { sort: { property: property, order: order } } : {})} key={nanoid()} />}
                        search={search}
                        sortDropdownElem={<SortDropdown {...(property && order ? { sort: `${property},${order}` } : {})} />}
                    />
                </section>
            </div>
        </main >
    )
}

export default Page;