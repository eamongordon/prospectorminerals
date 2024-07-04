import Gallery from "@/components/minerals/mineral-gallery";
import MineralTags from "@/components/minerals/mineral-tags";
import PropertyTable from "@/components/property-table";
import { fetchMinerals } from "@/lib/actions";
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
    let tableData = [];
    if (mineral.chemical_formula) {
        tableData.push({ property: "Chemical Formula", value: mineral.chemical_formula });
    }
    if (mineral.hardness_min && mineral.hardness_max) {
        tableData.push({ property: "Hardness", value: mineral.hardness_min === mineral.hardness_max ? mineral.hardness_min.toString() : mineral.hardness_min.toString() + '-' + mineral.hardness_max.toString() });
    }
    if (mineral.crystal_system) {
        tableData.push({ property: "Crystal System", value: mineral.crystal_system });
    }
    if (mineral.mineral_class) {
        tableData.push({ property: "Mineral Class", value: mineral.mineral_class });
    }
    const mineralAssociatesArray = mineral.associates.concat(mineral.associatedWith).map((associate) => {
        return {
            name: associate.name,
            image: associate.photos.length > 0 && associate.photos[0].photo.image ? associate.photos[0].photo.image : undefined,
            id: associate.id
        }
    })
    return (
        <main className="px-6 max-w-screen-xl mx-auto">
            <h1 className='font-semibold text-4xl sm:text-6xl py-4'>{mineral.name}</h1>
            <Gallery data={mineral.photos ? mineral.photos.map((obj) => {return {title: obj.photo.title ? obj.photo.title : undefined, caption: "Test Caption", image: obj.photo.image ? obj.photo.image : undefined}} ) : galleryData} />
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
                        <MineralTags tags={mineralAssociatesArray} />
                    </div>
                </div>
                <div className="w-full my-4 sm:my-0 sm:w-[40%] sm:min-w-80">
                    <PropertyTable data={tableData} />
                </div>
            </div>
        </main >
    )
}