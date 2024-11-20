import React, { useMemo } from 'react';
import { CommentListProps } from './lib/types';
import { Comment } from '@/types/media/review';
import { CommentItem } from './components';

const CommentList: React.FC<CommentListProps> = ({ commentList, isFetchingNextPage, hasNextPage, fetchNextPage }) => {
    const commentItemList: Array<Comment> = useMemo(() => {
        return commentList.pages.flatMap((page) => page);
    }, [commentList]);

    console.log(commentList);
    return (
        <div className="container">
            <h1 className="my-8 text-4xl dark:text-white font-semibold">Comments : </h1>
            <div className="flex flex-col px-8 md:px-32 space-y-8">
                {commentItemList.map((commentItem) => (
                    <CommentItem
                        key={commentItem.id}
                        id={commentItem.id}
                        url={commentItem.url}
                        author={commentItem.author}
                        authorDetail={commentItem.authorDetail}
                        content={commentItem.content}
                        createdAt={commentItem.createdAt}
                    />
                ))}
            </div>
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
        </div>
    );
};

export default CommentList;
