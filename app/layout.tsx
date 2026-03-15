import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": "https://raizesglobaisdocs.com.br/#website",
            "url": "https://raizesglobaisdocs.com.br/",
            "name": "Raízes Globais Docs",
            "description": "Documentando as belezas naturais do mundo com poesia e cinema",
            "publisher": {
                "@id": "https://raizesglobaisdocs.com.br/#organization"
            }
        },
        {
            "@type": "Organization",
            "@id": "https://raizesglobaisdocs.com.br/#organization",
            "name": "Raízes Globais Docs",
            "url": "https://raizesglobaisdocs.com.br/",
            "logo": {
                "@type": "ImageObject",
                "url": "https://raizesglobaisdocs.com.br/logo.png"
            }
        }
    ]
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
    title: {
        default: 'Raízes Globais Docs',
        template: '%s | Raízes Globais Docs',
    },
    description: 'Documentando as belezas naturais do mundo com poesia e cinema',
    metadataBase: new URL('https://raizesglobaisdocs.com.br'),
    openGraph: {
        title: 'Raízes Globais Docs',
        description: 'Documentando as belezas naturais do mundo com poesia e cinema',
        url: 'https://raizesglobaisdocs.com.br',
        siteName: 'Raízes Globais Docs',
        locale: 'pt_BR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Raízes Globais Docs',
        description: 'Documentando as belezas naturais do mundo com poesia e cinema',
    },
    robots: {
        index: true,
        follow: true,
    },
    verification: {
        google: 'W2hLJ-A-h2vNKRYZUMyBpdm62LKbvde066068XYZj6s',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <GoogleTagManager gtmId="GTM-WLJ24VNQ" />
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
                />
            </head>
            <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}>
                {children}
            </body>
            <GoogleAnalytics gaId="G-9T69KJCLSD" />
        </html>
    );
}
