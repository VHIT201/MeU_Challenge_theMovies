import { useQuery } from '@tanstack/react-query';
import apiClient from "../../services/apiServices/apiServices";
import { Movie } from "../../Types/Types";

interface SwiperData {
  title: string;
  data: Movie[];
  viewMoreLink: string;
}

const useHomeContainer = () => {
  // Fetching trending movies
  const { data: trendingMovies = [], isLoading: isTrendingMoviesLoading, error: trendingMoviesError } = useQuery({
    queryKey: ['trendingMovies'],
    queryFn: async () => {
      const response = await apiClient.get("/trending/all/day?language=en-US");
      return response.data.results;
    },
  });

  // Fetching top-rated movies
  const { data: topRatedMovies = [], isLoading: isTopRatedMoviesLoading, error: topRatedMoviesError } = useQuery({
    queryKey: ['topRatedMovies'],
    queryFn: async () => {
      const response = await apiClient.get("/movie/top_rated?language=en-US&page=1");
      return response.data.results;
    },
  });

  // Fetching trending TV shows
  const { data: trendingTV = [], isLoading: isTrendingTVLoading, error: trendingTVError } = useQuery({
    queryKey: ['trendingTV'],
    queryFn: async () => {
      const response = await apiClient.get("/trending/tv/day?language=en-US");
      return response.data.results;
    },
  });

  // Fetching top-rated TV shows
  const { data: topRatedTV = [], isLoading: isTopRatedTVLoading, error: topRatedTVError } = useQuery({
    queryKey: ['topRatedTV'],
    queryFn: async () => {
      const response = await apiClient.get("/tv/top_rated?language=en-US&page=1");
      return response.data.results;
    },
  });

  // Combine all swipers' data
  const swipersData: SwiperData[] = [
    {
      title: "Trending Movies",
      data: trendingMovies,
      viewMoreLink: "/movie",
    },
    {
      title: "Top Rated Movies",
      data: topRatedMovies,
      viewMoreLink: "/movie",
    },
    {
      title: "Top Trending TV",
      data: trendingTV,
      viewMoreLink: "/tvseries",
    },
    {
      title: "Top Rated TV",
      data: topRatedTV,
      viewMoreLink: "/tvseries",
    },
  ];

  // Check if any query is loading or has errors
  const loading = isTrendingMoviesLoading || isTopRatedMoviesLoading || isTrendingTVLoading || isTopRatedTVLoading;
  const error = trendingMoviesError || topRatedMoviesError || trendingTVError || topRatedTVError;

  return {
    swipersData,
    loading,
    error,
  };
};

export default useHomeContainer;
