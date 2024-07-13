import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` || 'http://localhost:3001';

    return [
        {
            url: baseUrl
        },
        {
            url: `${baseUrl}/policy`
        }
    ]
}