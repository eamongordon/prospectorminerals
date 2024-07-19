import { MetadataRoute } from 'next'
import { baseUrl } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: baseUrl
        },
        {
            url: `${baseUrl}/policy`
        },
        {
            url: `${baseUrl}/login`
        },
        {
            url: `${baseUrl}/signup`
        }
    ]
}