import { notFound } from 'next/navigation';
import Image from 'next/image';
import { countries } from '@/lib/data';
import { getDestinationBySlug, getAllDestinationSlugs, getDocumentariesByDestination } from '@/lib/queries';
import { urlFor } from '@/sanity/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PlanejamentoCard from '@/components/PlanejamentoCard';
import { Home, Backpack, Shield, Camera, Play } from 'lucide-react';
import type { Metadata } from 'next';
import { PortableText } from 'next-sanity';

interface PageProps {
    params: { slug: string };
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    // Try CMS first
    const dest = await getDestinationBySlug(params.slug);
    if (dest) {
        return {
            title: dest.seoTitle || `${dest.name} | Raízes Globais Docs`,
            description: dest.seoDescription || dest.shortDescription,
        };
    }

    // Fallback to static data
    const country = countries.find(c => c.slug === params.slug);
    if (!country) return { title: 'Destino não encontrado' };

    return {
        title: `${country.name} | Raízes Globais Docs`,
        description: country.shortDescription,
    };
}

export async function generateStaticParams() {
    // Get slugs from CMS
    const cmsSlugs = await getAllDestinationSlugs();
    // Merge with static slugs
    const staticSlugs = countries.map((c) => ({ slug: c.slug }));
    const allSlugs = [...staticSlugs, ...(cmsSlugs || [])];

    // Deduplicate
    const unique = Array.from(new Map(allSlugs.map(s => [s.slug, s])).values());
    return unique;
}

