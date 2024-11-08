import React from 'react';
import { RankingBoard } from '../Favorite/components';
import RankingBanner from './components/RankingBanner';
import { useFilmQuery } from '../Home/hooks/useFilmQuery';
import { FeatureType, MediaType } from '@/types/media';
import { Carousel } from '@/components';
import { Images } from '@/assets/images';

const RakingPage = () => {
    const { data: filmRankingList } = useFilmQuery(FeatureType.Popular, MediaType.Movie);
    const mediaType = MediaType.Movie;
    return (
        <main className="w-full flex flex-col items-center justify-start">
            <div className="relative w-full h-48 bg-gradient-to-b from-white to-black">
                <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-white text-4xl font-bold z-10">
                    Ranking
                </span>
            </div>

            <div className="bg-black-main w-full px-4 md:px-8 py-8 xl:p-16 space-y-16">
                <div className="w-[1000px] mx-auto">
                    <Carousel
                        loop={true}
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 150,
                            modifier: 2.5,
                            slideShadows: true,
                        }}
                        childWidth="800px"
                    >
                        {filmRankingList ? (
                            filmRankingList
                                ?.slice(0, 10)
                                .map((film, index) => (
                                    <RankingBanner
                                        key={film.id || index}
                                        rank={index + 1}
                                        title={mediaType === 'movie' ? film.title : film.name}
                                        backDrop={film.backdrop_path ?? Images.noImage}
                                    />
                                ))
                        ) : (
                            <></>
                        )}
                    </Carousel>
                </div>
                <RankingBoard filmList={filmRankingList || []} mediaType={MediaType.Movie} />
            </div>
        </main>
    );
};

export default RakingPage;
