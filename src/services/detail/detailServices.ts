import apiClient from "../../network/axios";

export const fetchFilmDetails = async (urlBase: string) => {
  const response = await apiClient.get(`${urlBase}?language=en-US`);
  return response.data;
};

export const fetchVideos = async (urlBase: string) => {
  const response = await apiClient.get(`${urlBase}/videos?language=en-US`);
  return response.data.results;
};

export const fetchSimilarFilms = async (urlBase: string) => {
  const response = await apiClient.get(`${urlBase}/similar?language=en-US&page=1`);
  return response.data.results;
};

export const fetchCredits = async (urlBase: string) => {
  const response = await apiClient.get(`${urlBase}/credits?language=en-US`);
  return response.data;
};