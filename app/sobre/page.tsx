import { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Sobre Nós | Raízes Globais Docs',
    description: 'Conheça o projeto Raízes Globais Docs, nossa equipe e nossa missão de documentar a poesia e beleza natural do nosso mundo.',
    openGraph: {
        title: 'Sobre Nós | Raízes Globais Docs',
        description: 'Conheça o projeto Raízes Globais Docs, nossa equipe e nossa missão de documentar a poesia e beleza natural do nosso mundo.',
        url: 'https://raizesglobaisdocs.com.br/sobre',
    },
};

export default function SobrePage() {
    return (
        <>
            <Navbar />
            {/* Schema Markup: AboutPage and Person */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "AboutPage",
                        "mainEntity": {
                            "@type": "Organization",
                            "name": "Raízes Globais Docs",
                            "description": "Documentando as belezas naturais do mundo com poesia e cinema",
                            "founder": {
                                "@type": "Person",
                                "name": "Equipe Raízes Globais",
                                "jobTitle": "Documentaristas"
                            }
                        }
                    })
                }}
            />
            <main className="flex-grow pt-32 pb-24 bg-background min-h-screen">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-4xl mx-auto">
                        <header className="mb-16 text-center">
                            <h2 className="text-primary-500 font-semibold tracking-widest uppercase mb-4 text-sm">Nossa História</h2>
                            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
                                Explorando além do mapa
                            </h1>
                            <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed">
                                Acreditamos que a natureza é a maior contadora de histórias do nosso planeta. Nós apenas capturamos sua poesia.
                            </p>
                        </header>

                        <div className="prose prose-invert prose-lg max-w-none text-foreground/80 font-light leading-relaxed space-y-8">
                            <p>
                                O <strong>Raízes Globais Docs</strong> nasceu de um desejo profundo de reconectar a humanidade com as maravilhas naturais do mundo. Em uma era onde a vida se move rápido demais, convidamos você a parar, observar e se maravilhar.
                            </p>
                            
                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">Nossa Missão</h2>
                            <p>
                                Nossa missão é simples: criar documentários cinematográficos de altíssima qualidade visual, narrados com a poesia que cada destino merece. Cada vídeo, artigo e roteiro é cuidadosamente produzido não apenas para informar, mas para inspirar e evocar um sentimento de profunda admiração pelo nosso planeta.
                            </p>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">Nossa Abordagem</h2>
                            <ul className="space-y-4">
                                <li><strong className="text-primary-400">Cinematografia:</strong> Utilizamos equipamentos de última geração e inteligência artificial para trazer as cores, texturas e grandiosidade de cada relevo diretamente para sua tela.</li>
                                <li><strong className="text-primary-400">Poesia Narrativa:</strong> Nossos roteiros não são apenas guias de viagem. Eles contam o lado emocional, silencioso e atemporal da geologia e biologia dos destinos.</li>
                                <li><strong className="text-primary-400">Curadoria de Roteiros:</strong> Além da experiência audiovisual, fornecemos guias práticos, recomendações de hospedagem, seguros e passeios para que você possa viver na pele o que mostramos na tela.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
