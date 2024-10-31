//Core
import React from 'react';

//Component
import FilmItem from '../../../../components/FilmItem';

//Type
import { SimilarMoviesSectionProps } from './lib/type';
import { Carousel } from '@/components/Carousel';

const SimilarMoviesSection: React.FC<SimilarMoviesSectionProps> = ({ similarFilms, media_type }) => {
    return (
        <div className="px-4 w-full md:px-8 lg:px-16 pb-16 mt-16 text-left">
            <h3 className="text-white text-base md:text-2xl font-semibold mb-4">Similar</h3>
            {similarFilms.length > 0 ? (
                <div className="flex flex-wrap -mx-2">
                    <Carousel
                        spaceBetween={20}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        slidesPerView={2}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 6 },
                        }}
                        className="w-full"
                    >
                        {similarFilms.map((movie) => (
                            <FilmItem
                                id={movie.id}
                                original_title={movie.original_title}
                                original_name={movie.original_name}
                                name={movie.name}
                                poster_path={movie.poster_path}
                                media_type={media_type}
                            />
                        ))}
                    </Carousel>
                </div>
            ) : (
                <div className="w-full py-20 text-center">
                    <span className="text-2xl font-bold text-white opacity-50">
                        There are no movies similar to this one.
                    </span>
                </div>
            )}
        </div>
    );
};

export default SimilarMoviesSection;
