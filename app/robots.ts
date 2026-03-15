import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://raizesglobaisdocs.com.br'; // Ensure this matches actual prod URL

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/'], // Disallow crawling inside sanity studio and API
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
