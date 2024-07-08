import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
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