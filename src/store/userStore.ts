import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

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
            clearUserInfo: () => set({ userInfo: null }),
        }),
        {
            name: 'user-info-storage',
            partialize: (state) => ({ userInfo: state.userInfo }),
        },
    ),
);
