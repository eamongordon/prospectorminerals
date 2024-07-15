import prisma from '@/lib/prisma';
import { baseUrl } from '@/lib/utils';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const pages = await prisma.locality.findMany({
        select: {
            slug: true
        }
    });

    return [
        {
            url: `${baseUrl}/localities`
        },
        ...pages.map((page) => ({
            url: `${baseUrl}/localities/${page.slug}`
        })),
    ]
}