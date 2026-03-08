import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from './env';

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true, // Set to false to always get fresh data (e.g. for previews)
});
