import React from 'react';
import { Carousel } from '@/components/Carousel';
import { RankingBoard } from './components/RankingBoard';
import { FavoriteList } from './components/FavoriteList';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MediaType } from '@/services/media/lib/type';
import { getFavoriteFilm } from '@/services/media/mediaService';
import { useFilmQuery } from '../Home/queries/useFilmQuery';
import { RankingBanner } from './components/RankingBanner';
import { useParams } from 'react-router-dom';
import { Images } from '@/assets/images';

const FavoriteListPage = () => {
    const params = useParams<{ media_type: string }>();
    const mediaType = params.media_type === MediaType.TV ? MediaType.TV : MediaType.Movie;

    const { data: filmRankingList } = useFilmQuery('popular', mediaType);

    const { data: filmList } = useInfiniteQuery({
        queryKey: ['film', 'favorite', mediaType],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await getFavoriteFilm(mediaType, pageParam);

            return response ?? [];
        },
        getNextPageParam: (lastPage, pages) => {
            if (lastPage && lastPage.length < 20) {
                return undefined;
            }
            return pages.length + 1;
        },
        initialPageParam: 1,
    });

    return (
        <main className="mt-32 mb-16 px-32 space-y-16">
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
                                    title={film.original_title ?? ''}
                                    backDrop={film.backdrop_path ?? Images.noImage}
                                />
                            ))
                    ) : (
                        <></>
                    )}
                </Carousel>
            </div>
            <RankingBoard filmList={filmRankingList || []} mediaType={mediaType} />
            {filmList ? (
                <FavoriteList filmList={filmList} mediaType={mediaType} />
            ) : (
                <h1 className="py-4 text-4xl text-white font-bold">No Favorite Film</h1>
            )}
        </main>
    );
};

export default FavoriteListPage;
