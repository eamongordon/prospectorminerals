import prisma from '@/lib/prisma';
import { baseUrl } from '@/lib/utils';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const pages = await prisma.photo.findMany({
        select: {
            id: true
        }
    });

    return [
        {
            url: `${baseUrl}/photos`
        },
        ...pages.map((page) => ({
            url: `${baseUrl}/photos/${page.id}`
        })),
    ]
}