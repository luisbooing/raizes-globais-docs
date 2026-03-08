import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'documentary',
    title: 'Documentário',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título do Documentário',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'youtubeUrl',
            title: 'Link do YouTube',
            type: 'url',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'youtubeId',
            title: 'ID do Vídeo no YouTube',
            type: 'string',
            description: 'Apenas o ID do vídeo (ex: dQw4w9WgXcQ). Usado para gerar o embed e a thumbnail.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'thumbnail',
            title: 'Thumbnail Personalizada (Opcional)',
            type: 'image',
            options: { hotspot: true },
            description: 'Se não fornecida, usaremos a thumbnail do YouTube.',
        }),
        defineField({
            name: 'duration',
            title: 'Duração',
            type: 'string',
            description: 'Ex: 15:20',
        }),
        defineField({
            name: 'views',
            title: 'Visualizações',
            type: 'string',
            description: 'Ex: 1.2M',
        }),
        defineField({
            name: 'destination',
            title: 'Destino Relacionado',
            type: 'reference',
            to: [{ type: 'destination' }],
            description: 'Vincule este documentário a um destino.',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Data de Publicação',
            type: 'datetime',
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO - Título',
            type: 'string',
            validation: (Rule) => Rule.max(70),
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO - Descrição',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.max(160),
        }),
    ],
    orderings: [
        {
            title: 'Data de Publicação (Recentes)',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
    ],
    preview: {
        select: { title: 'title', subtitle: 'duration', media: 'thumbnail' },
    },
});
