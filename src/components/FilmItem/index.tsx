import React, { useCallback, memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Config from '../../configuration';
import { Images } from '../../assets/images';
import { ComponentProps } from '@/types';
import { cn } from '@/utils';

export interface FilmItemProps extends ComponentProps {
    id: number;
    original_title: string;
    name: string;
    original_name: string;
    poster_path: string;
    media_type: string;
}

const FilmItem: React.FC<FilmItemProps> = ({
    id,
    original_title,
    name,
    original_name,
    poster_path,
    media_type,
    className,
}) => {
    const navigate = useNavigate();

    // State: Handle image loading error
    const [imageSrc, setImageSrc] = useState(poster_path ? `${Config.imgPath}${poster_path}` : Images.default_image);

    // const [imageSrc, setImageSrc] = useState(
    //   `${Config.imgPath}/invalid_path.jpg` // Đường dẫn ảnh không hợp lệ
    // );

    // Handle navigation
    const handleNavigate = useCallback(() => {
        navigate(`/${media_type}/${id}`);
    }, [navigate, media_type, id]);

    // Handle image error
    const handleImageError = () => {
        setImageSrc(Images.noImage); // Fallback to noImage if there's an error
    };

    // Title handling
    const title = original_title || original_name || name;

    return (
        <div className={cn('px-2 w-full mb-8', className)}>
            <div className="hover:cursor-pointer group z-10" onClick={handleNavigate}>
                {/* Background image and hover effects */}
                <div
                    className="relative w-full h-72 2xl:h-80 rounded-3xl bg-center bg-no-repeat bg-cover transition duration-300 group-hover:after:bg-black/60 animate-parallax"
                    style={{ backgroundImage: `url(${imageSrc})` }}
                >
                    {/* Display image directly */}
                    <img
                        src={imageSrc}
                        alt={title}
                        onError={handleImageError}
                        className="absolute w-full h-full object-cover rounded-3xl"
                    />

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

export default memo(FilmItem);
