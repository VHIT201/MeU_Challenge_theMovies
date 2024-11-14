import { MediaType } from './media';

export interface CommentParam {
    id: number;
    page: number;
    mediaType: MediaType;
}

export interface AuthorDetail {
    name: string;
    avatarPath: string;
    rating: number;
}

export interface RawComment {
    id: string;
    author: string;
    author_details: {
        name: string;
        avatar_path: string;
        rating: number | null;
    };
    content: string;
    created_at: string;
    url: string;
}

export interface Comment {
    id: string;
    author: string;
    authorDetail: AuthorDetail;
    content: string;
    createdAt: string;
    url: string;
}

export interface CommentAnalytic {
    rating: number;
}
