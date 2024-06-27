import { fetchLocalities } from '@/lib/actions';
import { notFound } from "next/navigation";
import LocalitySlugMap from '@/components/localities/locality-map-slug';

export default async function Page({ params }: { params: { slug: string } }) {
    const localityResult = await fetchLocalities({ filterObj: { id: params.slug }, cursor: undefined, limit: 1, fieldset: 'full' });
    let locality;
    if (localityResult.results.length === 0) {
        return notFound();
    } else {
        locality = localityResult.results[0];
    }
    return (
        <>
            <LocalitySlugMap locality={locality} />
        </>
    );
};