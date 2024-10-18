import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMedia } from "../mediaServices";
import { MediaType } from "../lib/type";

export const useMediaQuery = (mediaType: MediaType, searchTerm: string) => {
  return useInfiniteQuery({
    queryKey: ["media", mediaType, searchTerm],
    queryFn: ({ pageParam }) =>
      fetchMedia(mediaType, searchTerm.trim() ? searchTerm : undefined, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};
