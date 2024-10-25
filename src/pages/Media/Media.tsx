import React, { useMemo, useCallback } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMedia } from "../../services/media/mediaService";
import { MediaType } from "../../services/media/lib/type";
import FilmItem from "../../components/FilmItem";
import SearchForm from "../../components/SearchForm";
import Spinner from "../../components/Spinner/Spinner";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Media = () => {
  // Lấy từ khóa tìm kiếm từ URL query string
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  // Lấy loại media từ URL params
  const params = useParams<{ media_type: string }>();
  const mediaType = params.media_type === MediaType.TV ? MediaType.TV : MediaType.Movie;
  const pageTitle = useMemo(() => mediaType === MediaType.Movie ? "Movies" : "TV Series", [mediaType]);

  // Fetch dữ liệu media
  const {
    data: mediaData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["media", mediaType, searchTerm],
    queryFn: ({ pageParam = 1 }) =>
      fetchMedia({ mediaType, searchTerm, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  // Xử lý dữ liệu media
  const mediaItems = useMemo(
    () => mediaData?.pages.flatMap((page) => page.results) || [],
    [mediaData]
  );

  // Memoize noItems để tránh tính toán lại không cần thiết
  const noItems = useMemo(() => mediaItems.length === 0, [mediaItems]);

  // Hàm tải thêm dữ liệu
  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Hàm xử lý tìm kiếm
  const handleSearch = useCallback(
    (keyword: string) => {
      const trimmedKeyword = keyword.trim();
      setSearchParams(trimmedKeyword ? { query: trimmedKeyword } : {});
    },
    [setSearchParams]
  );

  // Điều kiện hiển thị trạng thái
  const isLoadingInitial = useMemo(() => isFetching && noItems, [isFetching, noItems]);
  const isNoResults = useMemo(() => !isFetching && noItems, [isFetching, noItems]);

  // Render component
  return (
    <main className="w-full flex flex-col items-center justify-start">
      <div className="relative w-full h-48 bg-gradient-to-b from-white to-black">
        <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-white text-4xl font-bold z-10">
          {pageTitle}
        </span>
      </div>

      <div className="bg-black-main w-full px-4 md:px-8 py-8 xl:p-16">
        <div className="max-w-screen-2xl mx-auto">
          <SearchForm initialKeyword={searchTerm} onSubmit={handleSearch} />

          {/* Hiển thị trạng thái ban đầu */}
          {isLoadingInitial ? (
            <div className="flex flex-row items-center justify-center text-center text-white h-[50vh] gap-10">
              <Spinner />
              <p className="text-xl md:text-2xl text-opacity-50">
                Loading {pageTitle}, please wait...
              </p>
            </div>
          ) : isNoResults ? (
            <div className="flex flex-row items-center justify-center text-center text-white h-[50vh] gap-10">
              <p className="text-xl md:text-2xl text-white text-opacity-50">
                No {pageTitle} found matching your criteria.
              </p>
            </div>
          ) : (
            <>
              {/* Danh sách media items */}
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

                {/* Hiển thị skeleton khi đang tải thêm dữ liệu */}
                {isFetchingNextPage &&
                  Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="w-full h-full rounded-rounded">
                      <Skeleton height={220} width="100%" borderRadius={20} />
                      <Skeleton width="80%" style={{ marginTop: '8px' }} />
                    </div>
                  ))}
              </div>

              {/* Nút tải thêm dữ liệu */}
              <div className="text-center mt-8">
                {isFetchingNextPage ? (
                  <div className="h-[20vh] flex justify-center items-center">
                    <span className="text-xl opacity-60">Loading more, please wait</span>
                  </div>
                ) : hasNextPage ? (
                  <button
                    onClick={handleLoadMore}
                    className="btn-sm btn-default"
                    disabled={isFetchingNextPage}
                  >
                    Load More
                  </button>
                ) : (
                  <span className="text-lg opacity-60">No more items to load</span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default React.memo(Media);
