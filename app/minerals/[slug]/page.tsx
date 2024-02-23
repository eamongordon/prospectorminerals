import Header from '@/components/header';
import Footer from '@/components/footer';
import LoginModalButton from '@/components/registration/login-modal-button';
import LoginModal from '@/components/modal/login';
import { Button } from '@nextui-org/react'
import { LoginModalProvider } from "@/components/modal/registration/provider";
//import LoginForm from '@/components/registration/login-form';
//import Modal from "@/components/next-ui-modal";
import LoginModalVaul from '@/components/registration/login-vaul-modal';
import RegModal from "@/components/next-ui-modal";
import Image from 'next/image';
import Gallery from "@/components/mineral-gallery";
import Card from "@/components/minerals/mineral-card";
import TestServerActions from '@/components/test-server-actions';

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

const htmltest = `<p class=""font_8"">Aurichalcite is commonly associated with:</p>
<p class=""font_8""><br></p>
<ul class=""font_8"">
  <li><p class=""font_8"">Hemimorphite</p></li>
  <li><p class=""font_8"">Calcite (as Inclusions)</p></li>
  <li><p class=""font_8"">Azurite</p></li>
  <li><p class=""font_8"">Malachite</p></li>
  <li><p class=""font_8"">Cuprite</p></li>
  <li><p class=""font_8"">Smithsonite</p></li>
  <li><p class=""font_8"">Rosasite</p></li>
</ul>`

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
                <div className="product-des" dangerouslySetInnerHTML={{ __html: htmltest }}/>
                <Gallery data={galleryData} />
                <Card name="Azurite" id="az" />
                <RegModal />
                <TestServerActions/>

                <Footer />
            </LoginModalProvider>
        </main>
    )
}