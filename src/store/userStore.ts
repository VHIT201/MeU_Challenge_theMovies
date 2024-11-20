import { User } from '@/types/user/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useFavoriteStore } from './favoriteStore';
interface UserStoreState {
    userInfo: User | null;
    setUserInfo: (user: User) => void;
    clearUserInfo: () => void;
}

export const useUserStore = create<UserStoreState>()(
    persist(
        (set) => ({
            userInfo: null,
            setUserInfo: (user) => set({ userInfo: user }),
            clearUserInfo: () => {
                set({ userInfo: null });
                localStorage.removeItem('userToken');
                useFavoriteStore.getState().clearFavorites();
                localStorage.removeItem('user-info-storage');
            },
        }),
        {
            name: 'user-info-storage',
            partialize: (state) => ({ userInfo: state.userInfo }),
        },
    ),
);
