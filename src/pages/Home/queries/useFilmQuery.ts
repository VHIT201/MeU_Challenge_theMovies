import { useQuery } from "@tanstack/react-query";
import { fetchFilm } from "../../../services/movies/moviesServices";

// Helper function to create a query for fetching films
export const useFilmQuery = (type: "trending" | "top_rated", mediaType: "movie" | "tv") => {
    return useQuery({
      queryKey: [type, mediaType],
      queryFn: () => fetchFilm(type, mediaType),
    });
  };
  