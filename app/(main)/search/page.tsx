import Header from "@/components/header";
import Footer from "@/components/footer";

const Page = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const query = typeof searchParams.q === 'string' ? searchParams.q : undefined
    return (
        <main>
            <Header />
            <div className="flex justify-center items-center">
                <section className='flex-col justify-center items-center py-4 px-6 w-full max-w-screen-xl'>
                    <h1 className="text-3xl font-bold text-center">Search Results</h1>
                    <div className="'w-full flex-col sm:flex-row">
                        <div className="w-full sm:w-80">
                            <div className="w-full">   
                            
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </main >
    )
}

export default Page;