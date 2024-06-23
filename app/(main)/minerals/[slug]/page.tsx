import { fetchMinerals } from "@/lib/actions";
import Gallery from "@/components/minerals/mineral-gallery";
import { notFound } from "next/navigation";

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

export default async function Page({ params }: { params: { slug: string } }) {
    const mineralResult = await fetchMinerals({ filterObj: { id: params.slug }, cursor: undefined, limit: 1 });
    let mineral;
    if (mineralResult.results.length === 0) {
        return notFound();
    } else {
        mineral = mineralResult.results[0];
    }
    return (
        <main>
            <div className="flex justify-center items-center">
                <section className='flex-col justify-center items-center py-4 px-6 w-full max-w-screen-xl'>
                    <div className='mb-4 sm:mb-12 flex-row my-5 sm:flex sm:gap-x-10 justify-between'></div>
                    <div>My Post: {params.slug}</div>
                    <h1 className='font-semibold text-4xl sm:text-6xl py-4'>{mineral.name}</h1>
                    <Gallery data={galleryData} />
                    <div></div>
                </section>
            </div>
        </main >
    )
}