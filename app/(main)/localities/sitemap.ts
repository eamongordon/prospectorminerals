import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = `https://www.${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
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