//Core
import { ENDPOINTS } from './lib/constant';
//Internal
import apiClient from '../../network/axios';
import { FilmResponseType } from '@/types';

export const fetchFilm = async (type: 'trending' | 'top_rated' | 'popular', category: 'movie' | 'tv') => {
    try {
        const endpoint = ENDPOINTS[type][category];
        const response = await apiClient.get(endpoint);
        const filmList: Array<FilmResponseType> = response.data.results;
        return filmList;
    } catch (error) {
        throw error;
    }
};

export const fetchMovieTrailer = async (movieId: number) => {
    try {
        const response = await apiClient.get(`/movie/${movieId}/videos?language=en-US`);
        return response.data.results;
    } catch (error) {
        console.error('Failed to fetch trailer:', error);
        throw error;
    }
};
