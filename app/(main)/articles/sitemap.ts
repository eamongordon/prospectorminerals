import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = `https://www.${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    const pages = await prisma.post.findMany({
        select: {
            slug: true,
            updatedAt: true
        }
    });
    console.log(baseUrl)
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