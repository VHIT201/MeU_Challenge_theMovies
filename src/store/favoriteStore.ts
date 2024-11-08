import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Định nghĩa store sử dụng Zustand
type FavoriteStore = {
    favoriteList: { id: string; media_type: string; mediaId: string }[];
    addFavorite: (item: { id: string; media_type: string; mediaId: string }) => void;
    removeFavorite: (mediaId: string) => void;
    isFavorite: (mediaId: string) => boolean;
};

// Tạo store với Zustand, sử dụng middleware "persist" để lưu vào local storage
export const useFavoriteStore = create<FavoriteStore>()(
    persist(
        (set, get) => ({
            favoriteList: [],

            // Hàm thêm vào danh sách yêu thích, loại bỏ phần tử trùng nhau
            addFavorite: (item) =>
                set((state) => {
                    // Lọc ra các phần tử trùng lặp dựa trên mediaId
                    const updatedList = state.favoriteList.filter((fav) => fav.mediaId !== item.mediaId);
                    // Thêm phần tử mới vào danh sách đã lọc
                    return { favoriteList: [...updatedList, item] };
                }),

            // Hàm xóa khỏi danh sách yêu thích
            removeFavorite: (mediaId) =>
                set((state) => ({
                    favoriteList: state.favoriteList.filter((fav) => fav.mediaId !== mediaId),
                })),

            // Hàm kiểm tra trạng thái yêu thích
            isFavorite: (mediaId) => get().favoriteList.some((fav) => fav.id === mediaId),
        }),
        {
            name: 'favorite-storage',
        },
    ),
);
