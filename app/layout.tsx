import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
    title: 'Raízes Globais Docs',
    description: 'Documentando as belezas naturais do mundo com poesia e cinema',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}>
                {children}
            </body>
        </html>
    );
}
