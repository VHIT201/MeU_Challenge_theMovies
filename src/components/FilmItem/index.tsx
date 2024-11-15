import React, { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// App
import { Images } from '@/assets/images';
import Config from '@/configuration';
import { cn } from '@/utils';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useUserStore } from '@/store/userStore';
import userAxios from '@/network/userAxios';

// Internal
import { FilmItemProps } from './lib/types';
import useThemeStore from '@/store/themeStore';
import { getFavoriteMedia } from '@/services/media';

// Component
const FilmItem: React.FC<FilmItemProps> = ({ id, title, name, poster_path, media_type, className, mediaId }) => {
    // Hooks
    const navigate = useNavigate();
    const { isDarkMode } = useThemeStore();
    const [urlSearchParam] = useSearchParams();

    // States
    const [imageSrc, setImageSrc] = useState(poster_path ? `${Config.imgPath}${poster_path}` : Images.default_image);

    // Stores
    const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
    const userInfo = useUserStore.getState().userInfo;

    // Check if the film is in the favorite list
    const isFilmFavorite = isFavorite(id.toString()); // Convert id to string

    const filmTitle = title || name;
    const searchValue = urlSearchParam.get('query');
    const regex = new RegExp(`(${searchValue})`, 'gi');
    const parts = filmTitle.split(regex);

    // Functions
    const toggleFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            if (!isFilmFavorite) {
                const response = await userAxios.post('/favoritefilm/create', {
                    media_type: media_type,
                    movieid: id.toString(),
                    userid: userInfo?.id,
                });
                if (response.status === 201) {
                    // Gọi hàm addFavorite với đầy đủ thông tin
                    addFavorite({ id: id.toString(), media_type, mediaId: id.toString() });
                    if (userInfo) {
                        await getFavoriteMedia(userInfo);
                    }
                }
            } else {
                removeFavorite(id.toString());
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái yêu thích:', error);
        }
    };

    const handleNavigate = useCallback(() => {
        navigate(`/${media_type}/${id}`);
    }, [navigate, media_type, id]);

    const handleImageError = () => {
        setImageSrc(Images.noImage);
    };

    // Templates
    return (
        <div className={cn(isDarkMode && 'dark', 'px-2 w-full mb-8 text-black dark:text-white', className)}>
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
                            fill={isFilmFavorite ? 'red' : 'currentColor'}
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="text-white"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </button>
                </div>

                <h3
                    className={cn(
                        isDarkMode && 'dark',
                        'font-medium text-left text-sm md:text-lg mt-4 transition duration-300 ease-in-out group-hover:text-red-main text-black dark:text-white ',
                    )}
                >
                    <span>
                        {searchValue
                            ? parts.map((part, index) =>
                                  part.toLowerCase() === searchValue.toLowerCase() ? (
                                      <span key={index} style={{ color: 'red' }}>
                                          {part}
                                      </span>
                                  ) : (
                                      part
                                  ),
                              )
                            : filmTitle}
                    </span>
                </h3>
            </div>
        </div>
    );
};

export default FilmItem;
