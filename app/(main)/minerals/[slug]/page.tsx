import { fetchMinerals } from "@/lib/actions";
import Gallery from "@/components/minerals/mineral-gallery";
import { notFound } from "next/navigation";
import PropertyTable from "@/components/minerals/property-table";
import MineralTags from "@/components/minerals/mineral-tags";

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

const mineralTagsTest = [{
    name: "Test1",
    image: 'https://i.pravatar.cc/300?u=a042581f4e29026709d',
    id: 'test1'
}, {
    name: "Test2",
    image: 'https://i.pravatar.cc/300?u=a042581f4e29026709d',
    id: 'test2'
}]
export default async function Page({ params }: { params: { slug: string } }) {
    const mineralResult = await fetchMinerals({ filterObj: { id: params.slug }, cursor: undefined, limit: 1, fieldset: 'full' });
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
                    <div className="flex w-full flex-col sm:flex-row my-10">
                        <div className="w-full">
                            <p>Test</p>
                            <div className="space-y-2">
                                <h2 className="font-semibold text-3xl sm:text-4xl mb-4">Associates</h2>
                                <MineralTags tags={mineralTagsTest} />
                            </div>
                        </div>
                        <div className="w-full my-4 sm:my-0 sm:w-[40%] sm:min-w-80">
                            <PropertyTable mineral={mineral} />
                        </div>
                    </div>
                </section>
            </div>
        </main >
    )
}