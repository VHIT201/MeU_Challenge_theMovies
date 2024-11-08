export interface ThemeStore {
    isDarkMode: boolean;
    toggleTheme: () => void;
    setLightMode: () => void;
    setDarkMode: () => void;
}
