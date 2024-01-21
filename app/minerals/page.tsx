import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7,
); // 7-character random string

import { fetchMinerals } from '@/lib/actions'
import Header from "@/components/header";
import Footer from "@/components/footer";
import Search from '@/components/photos/photo-search';
import SortDropdown from '@/components/photos/sort-dropdown';
import InfiniteScrollMinerals from '@/components/minerals/infinite-scroll-minerals';
import MineralFilters from "@/components/minerals/mineral-filters";

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
    const photosQuery = await fetchMinerals({ filterObj: { name: search }, cursor: undefined, limit: 10, ...(property && order ? { sortObj: { property: property, order: order } } : {}) });
    return (
        <main>
            <Header />
            <div className="flex justify-center items-center">
                <section className='flex-col justify-center items-center py-4 px-6 w-full max-w-screen-xl'>
                    <div className='mb-4 sm:mb-12 flex-row my-5 sm:flex sm:gap-x-10 justify-between'>
                        <MineralFilters />
                        <ul
                            key={nanoid()}
                            role='list'
                            className='w-full grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5'
                        >
                            <InfiniteScrollMinerals search={search} initialPhotos={photosQuery.results} initialCursor={photosQuery.next ? photosQuery.next : undefined} {...(property && order ? { sort: { property: property, order: order } } : {})} />
                        </ul>
                    </div>
                </section>
            </div>
            <Footer />
        </main >
    )
}

export default Page;