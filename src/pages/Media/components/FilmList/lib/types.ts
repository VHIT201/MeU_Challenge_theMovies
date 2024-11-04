import { FilmResponseType, MediaType } from '@/types/media';
import { InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';

export interface FilmListProps {
    filmList: InfiniteData<Array<FilmResponseType>>;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => Promise<InfiniteQueryObserverResult<InfiniteData<FilmResponseType[], unknown>, Error>>;
    mediaType: MediaType;
}
