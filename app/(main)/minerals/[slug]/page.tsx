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

const mineralTagsTest = [{
    name: "Test1",
    image: 'https://i.pravatar.cc/300?u=a042581f4e29026709d',
    id: 'test1'
}, {
    name: "Test2",
    image: 'https://i.pravatar.cc/300?u=a042581f4e29026709d',
    id: 'test2'
}];

export default async function Page({ params }: { params: { slug: string } }) {
    const mineralResult = await fetchMinerals({ filterObj: { id: params.slug }, cursor: undefined, limit: 1, fieldset: 'full' });
    let mineral;
    if (mineralResult.results.length === 0) {
        return notFound();
    } else {
        mineral = mineralResult.results[0];
    }
    let descriptionFields = [];
    if (mineral.uses) {
        descriptionFields.push({ property: "Uses", value: mineral.uses });
    }
    if (mineral.localities_description) {
        descriptionFields.push({ property: "Notable Localities", value: mineral.localities_description });
    }
    return (
        <main className="px-6 max-w-screen-xl mx-auto">
            <h1 className='font-semibold text-4xl sm:text-6xl py-4'>{mineral.name}</h1>
            <Gallery data={galleryData} />
            <div className="flex w-full flex-col sm:flex-row my-10">
                <div className="w-full sm:pr-12">
                    {mineral.description ? (<p>{mineral.description}</p>) : (<></>)}
                    {descriptionFields.map((obj, index) => {
                        return (
                            <div className="space-y-2 my-6" key={index}>
                                <h2 className="font-semibold text-3xl sm:text-4xl mb-4">{obj.property}</h2>
                                <p>{obj.value}</p>
                            </div>
                        )
                    })}
                    <div className="space-y-2">
                        <h2 className="font-semibold text-3xl sm:text-4xl mb-4">Associates</h2>
                        <MineralTags tags={mineralTagsTest} />
                    </div>
                </div>
                <div className="w-full my-4 sm:my-0 sm:w-[40%] sm:min-w-80">
                    <PropertyTable mineral={mineral} />
                </div>
            </div>
        </main >
    )
}