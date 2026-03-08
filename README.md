# Raízes Globais Docs

Projeto web moderno e cinematográfico para documentários narrados de paisagens naturais. Construído com Next.js 14, Tailwind CSS, TypeScript e estruturado com a metodologia App Router para alta performance, SEO simplificado e manutenção escalável.

## Pré-requisitos
- Node.js 18.17 ou superior
- npm ou yarn

## Instalação e Execução

1. Abra um terminal na pasta do projeto (`RaizesGlobaisDocs`).
2. Instale as dependências executando:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Navegue até [http://localhost:3000](http://localhost:3000) no seu navegador.

## Estrutura do Projeto

- `/app/page.tsx`: Home page principal.
- `/app/layout.tsx`: Layout raiz com metadados SEO e importação de fontes globais.
- `/app/destinos/[slug]/page.tsx`: Página dinâmica de cada país (ex: `/destinos/islandia`).
- `/components`: Componentes visuais isolados e reutilizáveis (Navbar, Hero, Footer, etc.).
- `/lib/data.ts`: Arquivo que atua como base de dados inicial com todos os textos (mock).
- `/styles/globals.css`: Configurações de design e variáveis do Tailwind.

## Tecnologias e Estilo
- **Paleta de Cores**: Tons cinemáticos escuros, pretos suaves `#0a0c10` (backgrounds) e cinzas frios.
- **Tipografia**: *Playfair Display* para títulos dramáticos, *Inter* para o corpo de texto (alta legibilidade em telas).
- **Ícones**: Lucide React.

## Deployment (Vercel)

Este projeto está configurado para deploy imediato na Vercel:
1. Suba o projeto para um repositório no GitHub.
2. Crie uma conta na [Vercel](https://vercel.com/) e importe o repositório.
3. Adicione as seguintes **Environment Variables** no painel da Vercel (copie de `.env.local`):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
4. Clique em **Deploy**. A Vercel cuidará automaticamente do build e da otimização das imagens.

Para configurar o domínio personalizado (Hostinger), vá em *Settings > Domains* no projeto hospedado na Vercel e adicione seu domínio. A Vercel fornecerá os apontamentos DNS (A e CNAME) para serem inseridos no painel da Hostinger.
