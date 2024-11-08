//Core
import React from 'react';

// App
import 'react-loading-skeleton/dist/skeleton.css';
import { FilmResponseType } from '@/types/media';
import { Carousel, FilmItem } from '@/components';
import { cn } from '@/utils';
import useThemeStore from '@/store/themeStore';

//Component

//Types
interface FilmSectionProps {
    // title: string;
    viewMoreLink: string;
    mediaType: string;
    data: FilmResponseType[];
    title: string;
}

const FilmSection: React.FC<FilmSectionProps> = ({ viewMoreLink, mediaType, data, title }) => {
    const { isDarkMode } = useThemeStore();

    return (
        <div className={cn(isDarkMode && 'dark', 'w-full mx-auto mt-8 text-black dark:text-white')}>
            <div
                className={cn(
                    isDarkMode && 'dark',
                    'flex items-center justify-between mb-4 text-black dark:text-white',
                )}
            >
                <span className="font-medium text-lg md:text-2xl">{title}</span>
                <a
                    className={cn(
                        isDarkMode && 'dark',
                        'text-black dark:text-white ring-black dark:ring-white btn-sm btn-default',
                    )}
                    href={viewMoreLink}
                >
                    More
                </a>
            </div>
            <Carousel
                spaceBetween={20}
                loop={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                slidesPerView={2}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 6 },
                }}
                className="w-full"
            >
                {data.map((movie) => (
                    <FilmItem
                        key={movie.id}
                        id={movie.id}
                        title={movie.title ?? ''}
                        name={movie.name ?? ''}
                        poster_path={movie.poster_path ?? ''}
                        media_type={mediaType ?? ''}
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default FilmSection;
