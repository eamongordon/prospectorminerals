import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.VERCEL_URL;
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