export default async function CountryPage({ params }: PageProps) {
    // Try CMS first
    const dest = await getDestinationBySlug(params.slug);

    if (dest) {
        // Get related documentaries
        const documentaries = dest._id ? await getDocumentariesByDestination(dest._id) : [];

        return (
            <>
                <Navbar />
                <main className="flex-grow pt-24 bg-background">
                    <div className="container mx-auto px-6 md:px-12 py-12">
                        {/* Header */}
                        <div className="mb-12">
                            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
                                {dest.name}
                            </h1>
                            <p className="text-xl md:text-2xl text-foreground/80 font-light max-w-3xl">
                                {dest.shortDescription}
                            </p>
                        </div>

                        {/* Video Section */}
                        {dest.youtubeId && (
                            <div className="relative aspect-video rounded-xl overflow-hidden mb-16 shadow-2xl border border-white/10">
                                <div className="absolute inset-0 bg-card flex items-center justify-center">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${dest.youtubeId}?autoplay=0&rel=0`}
                                        title={`${dest.name} Documentário`}
                                        className="w-full h-full border-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        )}

                        {/* Content Sections */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
                            <div className="lg:col-span-2 space-y-12">
                                {/* Sobre o País (Rich Text) */}
                                {dest.fullDescription && (
                                    <section>
                                        <h2 className="text-3xl font-serif font-bold text-white mb-6 flex items-center">
                                            <span className="w-8 h-[1px] bg-primary-500 mr-4"></span>
                                            Sobre o País
                                        </h2>
                                        <div className="prose prose-invert prose-lg max-w-none text-foreground/80 font-light leading-relaxed">
                                            <PortableText value={dest.fullDescription} />
                                        </div>
                                    </section>
                                )}

                                {/* Curiosidades */}
                                {dest.curiosities && dest.curiosities.length > 0 && (
                                    <section>
                                        <h2 className="text-3xl font-serif font-bold text-white mb-6 flex items-center">
                                            <span className="w-8 h-[1px] bg-primary-500 mr-4"></span>
                                            Curiosidades
                                        </h2>
                                        <ul className="space-y-4">
                                            {dest.curiosities.map((curiosity: string, index: number) => (
                                                <li key={index} className="flex text-foreground/80 font-light leading-relaxed bg-card/30 p-4 rounded-lg border border-white/5">
                                                    <span className="text-primary-500 font-bold mr-4">0{index + 1}</span>
                                                    {curiosity}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                {/* Galeria de Imagens */}
                                {dest.gallery && dest.gallery.length > 0 && (
                                    <section>
                                        <h2 className="text-3xl font-serif font-bold text-white mb-6 flex items-center">
                                            <span className="w-8 h-[1px] bg-primary-500 mr-4"></span>
                                            Galeria de Imagens
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {dest.gallery.map((image: any, index: number) => (
                                                <div
                                                    key={image._key || index}
                                                    className="relative aspect-[4/3] rounded-xl overflow-hidden group border border-white/5"
                                                >
                                                    <Image
                                                        src={urlFor(image).width(800).height(600).url()}
                                                        alt={image.alt || `${dest.name} - Imagem ${index + 1}`}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Documentários Relacionados */}
                                {documentaries && documentaries.length > 0 && (
                                    <section>
                                        <h2 className="text-3xl font-serif font-bold text-white mb-6 flex items-center">
                                            <span className="w-8 h-[1px] bg-primary-500 mr-4"></span>
                                            Documentários sobre {dest.name}
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {documentaries.map((doc: any) => (
                                                <a
                                                    key={doc._id}
                                                    href={doc.youtubeUrl || `https://www.youtube.com/watch?v=${doc.youtubeId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group block bg-card/30 rounded-xl overflow-hidden border border-white/5 hover:border-primary-500/30 transition-all"
                                                >
                                                    <div className="relative aspect-video overflow-hidden">
                                                        <img
                                                            src={`https://img.youtube.com/vi/${doc.youtubeId}/maxresdefault.jpg`}
                                                            alt={doc.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <div className="w-12 h-12 rounded-full bg-primary-500/90 flex items-center justify-center">
                                                                <Play size={20} className="text-white ml-0.5" fill="white" />
                                                            </div>
                                                        </div>
                                                        {doc.duration && (
                                                            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-mono">
                                                                {doc.duration}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="p-4">
                                                        <h3 className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors line-clamp-2">
                                                            {doc.title}
                                                        </h3>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>

                            <div className="space-y-12">
                                {/* Melhor Época */}
                                {dest.bestTime && (
                                    <section className="bg-card p-8 rounded-xl border border-white/10">
                                        <h2 className="text-xl font-serif font-bold text-white mb-4">Melhor época para visitar</h2>
                                        <p className="text-foreground/70 font-light text-sm leading-relaxed mb-6">
                                            {dest.bestTime}
                                        </p>
                                        <button className="w-full bg-primary-600 hover:bg-primary-500 text-white py-3 rounded text-sm font-medium tracking-widest uppercase transition-colors">
                                            Baixar Guia PDF
                                        </button>
                                    </section>
                                )}
                            </div>
                        </div>

                        {/* Affiliate Blocks */}
                        <div className="py-16 border-t border-white/10">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-serif font-bold text-white">Monte Sua Expedição</h2>
                                <p className="text-foreground/60 font-light mt-4">Nossas recomendações de afiliados para {dest.name}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <PlanejamentoCard title="Hospedagem" description="Hotéis e chalés recomendados." icon={<Home size={24} />} actionText="Reservar" href="#" />
                                <PlanejamentoCard title="Passeios" description="Guias locais de confiança." icon={<Backpack size={24} />} actionText="Explorar" href="#" />
                                <PlanejamentoCard title="Seguro Viagem" description="Cobertura para esportes extremos." icon={<Shield size={24} />} actionText="Cotação" href="#" />
                                <PlanejamentoCard title="Equipamentos" description="Aluguel de câmeras e drones." icon={<Camera size={24} />} actionText="Ver Itens" href="#" />
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    // Fallback to static data
    const country = countries.find(c => c.slug === params.slug);
    if (!country) notFound();

    return (
        <>
            <Navbar />
            <main className="flex-grow pt-24 bg-background">
                <div className="container mx-auto px-6 md:px-12 py-12">
                    <div className="mb-12">
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">{country.name}</h1>
                        <p className="text-xl md:text-2xl text-foreground/80 font-light max-w-3xl">{country.shortDescription}</p>
                    </div>

                    <div className="relative aspect-video rounded-xl overflow-hidden mb-16 shadow-2xl border border-white/10">
                        <div className="absolute inset-0 bg-card flex items-center justify-center">
                            <iframe
                                src={`https://www.youtube.com/embed/${country.youtubeId}?autoplay=0&rel=0`}
                                title={`${country.name} Documentário`}
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <h2 className="text-3xl font-serif font-bold text-white mb-6 flex items-center">
                                    <span className="w-8 h-[1px] bg-primary-500 mr-4"></span>
                                    Sobre o País
                                </h2>
                                <div className="prose prose-invert prose-lg max-w-none text-foreground/80 font-light leading-relaxed">
                                    <p>{country.fullDescription}</p>
                                </div>
                            </section>
                            <section>
                                <h2 className="text-3xl font-serif font-bold text-white mb-6 flex items-center">
                                    <span className="w-8 h-[1px] bg-primary-500 mr-4"></span>
                                    Curiosidades
                                </h2>
                                <ul className="space-y-4">
                                    {country.curiosities.map((curiosity, index) => (
                                        <li key={index} className="flex text-foreground/80 font-light leading-relaxed bg-card/30 p-4 rounded-lg border border-white/5">
                                            <span className="text-primary-500 font-bold mr-4">0{index + 1}</span>
                                            {curiosity}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                        <div className="space-y-12">
                            <section className="bg-card p-8 rounded-xl border border-white/10">
                                <h2 className="text-xl font-serif font-bold text-white mb-4">Melhor época para visitar</h2>
                                <p className="text-foreground/70 font-light text-sm leading-relaxed mb-6">{country.bestTime}</p>
                                <button className="w-full bg-primary-600 hover:bg-primary-500 text-white py-3 rounded text-sm font-medium tracking-widest uppercase transition-colors">Baixar Guia PDF</button>
                            </section>
                        </div>
                    </div>

                    <div className="py-16 border-t border-white/10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-serif font-bold text-white">Monte Sua Expedição</h2>
                            <p className="text-foreground/60 font-light mt-4">Nossas recomendações de afiliados para {country.name}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <PlanejamentoCard title="Hospedagem" description="Hotéis e chalés recomendados." icon={<Home size={24} />} actionText="Reservar" href="#" />
                            <PlanejamentoCard title="Passeios" description="Guias locais de confiança." icon={<Backpack size={24} />} actionText="Explorar" href="#" />
                            <PlanejamentoCard title="Seguro Viagem" description="Cobertura para esportes extremos." icon={<Shield size={24} />} actionText="Cotação" href="#" />
                            <PlanejamentoCard title="Equipamentos" description="Aluguel de câmeras e drones." icon={<Camera size={24} />} actionText="Ver Itens" href="#" />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
