import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7,
); // 7-character random string

import { fetchMinerals } from '@/lib/actions'
import { LustersList, MineralClassesList, CrystalSystemsList } from '@/types/types'
import Header from "@/components/header";
import Footer from "@/components/footer";
import InfiniteScrollMinerals from '@/components/minerals/infinite-scroll-minerals';
import MineralPageLayout from "@/components/minerals/mineral-page-layout";
import SortDropdown from "@/components/minerals/sort-dropdown";

const Page = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const name =
        typeof searchParams.name === 'string' ? searchParams.name : undefined
    const lusters =
        typeof searchParams.lusters === 'string' ? searchParams.lusters.split(',') as LustersList[] : undefined
    const mineralClasses =
        typeof searchParams.mineralClasses === 'string' ? searchParams.mineralClasses?.split(',') as  MineralClassesList[]: undefined
    const crystalSystems =
        typeof searchParams.crystalSystems === 'string' ? searchParams.crystalSystems?.split(',') as CrystalSystemsList[] : undefined
    const chemistry =
        typeof searchParams.chemistry === 'string' ? searchParams.chemistry : undefined
    const minHardness =
        typeof searchParams.minHardness === 'string' ? searchParams.minHardness : undefined
    const maxHardness =
        typeof searchParams.maxHardness === 'string' ? searchParams.maxHardness : undefined
    const property =
        typeof searchParams.property === 'string' ? searchParams.property : undefined
    const order =
        typeof searchParams.order === 'string' ? searchParams.order : undefined
    const filterObj = { name: name, lusters: lusters, mineralClasses: mineralClasses, crystalSystems: crystalSystems, chemistry: chemistry?.split(','), minHardness: Number(minHardness), maxHardness: Number(maxHardness) }
    const photosQuery = await fetchMinerals({ filterObj: filterObj, cursor: undefined, limit: 10, ...(property && order ? { sortObj: { property: property, order: order } } : {}) });
    console.log(typeof searchParams.mineralClasses);
    return (
        <main>
            <Header />
            <div className="flex justify-center items-center">
                <section className='flex-col justify-center items-center py-4 px-6 w-full max-w-screen-xl'>
                    <div className='mb-4 sm:mb-12 flex-row my-5 sm:flex sm:gap-x-10 justify-between'>
                        <MineralPageLayout
                            filterObj={filterObj}
                            initialPhotos={photosQuery.results}
                            initialCursor={photosQuery.next ? photosQuery.next : undefined} {...(property && order ? { sort: { property: property, order: order } } : {})}
                            infiniteScrollElem={<InfiniteScrollMinerals filterObj={filterObj} initialPhotos={photosQuery.results} initialCursor={photosQuery.next ? photosQuery.next : undefined} {...(property && order ? { sort: { property: property, order: order } } : {})} key={nanoid()} />}
                            sortDropdownElem={<SortDropdown {...(property && order ? { sort: `${property},${order}` } : {})} />}
                        />
                    </div>
                </section>
            </div>
            <Footer />
        </main >
    )
}

export default Page;