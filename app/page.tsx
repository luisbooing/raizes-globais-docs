import Image from 'next/image';
import Hero from '@/components/Hero';
import DestinoCard from '@/components/DestinoCard';
import VideoCard from '@/components/VideoCard';
import PlanejamentoCard from '@/components/PlanejamentoCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { countries, recentVideos } from '@/lib/data';
import { getAllDestinations, getRecentDocumentaries } from '@/lib/queries';
import { urlFor } from '@/sanity/image';
import { Home, Compass, Camera, Backpack, Play } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

export default async function HomePage() {
    // Fetch from Sanity CMS
    const cmsDestinations = await getAllDestinations();
    const cmsDocumentaries = await getRecentDocumentaries(3);

    // Use CMS data if available, otherwise fall back to static data
    const hasDestinations = cmsDestinations && cmsDestinations.length > 0;
    const hasDocumentaries = cmsDocumentaries && cmsDocumentaries.length > 0;

    return (
        <>
            <Navbar />

            <main className="flex-grow">
                <Hero
                    title="Raízes Globais Docs"
                    subtitle="Documentando as belezas naturais do mundo com poesia e cinema"
                    imageUrl="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80"
                    showSearch
                />

                {/* Destinos Section */}
                <section id="destinos" className="py-24 bg-background">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between">
                            <div className="max-w-2xl">
                                <h2 className="text-sm text-primary-500 font-semibold tracking-widest uppercase mb-3">Expedições</h2>
                                <h3 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                                    Destinos Documentados
                                </h3>
                            </div>
                            <p className="text-foreground/60 font-light mt-6 md:mt-0 max-w-md md:text-right">
                                Viaje conosco através das nossas lentes para os cantos mais isolados e magníficos do planeta.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {hasDestinations
                                ? cmsDestinations.map((dest: any) => (
                                    <DestinoCard
                                        key={dest._id}
                                        country={{
                                            slug: dest.slug,
                                            name: dest.name,
                                            shortDescription: dest.shortDescription,
                                            imageUrl: dest.mainImage
                                                ? urlFor(dest.mainImage).width(800).height(1000).url()
                                                : 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80',
                                        }}
                                    />
                                ))
                                : countries.map((country) => (
                                    <DestinoCard key={country.slug} country={country} />
                                ))
                            }
                        </div>
                    </div>
                </section>

                {/* Documentários Section */}
                <section id="documentarios" className="py-24 bg-card/30 border-y border-white/5">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between">
                            <div>
                                <h2 className="text-sm text-primary-500 font-semibold tracking-widest uppercase mb-3">Cinematografia</h2>
                                <h3 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                                    Documentários Recentes
                                </h3>
                            </div>
                            <Link href="/documentarios" className="hidden md:block mt-6 md:mt-0 border border-white/20 hover:bg-white/10 text-white px-6 py-2 rounded-full text-sm font-medium tracking-wide uppercase transition-colors">
                                Ver todos os vídeos
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {hasDocumentaries
                                ? cmsDocumentaries.map((doc: any) => (
                                    <a
                                        key={doc._id}
                                        href={doc.youtubeUrl || `https://www.youtube.com/watch?v=${doc.youtubeId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block bg-card/30 rounded-2xl overflow-hidden border border-white/5 hover:border-primary-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/5"
                                    >
                                        {/* Thumbnail */}
                                        <div className="relative aspect-video overflow-hidden">
                                            <Image
                                                src={
                                                    doc.thumbnail
                                                        ? urlFor(doc.thumbnail).width(640).height(360).url()
                                                        : `https://img.youtube.com/vi/${doc.youtubeId}/maxresdefault.jpg`
                                                }
                                                alt={doc.title}
                                                width={640}
                                                height={360}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="w-16 h-16 rounded-full bg-primary-500/90 flex items-center justify-center backdrop-blur-sm">
                                                    <Play size={28} className="text-white ml-1" fill="white" />
                                                </div>
                                            </div>
                                            {doc.duration && (
                                                <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-mono backdrop-blur-sm">
                                                    {doc.duration}
                                                </span>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="p-5">
                                            <h4 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors line-clamp-2 mb-2">
                                                {doc.title}
                                            </h4>
                                            <div className="flex items-center justify-between text-sm text-foreground/50">
                                                {doc.destination && (
                                                    <span className="text-primary-500/80">{doc.destination.name}</span>
                                                )}
                                                {doc.views && <span>{doc.views} views</span>}
                                            </div>
                                        </div>
                                    </a>
                                ))
                                : recentVideos.map((video) => (
                                    <VideoCard key={video.id} video={video} />
                                ))
                            }
                        </div>

                        <div className="mt-12 text-center md:hidden">
                            <Link href="/documentarios" className="border border-white/20 hover:bg-white/10 text-white px-8 py-3 rounded-full text-sm font-medium tracking-wide uppercase transition-colors">
                                Ver todos os vídeos
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Planejamento Section */}
                <section id="planejamento" className="py-24 bg-background relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-500/5 blur-[120px] rounded-full pointer-events-none" />

                    <div className="container mx-auto px-6 md:px-12 relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-sm text-primary-500 font-semibold tracking-widest uppercase mb-3">Pronto para ir?</h2>
                            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-6">
                                Planeje Sua Aventura
                            </h3>
                            <p className="text-foreground/70 font-light text-lg">
                                Utilize nossos parceiros de confiança para organizar sua própria expedição fotográfica ou viagem de contemplação.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <PlanejamentoCard
                                title="Hospedagem"
                                description="Encontre refúgios imersos na natureza com nosso parceiro exclusivo."
                                icon={<Home size={32} strokeWidth={1.5} />}
                                actionText="Buscar Estadias"
                                href="#"
                            />
                            <PlanejamentoCard
                                title="Passagens"
                                description="Voos para os destinos mais remotos com as melhores conexões."
                                icon={<Compass size={32} strokeWidth={1.5} />}
                                actionText="Comprar Voos"
                                href="#"
                            />
                            <PlanejamentoCard
                                title="Passeios"
                                description="Acesso exclusivo a guias locais e experiências únicas."
                                icon={<Backpack size={32} strokeWidth={1.5} />}
                                actionText="Ver Experiências"
                                href="#"
                            />
                            <PlanejamentoCard
                                title="Equipamentos"
                                description="Câmeras, drones e roupas técnicas que utilizamos nas gravações."
                                icon={<Camera size={32} strokeWidth={1.5} />}
                                actionText="Loja Recomendada"
                                href="#"
                            />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
