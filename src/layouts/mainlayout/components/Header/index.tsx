// Core:
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '@/services/user/userService';
import { User } from '@/types';

// App
import { Images } from '../../../../assets/images';
import { Drawer } from '@/components';

// Component: Navigation Links
const NavigationLinks = () => (
    <div className="fixed md:relative left-0 md:left-auto right-0 md:right-auto bottom-0 md:bottom-auto flex items-center justify-evenly bg-black md:bg-transparent py-2 md:py-4 -mx-4">
        <div className="px-4">
            <NavLink className="nav-item" to="/" end>
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

// Component: Header
const Header: React.FC = () => {
    // States: Scroll state
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    // Fetch user information using useQuery
    const { data: userInfo } = useQuery<User>({
        queryKey: ['userInfo'],
        queryFn: fetchUserInfo,
        retry: false, // Disable retry if not logged in
    });

    // Method: handleScroll with logic moved inside
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 90);
        };

        // Debounce scroll event for better performance
        const debouncedScroll = () => {
            requestAnimationFrame(handleScroll);
        };

        window.addEventListener('scroll', debouncedScroll);
        return () => {
            window.removeEventListener('scroll', debouncedScroll);
        };
    }, []);

    return (
        <>
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
                        {/* Component: Navigation links */}
                        <NavigationLinks />
                        {/* User Information or Login Button */}
                        <div className="text-white font-medium" onClick={toggleDrawer}>
                            {userInfo ? (
                                <div className="flex flex-row justify-center gap-4 items-center">
                                    <span>{userInfo.username}</span>
                                    {userInfo.avatar.tmdb.avatar_path && (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w32_and_h32_face${userInfo.avatar.tmdb.avatar_path}`}
                                            alt="User Avatar"
                                            className="w-8 h-8 rounded-full"
                                        />
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
            <Drawer
                className="text-white bg-gradient-to-b from-black via-[#1a1a1a] to-[#262626]"
                isOpen={isDrawerOpen}
                onClose={toggleDrawer}
                title="User Information"
            >
                <ul className="text-xl text-white font-semibold divide-y-[1px]" onClick={toggleDrawer}>
                    <li className="py-4 transition-all hover:bg-white hover:text-black cursor-pointer">Profile</li>
                    <li className="py-4 transition-all hover:bg-white hover:text-black cursor-pointer">
                        <Link to={'movie/favorite'}>Favorite Movies</Link>
                    </li>
                    <li className="py-4 transition-all hover:bg-white hover:text-black cursor-pointer">
                        <Link to={'tv/favorite'}>Favorite TVSeries</Link>
                    </li>
                    <li className="py-4 transition-all hover:bg-white hover:text-black cursor-pointer">Log Out</li>
                </ul>
            </Drawer>
        </>
    );
};

export default Header;
