// MovieContainer.ts
import { useState, useEffect } from 'react';
import { Movie } from '../../Types/Types';
import apiClient from '../../services/apiServices/apiServices';

const useMovieContainer = () => {
  const [listPopularFilm, setListPopularFilm] = useState<Movie[]>([]); // Danh sách phim phổ biến
  const [searchResults, setSearchResults] = useState<Movie[]>([]); // Danh sách phim tìm kiếm
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>(''); // Quản lý từ khóa tìm kiếm
  const [isSearching, setIsSearching] = useState<boolean>(false); // Để biết khi nào người dùng đang tìm kiếm

  // Hàm fetch phim phổ biến
  const fetchPopularFilm = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`movie/popular?language=en-US&page=${page}`);
      setListPopularFilm((prevMovies) => [...prevMovies, ...response.data.results]);
    } catch (err) {
      setError("Failed to fetch popular movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Hàm fetch phim theo từ khóa
  const fetchMoviesByKeyword = async (page: number = 1) => {
    if (!keyword.trim()) return; // Nếu từ khóa rỗng, không làm gì cả
    try {
      setLoading(true);
      const response = await apiClient.get(`search/movie?query=${keyword}&include_adult=false&language=en-US&page=${page}`);
      setSearchResults((prevMovies) => (page === 1 ? response.data.results : [...prevMovies, ...response.data.results]));
    } catch (err) {
      setError("Failed to search movies");
      console.error(err);
    } finally {
      setLoading(false);
      setIsSearching(true); // Đánh dấu là đang trong trạng thái tìm kiếm
    }
  };

  // Chỉ gọi API phim phổ biến khi lần đầu vào trang
  useEffect(() => {
    fetchPopularFilm(1);
  }, []);

  // Khi từ khóa trống, quay lại trạng thái không tìm kiếm và hiển thị phim phổ biến
  useEffect(() => {
    if (keyword.trim() === '') {
      setIsSearching(false);
      setSearchResults([]); // Clear danh sách tìm kiếm
    }
  }, [keyword]);

  const handleLoadMore = () => {
    if (isSearching) {
      fetchMoviesByKeyword(currentPage + 1); // Load thêm kết quả tìm kiếm
    } else {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchPopularFilm(currentPage + 1); // Load thêm phim phổ biến
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn chặn load lại trang
    if (keyword.trim()) {
      setCurrentPage(1); // Đặt lại trang về 1 khi tìm kiếm mới
      fetchMoviesByKeyword(); // Tìm kiếm phim với từ khóa
    }
  };

  return {
    movies: isSearching ? searchResults : listPopularFilm, // Hiển thị danh sách phù hợp
    loading,
    error,
    keyword,
    setKeyword,
    handleLoadMore,
    handleSearch,
  };
};

export default useMovieContainer;
