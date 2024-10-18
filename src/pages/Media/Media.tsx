import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams, useParams } from "react-router-dom";

// Internal
import { MediaType } from "../../services/media/lib/type";
import { useMediaQuery } from "../../services/media/queries/mediaQueries";

// Component
import FilmItem from "../../components/FilmItem";
import SearchForm from "../../components/SearchForm";
import StateDisplay from "./components/stateDisplay";
import Skeleton from 'react-loading-skeleton'; // Import thư viện Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Thêm CSS cho skeleton

const Media = () => {
  // States
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get("query") || "";
  const [keyword, setKeyword] = useState<string>(initialSearchTerm);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);

  // Params
  const params = useParams<{ media_type: string }>();
  const mediaType =
    params.media_type === MediaType.TV ? MediaType.TV : MediaType.Movie;
  const pageTitle = mediaType === MediaType.Movie ? "Movies" : "TV Series";

  // Queries
  const {
    data: mediaData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useMediaQuery(mediaType, searchTerm);

  // Media Items
  const mediaItems = useMemo(
    () => mediaData?.pages.flatMap((page) => page.results) || [],
    [mediaData]
  );
  const noItems = mediaItems.length === 0;

  // Methods
  const handleLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (keyword.trim() && keyword.trim() !== searchTerm) {
        setSearchParams({ query: keyword });
        setSearchTerm(keyword);
      } else if (!keyword.trim()) {
        setSearchParams({});
        setSearchTerm("");
      }
    },
    [keyword, searchTerm, setSearchParams]
  );

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if (e.target.value.trim() === "") {
      setSearchParams({});
    }
  };

  // Effects
  useEffect(() => {
    if (initialSearchTerm && searchTerm !== initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
    }
  }, [initialSearchTerm, searchTerm]);

  // Render
  return (
    <main className="w-full flex flex-col items-center justify-start">
      <div className="relative w-full h-48 bg-gradient-to-b from-white to-black">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-white text-4xl font-bold z-10">
          {pageTitle}
        </span>
      </div>

      <div className="bg-black-main w-full px-4 md:px-8 py-8 xl:p-16">
        <div className="max-w-screen-2xl mx-auto">
          <SearchForm
            keyword={keyword}
            onKeywordChange={handleKeywordChange}
            onSubmit={handleSearch}
          />

          {/* Nếu đang tải phim hoặc không có phim nào */}
          {isFetching && noItems ? (
            <StateDisplay isLoading={true} pageTitle={pageTitle} />
          ) : noItems ? (
            <StateDisplay isLoading={false} pageTitle={pageTitle} />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-16">
                {mediaItems.map((item) => (
                  <FilmItem
                    key={item.id}
                    id={item.id}
                    original_title={item.original_title}
                    original_name={item.original_name}
                    name={item.name}
                    media_type={mediaType}
                    poster_path={item.poster_path}
                    className="w-full"
                  />
                ))}

                {/* Hiển thị skeleton loaders khi đang fetching thêm dữ liệu */}
                {isFetchingNextPage && (
                  Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="w-full h-full rounded-rounded">
                      <Skeleton height={220} width="100%" borderRadius={20}/>
                      <Skeleton width="80%" style={{ marginTop: '8px' }} />
                    </div>
                  ))
                )}
              </div>

              <div className="text-center mt-8">
                {isFetchingNextPage ? (
                  <div className="h-[20vh] flex justify-center items-center">
                    <span className="text-xl opacity-60">Loading more, please wait</span>
                  </div>
                ) : hasNextPage ? (
                  <button
                    onClick={handleLoadMore}
                    className="btn-sm btn-default"
                  >
                    Load More
                  </button>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default React.memo(Media);
