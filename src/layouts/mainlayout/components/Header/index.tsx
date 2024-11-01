import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '@/services/user/userService';
import { User } from '@/types';
import { Images } from '../../../../assets/images';
import { Drawer } from '@/components';

const NavigationLinks = () => (
    <div className="fixed md:relative left-0 md:left-auto right-0 md:right-auto bottom-0 md:bottom-auto flex items-center justify-evenly bg-black md:bg-transparent py-2 md:py-4 -mx-4">
        <div className="px-4">
            <NavLink className="nav-item" to="/home" end>
                Home
            </NavLink>
        </div>
        <div className="px-4">
            <NavLink className="nav-item" to="/movie">
                Movies
            </NavLink>
        </div>
        <div className="px-4">
            <NavLink className="nav-item" to="/tv">
                TV Series
            </NavLink>
        </div>
    </div>
);

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { data: userInfo } = useQuery<User>({
        queryKey: ['userInfo'],
        queryFn: fetchUserInfo,
        retry: false,
    });

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

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <div
            className={`px-8 flex justify-center fixed top-0 w-full z-50 transition-all duration-200 ease-in-out ${
                isScrolled ? 'py-4 bg-black-main' : 'py-0 md:py-8 bg-transparent'
            }`}
        >
            <div className="max-w-screen-2xl  flex justify-between items-center w-full">
                <a className="hidden md:flex items-center hover:cursor-pointer group" href="/">
                    <img src={Images.logo} alt="Logo" className="mr-4 w-8 md:w-12" />
                    <h1 className="text-white font-semibold text-2xl md:text-4xl group-hover:text-red-main group-hover:transition-custom">
                        theMovies
                    </h1>
                </a>

                <div className="flex flex-row items-center gap-10">
                    <NavigationLinks />

                    <div className="text-white font-medium relative">
                        {userInfo ? (
                            <div className="flex flex-row justify-center gap-4 items-center">
                                <span>{userInfo.username}</span>
                                <img
                                    src={`https://image.tmdb.org/t/p/w32_and_h32_face${userInfo.avatar.tmdb.avatar_path}`}
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full cursor-pointer"
                                    onClick={toggleDropdown}
                                />
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-64 w-64 bg-white rounded-md shadow-lg py-2 z-50">
                                        <NavLink
                                            to="/settings"
                                            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        >
                                            {/* Placeholder for Icon */}
                                            <div className="w-5 h-5 mr-3 text-gray-600">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                    />
                                                </svg>
                                            </div>
                                            Settings & Privacy
                                        </NavLink>
                                        <NavLink
                                            to="/help"
                                            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        >
                                            {/* Placeholder for Icon */}
                                            <div className="w-5 h-5 mr-3 text-gray-600">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                                                    />
                                                </svg>
                                            </div>
                                            Help & Support
                                        </NavLink>
                                        <NavLink
                                            to="/display"
                                            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        >
                                            {/* Placeholder for Icon */}
                                            <div className="w-5 h-5 mr-3 text-gray-600">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                                                    />
                                                </svg>
                                            </div>
                                            Display & Accessibility
                                        </NavLink>
                                        <NavLink
                                            to="/favorite"
                                            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        >
                                            {/* Placeholder for Icon */}
                                            <div className="w-5 h-5 mr-3 text-gray-600">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                                    />
                                                </svg>
                                            </div>
                                            Favorite
                                        </NavLink>
                                        <button
                                            className="flex items-center w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            onClick={() => alert('Logged Out')}
                                        >
                                            {/* Placeholder for Icon */}
                                            <div className="w-5 h-5 mr-3 text-gray-600">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                                                    />
                                                </svg>
                                            </div>
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink to="/authenticate" className="nav-item">
                                Đăng nhập
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
