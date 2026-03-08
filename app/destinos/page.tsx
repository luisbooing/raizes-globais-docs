import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DestinosSearchGrid from '@/components/DestinosSearchGrid';
import { getAllDestinations } from '@/lib/queries';

export const metadata: Metadata = {
    title: 'Todos os Destinos Documentados | Raízes Globais Docs',
    description: 'Explore todos os destinos naturais documentados pelo canal Raízes Globais. Busque por país e descubra paisagens cinematográficas ao redor do mundo.',
};

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function DestinosPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const destinations = await getAllDestinations();
    const params = await searchParams;
    const initialSearch = typeof params.busca === 'string' ? params.busca : '';

    return (
        <>
            <Navbar />
            <main className="flex-grow pt-32 pb-24 bg-background min-h-screen">
                <div className="container mx-auto px-6 md:px-12">
                    {/* Header */}
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-sm text-primary-500 font-semibold tracking-widest uppercase mb-3">Expedições</h2>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-6">
                            Todos os Destinos
                        </h1>
                        <p className="text-foreground/60 font-light text-lg">
                            Cada destino é uma narrativa única. Busque pelo nome do país e embarque em uma viagem cinematográfica.
                        </p>
                    </div>

                    {/* Search + Grid (Client Component) */}
                    <DestinosSearchGrid destinations={destinations} initialSearch={initialSearch} />
                </div>
            </main>
            <Footer />
        </>
    );
}

