import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7,
); // 7-character random string

import { fetchMinerals } from '@/lib/actions'
import Header from "@/components/header";
import Footer from "@/components/footer";
import InfiniteScrollMinerals from '@/components/minerals/infinite-scroll-minerals';
import MineralFilters from "@/components/minerals/mineral-filters";
import MineralFilterTags from "@/components/minerals/mineral-filter-tags";
import MineralPageLayout from "@/components/minerals/mineral-page-layout";

const Page = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const name =
        typeof searchParams.name === 'string' ? searchParams.name : undefined
    const lusters =
        typeof searchParams.lusters === 'string' ? searchParams.lusters : undefined
    const minHardness =
        typeof searchParams.minHardness === 'string' ? searchParams.minHardness : undefined
    const maxHardness =
        typeof searchParams.maxHardness === 'string' ? searchParams.maxHardness : undefined
    const property =
        typeof searchParams.property === 'string' ? searchParams.property : undefined
    const order =
        typeof searchParams.order === 'string' ? searchParams.order : undefined
    const photosQuery = await fetchMinerals({ filterObj: { name: name, lusters: lusters?.split(','), minHardness: Number(minHardness), maxHardness: Number(maxHardness) }, cursor: undefined, limit: 10, ...(property && order ? { sortObj: { property: property, order: order } } : {}) });
    return (
        <main>
            <Header />
            <div className="flex justify-center items-center">
                <section className='flex-col justify-center items-center py-4 px-6 w-full max-w-screen-xl'>
                    <div className='mb-4 sm:mb-12 flex-row my-5 sm:flex sm:gap-x-10 justify-between'>
                        {/*<div className="flex">
                            <MineralFilters filterObj={{ name: name, lusters: lusters?.split(','), minHardness: Number(minHardness), maxHardness: Number(maxHardness) }}/>
                        </div>
                        <div className="flex-col items-center justify-start">
                            <MineralFilterTags filterObj={{ name: name, lusters: lusters?.split(','), minHardness: Number(minHardness), maxHardness: Number(maxHardness) }} />
                            <div>
                            <ul
                                key={nanoid()}
                                role='list'
                                className='w-full grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3'
                            >
                                <InfiniteScrollMinerals filterObj={{ name: name, lusters: lusters?.split(','), minHardness: Number(minHardness), maxHardness: Number(maxHardness) }} initialPhotos={photosQuery.results} initialCursor={photosQuery.next ? photosQuery.next : undefined} {...(property && order ? { sort: { property: property, order: order } } : {})} />
                            </ul>
                            </div>
    </div>*/}

                        <MineralPageLayout filterObj={{ name: name, lusters: lusters?.split(','), minHardness: Number(minHardness), maxHardness: Number(maxHardness) }} initialPhotos={photosQuery.results} initialCursor={photosQuery.next ? photosQuery.next : undefined} {...(property && order ? { sort: { property: property, order: order } } : {})}>
                                <ul
                                    key={nanoid()}
                                    role='list'
                                    className='w-full grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3'
                                >
                                    <InfiniteScrollMinerals filterObj={{ name: name, lusters: lusters?.split(','), minHardness: Number(minHardness), maxHardness: Number(maxHardness) }} initialPhotos={photosQuery.results} initialCursor={photosQuery.next ? photosQuery.next : undefined} {...(property && order ? { sort: { property: property, order: order } } : {})} />
                                </ul>
                        </MineralPageLayout>

                    </div>
                </section>
            </div>
            <Footer />
        </main >
    )
}

export default Page;