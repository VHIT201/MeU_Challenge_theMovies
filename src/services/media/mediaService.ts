
// fetchMedia.ts
import { FavoriteFilm, FilmResponseType } from '@/types';
import apiClient from '../../network/axios';
import { MediaType } from '../../services/media/lib/type';

interface FetchMediaParams {
    mediaType: MediaType;
    searchTerm: string;
    pageParam?: number;
}

export const fetchMedia = async ({ mediaType, searchTerm, pageParam = 1 }: FetchMediaParams) => {
    const baseURL = searchTerm.trim()
        ? `search/${mediaType}?query=${encodeURIComponent(
              searchTerm,
          )}&include_adult=false&language=en-US&page=${pageParam}`
        : `${mediaType}/popular?language=en-US&page=${pageParam}`;

    const response = await apiClient.get(baseURL);
    const filmList: Array<FilmResponseType> = response.data.results;

    return filmList;
};


export const getFavoriteMedia = async (mediaType: MediaType, page: number) => {
    const mediaTypePath = mediaType === MediaType.TV ? "tv" : `${mediaType}s`;
    const response = await apiClient.get(`/account/21535262/favorite/${mediaTypePath}?page=${page}`);
    
    const favoriteFilmList: Array<FavoriteFilm> = response.data.results;

    if (!favoriteFilmList) throw new Error('Not Found Data');

    return favoriteFilmList;
};

export const getGenres = async (mediaType: MediaType) => {
    const response = await apiClient.get(`/genre/${mediaType}/list`);
    const favoriteFilmList: Array<{ id: number; name: string }> = response.data.genres;

    if (!favoriteFilmList) throw new Error('Not Found Data');

    return favoriteFilmList;
};