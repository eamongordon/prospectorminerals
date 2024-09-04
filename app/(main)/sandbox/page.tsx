import Footer from '@/components/footer';
import Header from '@/components/header';
import Card from "@/components/minerals/mineral-card";
import Gallery from "@/components/minerals/mineral-gallery";
import Image from 'next/image';

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

export default async function Page() {
    return (
        <main>
            <Header />
            <Image
                src="/PM-Favicon-New-Square.png"
                width={50}
                height={50}
                alt="Prospector Minerals Logo"
            />
            <div className="product-des" dangerouslySetInnerHTML={{ __html: htmltest }} />
            <Gallery data={galleryData} />
            <Card name="Azurite" slug="az" />
            <Footer />
        </main>
    )
}