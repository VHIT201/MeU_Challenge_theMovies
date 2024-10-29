// Core: Main libraries
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

//Images
import { Images } from '../../../../assets/images';

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
        <div
            className={`px-8 flex justify-center fixed top-0 w-full z-50 transition-all duration-200 ease-in-out ${
                isScrolled ? 'py-4 bg-black-main' : 'py-0 md:py-8 bg-transparent'
            }`}
        >
            <div className="max-w-screen-2xl flex justify-between items-center w-full">
                <a className="hidden md:flex items-center hover:cursor-pointer group" href="/">
                    <img src={Images.logo} alt="Logo" className="mr-4 w-8 md:w-12" />
                    <h1 className="text-white font-semibold text-2xl md:text-4xl group-hover:text-red-main group-hover:transition-custom">
                        theMovies
                    </h1>
                </a>
                {/* Component: Navigation links */}
                <NavigationLinks />
            </div>
        </div>
    );
};

export default Header;
