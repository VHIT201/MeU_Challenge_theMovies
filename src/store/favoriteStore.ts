import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Định nghĩa store sử dụng Zustand
type FavoriteStore = {
    favoriteList: { id: string; media_type: string }[];
    addFavorite: (item: { id: string; media_type: string }) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
};

// Tạo store với Zustand, sử dụng middleware "persist" để lưu vào local storage
export const useFavoriteStore = create<FavoriteStore>()(
    persist(
        (set, get) => ({
            favoriteList: [],
            
            // Hàm thêm vào danh sách yêu thích, loại bỏ phần tử trùng nhau
            addFavorite: (item) => set((state) => {
                // Lọc ra các phần tử trùng lặp
                const updatedList = state.favoriteList.filter(fav => !(fav.id === item.id && fav.media_type === item.media_type));
                // Thêm phần tử mới vào danh sách đã lọc
                return { favoriteList: [...updatedList, item] };
            }),
            
            // Hàm xóa khỏi danh sách yêu thích
            removeFavorite: (id) => set((state) => ({
                favoriteList: state.favoriteList.filter((fav) => fav.id !== id)
            })),
            
            // Hàm kiểm tra trạng thái yêu thích
            isFavorite: (id) => get().favoriteList.some((fav) => fav.id === id)
        }),
        {
            name: "favorite-storage", 
        }
    )
);
