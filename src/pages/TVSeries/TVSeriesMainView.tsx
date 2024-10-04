// Core: Importing necessary libraries and components.
import React, { useState } from 'react';
import FilmItem from '../../components/FilmItem';
import apiClient from '../../services/apiServices/apiServices';
import { useInfiniteQuery } from '@tanstack/react-query';
import Spinner from "../../components/Spinner/Spinner";

const TVMainView: React.FC = () => {
  // States: Managing internal component states for keyword input and confirmed search term.
  const [keyword, setKeyword] = useState<string>(''); 
  const [searchTerm, setSearchTerm] = useState<string>(''); // The confirmed search term after clicking search.

  // Client: Function to fetch popular TV series.
  const fetchPopularTV = async ({ pageParam = 1 }) => {
    const response = await apiClient.get(`tv/popular?language=en-US&page=${pageParam}`);
    return {
      results: response.data.results,
      nextPage: response.data.page < response.data.total_pages ? response.data.page + 1 : undefined,
    };
  };

  // Queries: Fetching popular TV series data using `useInfiniteQuery` for infinite scrolling.
  const {
    data: popularTVData,
    fetchNextPage,
    hasNextPage: hasNextPagePopular,
    isFetching,
    isFetchingNextPage,
    isLoading, // Indicates if the initial loading is happening
  } = useInfiniteQuery({
    queryKey: ['popularTV'],
    queryFn: fetchPopularTV,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    enabled: searchTerm === '', // Only fetch when the search term is empty
  });

  const tvSeries = popularTVData?.pages.flatMap(page => page.results) || [];

  // Client: Function to fetch TV series based on the search keyword.
  const fetchTVByKeyword = async ({ pageParam = 1 }) => {
    const response = await apiClient.get(`search/tv?query=${searchTerm}&include_adult=false&language=en-US&page=${pageParam}`);
    return {
      results: response.data.results,
      nextPage: response.data.page < response.data.total_pages ? response.data.page + 1 : undefined,
    };
  };

  // Queries: Fetching search results when a search term is provided.
  const {
    data: searchResultsData,
    fetchNextPage: fetchNextPageSearch,
    hasNextPage: hasNextPageSearch,
    refetch: refetchSearch,
    isLoading: isLoadingSearch,
  } = useInfiniteQuery({
    queryKey: ['searchTV', searchTerm],
    queryFn: fetchTVByKeyword,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: searchTerm.trim() !== '', // Only fetch when the search term is not empty
    initialPageParam: 1,
  });

  const searchResults = searchResultsData?.pages.flatMap(page => page.results) || [];

  // Methods: Determine which TV series to display based on the search term.
  const tvSeriesToDisplay = searchTerm.trim() ? searchResults : tvSeries;

  // Methods: Load more TV series depending on whether searching or showing popular TV series.
  const handleLoadMore = () => {
    if (searchTerm.trim()) {
      fetchNextPageSearch(); // Load more search results
    } else {
      fetchNextPage(); // Load more popular TV series
    }
  };

  // Methods: Handle the search form submission.
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(keyword); // Update the search term when clicking the search button
    if (keyword.trim()) {
      refetchSearch(); // Fetch search results if the keyword is not empty
    }
  };

  // Methods: Reset the search term to display popular TV series.
  const resetSearch = () => {
    setSearchTerm(''); // Reset search term to show popular TV series again
  };

  // Methods: Handle keyword input changes.
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if (e.target.value.trim() === "") {
      resetSearch(); // If the search keyword is empty, show popular TV series
    }
  };

  return (
    <main className='w-full flex flex-col items-center justify-start'>
      {/* App: Layout structure for the main view */}
      <div className="relative w-full h-48 bg-gradient-to-b from-white to-black">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-white text-4xl font-bold z-10">TV Series</span>
      </div>
      <div className="bg-black-main w-full px-4 md:px-8 py-8 xl:p-16">
        <div className='max-w-screen-2xl mx-auto'>
          {/* Component: Search form */}
          <form className="flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Enter keyword" 
              value={keyword}
              onChange={handleKeywordChange}
              className="outline-none border-none rounded-full px-6 py-2 bg-black placeholder-gray-500 text-white flex-1 md:w-96"
            />
            <button type="submit" className="btn-primary py-2 px-8 text-white rounded-full">Search</button>
          </form>

          {/* Component: Conditional content display */}
          {tvSeriesToDisplay.length === 0 && (isLoading || isFetching || isLoadingSearch) ? (
            <div className="flex flex-row items-center justify-center text-center text-white h-[50vh] gap-10">
              <Spinner />
              {/* Informative message displayed during loading */}
              <p className="text-xl md:text-2xl text-opacity-50">Loading TV series, please wait...</p>
            </div>
          ) : tvSeriesToDisplay.length === 0 && !isFetching ? (
            <div className="flex items-center justify-center text-center h-[50vh]">
              <p className="text-xl md:text-2xl text-white text-opacity-50">No TV series found matching your criteria.</p>
            </div>
          ) : (
            <>
              {/* Component: TV series list grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-16">
                {tvSeriesToDisplay.map((tv) => (
                  <FilmItem
                    key={tv.id}
                    id={tv.id}
                    original_title={tv.original_title}
                    original_name={tv.original_name}
                    name={tv.name}
                    media_type="tv"
                    poster_path={tv.poster_path}
                    className="w-full"
                  />
                ))}
              </div>

              {/* Component: Load more button */}
              <div className="text-center mt-8">
                {(isFetching || isFetchingNextPage) ? (
                  <div className="h-[20vh] flex justify-center items-center">
                    <Spinner/>
                  </div>
                ) : (
                  (searchTerm.trim() ? hasNextPageSearch : hasNextPagePopular) ? (
                    <button onClick={handleLoadMore} className="btn-sm btn-default">
                      Load More
                    </button>
                  ) : (
                    <div>
                      {/* No more results to load */}
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default TVMainView;
