import { Comment } from '@/types/media/review';
import { InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';

export interface CommentListProps {
    commentList: InfiniteData<Array<Comment>>;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => Promise<InfiniteQueryObserverResult<InfiniteData<Array<Comment>, unknown>, Error>>;
}
