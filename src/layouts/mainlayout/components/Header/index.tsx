// Core
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// App
import { Images } from '@/assets/images';
import { cn } from '@/utils';
import useThemeStore from '@/store/themeStore';
import { useUserStore } from '@/store/userStore'; // Import Zustand store

import {
    HeartIcon,
    LogOutIcon,
    MoonIcon,
    NumericUpIcon,
    Popover,
    PopoverContent,
    SunIcon,
    Switch,
    UserIcon,
} from '@/components';

// Component
const NavigationLinks = () => (
    <div className="fixed md:relative left-0 md:left-auto right-0 md:right-auto bottom-0 md:bottom-auto flex items-center justify-evenly bg-black-main md:bg-transparent py-2 md:py-4 -mx-4">
        <div className="px-4">
            <NavLink className="nav-item text-black dark:text-white" to="/" end>
                Home
            </NavLink>
        </div>
        <div className="px-4">
            <NavLink className="nav-item text-black dark:text-white" to="/movie">
                Movies
            </NavLink>
        </div>
        <div className="px-4">
            <NavLink className="nav-item text-black dark:text-white" to="/tv">
                TV Series
            </NavLink>
        </div>
    </div>
);

// Component
const Header: React.FC = () => {
    // State
    const [isScrolled, setIsScrolled] = useState(false);
    const { isDarkMode } = useThemeStore();
    const { userInfo, clearUserInfo } = useUserStore(); // Lấy thông tin từ store Zustand

    // Effects
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 90);
        };

        const debouncedScroll = () => {
            requestAnimationFrame(handleScroll);
        };

        window.addEventListener('scroll', debouncedScroll);
        return () => {
            window.removeEventListener('scroll', debouncedScroll);
        };
    }, []);

    // Templates
    return (
        <div
            className={cn(
                isDarkMode && 'dark',
                'px-8 flex justify-center fixed top-0 w-full z-50 transition-all duration-200 ease-in-out text-black dark:text-white',
                isScrolled ? 'py-4 bg-white dark:bg-black-main' : 'py-0 md:py-8 bg-white/40 dark:bg-transparent',
            )}
        >
            <div className="max-w-screen-2xl flex justify-between items-center w-full">
                <a className="hidden md:flex items-center hover:cursor-pointer group" href="/">
                    <img src={Images.logo} alt="Logo" className="mr-4 w-8 md:w-12" />
                    <h1 className="text-black dark:text-white font-semibold text-2xl md:text-4xl group-hover:text-red-main group-hover:transition-custom">
                        theMovies
                    </h1>
                </a>

                <div className="flex flex-row items-center gap-10">
                    <NavigationLinks />

                    <div className="text-white font-medium">
                        {userInfo ? (
                            <Popover>
                                <div className="flex flex-row justify-center gap-4 items-center">
                                    <span className="text-black text-lg dark:text-white">{userInfo.username}</span>
                                    <img
                                        src={`https://images2.thanhnien.vn/528068263637045248/2024/4/3/jack-1712114239424422902059.jpg`}
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full object-cover cursor-pointer"
                                    />
                                </div>
                                <PopoverContent position="bottom">
                                    <div className="w-64 bg-white rounded-md shadow-lg">
                                        <NavLink
                                            to="/profile"
                                            className="flex items-center px-4 py-3 text-gray-800 rounded-t-md hover:bg-gray-100"
                                        >
                                            <div className="w-5 h-5 mr-3 text-gray-600">
                                                <UserIcon width="20px" height="20px" />
                                            </div>
                                            Profile
                                        </NavLink>
                                        <NavLink
                                            to="/ranking"
                                            className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100"
                                        >
                                            <div className="w-5 h-5 mr-3 text-gray-600">
                                                <NumericUpIcon width="20px" height="20px" />
                                            </div>
                                            Ranking
                                        </NavLink>
                                        <NavLink
                                            to="/favorite"
                                            className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100"
                                        >
                                            <div className="w-5 h-5 mr-3 text-gray-600">
                                                <HeartIcon width="20px" height="20px" />
                                            </div>
                                            Favorite
                                        </NavLink>
                                        <div className="flex items-center space-x-4 px-4 py-3 text-gray-800 hover:bg-gray-100">
                                            <div className="flex items-center text-gray-600 space-x-2">
                                                {isDarkMode ? (
                                                    <MoonIcon width="20px" height="20px" />
                                                ) : (
                                                    <SunIcon width="20px" height="20px" />
                                                )}
                                                <div>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <Switch />
                                            </div>
                                        </div>
                                        <button
                                            className="flex items-center w-full text-left px-4 py-3 mt-4 text-gray-800 border-[gray] border-t-[1px] rounded-b-md hover:bg-gray-100"
                                            onClick={() => {
                                                clearUserInfo();
                                            }}
                                        >
                                            <div className="w-5 h-5 mr-3 text-gray-600">
                                                <LogOutIcon width="20px" height="20px" />
                                            </div>
                                            Log Out
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <NavLink to="/login" className="nav-item">
                                <span className="text-lg">Đăng nhập</span>
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
