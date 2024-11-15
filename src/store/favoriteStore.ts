import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient from '@/network/axios';
import { FilmDetails } from '@/types/media';

type FavoriteItem = {
    id: string;
    media_type: string;
    mediaId: string;
    details?: any;
};

type FavoriteStore = {
    favoriteList: FavoriteItem[];
    dataFavoriteList: FilmDetails[];
    movieFavoriteList: FilmDetails[];
    tvFavoriteList: FilmDetails[];
    addFavorite: (item: FavoriteItem) => void;
    removeFavorite: (mediaId: string) => void;
    isFavorite: (mediaId: string) => boolean;
    fetchBatchDetails: () => Promise<void>;
};

export const useFavoriteStore = create<FavoriteStore>()(
    persist(
        (set, get) => ({
            favoriteList: [],
            dataFavoriteList: [],
            movieFavoriteList: [],
            tvFavoriteList: [],

            addFavorite: (item) =>
                set((state) => {
                    const newFavoriteList = [
                        ...state.favoriteList.filter((fav) => fav.id !== item.id || fav.media_type !== item.media_type),
                        item,
                    ];

                    // Loại bỏ trùng lặp
                    const uniqueFavoriteList = Array.from(
                        new Map(newFavoriteList.map((fav) => [`${fav.id}-${fav.media_type}`, fav])).values(),
                    );

                    return {
                        favoriteList: uniqueFavoriteList,
                    };
                }),

            removeFavorite: (mediaId) =>
                set((state) => ({
                    favoriteList: state.favoriteList.filter((fav) => fav.mediaId !== mediaId),
                })),

            isFavorite: (mediaId) => get().favoriteList.some((fav) => fav.mediaId === mediaId),

            fetchBatchDetails: async () => {
                const { favoriteList } = get();
                set({
                    movieFavoriteList: [],
                    tvFavoriteList: [],
                });

                // Tách favoriteList thành hai mảng cho movie và tv
                const movieFavoriteList = favoriteList.filter((item) => item.media_type === 'movie');
                const tvFavoriteList = favoriteList.filter((item) => item.media_type === 'tv');

                // Lấy chi tiết cho movie sử dụng `id`
                const movieDetails = await Promise.all(
                    movieFavoriteList.map(async (item) => {
                        const response = await apiClient.get<FilmDetails>(`/movie/${item.id}`, {
                            params: { language: 'en-US' },
                        });
                        return {
                            ...response.data,
                            media_type: 'movie', // thêm trường media_type cho nhận dạng
                            mediaId: item.mediaId, // thêm mediaId từ favoriteList
                        };
                    }),
                );

                // Lấy chi tiết cho tv sử dụng `id`
                const tvDetails = await Promise.all(
                    tvFavoriteList.map(async (item) => {
                        const response = await apiClient.get<FilmDetails>(`/tv/${item.id}`, {
                            params: { language: 'en-US' },
                        });
                        return {
                            ...response.data,
                            media_type: 'tv', // thêm trường media_type cho nhận dạng
                            mediaId: item.mediaId, // thêm mediaId từ favoriteList
                        };
                    }),
                );

                // Loại bỏ trùng lặp cho movie và tv
                const uniqueMovieDetails = Array.from(new Map(movieDetails.map((item) => [item.id, item])).values());

                const uniqueTvDetails = Array.from(new Map(tvDetails.map((item) => [item.id, item])).values());

                // Gộp chi tiết của movie và tv vào dataFavoriteList
                const allDetails = [...uniqueMovieDetails, ...uniqueTvDetails];

                // Cập nhật store với các danh sách mới, đã loại bỏ trùng lặp
                set({
                    dataFavoriteList: allDetails,
                    movieFavoriteList: uniqueMovieDetails,
                    tvFavoriteList: uniqueTvDetails,
                });
            },
        }),
        {
            name: 'favorite-storage',
        },
    ),
);
