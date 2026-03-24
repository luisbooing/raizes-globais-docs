import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PlanejamentoCard from '@/components/PlanejamentoCard';
import { getAllPartners } from '@/lib/queries';
import { urlFor } from '@/sanity/image';
import { Home, Compass, Backpack, Shield, Camera, ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Planeje Sua Aventura | Raízes Globais Docs',
    description: 'Encontre parceiros confiáveis para hospedagem, passagens, passeios, seguro viagem e equipamentos. Planeje sua expedição com nossos afiliados selecionados.',
    openGraph: {
        title: 'Planeje Sua Aventura | Raízes Globais Docs',
        description: 'Encontre parceiros confiáveis para hospedagem, passagens, passeios, seguro viagem e equipamentos.',
        url: 'https://raizesglobaisdocs.com.br/planeje',
        siteName: 'Raízes Globais Docs',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Planeje Sua Aventura | Raízes Globais Docs',
        description: 'Encontre parceiros confiáveis para hospedagem, passagens, passeios, seguro viagem e equipamentos.',
    },
    alternates: {
        canonical: 'https://raizesglobaisdocs.com.br/planeje',
    },
};

export const revalidate = 60;

interface CategoryConfig {
    key: string;
    title: string;
    subtitle: string;
    icon: ReactNode;
}

const categories: CategoryConfig[] = [
    {
        key: 'hospedagem',
        title: 'Hospedagem',
        subtitle: 'Hotéis, lodges e refúgios selecionados para sua estadia.',
        icon: <Home size={28} strokeWidth={1.5} />,
    },
    {
        key: 'passagens',
        title: 'Passagens Aéreas',
        subtitle: 'Voos para os destinos mais remotos e magníficos do planeta.',
        icon: <Compass size={28} strokeWidth={1.5} />,
    },
    {
        key: 'passeios',
        title: 'Passeios & Experiências',
        subtitle: 'Guias locais, safáris, trilhas e experiências únicas.',
        icon: <Backpack size={28} strokeWidth={1.5} />,
    },
    {
        key: 'seguro',
        title: 'Seguro Viagem',
        subtitle: 'Proteção completa para aventuras em qualquer canto do mundo.',
        icon: <Shield size={28} strokeWidth={1.5} />,
    },
    {
        key: 'equipamentos',
        title: 'Equipamentos',
        subtitle: 'Câmeras, drones, mochilas e roupas técnicas que utilizamos.',
        icon: <Camera size={28} strokeWidth={1.5} />,
    },
];

export default async function PlanejePage() {
    const partners = await getAllPartners();
    const hasPartners = partners && partners.length > 0;

    // Group partners by category
    const partnersByCategory: Record<string, any[]> = {};
    if (hasPartners) {
        for (const partner of partners) {
            const cat = partner.category || 'outros';
            if (!partnersByCategory[cat]) partnersByCategory[cat] = [];
            partnersByCategory[cat].push(partner);
        }
    }

    return (
        <>
            <Navbar />
            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Planeje Sua Aventura",
                        "description": "Encontre parceiros confiáveis para planejar sua expedição.",
                        "url": "https://raizesglobaisdocs.com.br/planeje",
                        "publisher": {
                            "@type": "Organization",
                            "name": "Raízes Globais Docs",
                        },
                    }),
                }}
            />
            <main className="flex-grow bg-background min-h-screen">
                {/* Hero compacto */}
                <section className="pt-32 pb-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-500/5 blur-[150px] rounded-full pointer-events-none" />

                    <div className="container mx-auto px-6 md:px-12 relative z-10">
                        <div className="max-w-3xl">
                            <h2 className="text-sm text-primary-500 font-semibold tracking-widest uppercase mb-3">
                                Parceiros Selecionados
                            </h2>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-6">
                                Planeje Sua Aventura
                            </h1>
                            <p className="text-foreground/60 font-light text-lg max-w-2xl">
                                Selecionamos parceiros de confiança para cada etapa da sua jornada. De hospedagem a equipamentos,
                                tudo o que você precisa para transformar inspiração em uma expedição real.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Categorias */}
                <div className="container mx-auto px-6 md:px-12 pb-24">
                    {categories.map((cat, catIdx) => {
                        const catPartners = partnersByCategory[cat.key];
                        const hasCatPartners = catPartners && catPartners.length > 0;

                        return (
                            <section
                                key={cat.key}
                                id={cat.key}
                                className={`py-16 ${catIdx < categories.length - 1 ? 'border-b border-white/5' : ''}`}
                            >
                                {/* Category header */}
                                <div className="flex items-start gap-5 mb-10">
                                    <div className="p-3 bg-primary-500/10 rounded-full text-primary-500 shrink-0 mt-1">
                                        {cat.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-serif font-bold text-white mb-2">
                                            {cat.title}
                                        </h2>
                                        <p className="text-foreground/50 font-light">
                                            {cat.subtitle}
                                        </p>
                                    </div>
                                </div>

                                {/* Partner cards */}
                                {hasCatPartners ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {catPartners.map((partner: any) => (
                                            <PlanejamentoCard
                                                key={partner._id}
                                                title={partner.name}
                                                description={partner.description}
                                                logoUrl={partner.logo ? urlFor(partner.logo).width(96).height(96).url() : undefined}
                                                actionText={partner.actionText || 'Saiba Mais'}
                                                href={partner.affiliateUrl}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-card/20 rounded-xl border border-white/5 p-10 text-center">
                                        <div className="text-primary-500/30 mb-4">{cat.icon}</div>
                                        <p className="text-foreground/40 font-light">
                                            Em breve teremos parceiros de {cat.title.toLowerCase()} para você.
                                        </p>
                                        <p className="text-foreground/25 text-sm mt-2">
                                            Enquanto isso, explore nossos{' '}
                                            <Link href="/destinos" className="text-primary-500 hover:underline">destinos documentados</Link>.
                                        </p>
                                    </div>
                                )}

                                {/* Destinations linked */}
                                {hasCatPartners && (
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {Array.from(
                                            new Set(
                                                catPartners.flatMap((p: any) =>
                                                    p.destinations?.map((d: any) => JSON.stringify({ slug: d.slug, name: d.name })) || []
                                                )
                                            )
                                        ).map((destStr: any) => {
                                            const dest = JSON.parse(destStr);
                                            return (
                                                <Link
                                                    key={dest.slug}
                                                    href={`/destinos/${dest.slug}`}
                                                    className="text-xs font-medium text-foreground/40 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors"
                                                >
                                                    {dest.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </section>
                        );
                    })}
                </div>

                {/* CTA Final */}
                <section className="py-20 bg-card/30 border-t border-white/5">
                    <div className="container mx-auto px-6 md:px-12 text-center max-w-3xl">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                            Não encontrou o que procura?
                        </h2>
                        <p className="text-foreground/60 font-light text-lg mb-10">
                            Explore nossos destinos documentados e descubra guias completos com dicas de viagem, hospedagem e muito mais.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/destinos"
                                className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-full text-sm font-medium tracking-widest uppercase transition-colors shadow-lg"
                            >
                                Explorar Destinos
                                <ArrowRight size={16} />
                            </Link>
                            <Link
                                href="/documentarios"
                                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-full text-sm font-medium tracking-widest uppercase transition-colors"
                            >
                                Ver Documentários
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
