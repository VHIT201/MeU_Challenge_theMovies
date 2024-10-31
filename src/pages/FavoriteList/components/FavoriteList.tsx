import React, { FC, useMemo } from 'react';
import { FavoriteCard, FavoriteCardProps } from './FavoriteCard';
import { FavoriteFilm } from '@/types';
import { InfiniteData, useQuery } from '@tanstack/react-query';
import { MediaType } from '@/services/media/lib/type';
import { getGenres } from '@/services/media/mediaService';

interface FavoriteListProps {
    filmList: InfiniteData<FavoriteFilm[]>;
    mediaType: MediaType;
}

const FavoriteList: FC<FavoriteListProps> = ({ filmList, mediaType }) => {
    const pageTitle = mediaType === MediaType.Movie ? 'Movies' : 'TV Series';

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
        <div>
            <h1 className="mt-16 mb-8 text-4xl text-center text-white font-bold tracking-normal">
                Favorite {pageTitle}
            </h1>
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
        </div>
    );
};

export { FavoriteList };
