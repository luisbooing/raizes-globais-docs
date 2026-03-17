'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import DestinoCard from '@/components/DestinoCard';

interface SanityDestination {
    _id: string;
    name: string;
    slug: string;
    shortDescription: string;
    mainImage: any;
}

export default function DestinosSearchGrid({ destinations, initialSearch = '' }: { destinations: SanityDestination[]; initialSearch?: string }) {
    const [search, setSearch] = useState(initialSearch);

    const normalizeString = (str: string) => 
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const filtered = destinations.filter((d) =>
        normalizeString(d.name).includes(normalizeString(search))
    );

    return (
        <>
            {/* Search bar */}
            <div className="relative max-w-xl mb-12">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />
                <input
                    type="text"
                    placeholder="Buscar por nome do país..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-card/50 border border-white/10 rounded-2xl text-white placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all text-lg"
                />
            </div>

            {/* Results */}
            {filtered.length === 0 ? (
                <div className="text-center py-24">
                    <p className="text-foreground/50 text-xl font-light">Nenhum destino encontrado para &quot;{search}&quot;</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((dest) => (
                        <DestinoCard
                            key={dest._id}
                            country={{
                                slug: dest.slug,
                                name: dest.name,
                                shortDescription: dest.shortDescription,
                                imageUrl: dest.mainImage
                                    ? `https://cdn.sanity.io/images/n9mc4chu/production/${dest.mainImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`
                                    : 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80',
                            }}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
