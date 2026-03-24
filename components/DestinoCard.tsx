import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface DestinoCardProps {
    country: {
        slug: string;
        name: string;
        shortDescription: string;
        imageUrl: string;
    };
}

export default function DestinoCard({ country }: DestinoCardProps) {
    return (
        <Link href={`/destinos/${country.slug}`} className="group block overflow-hidden rounded-lg relative aspect-[4/5] md:aspect-[3/4]">
            <Image
                src={country.imageUrl}
                alt={country.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <h3 className="text-3xl font-serif font-bold text-white mb-2 tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {country.name}
                </h3>
                <p className="text-white/80 font-light mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
                    {country.shortDescription}
                </p>

                <div className="flex items-center text-primary-500 font-medium tracking-widest uppercase text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    <span>Explorar</span>
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
            </div>
        </Link>
    );
}
