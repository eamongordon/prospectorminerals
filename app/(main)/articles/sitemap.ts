import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.VERCEL_URL;
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