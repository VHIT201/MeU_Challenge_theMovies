//Core
import React from 'react';

// App
import 'react-loading-skeleton/dist/skeleton.css'; // Thêm CSS cho skeleton

//Component
import FilmItem from '../../../../components/FilmItem';

//Types
import { Carousel } from '@/components/Carousel';
import { FilmResponseType } from '@/types';
interface FilmSectionProps {
    // title: string;
    viewMoreLink: string;
    mediaType: string;
    data: FilmResponseType[];
    title: string;
}

const FilmSection: React.FC<FilmSectionProps> = ({ viewMoreLink, mediaType, data, title }) => {
    return (
        <div className="w-full mx-auto mt-8">
            <div className="flex items-center justify-between mb-4">
                <span className="text-white font-medium text-lg md:text-2xl">{title}</span>
                <a className="btn-sm btn-default" href={viewMoreLink}>
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
                        id={movie.id}
                        original_title={movie.original_title ?? ''}
                        original_name={movie.original_name ?? ''}
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
