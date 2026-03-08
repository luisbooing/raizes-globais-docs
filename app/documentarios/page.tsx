import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllDocumentaries } from '@/lib/queries';
import { Play } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Documentários e Séries | Raízes Globais Docs',
    description: 'Assista todos os documentários narrados por IA sobre as paisagens naturais mais incríveis do planeta. Cinematografia em 4K.',
};

export const revalidate = 60;

export default async function DocumentariosPage() {
    const documentaries = await getAllDocumentaries();

    return (
        <>
            <Navbar />
            <main className="flex-grow pt-32 pb-24 bg-background min-h-screen">
                <div className="container mx-auto px-6 md:px-12">
                    {/* Header */}
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-sm text-primary-500 font-semibold tracking-widest uppercase mb-3">Cinematografia</h2>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-6">
                            Todos os Documentários
                        </h1>
                        <p className="text-foreground/60 font-light text-lg">
                            Cada vídeo é uma carta de amor à natureza, narrada com poesia e filmada em resolução cinematográfica.
                        </p>
                    </div>

                    {/* Grid of documentaries */}
                    {documentaries && documentaries.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {documentaries.map((doc: any) => (
                                <a
                                    key={doc._id}
                                    href={doc.youtubeUrl || `https://www.youtube.com/watch?v=${doc.youtubeId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block bg-card/30 rounded-2xl overflow-hidden border border-white/5 hover:border-primary-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/5"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={
                                                doc.thumbnail
                                                    ? `https://cdn.sanity.io/images/n9mc4chu/production/${doc.thumbnail.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`
                                                    : `https://img.youtube.com/vi/${doc.youtubeId}/maxresdefault.jpg`
                                            }
                                            alt={doc.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                                        <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors line-clamp-2 mb-2">
                                            {doc.title}
                                        </h3>
                                        <div className="flex items-center justify-between text-sm text-foreground/50">
                                            {doc.destination && (
                                                <span className="text-primary-500/80">{doc.destination.name}</span>
                                            )}
                                            {doc.views && <span>{doc.views} views</span>}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24">
                            <p className="text-foreground/50 text-xl font-light">Nenhum documentário cadastrado ainda.</p>
                            <p className="text-foreground/30 mt-2">Acesse <Link href="/admin" className="text-primary-500 hover:underline">/admin</Link> para cadastrar seus documentários.</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
