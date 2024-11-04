//App
import apiClient from '@/lib/http';
import { FeatureType, FilmResponseType, FavoriteFilm, MediaType } from '@/types/media';

// Internal
import { INCLUDE_ADULT, LANGUAGE_DEFAULT } from './lib/constant';

interface MediaParams {
  keyword?: string
  page?: number;
  type?: FeatureType;
  mediaType: MediaType;
}

interface ParamStringProps {
  search?: string;
  mediaType: MediaType;
  type?: string;
}

interface QueryStringProps {
  query?: string;
  page?: number;
  include_adult?: boolean;
  language?: string;
}

export const getFilmList = async ({ page = 1, type, keyword, mediaType }: MediaParams) => {
  const paramProps: ParamStringProps = {
      search: keyword && 'search',
      mediaType: mediaType,
      type: type,
  };

  const queryProps: QueryStringProps = {
      query: keyword,
      page: page,
      include_adult: INCLUDE_ADULT,
      language: LANGUAGE_DEFAULT,
  };

  const paramsString = Object.values(paramProps)
      .filter((param) => !!param)
      .join('/');

  const queriesString = Object.keys(queryProps)
      .map((key) =>
          queryProps[key as keyof QueryStringProps] ? `${key}=${queryProps[key as keyof QueryStringProps]}` : '',
      )
      .filter((queryString) => queryString !== '')
      .join('&');

  const url = `${paramsString}?${queriesString}`;

  const response = await apiClient.get(url);
  const filmList: Array<FilmResponseType> = response.data?.results;

  if (!filmList) throw new Error('No films found');

  return filmList;
};

export const getMovieTrailer = async (movieId: number) => {
    try {
        const response = await apiClient.get(`/movie/${movieId}/videos?language=${LANGUAGE_DEFAULT}`);
        return response.data.results;
    } catch {
      throw new Error("Not Found Data");
    }
};

export const getFilmDetail = async (urlBase: string) => {
  const response = await apiClient.get(`${urlBase}?language=${LANGUAGE_DEFAULT}`);
  return response.data;
};

export const getVideoList = async (urlBase: string) => {
  const response = await apiClient.get(`${urlBase}/videos?language=${LANGUAGE_DEFAULT}`);
  return response.data.results;
};

export const getSimilarFilmList = async (urlBase: string) => {
  const response = await apiClient.get(`${urlBase}/similar?language=${LANGUAGE_DEFAULT}&page=1`);
  return response.data.results;
};

export const getCreditList = async (urlBase: string) => {
  const response = await apiClient.get(`${urlBase}/credits?language=${LANGUAGE_DEFAULT}`);
  return response.data;
};


export const getFavoriteMedia = async (mediaType: MediaType, page: number) => {
    const mediaTypePath = mediaType === MediaType.TV ? "tv" : `${mediaType}s`;
    const response = await apiClient.get(`/account/21535262/favorite/${mediaTypePath}?page=${page}`);
    
    const favoriteFilmList: Array<FavoriteFilm> = response.data.results;

    if (!favoriteFilmList) throw new Error('Not Found Data');

    return favoriteFilmList;
};
