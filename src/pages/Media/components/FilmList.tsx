import FilmItem, { FilmItemProps } from '@/components/FilmItem';
import { MediaType } from '@/services/media/lib/type';
import { FilmResponseType } from '@/types';
import { InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';

interface FilmListProps {
    filmList: InfiniteData<Array<FilmResponseType>>;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => Promise<InfiniteQueryObserverResult<InfiniteData<FilmResponseType[], unknown>, Error>>;
    mediaType: MediaType;
}

const FilmList: React.FC<FilmListProps> = ({ filmList, isFetchingNextPage, hasNextPage, fetchNextPage, mediaType }) => {
    const filmItemList: Array<FilmItemProps> = useMemo(() => {
        return filmList.pages
            .flatMap((page) => page)
            .map((film) => ({
                id: film.id,
                original_title: film.original_title ?? '',
                name: film.name ?? '',
                original_name: film.original_name ?? '',
                poster_path: film.poster_path ?? '',
                media_type: mediaType
            }));
    }, [filmList]);

    return (
        <>
            {/* Danh sách media items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-16">
                {filmItemList.map((item) => (
                    <FilmItem
                        key={item.id}
                        id={item.id}
                        original_title={item.original_title}
                        original_name={item.original_name}
                        name={item.name}
                        media_type={item.media_type}
                        poster_path={item.poster_path}
                        className="w-full"
                    />
                ))}

                {/* Hiển thị skeleton khi đang tải thêm dữ liệu */}
                {isFetchingNextPage &&
                    Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="w-full h-full rounded-rounded">
                            <Skeleton className="animate-pulse" height={220} width="100%" borderRadius={20} />
                            <Skeleton className="animate-pulse" width="80%" style={{ marginTop: '8px' }} />
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
                    <button onClick={fetchNextPage} className="btn-sm btn-default" disabled={isFetchingNextPage}>
                        Load More
                    </button>
                ) : (
                    <span className="text-lg opacity-60">No more items to load</span>
                )}
            </div>
        </>
    );
};

export { FilmList };
