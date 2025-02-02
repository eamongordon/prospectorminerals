import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma';
import { baseUrl } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const pages = await prisma.post.findMany({
        select: {
            slug: true,
            updatedAt: true
        }
    });
    return [
        {
            url: `${baseUrl}/articles`
        },
        ...pages.map((page) => ({
            url: `${baseUrl}/articles/${page.slug}`,
            lastModified: page.updatedAt
        })),
    ]
}