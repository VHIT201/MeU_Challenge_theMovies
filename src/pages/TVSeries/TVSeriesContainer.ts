import { useState, useEffect } from 'react';
import { Movie } from '../../Types/Types';
import apiClient from '../../services/apiServices/apiServices';

const useTVSeriesContainer = () => {
  const [listPopularTV, setListPopularTV] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>(''); 
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Fetch popular TV series
  const fetchPopularTV = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`tv/popular?language=en-US&page=${page}`);
      setListPopularTV((prevTVs) => [...prevTVs, ...response.data.results]);
    } catch (err) {
      setError('Failed to fetch popular TV series');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch TV series by keyword
  const fetchTVByKeyword = async (page: number = 1) => {
    if (!keyword.trim()) return;
    try {
      setLoading(true);
      const response = await apiClient.get(`search/tv?query=${keyword}&include_adult=false&language=en-US&page=${page}`);
      setSearchResults((prevTVs) => (page === 1 ? response.data.results : [...prevTVs, ...response.data.results]));
    } catch (err) {
      setError('Failed to search TV series');
      console.error(err);
    } finally {
      setLoading(false);
      setIsSearching(true);
    }
  };

  useEffect(() => {
    fetchPopularTV(1);
  }, []);

  useEffect(() => {
    if (!keyword.trim()) {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, [keyword]);

  const handleLoadMore = () => {
    if (isSearching) {
      fetchTVByKeyword(currentPage + 1);
    } else {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchPopularTV(currentPage + 1);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      setCurrentPage(1);
      fetchTVByKeyword();
    }
  };

  return {
    tvSeries: isSearching ? searchResults : listPopularTV, 
    loading,
    error,
    keyword,
    setKeyword,
    handleLoadMore,
    handleSearch,
  };
};

export default useTVSeriesContainer;
