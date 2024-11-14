import { FavoriteFilm, MediaType } from '@/types/media/media';
import { InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';

export interface FavoriteListProps {
    filmList: InfiniteData<FavoriteFilm[]>;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => Promise<InfiniteQueryObserverResult<InfiniteData<FavoriteFilm[], unknown>, Error>>;
    mediaType: MediaType;
}
