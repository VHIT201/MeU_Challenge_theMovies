import React, { useCallback } from 'react';
import { Carousel } from '@/components/Carousel';
import { RankingBoard } from './components/RankingBoard';
import { FavoriteList } from './components/FavoriteList';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MediaType } from '@/services/media/lib/type';
import { getFavoriteMedia } from '@/services/media/mediaService';
import { useFilmQuery } from '../Home/queries/useFilmQuery';
import { RankingBanner } from './components/RankingBanner';
import { useParams, useSearchParams } from 'react-router-dom';
import { Images } from '@/assets/images';
import { SearchForm } from '@/components/SearchForm';

const FavoriteListPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get('query') || '';

    const params = useParams<{ media_type: string }>();
    const mediaType = params.media_type === MediaType.TV ? MediaType.TV : MediaType.Movie;
    const pageTitle = mediaType === MediaType.Movie ? 'Movies' : 'TV Series';

    const { data: filmRankingList } = useFilmQuery('popular', mediaType);

    const {
        data: filmList,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['film', 'favorite', mediaType],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await getFavoriteMedia(mediaType, pageParam);

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

    const handleSearch = useCallback(
        (keyword: string) => {
            const trimmedKeyword = keyword.trim();
            setSearchParams(trimmedKeyword ? { query: trimmedKeyword } : {});
        },
        [setSearchParams],
    );

    return (
        <main className="mt-32 mb-16 px-32 space-y-16 bg-black-main">
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
            <RankingBoard filmList={filmRankingList || []} mediaType={mediaType} />
            <div>
                <h1 className="mt-16 mb-8 text-4xl text-center text-white font-bold tracking-normal">
                    Favorite {pageTitle}
                </h1>
                <div className="mb-8">
                    <SearchForm initialKeyword={searchTerm} onSubmit={handleSearch} />
                </div>
                {filmList ? (
                    <FavoriteList
                        filmList={filmList}
                        mediaType={mediaType}
                        isFetchingNextPage={isFetchingNextPage}
                        hasNextPage={hasNextPage}
                        fetchNextPage={fetchNextPage}
                    />
                ) : (
                    <h1 className="py-4 text-4xl text-white font-bold">No Favorite {pageTitle}</h1>
                )}
            </div>
        </main>
    );
};

export default FavoriteListPage;
