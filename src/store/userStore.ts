import { create } from 'zustand';
import { User } from '@/types/user/user';

interface UserStoreState {
    userInfo: User | null;
    setUserInfo: (user: User) => void;
    clearUserInfo: () => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
    userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null'),
    setUserInfo: (user) => {
        localStorage.setItem('userInfo', JSON.stringify(user));
        set({ userInfo: user });
    },
    clearUserInfo: () => {
        localStorage.removeItem('userInfo');
        set({ userInfo: null });
    },
}));
