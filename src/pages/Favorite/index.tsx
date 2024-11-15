import { MediaType } from '@/types/media';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';
import { ArrowDownUpIcon, Button, FilmItem, Popover, PopoverContent, SearchForm } from '@/components';
import { getFilmDetail } from '@/services/media';
import { cn } from '@/utils';
import useThemeStore from '@/store/themeStore';
import { useFavoriteStore } from '@/store/favoriteStore';

const FavoriteListPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get('query') || '';
    const { isDarkMode } = useThemeStore();
    const favouriteList = useFavoriteStore.getState().favoriteList;
    // Retrieve lists directly from the store using Zustand's selector
    const movieFavoriteList = useFavoriteStore((state) => state.movieFavoriteList);
    const tvFavoriteList = useFavoriteStore((state) => state.tvFavoriteList);
    console.log('movieFavoriteList', movieFavoriteList);
    console.log('tvFavoriteList', tvFavoriteList);
    // States
    const [mediaType, setMediaType] = useState<MediaType>(MediaType.Movie);

    // Lấy danh sách yêu thích theo mediaType

    const handleSearch = useCallback(
        (keyword: string) => {
            const trimmedKeyword = keyword.trim();
            setSearchParams(trimmedKeyword ? { query: trimmedKeyword } : {});
        },
        [setSearchParams],
    );
    const fetchBatchDetails = useFavoriteStore((state) => state.fetchBatchDetails);

    useEffect(() => {
        fetchBatchDetails();
    }, [fetchBatchDetails]);

    const pageTitle = mediaType === MediaType.Movie ? 'Movies' : 'TV Series';

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
                            text={mediaType === MediaType.Movie ? 'Movie' : 'TV'}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-16">
                    {favouriteList.length > 0 ? (
                        (mediaType == MediaType.Movie ? movieFavoriteList : tvFavoriteList).map((item) => (
                            <FilmItem
                                key={item.id}
                                id={item.id}
                                name={item.title || item.original_title || item.name || item.original_name || ''}
                                title={item.title || item.original_title || ''}
                                media_type={mediaType}
                                poster_path={item.poster_path || ''}
                                className="w-full"
                            />
                        ))
                    ) : (
                        <h1 className={cn(isDarkMode && 'dark', 'py-4 text-4xl text-black dark:text-white font-bold')}>
                            No Favorite {pageTitle}
                        </h1>
                    )}
                </div>
            </div>
        </main>
    );
};

export default FavoriteListPage;
