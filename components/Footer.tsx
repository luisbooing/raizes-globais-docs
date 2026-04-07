import Link from 'next/link';
import { Youtube, Instagram } from 'lucide-react';

function TikTokIcon({ size = 20 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
    );
}

export default function Footer() {
    return (
        <footer className="bg-background border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-2xl font-serif font-bold tracking-wider text-white inline-block mb-6">
                            RAÍZES <span className="font-light">GLOBAIS</span> Docs
                        </Link>
                        <p className="text-foreground/70 mb-6 max-w-sm font-light leading-relaxed">
                            Documentando as belezas naturais do mundo com poesia e cinema. Inscreva-se para acompanhar novas produções.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.youtube.com/channel/UCLZD5YscSyYUCWQdkWeNBKQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-foreground/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
                                <Youtube size={20} />
                            </a>
                            <a href="https://www.instagram.com/raizesglobaisdocs/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-foreground/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
                                <Instagram size={20} />
                            </a>
                            <a href="https://www.tiktok.com/@raizesglobaisdocs" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-foreground/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
                                <TikTokIcon size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Explorar</h4>
                        <ul className="space-y-4 font-light">
                            <li><Link href="/destinos" className="text-foreground/70 hover:text-white transition-colors">Destinos</Link></li>
                            <li><Link href="/documentarios" className="text-foreground/70 hover:text-white transition-colors">Séries Documentais</Link></li>
                            <li><Link href="/blog" className="text-foreground/70 hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/sobre" className="text-foreground/70 hover:text-white transition-colors">Sobre o Projeto</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Planejamento</h4>
                        <ul className="space-y-4 font-light">
                            <li><Link href="/planeje" className="text-foreground/70 hover:text-white transition-colors">Planeje Sua Aventura</Link></li>
                            <li><Link href="/planeje" className="text-foreground/70 hover:text-white transition-colors">Hospedagem Recomendada</Link></li>
                            <li><Link href="/planeje" className="text-foreground/70 hover:text-white transition-colors">Passeios e Trilhas</Link></li>
                            <li><Link href="/planeje" className="text-foreground/70 hover:text-white transition-colors">Equipamentos para Viagem</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-foreground/50 font-light">
                    <p>&copy; {new Date().getFullYear()} Raízes Globais Docs. Todos os direitos reservados.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
                        <Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
