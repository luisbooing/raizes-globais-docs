'use client';

/**
 * Sanity Studio embedded in the Next.js app, rendered at /admin.
 * All routes under /admin are handled by next-sanity's NextStudio.
 */

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export default function AdminPage() {
    return <NextStudio config={config} />;
}
