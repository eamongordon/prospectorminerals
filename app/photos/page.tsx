import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7,
); // 7-character random string

import { fetchPhotos } from '@/lib/actions'
import Header from "@/components/header";
import Footer from "@/components/footer";
import Search from '@/components/photo-search'
import InfiniteScrollPhotos from '@/components/infinite-scroll-photos'

const Page = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const search =
        typeof searchParams.search === 'string' ? searchParams.search : undefined

    const photos = (await fetchPhotos({ filterObj: { name: search }, cursor: undefined, limit: 10 })).results;

    return (
        <main>
            <Header />
            <section className='py-24'>
                <div className='container'>
                    <div className='mb-12 flex items-center justify-between gap-x-16'>
                        <h1 className='flex-1 text-3xl font-bold'>Photos</h1>

                        <div className='flex-1'>
                            <Search search={search} />
                        </div>
                    </div>

                    <ul
                        key={nanoid()}
                        role='list'
                        className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8'
                    >
                        <InfiniteScrollPhotos search={search} initialPhotos={photos} />
                    </ul>
                </div>
            </section>
            <Footer />
        </main >
    )
}

export default Page;