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

    const photosQuery = await fetchPhotos({ filterObj: { name: search }, cursor: undefined, limit: 10 });
    return (
        <main>
            <Header />
            <div className="flex justify-center items-center">
            <section className='flex-col justify-center items-center py-24 px-6 w-full max-w-screen-xl'>
                    <div className='mb-12 flex items-center justify-between gap-x-16'>
                        <h1 className='flex-1 text-3xl font-bold'>Photos</h1>

                        <div className='flex-1'>
                            <Search search={search} />
                        </div>
                    </div>

                    <ul
                        key={nanoid()}
                        role='list'
                        className='w-full grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-5'
                    >
                        <InfiniteScrollPhotos search={search} initialPhotos={photosQuery.results} initialCursor={photosQuery.next ? photosQuery.next : undefined}/>
                    </ul>
            </section>
            </div>
            <Footer />
        </main >
    )
}

export default Page;