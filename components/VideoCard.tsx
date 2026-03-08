import Image from 'next/image';
import { PlayCircle, Eye, Clock } from 'lucide-react';
import type { Video } from '@/lib/data';

interface VideoCardProps {
    video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
    return (
        <div className="group cursor-pointer">
            <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <PlayCircle size={64} className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" strokeWidth={1} />
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                    <Clock size={12} className="mr-1" />
                    {video.duration}
                </div>
            </div>

            <h4 className="text-lg font-medium text-white line-clamp-2 leading-snug group-hover:text-primary-500 transition-colors">
                {video.title}
            </h4>
            <div className="flex items-center text-foreground/50 text-sm mt-2 font-light">
                <Eye size={14} className="mr-1" />
                {video.views} visualizações
            </div>
        </div>
    );
}
