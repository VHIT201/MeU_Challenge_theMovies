// Core: Main libraries
import React, { useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Config from "../../configuration";
import { Images } from "../../assets/images";

// Types: Props types declaration
import { FilmItemProps } from "./lib/types";

// Component: FilmItem
const FilmItem: React.FC<FilmItemProps> = ({
  id,
  original_title,
  name,
  original_name,
  poster_path,
  media_type,
  className,
}) => {
  // States: Navigation hook for programmatic navigation
  const navigate = useNavigate();

  // Method: handleNavigate
  const handleNavigate = useCallback(() => {
    navigate(`/${media_type}/${id}`);
  }, [navigate, media_type, id]);

  // Core: Background image handling
  const backgroundImage = poster_path
    ? `${Config.imgPath}${poster_path}`
    : Images.default_image;

  // Core: Title handling
  const title = original_title || original_name || name;

  return (
    <div className={clsx("px-2 w-full mb-8", className)}>
      {/* Component: Wrapper for film item */}
      <div className="hover:cursor-pointer group z-10" onClick={handleNavigate}>
        {/* Background image and hover effects */}
        <div
          className="relative w-full h-72 2xl:h-80 rounded-3xl bg-center bg-no-repeat bg-cover transition duration-300 group-hover:after:bg-black/60"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {/* Play button overlay */}
          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-4 px-8 bg-red-main rounded-full shadow-btn text-white text-xl scale-50 opacity-0 transition duration-300 group-hover:opacity-100 group-hover:scale-100">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
            </svg>
          </button>
        </div>
        {/* Film title display */}
        <h3 className="font-medium text-left text-white text-sm md:text-lg mt-4 transition duration-300 ease-in-out group-hover:text-red-main">
          {title}
        </h3>
      </div>
    </div>
  );
};

// Optimize component rendering
export default memo(FilmItem);
