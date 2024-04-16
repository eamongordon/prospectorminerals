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
                    <section className='flex-col space-y-6 justify-center items-center py-4 px-6 w-full max-w-screen-xl'>
                        <div className="flex-col space-y-3">
                            <h2 className="text-3xl font-medium">Copyright Policy</h2>
                            <p className="text-stone-500 dark:text-stone-400">No portion of this site can be reproduced, distributed, replicated, modified or used as a source of derivative works without the written permission of the owner. To receive permission for the use of website content and images, please contact us. After contacting us, we may allow the use of Images from this site for educational, non-commercial purposes only, provided appropriate credit and a link to this website is given when applicable. Preferably, our website name should be contained within an image (see image to the right for an example). The Prospector Minerals logo may be used solely and only for promoting this website.</p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-medium">Terms of Use</h2>
                            <p className="text-stone-500 dark:text-stone-400">Prospector Minerals is not liable for any damages incurred by the use of this site. When creating an account (signing up for a membership), we, Prospector Minerals, collect your email address, which may then be used for email updates or campaigns. If you would like to remove this information, please delete your account by contacting us. Members, registered by submission of "Sign Up" forms, must adhere to the Prospector Minerals terms of use. Failure to comply with these terms or abuse of this website or platform may result in membership suspension or account deletion at our sole discretion.</p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-medium mb-2">Privacy Policy</h2>
                            <h2 className="text-2xl font-medium">Collected Data</h2>
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