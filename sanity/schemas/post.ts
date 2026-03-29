import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'post',
    title: 'Post do Blog',
    type: 'document',
    groups: [
        { name: 'seo', title: 'SEO (Metadados)' },
        { name: 'header', title: 'Cabeçalho (Hero)' },
        { name: 'content', title: 'Conteúdo Mestre' },
        { name: 'guide', title: 'Guia PDF Exclusivo' },
    ],
    fields: [
        // 1. Cabeçalho (H1 e Capa)
        defineField({
            name: 'title',
            title: 'Título Chamativo (H1)',
            type: 'string',
            group: 'header',
            description: 'Deve conter a palavra-chave ou o benefício (Ex: "5 Dicas para...", "Qual a melhor...").',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL Amigável)',
            type: 'slug',
            group: 'header',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Imagem de Capa',
            type: 'image',
            group: 'header',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Data de Publicação',
            type: 'datetime',
            group: 'header',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'category',
            title: 'Categoria (Tag)',
            type: 'string',
            group: 'header',
            description: 'Ex: Noruega, Motorhome, Dicas Práticas, Equipamentos...',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'readingTime',
            title: 'Tempo de Leitura (Minutos)',
            type: 'number',
            group: 'header',
            description: 'Ex: 5 (Renderiza como "Leitura de 5 min")',
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: 'isFeatured',
            title: 'Post de Destaque?',
            type: 'boolean',
            group: 'header',
            description: 'Se ativado, este post aparecerá em evidência no banner do topo do Blog.',
            initialValue: false,
        }),

        // 2. SEO
        defineField({
            name: 'seoTitle',
            title: 'Meta Título (Para o Google)',
            type: 'string',
            group: 'seo',
            description: 'Título exato que aparecerá nos resultados de busca (Max ~60 caracteres).',
            validation: (Rule) => Rule.max(70),
        }),
        defineField({
            name: 'seoDescription',
            title: 'Meta Descrição',
            type: 'text',
            rows: 3,
            group: 'seo',
            description: 'Resumo atrativo para forçar o clique no Google (Max ~160 caracteres).',
            validation: (Rule) => Rule.max(160),
        }),

        // 3. O "Conteúdo Mestre"
        defineField({
            name: 'introduction',
            title: 'Introdução (A Promessa)',
            type: 'array',
            group: 'content',
            description: 'Escreva quantos parágrafos quiser. Responda a dúvida principal logo aqui para reter o leitor.',
            of: [{ type: 'block' }],
            validation: (Rule) => Rule.required(),
        }),

        // Gancho do YouTube
        defineField({
            name: 'youtubeHook',
            title: 'Gancho YouTube (Vídeo de Destaque)',
            type: 'object',
            group: 'content',
            description: 'Insira o ID de um vídeo do canal que tenha relação com o tema.',
            fields: [
                {
                    name: 'videoId',
                    title: 'ID do Vídeo',
                    type: 'string',
                    description: 'Apenas o ID, ex: v=dQw4w9WgXcQ -> dQw4w9WgXcQ'
                },
                {
                    name: 'hookText',
                    title: 'Texto de Chamada',
                    type: 'string',
                    description: 'Ex: "Enquanto lê nossas dicas, veja como é a experiência real..."',
                }
            ]
        }),

        // Corpo Principal (H2/H3 e Tabelas)
        defineField({
            name: 'body',
            title: 'O Coração do Conteúdo',
            type: 'array',
            group: 'content',
            description: 'Use para H2, H3, tabelas e listas.',
            of: [
                { type: 'block' },
                { type: 'image', options: { hotspot: true } },
                { type: 'table' } // Requer o plugin @sanity/table
            ]
        }),

        // Você Sabia?
        defineField({
            name: 'curiosities',
            title: 'Curiosidades / Você Sabia?',
            type: 'array',
            group: 'content',
            of: [{ type: 'string' }],
            description: 'Adicione curiosidades (Ex: "Você sabia que na Noruega...").',
        }),

        // Dicas de Ouro
        defineField({
            name: 'goldenTips',
            title: 'Dicas de Ouro (O Seu Diferencial)',
            type: 'array',
            group: 'content',
            description: 'O que só quem tem a experiência do Raízes Globais sabe dizer.',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Dica (Marcador Curtinho)', type: 'string' },
                        { name: 'description', title: 'Explicação detalhada', type: 'text', rows: 2 }
                    ],
                    preview: { select: { title: 'title' } }
                }
            ]
        }),

        // Galeria Opcional
        defineField({
            name: 'gallery',
            title: 'Galeria Opcional (Lightbox)',
            type: 'array',
            group: 'content',
            description: 'Imagens secundárias ricas que vão abrir em tela cheia na parte inferior do artigo.',
            of: [{ type: 'image', options: { hotspot: true } }]
        }),

        // CTA Final
        defineField({
            name: 'finalCta',
            title: 'Chamada para Ação Final (CTA)',
            type: 'object',
            group: 'content',
            description: 'Não deixe o leitor ir embora sem uma ação.',
            fields: [
                {
                    name: 'youtubeText',
                    title: 'Texto CTA YouTube',
                    type: 'string',
                    initialValue: 'Gostou dessas dicas? Inscreva-se no canal Raízes Globais Docs para mais conteúdos como este.',
                },
                {
                    name: 'relatedPdfGuide',
                    title: 'Oferecer Guia PDF Específico?',
                    type: 'reference',
                    to: [{ type: 'destination' }],
                    description: 'Selecione um Destino para linkar automaticamente o download do seu Guia PDF. (Será ignorado se este post criar um Guia Nativo abaixo).'
                }
            ]
        }),

        // ============================================
        // GUIA PDF NATIVO DO POST
        // ============================================
        defineField({
            name: 'hasGuide',
            title: 'Criar Guia PDF a partir deste Post?',
            type: 'boolean',
            group: 'guide',
            description: 'Se ativado, geraremos um PDF exclusivo usando as informações desta aba e o CTA Final do blog apontará para ele automaticamente.',
            initialValue: false,
        }),
        defineField({
            name: 'guideIntroduction',
            title: 'Guia: Introdução',
            type: 'array',
            group: 'guide',
            of: [{ type: 'block' }],
            description: 'Texto inspiracional focado no início do PDF.',
            hidden: ({ document }: any) => !document?.hasGuide,
        }),
        defineField({
            name: 'guideWhereToGo',
            title: 'Guia: Onde Ir (Tópicos Principais)',
            type: 'array',
            group: 'guide',
            description: 'Tabela elegante e lista com imagens.',
            hidden: ({ document }: any) => !document?.hasGuide,
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Nome do Destino/Tópico', type: 'string' },
                        { name: 'highlight', title: 'Destaque Principal', type: 'string', description: 'Curto, ex: A Grande Migração' },
                        { name: 'scenery', title: 'Cenário Típico / Fato', type: 'string' },
                        { name: 'image', title: 'Foto', type: 'image', options: { hotspot: true } }
                    ],
                    preview: { select: { title: 'name', subtitle: 'highlight', media: 'image' } }
                }
            ]
        }),
        defineField({
            name: 'guideWhenToGo',
            title: 'Guia: Quando Ir / Cronograma',
            type: 'array',
            group: 'guide',
            description: 'Lista ou Tabela.',
            hidden: ({ document }: any) => !document?.hasGuide,
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'destination', title: 'Destino / Fase', type: 'string' },
                        { name: 'bestTime', title: 'Época Ideal', type: 'string', description: 'Ex: Julho a Setembro' },
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
            description: 'Aquela dica em destaque com fundo amarelo no PDF.',
            hidden: ({ document }: any) => !document?.hasGuide,
            rows: 3
        }),
        defineField({
            name: 'guideWhatToDo',
            title: 'Guia: O que Fazer (Experiências / Dicas)',
            type: 'array',
            group: 'guide',
            description: 'Lista com imagem detalhada no PDF.',
            hidden: ({ document }: any) => !document?.hasGuide,
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Título', type: 'string' },
                        { name: 'description', title: 'Descrição Curta', type: 'text', rows: 2 },
                        { name: 'image', title: 'Foto', type: 'image', options: { hotspot: true } }
                    ],
                    preview: { select: { title: 'title', media: 'image' } }
                }
            ]
        }),
        defineField({
            name: 'guideWhereToStay',
            title: 'Guia: Onde Ficar / Equipamentos',
            type: 'array',
            group: 'guide',
            description: 'Utilize para Hospedagem, Equipamentos Essenciais, etc.',
            hidden: ({ document }: any) => !document?.hasGuide,
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'type', title: 'Tipo / Categoria', type: 'string', description: 'Ex: Lodges de Luxo ou Botas de Trilha' },
                        { name: 'description', title: 'Descrição', type: 'text', rows: 3 },
                        { name: 'image', title: 'Foto Principal', type: 'image', options: { hotspot: true } }
                    ],
                    preview: { select: { title: 'type', media: 'image' } }
                }
            ]
        }),
        defineField({
            name: 'guideWhereToStayTip',
            title: 'Guia: Dica de Ouro Secundária',
            type: 'text',
            group: 'guide',
            description: 'Dica destacada.',
            hidden: ({ document }: any) => !document?.hasGuide,
            rows: 2
        }),
        defineField({
            name: 'guidePracticalTips',
            title: 'Guia: Dicas Práticas Finais',
            type: 'array',
            group: 'guide',
            description: 'Dicas rápidas (Saúde, Documentos, Moeda...).',
            hidden: ({ document }: any) => !document?.hasGuide,
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
            title: 'Guia: Links Embutidos de Parceiros',
            type: 'array',
            group: 'guide',
            description: 'Configuração dos CTAs no fim do PDF.',
            hidden: ({ document }: any) => !document?.hasGuide,
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
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
        },
    },
});
