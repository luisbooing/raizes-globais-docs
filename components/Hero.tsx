import Image from 'next/image';
import HeroSearchBar from './HeroSearchBar';

interface HeroProps {
    title: string;
    subtitle?: string;
    imageUrl: string;
    actionText?: string;
    showSearch?: boolean;
}

export default function Hero({ title, subtitle, imageUrl, actionText, showSearch }: HeroProps) {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-cinematic" />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight drop-shadow-lg">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-xl md:text-2xl text-white/90 md:leading-relaxed font-light mb-10 max-w-2xl">
                        {subtitle}
                    </p>
                )}

                {showSearch ? (
                    <HeroSearchBar />
                ) : actionText ? (
                    <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-medium tracking-wide uppercase transition-all duration-300 transform hover:scale-105">
                        {actionText}
                    </button>
                ) : null}
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-pulse">
                <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
            </div>
        </section>
    );
}
