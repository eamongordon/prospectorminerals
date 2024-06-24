const Page = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const query = typeof searchParams.q === 'string' ? searchParams.q : undefined
    return (
        <main className="px-8 max-w-screen-xl mx-auto mb-8">
            <section className='flex-col justify-center items-center mt-4 py-4 w-full'>
                <h1 className="text-center font-semibold text-3xl sm:text-4xl">Site Policy</h1>
            </section>
            <section className='flex-col justify-center items-center py-4 px-6 w-full max-w-screen-xl'>
                <div>
                    <p>Thank you for reviewing our site policy. We seek to provide an understandable and transparent site policy and if there are any clarifications or inquries necessary, please <a className="font-medium text-cyan-500" href="#contact">contact us</a>.</p>
                </div>
            </section>
            <section className='flex-col space-y-10 justify-center items-center py-4 px-6 w-full max-w-screen-xl'>
                <div className="flex-col space-y-3">
                    <h2 className="text-3xl font-medium scroll-mt-16" id="copyright">Copyright Policy</h2>
                    <p>No portion of this site can be reproduced, distributed, replicated, modified or used as a source of derivative works without the written permission of the owner. To receive permission for the use of website content and images, please <a className="font-medium text-cyan-500" href="#contact">contact us</a>. After contacting us, we may allow the use of Images from this site for educational, non-commercial purposes only, provided appropriate credit and a link to this website is given when applicable. Preferably, our website name should be contained as a watermark (contact us for examples). The Prospector Minerals logo may be used solely and only for promoting this website.</p>
                </div>
                <div>
                    <h2 className="text-3xl font-medium scroll-mt-16" id="termsofuse">Terms of Use</h2>
                    <p>Prospector Minerals is not liable for any damages incurred by the use of this site. When creating an account (signing up for a membership), we, Prospector Minerals, collect your email address, which may then be used for email updates or campaigns. If you would like to remove this information, please delete your account by visiting the <a className="font-medium text-cyan-500" href="/account/settings#new-password">account settings page</a>. Members, registered by submission of &quot;Sign Up&quot; forms, must adhere to the Prospector Minerals terms of use. Failure to comply with these terms or abuse of this website or platform may result in membership suspension or account deletion at our sole discretion.</p>
                </div>
                <div className="flex-col">
                    <h2 className="text-3xl font-medium scroll-mt-16" id="privacy">Privacy Policy</h2>
                    <h3 className="text-2xl font-medium my-2">Collected Data</h3>
                    <div className="flex-col space-y-6">
                        <div>
                            <h4 className="text-xl font-medium">Account</h4>
                            <p>When creating an account (&quot;signing up&quot; for a membership), we, Prospector Minerals, collect your email address, which may then be used for email updates or campaigns. If you would like to remove this information, please delete your account by visiting the <a className="font-medium text-cyan-500" href="/account/settings#new-password">account settings page</a>.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium">Third-Party Login Services</h4>
                            <p>By using third-party login services (i.e. Google or Facebook) we may collect data including your email address, name, and phone number. See the Data Use section for information regarding the use of your data. Please note that the respective provider&apos;s terms of service and privacy policy apply.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium">Browser Cookies</h4>
                            <p>
                                By using this site, you consent to the use of our and third-party cookies and other similar technologies to enhance your browsing experience, store login, and language information, analyze your engagement with our content, and for other legitimate purposes.
                                <br />
                                <br />
                                You may withdraw your consent at any time by deleting the website cookies through your browser.
                            </p>
                        </div>
                    </div>
                    <h3 className="text-2xl font-medium pt-6">Data Use</h3>
                    <p>We may use your data for numerous legitimate purposes, including, but not limited to, the following:</p>
                    <div className="flex-col space-y-6 pt-4">
                        <div>
                            <h4 className="text-xl font-medium">Account Management</h4>
                            <p>Your email address, phone number, and other provided information may be used to assist with the management and login of your account.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium">Personalization & Customization</h4>
                            <p>Your first name, last name, and IP address may be used in order to personalize your experience on our website and provide customization features.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium">Communication</h4>
                            <p>We may communicate updates to our site content or policy via your email address provided upon subscription or account creation.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium">Analytics</h4>
                            <p>We utilize trusted third-party tools such as Google Analytics in order to analyze your interaction with our content and website. Information collected may include IP address, geographic location, and browser data.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-medium">Modifications</h2>
                    <p>We reserve the right to modify this policy at any time, as a result, we recommend that it be reviewed regularly. Changes and clarifications will take effect immediately upon their posting on this website. If we make material changes to this policy, we will notify you that it has been updated through our email or our website.</p>
                </div>
                <div>
                    <h2 className="text-3xl font-medium scroll-mt-16" id="contact">Contact Us</h2>
                    <p>Have a suggestion for improving Prospector Minerals? Notice an error in our site? Need to contact us for another reason?
                        <br />
                        <br />
                        Contact Us at: <a className="font-medium text-cyan-500" href="mailto:prospectorminerals@prospectorminerals.com">prospectorminerals@prospectorminerals.com</a>.
                    </p>
                </div>
            </section>
        </main >
    )
}

export default Page;