import { ReactNode } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

interface PlanejamentoCardProps {
    title: string;
    description: string;
    icon?: ReactNode;
    logoUrl?: string;
    category?: string;
    actionText: string;
    href: string;
}

const categoryLabels: Record<string, string> = {
    hospedagem: 'Hospedagem',
    passagens: 'Passagens',
    passeios: 'Passeios',
    seguro: 'Seguro Viagem',
    equipamentos: 'Equipamentos',
};

export default function PlanejamentoCard({ title, description, icon, logoUrl, category, actionText, href }: PlanejamentoCardProps) {
    return (
        <div className="bg-card/50 border border-white/5 rounded-xl p-8 hover:bg-card hover:border-white/10 transition-all duration-300 group flex flex-col h-full">
            {/* Logo ou Ícone */}
            {logoUrl ? (
                <div className="mb-6 w-16 h-16 rounded-full overflow-hidden bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Image
                        src={logoUrl}
                        alt={title}
                        width={48}
                        height={48}
                        className="object-contain"
                    />
                </div>
            ) : (
                <div className="text-primary-500 mb-6 bg-primary-500/10 w-16 h-16 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
            )}

            {/* Badge de categoria */}
            {category && categoryLabels[category] && (
                <span className="text-xs font-medium text-primary-500/80 uppercase tracking-widest mb-2">
                    {categoryLabels[category]}
                </span>
            )}

            <h3 className="text-xl font-semibold text-white mb-3 tracking-wide">{title}</h3>
            <p className="text-foreground/70 font-light leading-relaxed mb-8 flex-grow">
                {description}
            </p>

            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-white uppercase tracking-widest group-hover:text-primary-500 transition-colors"
            >
                <span>{actionText}</span>
                <ExternalLink size={16} className="ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
        </div>
    );
}
