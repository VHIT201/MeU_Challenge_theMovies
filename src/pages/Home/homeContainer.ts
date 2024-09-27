import { useEffect, useState } from "react";
import apiClient from "../../services/apiServices/apiServices";
import { Movie } from "../../Types/Types";

const useHomeContainer = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [trendingTV, setTrendingTV] = useState<Movie[]>([]);
  const [topRatedTV, setTopRatedTV] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrendingMovies = async () => {
    try {
      const response = await apiClient.get("/trending/all/day?language=en-US");
      setTrendingMovies(response.data.results);
    } catch (err) {
      setError("Failed to fetch trending movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopRatedMovies = async () => {
    try {
      const response = await apiClient.get("/movie/top_rated?language=en-US&page=1");
      setTopRatedMovies(response.data.results);
    } catch (err) {
      setError("Failed to fetch top-rated movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingTV = async () => {
    try {
      const response = await apiClient.get("/trending/tv/day?language=en-US");
      setTrendingTV(response.data.results);
    } catch (err) {
      setError("Failed to fetch trending TV shows");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopRatedTV = async () => {
    try {
      const response = await apiClient.get("/tv/top_rated?language=en-US&page=1");
      setTopRatedTV(response.data.results);
    } catch (err) {
      setError("Failed to fetch top-rated TV shows");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Mảng chứa các thông tin Swiper
  const swipersData = [
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

  useEffect(() => {
    fetchTrendingMovies();
    fetchTopRatedMovies();
    fetchTrendingTV();
    fetchTopRatedTV();
  }, []);

  return {
    swipersData,
    loading,
    error,
  };
};

export default useHomeContainer;
