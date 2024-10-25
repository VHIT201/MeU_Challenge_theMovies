// fetchMedia.ts
import apiClient from "../../network/axios";
import { MediaType } from "../../services/media/lib/type";

interface FetchMediaParams {
  mediaType: MediaType;
  searchTerm: string;
  pageParam?: number;
}

export const fetchMedia = async ({
  mediaType,
  searchTerm,
  pageParam = 1,
}: FetchMediaParams) => {
  const baseURL = searchTerm.trim()
    ? `search/${mediaType}?query=${encodeURIComponent(
        searchTerm
      )}&include_adult=false&language=en-US&page=${pageParam}`
    : `${mediaType}/popular?language=en-US&page=${pageParam}`;

  const response = await apiClient.get(baseURL);

  return {
    results: response.data.results,
    nextPage:
      response.data.page < response.data.total_pages
        ? response.data.page + 1
        : undefined,
  };
};