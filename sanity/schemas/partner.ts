import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'partner',
    title: 'Parceiro / Afiliado',
    type: 'document',
    groups: [
        { name: 'main', title: 'Informações do Parceiro', default: true },
        { name: 'linking', title: 'Vinculação a Destinos' },
    ],
    fields: [
        defineField({
            name: 'name',
            title: 'Nome do Parceiro',
            type: 'string',
            group: 'main',
            description: 'Ex: Booking.com, GetYourGuide, World Nomads',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            group: 'main',
            options: { source: 'name', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Categoria',
            type: 'string',
            group: 'main',
            options: {
                list: [
                    { title: '🏨 Hospedagem', value: 'hospedagem' },
                    { title: '✈️ Passagens', value: 'passagens' },
                    { title: '🎒 Passeios', value: 'passeios' },
                    { title: '🛡️ Seguro Viagem', value: 'seguro' },
                    { title: '📷 Equipamentos', value: 'equipamentos' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Descrição Curta',
            type: 'text',
            group: 'main',
            rows: 2,
            description: 'Texto persuasivo curto para o card. Ex: "Encontre refúgios imersos na natureza."',
            validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
            name: 'logo',
            title: 'Logo do Parceiro',
            type: 'image',
            group: 'main',
            description: 'Logo quadrada ou horizontal do parceiro. Recomendado: fundo transparente (PNG).',
            options: { hotspot: true },
        }),
        defineField({
            name: 'affiliateUrl',
            title: 'Link de Afiliado',
            type: 'url',
            group: 'main',
            description: 'URL completa com tag de afiliado.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'actionText',
            title: 'Texto do Botão',
            type: 'string',
            group: 'main',
            description: 'Ex: "Reservar Agora", "Buscar Voos", "Ver Passeios"',
            initialValue: 'Saiba Mais',
        }),
        defineField({
            name: 'featured',
            title: 'Destaque na Home?',
            type: 'boolean',
            group: 'main',
            description: 'Se ativado, este parceiro aparece na seção "Planeje" da página inicial.',
            initialValue: false,
        }),
        defineField({
            name: 'order',
            title: 'Ordem de Exibição',
            type: 'number',
            group: 'main',
            description: 'Menor número = aparece primeiro.',
            initialValue: 10,
        }),
        defineField({
            name: 'destinations',
            title: 'Destinos Associados',
            type: 'array',
            group: 'linking',
            description: 'Vincule este parceiro a destinos específicos. Se vazio, será considerado global (aparece em todos os destinos).',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'destination' }],
                },
            ],
        }),
    ],
    orderings: [
        {
            title: 'Ordem de Exibição',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'category',
            media: 'logo',
        },
    },
});
