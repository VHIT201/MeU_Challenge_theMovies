import { MediaType } from '@/types/media';
import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFavoriteMedia } from '@/services/media';
import { useCallback, useState } from 'react';
import { ArrowDownUpIcon, Button, Popover, PopoverContent, SearchForm } from '@/components';
import FavoriteFilmList from './components/FavoriteFilmList';
import { cn } from '@/utils';
import useThemeStore from '@/store/themeStore';

const FavoriteListPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get('query') || '';
    const { isDarkMode } = useThemeStore();

    // States
    const [mediaType, setMediaType] = useState<MediaType>(MediaType.Movie);

    const {
        data: filmList,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['film', 'favorite', mediaType],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await getFavoriteMedia(mediaType, pageParam);

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

    const handleSearch = useCallback(
        (keyword: string) => {
            const trimmedKeyword = keyword.trim();
            setSearchParams(trimmedKeyword ? { query: trimmedKeyword } : {});
        },
        [setSearchParams],
    );

    const pageTitle = mediaType === MediaType.Movie ? 'Movies' : 'TVSeries';

    return (
        <main className="w-full bg-black-main">
            <div
                className={cn(
                    isDarkMode && 'dark',
                    'relative w-full h-48 bg-gradient-to-b from-[#cccccc] to-white-main dark:from-white-main dark:to-black-main',
                )}
            >
                <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-white text-4xl font-bold z-10">
                    Favorite
                </span>
            </div>
            <div
                className={cn(
                    isDarkMode && 'dark',
                    'bg-white-main dark:bg-black-main w-full px-4 md:px-8 py-8 xl:p-16',
                )}
            >
                <div className="flex justify-between items-center mb-8">
                    <SearchForm initialKeyword={searchTerm} onSubmit={handleSearch} />
                    <Popover>
                        <Button
                            className="rounded-2xl"
                            text="Movie"
                            type="primary"
                            size="lg"
                            icon={<ArrowDownUpIcon className="mr-4 font-bold" width="20px" height="20px" />}
                        />
                        <PopoverContent
                            position="bottom"
                            className="-bottom-[100px] w-full rounded-xl bg-white shadow-sm z-20"
                        >
                            <ul>
                                <li
                                    className="rounded-t-xl px-2 py-3 text-lg font-semibold hover:bg-slate-300 cursor-pointer"
                                    onClick={() => setMediaType(MediaType.Movie)}
                                >
                                    Movie
                                </li>
                                <li
                                    className="rounded-b-xl px-2 py-3 text-lg font-semibold hover:bg-slate-300 cursor-pointer"
                                    onClick={() => setMediaType(MediaType.TV)}
                                >
                                    TV
                                </li>
                            </ul>
                        </PopoverContent>
                    </Popover>
                </div>
                {filmList ? (
                    <FavoriteFilmList
                        filmList={filmList}
                        mediaType={mediaType}
                        isFetchingNextPage={isFetchingNextPage}
                        hasNextPage={hasNextPage}
                        fetchNextPage={fetchNextPage}
                    />
                ) : (
                    <h1 className={cn(isDarkMode && 'dark', 'py-4 text-4xl text-black dark:text-white font-bold')}>
                        No Favorite {pageTitle}
                    </h1>
                )}
            </div>
        </main>
    );
};

export default FavoriteListPage;
