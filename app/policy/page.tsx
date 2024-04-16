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
                            <p>No portion of this site can be reproduced, distributed, replicated, modified or used as a source of derivative works without the written permission of the owner. To receive permission for the use of website content and images, please contact us. After contacting us, we may allow the use of Images from this site for educational, non-commercial purposes only, provided appropriate credit and a link to this website is given when applicable. Preferably, our website name should be contained within an image (see image to the right for an example). The Prospector Minerals logo may be used solely and only for promoting this website.</p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-medium">Terms of Use</h2>
                            <p>Prospector Minerals is not liable for any damages incurred by the use of this site. When creating an account (signing up for a membership), we, Prospector Minerals, collect your email address, which may then be used for email updates or campaigns. If you would like to remove this information, please delete your account by contacting us. Members, registered by submission of "Sign Up" forms, must adhere to the Prospector Minerals terms of use. Failure to comply with these terms or abuse of this website or platform may result in membership suspension or account deletion at our sole discretion.</p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-medium mb-2">Privacy Policy</h2>
                            <h3 className="text-2xl font-medium mb-2">Collected Data</h3>
                            <div className="flex-col space-y-2">
                                <div>
                                    <h4 className="text-xl font-medium">Account</h4>
                                    <p>When creating an account ("signing up" for a membership), we, Prospector Minerals, collect your email address, which may then be used for email updates or campaigns. If you would like to remove this information, please delete your account by contacting us.</p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium">Third-Party Login Services</h4>
                                    <p>By using third-party login services (i.e. Google or Facebook) we may collect data including your email address, name, and phone number. See the Data Use section for information regarding the use of your data. Please note that the respective provider's terms of service and privacy policy apply.</p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium">Browser Cookies</h4>
                                    <p>
                                    By using this site, you consent to the use of our and third-party cookies and other similar technologies to enhance your browsing experience, store login, and language information, analyze your engagement with our content, and for other legitimate purposes.
                                    <br className="py-2"/>
                                    You may withdraw your consent at any time by deleting the website cookies through your browser.
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-2xl font-medium mb-2">Data Use</h3>
                            <div className="flex-col space-y-2">
                                <div>
                                    <h4 className="text-xl font-medium">Account</h4>
                                    <p>When creating an account ("signing up" for a membership), we, Prospector Minerals, collect your email address, which may then be used for email updates or campaigns. If you would like to remove this information, please delete your account by contacting us.</p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium">Third-Party Login Services</h4>
                                    <p>By using third-party login services (i.e. Google or Facebook) we may collect data including your email address, name, and phone number. See the Data Use section for information regarding the use of your data. Please note that the respective provider's terms of service and privacy policy apply.</p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium">Browser Cookies</h4>
                                    <p>
                                    By using this site, you consent to the use of our and third-party cookies and other similar technologies to enhance your browsing experience, store login, and language information, analyze your engagement with our content, and for other legitimate purposes.
                                    <br className="py-2"/>
                                    You may withdraw your consent at any time by deleting the website cookies through your browser.
                                    </p>
                                </div>
                            </div>
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