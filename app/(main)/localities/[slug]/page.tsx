import { Suspense } from 'react'
import { fetchLocalities } from '@/lib/actions';
import { notFound } from "next/navigation";
import LocalityMap from '@/components/localities/locality-map';
import { Skeleton } from '@nextui-org/react';

export default async function Page({ params }: { params: { slug: string } }) {
    const localityResult = await fetchLocalities({ filterObj: { id: params.slug }, cursor: undefined, limit: 1, fieldset: 'full' });
    let locality;
    if (localityResult.results.length === 0) {
        return notFound();
    } else {
        locality = localityResult.results[0];
    }
    return (
        <Suspense fallback={<Skeleton className='h-[400px] w-full'/>}>
            <LocalityMap localities={[locality]} center={[locality.latitude as unknown as number, locality.longitude as unknown as number]} zoom={6} />
        </Suspense>
    );
};