'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3 group text-white">
                    <Image
                        src="/logo.png"
                        alt="Raízes Globais Logo"
                        width={48}
                        height={48}
                        className="group-hover:opacity-80 transition-opacity drop-shadow-md rounded-full"
                    />
                    <div className="text-2xl font-serif font-bold tracking-wider relative top-0.5">
                        RAÍZES <span className="font-light">GLOBAIS</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/" className="text-sm font-medium hover:text-primary-500 transition-colors uppercase tracking-widest text-white/90">Início</Link>
                    <Link href="/sobre" className="text-sm font-medium hover:text-primary-500 transition-colors uppercase tracking-widest text-white/90">Sobre</Link>
                    <Link href="/destinos" className="text-sm font-medium hover:text-primary-500 transition-colors uppercase tracking-widest text-white/90">Destinos</Link>
                    <Link href="/documentarios" className="text-sm font-medium hover:text-primary-500 transition-colors uppercase tracking-widest text-white/90">Séries</Link>
                    <Link href="/planeje" className="text-sm font-medium hover:text-primary-500 transition-colors uppercase tracking-widest text-white/90">Planeje</Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg flex flex-col items-center py-6 space-y-6 shadow-xl border-t border-white/10">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary-500 transition-colors uppercase tracking-widest">Início</Link>
                    <Link href="/sobre" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary-500 transition-colors uppercase tracking-widest">Sobre</Link>
                    <Link href="/destinos" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary-500 transition-colors uppercase tracking-widest">Destinos</Link>
                    <Link href="/documentarios" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary-500 transition-colors uppercase tracking-widest">Séries</Link>
                    <Link href="/planeje" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary-500 transition-colors uppercase tracking-widest">Planeje</Link>
                </div>
            )}
        </nav>
    );
}
