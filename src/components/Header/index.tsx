import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { Images } from "../../assets/images";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Sự kiện theo dõi khi người dùng cuộn
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    if (scrollY > 90 && !isScrolled) {
      setIsScrolled(true);
    } else if (scrollY <= 90 && isScrolled) {
      setIsScrolled(false);
    }
  }, [isScrolled]);

  useEffect(() => {
    const onScroll = () => {
      // Sử dụng requestAnimationFrame để tối ưu hóa hiệu suất
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [handleScroll]);

  return (
    <div
      className={`px-8 flex justify-center fixed top-0 w-full z-50 transition-all duration-200 ease-in-out ${
        isScrolled ? "py-4 bg-black-main" : "py-0 md:py-8 bg-transparent"
      }`}
    >
      <div className="max-w-screen-2xl flex justify-between items-center w-full">
        <a
          className="hidden md:flex items-center hover:cursor-pointer group"
          href="/"
        >
          <img src={Images.logo} alt="Logo" className="mr-4 w-8 md:w-12" />
          <h1 className="text-white font-semibold text-2xl md:text-4xl group-hover:text-red-main group-hover:transition-custom">
            theMovies
          </h1>
        </a>
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
            <NavLink className="nav-item" to="/tvseries">
              TV Series
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
