import { groq } from 'next-sanity';
import { client } from '../sanity/client';

// ---- DESTINATIONS ----

/** Get all destinations (for listing page and homepage) */
export async function getAllDestinations() {
    return client.fetch(
        groq`*[_type == "destination"] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      shortDescription,
      mainImage,
      seoTitle,
      seoDescription
    }`
    );
}

/** Get a single destination by slug */
export async function getDestinationBySlug(slug: string) {
    return client.fetch(
        groq`*[_type == "destination" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      shortDescription,
      fullDescription,
      mainImage,
      bestTime,
      curiosities,
      youtubeId,
      gallery,
      faq,
      seoTitle,
      seoDescription
    }`,
        { slug }
    );
}

/** Get all destination slugs (for static generation) */
export async function getAllDestinationSlugs() {
    return client.fetch(
        groq`*[_type == "destination"] { "slug": slug.current }`
    );
}

// ---- DOCUMENTARIES ----

/** Get all documentaries ordered by publishedAt */
export async function getAllDocumentaries() {
    return client.fetch(
        groq`*[_type == "documentary"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      youtubeUrl,
      youtubeId,
      thumbnail,
      duration,
      views,
      publishedAt,
      destination-> { name, "slug": slug.current }
    }`
    );
}

/** Get recent documentaries (limit) */
export async function getRecentDocumentaries(limit: number = 3) {
    return client.fetch(
        groq`*[_type == "documentary"] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      "slug": slug.current,
      youtubeUrl,
      youtubeId,
      thumbnail,
      duration,
      views,
      publishedAt,
      destination-> { name, "slug": slug.current }
    }`,
        { limit }
    );
}

/** Get documentaries for a specific destination */
export async function getDocumentariesByDestination(destinationId: string) {
    return client.fetch(
        groq`*[_type == "documentary" && destination._ref == $destinationId] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      youtubeUrl,
      youtubeId,
      thumbnail,
      duration,
      views,
      publishedAt
    }`,
        { destinationId }
    );
}
