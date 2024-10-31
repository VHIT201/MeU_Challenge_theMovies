import React, { useCallback, memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/network/axios';
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

    // State to manage favorite status and image source
    const [isFavorite, setIsFavorite] = useState(false);
    const [imageSrc, setImageSrc] = useState(poster_path ? `${Config.imgPath}${poster_path}` : Images.default_image);

    const title = original_title || original_name || name;

    // Toggle favorite status
    const toggleFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await apiClient.post('/account/21535262/favorite', {
                media_type: media_type,
                media_id: id,
                favorite: !isFavorite,
            });
            setIsFavorite(!isFavorite);
        } catch {
            throw new Error('Not Active');
        }
    };

    const handleNavigate = useCallback(() => {
        navigate(`/${media_type}/${id}`);
    }, [navigate, media_type, id]);

    const handleImageError = () => {
        setImageSrc(Images.noImage);
    };

    return (
        <div className={cn('px-2 w-full mb-8', className)}>
            <div className="hover:cursor-pointer group z-10 relative" onClick={handleNavigate}>
                <div
                    className="relative w-full h-72 2xl:h-80 rounded-3xl bg-center bg-no-repeat bg-cover transition duration-300 group-hover:after:bg-black/60 animate-parallax"
                    style={{ backgroundImage: `url(${imageSrc})` }}
                >
                    <img
                        src={imageSrc}
                        alt={title}
                        onError={handleImageError}
                        className="absolute w-full h-full object-cover rounded-3xl"
                    />

                    {/* Heart icon for favorite functionality */}
                    <button
                        className="absolute top-3 right-3 p-1 rounded-full transition hover:bg-red-500"
                        onClick={toggleFavorite}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={isFavorite ? 'red' : 'currentColor'}
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="text-white"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </button>
                </div>

                <h3 className="font-medium text-left text-white text-sm md:text-lg mt-4 transition duration-300 ease-in-out group-hover:text-red-main">
                    {title}
                </h3>
            </div>
        </div>
    );
};

export default memo(FilmItem);
