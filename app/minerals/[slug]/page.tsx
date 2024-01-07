
import Header from '@/components/header';
import Footer from '@/components/footer';
import LoginModalButton from '@/components/registration/login-modal-button';
import LoginModal from '@/components/modal/login';
import { LoginModalProvider } from "@/components/modal/registration/provider";
//import LoginForm from '@/components/registration/login-form';
//import Modal from "@/components/next-ui-modal";
import RegModal from "@/components/next-ui-modal";
import Image from 'next/image';
import Gallery from "@/components/mineral-gallery";
import Card from "@/components/mineral-card";

const galleryData = [
    {
        title: "Amazonite",
        caption: "Smoky Hawk Mine, Routte Co., Colorado"
    }, 
    {
        title: "Cavansite",
        caption: "Pune, Maharashtra Province, India"
    }, 
    {
        title: "Krohnkite",
        caption: "Chuquicamata Mine, El Loa Province, Chile"
    }
];

export default function Page({ params }: { params: { slug: string } }) {
    return (
        <main>
            <LoginModalProvider>
                <Header />
                <div>My Post: {params.slug}</div>
                <Image
                    src="/PM-Favicon-New-Square.png"
                    width={50}
                    height={50}
                    alt="Prospector Minerals Logo"
                />
                <Gallery data={galleryData} />
                <Card name="Azurite" />
                <RegModal />
                <Footer />
            </LoginModalProvider>
        </main>
    )
}