import { MetadataRoute } from 'next';
import { client } from '../sanity/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://raizesglobaisdocs.com.br'; // Change this to actual prod URL

    // Fetch destinations
    const destinations = await client.fetch<string[]>(`*[_type == "destination" && defined(slug.current)].slug.current`);
    const documentaries = await client.fetch<string[]>(`*[_type == "documentary" && defined(slug.current)].slug.current`);

    const destUrls = destinations.map((slug) => ({
        url: `${baseUrl}/destinos/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const docUrls = documentaries.map((slug) => ({
        url: `${baseUrl}/documentarios/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/destinos`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/documentarios`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/sobre`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/planeje`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...destUrls,
        ...docUrls,
    ];
}
