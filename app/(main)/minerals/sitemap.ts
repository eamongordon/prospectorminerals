import prisma from '@/lib/prisma';
import { baseUrl } from '@/lib/utils';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const pages = await prisma.mineral.findMany({
        select: {
            slug: true
        }
    });

    return [
        {
            url: `${baseUrl}/minerals`
        },
        ...pages.map((page) => ({
            url: `${baseUrl}/minerals/${page.slug}`
        })),
    ]
}