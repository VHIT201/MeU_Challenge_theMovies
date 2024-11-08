import { create } from 'zustand';
import { ThemeStore } from './lib/types';

const useThemeStore = create<ThemeStore>((set) => ({
    isDarkMode: false,
    toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    setLightMode: () => set(() => ({ isDarkMode: false })),
    setDarkMode: () => set(() => ({ isDarkMode: true })),
}));

export default useThemeStore;
