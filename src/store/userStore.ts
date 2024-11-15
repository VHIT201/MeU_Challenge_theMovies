import { create } from 'zustand';
<<<<<<< HEAD
import { User } from '@/types/user/user';
=======
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';
>>>>>>> 36fd01c7d155d4491deb1d7fd2ec4727e6c805c6

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
