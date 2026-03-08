'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';
import { dataset, projectId } from './sanity/env';

export default defineConfig({
    name: 'raizes-globais',
    title: 'Raízes Globais Docs',
    projectId,
    dataset,
    plugins: [
        structureTool(),
    ],
    schema: {
        types: schemaTypes,
    },
});
