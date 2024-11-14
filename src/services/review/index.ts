import apiClient from '@/lib/http';
import { Comment, CommentAnalytic, CommentParam, RawComment } from '@/types/media/review';

export const getCommentList = async ({ id, page, mediaType }: CommentParam): Promise<Array<Comment>> => {
    const response = await apiClient.get(`/${mediaType}/${id}/reviews?page=${page}`);
    const rawCommentList: Array<RawComment> = response.data?.results;

    if (!rawCommentList) throw new Error('Not found data');

    const commentList: Array<Comment> = rawCommentList.map((raw) => ({
        id: raw.id,
        author: raw.author,
        authorDetail: {
            name: raw.author_details.name,
            avatarPath: raw.author_details.avatar_path,
            rating: raw.author_details.rating ?? 0,
        },
        content: raw.content,
        createdAt: raw.created_at,
        url: raw.url,
    }));

    return commentList;
};

export const analyticCommentList = async ({ id, page, mediaType }: CommentParam): Promise<Array<CommentAnalytic>> => {
    const response = await apiClient.get(`/${mediaType}/${id}/reviews?page=${page}`);
    const rawCommentList: Array<RawComment> = response.data?.results;
    const totalPage = response.data?.total_pages;

    if (!rawCommentList) throw new Error('Not found data');

    const commentList: Array<CommentAnalytic> = rawCommentList.map((raw) => ({
        rating: raw.author_details.rating ?? 0,
    }));

    let nextResponse: Array<CommentAnalytic> = [];
    if (totalPage && page < totalPage) {
        nextResponse = await analyticCommentList({ id, page: page + 1, mediaType });
    }

    return [...commentList, ...nextResponse];
};
