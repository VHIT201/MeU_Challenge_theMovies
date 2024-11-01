// Core
import React, { useMemo, useCallback } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import 'react-loading-skeleton/dist/skeleton.css';

// App
import { fetchMedia } from '@/services/media/mediaService';
import { MediaType } from '@/services/media/lib/type';
import Spinner from '@/components/Spinner/Spinner';

// Internal
import { FilmList } from './components/FilmList';
import { SearchForm } from '@/components/SearchForm';

const MediaPage = () => {
    // Lấy từ khóa tìm kiếm từ URL query string
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get('query') || '';

    // Lấy loại media từ URL params
    const params = useParams<{ media_type: string }>();
    const mediaType = params.media_type === MediaType.TV ? MediaType.TV : MediaType.Movie;
    const pageTitle = useMemo(() => (mediaType === MediaType.Movie ? 'Movies' : 'TV Series'), [mediaType]);

    // Fetch dữ liệu media
    const {
        data: filmData,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['film', mediaType, searchTerm],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await fetchMedia({ mediaType, searchTerm, pageParam });

            return response ?? [];
        },
        getNextPageParam: (lastPage, pages) => {
            if (lastPage && lastPage.length < 20) {
                return undefined;
            }
            return pages.length + 1;
        },
        initialPageParam: 1,
    });

    // Hàm xử lý tìm kiếm
    const handleSearch = useCallback(
        (keyword: string) => {
            const trimmedKeyword = keyword.trim();
            setSearchParams(trimmedKeyword ? { query: trimmedKeyword } : {});
        },
        [setSearchParams],
    );

    const filmList = filmData?.pages[0].length ? filmData : undefined;

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
                    {isLoading && (
                        <div className="flex flex-row items-center justify-center text-center text-white h-[50vh] gap-10">
                            <Spinner />
                            <p className="text-xl md:text-2xl text-opacity-50">Loading {pageTitle}, please wait...</p>
                        </div>
                    )}
                    {filmList ? (
                        <FilmList
                            filmList={filmList}
                            isFetchingNextPage={isFetchingNextPage}
                            fetchNextPage={fetchNextPage}
                            hasNextPage={hasNextPage}
                            mediaType={mediaType}
                        />
                    ) : (
                        <div className="flex flex-row items-center justify-center text-center text-white h-[50vh] gap-10">
                            <p className="text-xl md:text-2xl text-white text-opacity-50">
                                No {pageTitle} found matching your criteria.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default MediaPage;
