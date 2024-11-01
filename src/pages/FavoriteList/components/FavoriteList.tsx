import React, { FC, useMemo } from 'react';
import { FavoriteCard, FavoriteCardProps } from './FavoriteCard';
import { FavoriteFilm } from '@/types';
import { InfiniteData, InfiniteQueryObserverResult, useQuery } from '@tanstack/react-query';
import { MediaType } from '@/services/media/lib/type';
import { getGenres } from '@/services/media/mediaService';

interface FavoriteListProps {
    filmList: InfiniteData<FavoriteFilm[]>;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => Promise<InfiniteQueryObserverResult<InfiniteData<FavoriteFilm[], unknown>, Error>>;
    mediaType: MediaType;
}

const FavoriteList: FC<FavoriteListProps> = ({
    filmList,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    mediaType,
}) => {
    const { data: genres } = useQuery({
        queryKey: ['genres'],
        queryFn: () => getGenres(mediaType),
    });

    const favoriteFilmList: Array<FavoriteCardProps> = useMemo(() => {
        return filmList.pages
            .flatMap((page) => page)
            .map((film) => {
                const genresName = film.genre_ids.map((genreId) => genres?.find((genre) => genre.id === genreId)?.name);

                return {
                    ...film,
                    genre_names: genresName ?? [],
                    mediaType: mediaType,
                };
            });
    }, [filmList, genres, mediaType]);

    return (
        <>
            <div className="grid grid-cols-3 gap-8">
                {favoriteFilmList.map((film) => (
                    <FavoriteCard
                        key={film.id}
                        id={film.id}
                        title={film.title}
                        overview={film.overview}
                        backdrop_path={film.backdrop_path}
                        genre_names={film.genre_names}
                        mediaType={film.mediaType}
                    />
                ))}
            </div>
            <div className="text-center mt-8">
                {isFetchingNextPage ? (
                    <div className="h-[20vh] flex justify-center items-center">
                        <span className="text-xl opacity-60">Loading more, please wait</span>
                    </div>
                ) : hasNextPage ? (
                    <button onClick={fetchNextPage} className="btn-sm btn-default" disabled={isFetchingNextPage}>
                        Load More
                    </button>
                ) : (
                    <span className="text-lg text-white font-semibold opacity-60">No more items to load</span>
                )}
            </div>
        </>
    );
};

export { FavoriteList };
