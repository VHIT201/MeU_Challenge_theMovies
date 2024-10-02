import { useState } from 'react';
import apiClient from '../../services/apiServices/apiServices';
import { useInfiniteQuery } from '@tanstack/react-query';

const useTVSeriesContainer = () => {
  const [keyword, setKeyword] = useState<string>(''); 
  const [searchTerm, setSearchTerm] = useState<string>(''); // Từ khóa đã được xác nhận khi bấm search

  // Hàm fetch TV series phổ biến
  const fetchPopularTV = async ({ pageParam = 1 }) => {
    const response = await apiClient.get(`tv/popular?language=en-US&page=${pageParam}`);
    return {
      results: response.data.results,
      nextPage: response.data.page < response.data.total_pages ? response.data.page + 1 : undefined,
    };
  };

  const {
    data: popularTVData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['popularTV'],
    queryFn: fetchPopularTV,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    enabled: searchTerm === '', // Chỉ gọi khi từ khóa tìm kiếm trống
  });

  const tvSeries = popularTVData?.pages.flatMap(page => page.results) || [];

  // Hàm tìm kiếm TV series theo từ khóa
  const fetchTVByKeyword = async ({ pageParam = 1 }) => {
    const response = await apiClient.get(`search/tv?query=${searchTerm}&include_adult=false&language=en-US&page=${pageParam}`);
    return {
      results: response.data.results,
      nextPage: response.data.page < response.data.total_pages ? response.data.page + 1 : undefined,
    };
  };

  const {
    data: searchResultsData,
    fetchNextPage: fetchNextPageSearch,
    hasNextPage: hasNextPageSearch,
    refetch: refetchSearch,
  } = useInfiniteQuery({
    queryKey: ['searchTV', searchTerm],
    queryFn: fetchTVByKeyword,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: searchTerm.trim() !== '', // Chỉ gọi khi từ khóa tìm kiếm không trống
    initialPageParam: 1,
  });

  const searchResults = searchResultsData?.pages.flatMap(page => page.results) || [];

  // Nếu từ khóa trống, hiển thị TV series phổ biến; nếu không, hiển thị kết quả tìm kiếm
  const tvSeriesToDisplay = searchTerm.trim() ? searchResults : tvSeries;

  const handleLoadMore = () => {
    if (searchTerm.trim()) {
      fetchNextPageSearch(); // Tải thêm kết quả tìm kiếm
    } else {
      fetchNextPage(); // Tải thêm TV series phổ biến
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(keyword); // Cập nhật từ khóa tìm kiếm khi bấm nút Search
    if (keyword.trim()) {
      refetchSearch(); // Tìm kiếm theo từ khóa
    }
  };

  const resetSearch = () => {
    setSearchTerm(''); // Xóa từ khóa tìm kiếm, quay về TV series phổ biến
  };

  return {
    tvSeries: tvSeriesToDisplay,
    loading: isFetching || isFetchingNextPage,
    keyword,
    setKeyword,
    handleLoadMore,
    handleSearch,
    resetSearch,
    hasNextPage: searchTerm.trim() ? hasNextPageSearch : hasNextPage, // Kiểm tra có trang tiếp theo không
  };
};

export default useTVSeriesContainer;
