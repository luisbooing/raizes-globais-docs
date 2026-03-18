import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'destination',
    title: 'Destino',
    type: 'document',
    groups: [
        {
            name: 'main',
            title: 'Conteúdo Principal (Site)',
            default: true,
        },
        {
            name: 'guide',
            title: 'Conteúdo do Guia PDF',
        },
        {
            name: 'seo',
            title: 'SEO & Meta',
        },
    ],
    fields: [
        defineField({
            name: 'name',
            title: 'Nome do País',
            type: 'string',
            group: 'main',
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
            name: 'shortDescription',
            title: 'Descrição Curta (Card da Home)',
            type: 'text',
            group: 'main',
            rows: 2,
            validation: (Rule) => Rule.required().max(160),
        }),
        defineField({
            name: 'mainImage',
            title: 'Imagem Principal',
            type: 'image',
            group: 'main',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO - Título da Página',
            type: 'string',
            group: 'seo',
            description: 'Título que aparecerá no Google. Ideal entre 50-60 caracteres.',
            validation: (Rule) => Rule.max(70),
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO - Meta Descrição',
            type: 'text',
            group: 'seo',
            rows: 3,
            description: 'Descrição que aparece abaixo do título no Google. Ideal entre 120-160 caracteres.',
            validation: (Rule) => Rule.max(160),
        }),
        defineField({
            name: 'fullDescription',
            title: 'Sobre o País (Texto Completo da Página)',
            type: 'array',
            group: 'main',
            of: [{ type: 'block' }],
            description: 'Texto rico com formatação (negrito, itálico, listas, links). Repare: não é a introdução do PDF!',
        }),
        
        // ============================================
        // INÍCIO DOS CAMPOS DO GUIA PDF
        // ============================================

        defineField({
            name: 'hasGuide',
            title: 'Habilitar Guia Interativo/PDF?',
            type: 'boolean',
            group: 'guide',
            description: 'Se ativado, exibirá o CTA de "Baixar Guia" na página do site para este destino.',
            initialValue: false,
        }),
        defineField({
            name: 'guideIntroduction',
            title: 'Guia: Introdução',
            type: 'array',
            group: 'guide',
            of: [{ type: 'block' }],
            description: 'Texto inspiracional focado no início do PDF (Ex: O Chamado Ancestral...).',
        }),
        defineField({
            name: 'guideWhereToGo',
            title: 'Guia: Onde Ir (Destinos)',
            type: 'array',
            group: 'guide',
            description: 'Tabela elegante e lista com imagens.',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Nome do Destino', type: 'string' },
                        { name: 'highlight', title: 'Destaque Principal', type: 'string', description: 'Curto, ex: A Grande Migração' },
                        { name: 'scenery', title: 'Cenário Típico', type: 'string' },
                        { name: 'image', title: 'Foto', type: 'image', options: { hotspot: true } }
                    ],
                    preview: { select: { title: 'name', subtitle: 'highlight', media: 'image' } }
                }
            ]
        }),
        defineField({
            name: 'guideWhenToGo',
            title: 'Guia: Quando Ir (Melhor Época)',
            type: 'array',
            group: 'guide',
            description: 'Lista/Tabela de épocas para viajar.',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'destination', title: 'Destino / Região', type: 'string' },
                        { name: 'bestTime', title: 'Melhor Época', type: 'string', description: 'Ex: Julho a Setembro' },
                        { name: 'whatToExpect', title: 'O que Esperar', type: 'text', rows: 2 }
                    ],
                    preview: { select: { title: 'destination', subtitle: 'bestTime' } }
                }
            ]
        }),
        defineField({
            name: 'guideWhenToGoGoldenTip',
            title: 'Guia: Dica de Ouro (Quando Ir)',
            type: 'text',
            group: 'guide',
            description: 'Aquela dica em destaque com fundo amarelo.',
            rows: 3
        }),
        defineField({
            name: 'guideWhatToDo',
            title: 'Guia: O que Fazer (Experiências)',
            type: 'array',
            group: 'guide',
            description: 'Lista de experiências com imagem.',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Título da Experiência', type: 'string' },
                        { name: 'description', title: 'Descrição Curta', type: 'text', rows: 2 },
                        { name: 'image', title: 'Foto', type: 'image', options: { hotspot: true } }
                    ],
                    preview: { select: { title: 'title', media: 'image' } }
                }
            ]
        }),
        defineField({
            name: 'guideWhereToStay',
            title: 'Guia: Onde Ficar (Hospedagem)',
            type: 'array',
            group: 'guide',
            description: 'Tipos de hospedagem (Lodges, Acampamentos...).',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'type', title: 'Tipo de Hospedagem', type: 'string', description: 'Ex: Lodges de Luxo' },
                        { name: 'description', title: 'Descrição', type: 'text', rows: 3 },
                        { name: 'image', title: 'Foto Principal', type: 'image', options: { hotspot: true } }
                    ],
                    preview: { select: { title: 'type', media: 'image' } }
                }
            ]
        }),
        defineField({
            name: 'guideWhereToStayTip',
            title: 'Guia: Dica de Ouro (Onde Ficar)',
            type: 'text',
            group: 'guide',
            description: 'Dica destacada sobre hospedagem.',
            rows: 2
        }),
        defineField({
            name: 'guidePracticalTips',
            title: 'Guia: Dicas Práticas',
            type: 'array',
            group: 'guide',
            description: 'Dicas rápidas (Saúde, Moeda, Visto...).',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Título (Ex: Saúde e Vacinas)', type: 'string' },
                        { name: 'description', title: 'Explicação', type: 'text', rows: 2 }
                    ],
                    preview: { select: { title: 'title' } }
                }
            ]
        }),
        defineField({
            name: 'guideCtaLinks',
            title: 'Guia: Links Embutidos de Afiliados e Parceiros',
            type: 'array',
            group: 'guide',
            description: 'Configuração dos CTAs no fim do PDF.',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Título do Destaque (Ex: Agência Parceira)', type: 'string' },
                        { name: 'description', title: 'Texto de Persuasão', type: 'text', rows: 2 },
                        { name: 'urlToPrint', title: 'URL Amigável (Aparece no texto impresso no Papel)', type: 'string', description: 'Ex: parceiros.com/raizes-globais' },
                        { name: 'digitalUrl', title: 'URL Real / Link de Afiliado (Clicável no PDF digital)', type: 'url' },
                        { name: 'buttonText', title: 'Texto do Botão no site', type: 'string', description: 'Ex: Planeje Sua Viagem Agora' }
                    ],
                    preview: { select: { title: 'title', subtitle: 'urlToPrint' } }
                }
            ]
        }),

        // ============================================
        // FIM DOS CAMPOS DO GUIA PDF
        // ============================================

        defineField({
            name: 'bestTime',
            title: 'Melhor Época para Visitar (Site Curto)',
            group: 'main',
            type: 'text',
            rows: 3,
            description: 'Resumo rápido para mostrar na seção restrita do site principal.',
        }),
        defineField({
            name: 'curiosities',
            title: 'Curiosidades (Site)',
            group: 'main',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Adicione curiosidades interessantes sobre o destino.',
        }),
        defineField({
            name: 'youtubeId',
            title: 'ID do Vídeo em Destaque (YouTube)',
            group: 'main',
            type: 'string',
            description: 'Apenas o ID do vídeo, ex: dQw4w9WgXcQ',
        }),
        defineField({
            name: 'gallery',
            title: 'Galeria de Imagens Extras (Site)',
            type: 'array',
            group: 'main',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'faq',
            title: 'Perguntas Frequentes (FAQ) (Site/SEO)',
            type: 'array',
            group: 'main',
            description: 'Adicione perguntas e respostas sobre o destino. Essas FAQs ajudam no SEO (Featured Snippets) e AEO.',
            of: [
                {
                    type: 'object',
                    name: 'faqItem',
                    title: 'Pergunta',
                    fields: [
                        defineField({
                            name: 'question',
                            title: 'Pergunta',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'answer',
                            title: 'Resposta',
                            type: 'text',
                            rows: 4,
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    preview: {
                        select: { title: 'question' },
                    },
                },
            ],
        }),
    ],
    preview: {
        select: { title: 'name', media: 'mainImage' },
    },
});
