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
                <div className="flex w-full max-w-screen-xl flex-col space-y-12 p-8">
                    <section className='flex-col justify-center items-center py-4 px-6 w-full max-w-screen-xl'>
                        <div>
                            <p>Thank you for reviewing our site policy. We seek to provide an understandable and transparent site policy and if there are any clarifications or inquries necessary, please contact us.</p>
                        </div>
                    </section>
                    <section className='flex-col justify-center items-center py-4 px-6 w-full max-w-screen-xl'>
                        <div>
                            <h1 className="text-3xl font-bold text-center">Copyright Policy</h1>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-center">Terms of Use</h1>
                        </div>
                        <div>
                            <h2 className="text-2xl font-medium dark:text-white">Privacy Policy</h2>
                            <p className="text-sm text-stone-500 dark:text-stone-400">This is a description</p>
                            <h3>Collected Data</h3>
                            <h3>Account</h3>
                            <h3>Third-Party Login Services</h3>
                            <h3>Browser Cookies</h3>
                            <h2>Data Use</h2>
                        </div>
                        <div>
                            <h1>Modifications</h1>
                        </div>
                        <div>
                            <h1>Contact Us</h1>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </main >
    )
}

export default Page;