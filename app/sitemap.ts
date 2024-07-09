import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = `https://www.${process.env.VERCEL_PROJECT_PRODUCTION_URL}` || 'http://localhost:3001';

    return [
        {
            url: baseUrl
        },
        {
            url: `${baseUrl}/policy`
        }
    ]
}