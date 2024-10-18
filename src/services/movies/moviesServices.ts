//Core
import { ENDPOINTS } from "./lib/constant";
//Internal
import apiClient from "../../network/axios";


export const fetchFilm = async (type: "trending" | "top_rated", category: "movie" | "tv") => {
  try {
    const endpoint = ENDPOINTS[type][category];
    const response = await apiClient.get(endpoint);
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch film data:", error);
    throw error;
  }
};


export const fetchMovieTrailer = async (movieId: number) => {
    try {
        const response = await apiClient.get(`/movie/${movieId}/videos?language=en-US`)
        return response.data.results;
    } catch (error) {
        console.error("Failed to fetch trailer:", error);
        throw error;
    }
}
