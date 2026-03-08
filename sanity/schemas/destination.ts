import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'destination',
    title: 'Destino',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nome do País',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: { source: 'name', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'shortDescription',
            title: 'Descrição Curta (Card da Home)',
            type: 'text',
            rows: 2,
            validation: (Rule) => Rule.required().max(160),
        }),
        defineField({
            name: 'mainImage',
            title: 'Imagem Principal',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO - Título da Página',
            type: 'string',
            description: 'Título que aparecerá no Google. Ideal entre 50-60 caracteres.',
            validation: (Rule) => Rule.max(70),
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO - Meta Descrição',
            type: 'text',
            rows: 3,
            description: 'Descrição que aparece abaixo do título no Google. Ideal entre 120-160 caracteres.',
            validation: (Rule) => Rule.max(160),
        }),
        defineField({
            name: 'fullDescription',
            title: 'Sobre o País (Texto Completo)',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Texto rico com formatação (negrito, itálico, listas, links). Use e abuse para SEO!',
        }),
        defineField({
            name: 'bestTime',
            title: 'Melhor Época para Visitar',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'curiosities',
            title: 'Curiosidades',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Adicione curiosidades interessantes sobre o destino.',
        }),
        defineField({
            name: 'youtubeId',
            title: 'ID do Vídeo em Destaque (YouTube)',
            type: 'string',
            description: 'Apenas o ID do vídeo, ex: dQw4w9WgXcQ',
        }),
        defineField({
            name: 'gallery',
            title: 'Galeria de Imagens',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
    ],
    preview: {
        select: { title: 'name', media: 'mainImage' },
    },
});
