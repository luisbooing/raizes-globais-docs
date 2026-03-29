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
      seoDescription,
      hasGuide,
      guideIntroduction,
      guideWhereToGo,
      guideWhenToGo,
      guideWhenToGoGoldenTip,
      guideWhatToDo,
      guideWhereToStay,
      guideWhereToStayTip,
      guidePracticalTips,
      guideCtaLinks
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

// ---- PARTNERS ----

const partnerFields = `
  _id,
  name,
  "slug": slug.current,
  category,
  description,
  logo,
  affiliateUrl,
  actionText,
  featured,
  order,
  destinations[]-> { _id, name, "slug": slug.current }
`;

/** Get all partners ordered by order */
export async function getAllPartners() {
    return client.fetch(
        groq`*[_type == "partner"] | order(order asc) {
      ${partnerFields}
    }`
    );
}

/** Get featured partners (for homepage) */
export async function getFeaturedPartners() {
    return client.fetch(
        groq`*[_type == "partner" && featured == true] | order(order asc) {
      ${partnerFields}
    }`
    );
}

/** Get partners for a specific destination (specific + global ones with no destinations) */
export async function getPartnersByDestination(destinationId: string) {
    return client.fetch(
        groq`*[_type == "partner" && (
      $destinationId in destinations[]._ref ||
      count(destinations) == 0 ||
      !defined(destinations)
    )] | order(order asc) {
      ${partnerFields}
    }`,
        { destinationId }
    );
}

// ---- BLOG POSTS ----

export async function getAllPosts() {
    return client.fetch(
        groq`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      category,
      readingTime,
      isFeatured,
      introduction,
      seoTitle,
      seoDescription
    }`
    );
}

export async function getPostBySlug(slug: string) {
    return client.fetch(
        groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      category,
      readingTime,
      hasGuide,
      introduction,
      youtubeHook,
      body,
      curiosities,
      goldenTips,
      gallery,
      finalCta {
        youtubeText,
        relatedPdfGuide-> { _id, name, "slug": slug.current, hasGuide }
      },
      seoTitle,
      seoDescription
    }`,
        { slug }
    );
}

export async function getPostGuideBySlug(slug: string) {
    return client.fetch(
        groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      hasGuide,
      guideIntroduction,
      guideWhereToGo,
      guideWhenToGo,
      guideWhenToGoGoldenTip,
      guideWhatToDo,
      guideWhereToStay,
      guideWhereToStayTip,
      guidePracticalTips,
      guideCtaLinks
    }`,
        { slug }
    );
}
