'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight } from 'lucide-react';

export default function HeroSearchBar() {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    const handleSearch = () => {
        const trimmed = query.trim();
        if (trimmed) {
            router.push(`/destinos?busca=${encodeURIComponent(trimmed)}`);
        } else {
            router.push('/destinos');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className={`flex items-center bg-white/10 backdrop-blur-xl rounded-full border transition-all duration-500 ${isFocused ? 'border-primary-500/60 shadow-lg shadow-primary-500/20' : 'border-white/20 shadow-xl shadow-black/20'}`}>
                <div className="pl-6 text-white/50">
                    <Search size={20} strokeWidth={1.5} />
                </div>
                <input
                    type="text"
                    placeholder="Para onde você quer viajar?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="flex-1 py-4 px-4 text-white placeholder:text-white/40 bg-transparent border-none outline-none text-base md:text-lg font-light tracking-wide"
                />
                <button
                    onClick={handleSearch}
                    className="m-1.5 bg-primary-500 hover:bg-primary-600 text-white px-6 md:px-8 py-3 rounded-full font-medium tracking-wider transition-all duration-300 text-sm uppercase flex items-center gap-2 hover:gap-3 hover:shadow-lg hover:shadow-primary-500/30"
                >
                    Buscar
                    <ArrowRight size={16} strokeWidth={2} />
                </button>
            </div>
        </div>
    );
}
