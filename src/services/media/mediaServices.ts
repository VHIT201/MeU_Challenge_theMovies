// mediaServices.ts
import apiClient from "../../network/axios";

//Type
import { MediaType } from "./lib/type";

export const fetchMedia = async (mediaType: MediaType, searchTerm?: string, pageParam = 1) => {
  let response;
  const baseURL = searchTerm
    ? `search/${mediaType}?query=${searchTerm}&include_adult=false&language=en-US&page=${pageParam}`
    : `${mediaType}/popular?language=en-US&page=${pageParam}`;

  response = await apiClient.get(baseURL);

  return {
    results: response.data.results, // Return the fetched results or search results
    nextPage: response.data.page < response.data.total_pages ? response.data.page + 1 : undefined, // Return next page number if available
  };
};
