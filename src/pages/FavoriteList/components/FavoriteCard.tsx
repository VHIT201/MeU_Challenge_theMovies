import { Button } from '@/components';
import { HeartFillIcon, HeartIcon } from '@/components/Icon';
import Config from '@/configuration';
import { MediaType } from '@/services/media/lib/type';
import { ComponentProps } from '@/types';
import { cn } from '@/utils';
import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';

export interface FavoriteCardProps extends ComponentProps {
    id: string;
    backdrop_path: string;
    title: string;
    overview: string;
    genre_names: Array<string | undefined>;
    mediaType: MediaType;
}

const FavoriteCard: FC<FavoriteCardProps> = ({
    id,
    title,
    overview,
    backdrop_path,
    genre_names,
    mediaType,
    className,
}) => {
    const [isFavorite, setIsFavorite] = useState(true);
    const toastId = React.useRef(null);

    const handleRemoveFavorite = () => {
        toastId.current = toast(
            <div className="space-x-2 text-black font-semibold">
                <span className="text-sm">
                    Removed <b className="text-red-500">{title}</b> from favorites list
                </span>
                <span
                    className="text-md text-red-500 underline hover:text-red-300 cursor-pointer"
                    onClick={handleUndoFavorite}
                >
                    Undo
                </span>
            </div>,
            { position: 'bottom-right', progressStyle: { background: 'red' } },
        );
        setIsFavorite(false);
    };

    const handleUndoFavorite = () => {
        toast.dismiss(toastId.current);
        setIsFavorite(true);
    };

    return (
        <div className={cn('relative text-white rounded-3xl bg-[#262626]', className)}>
            {isFavorite ? (
                <HeartFillIcon
                    className={cn(
                        'hidden absolute top-5 right-5 z-10 text-red-main hover:text-red-400 transition-all duration-200 cursor-pointer',
                        isFavorite && 'block',
                    )}
                    width="2.5rem"
                    height="2.5rem"
                    onClick={() => handleRemoveFavorite()}
                />
            ) : (
                <HeartIcon
                    className={cn(
                        'block absolute top-5 right-5 z-10 text-red-main hover:text-red-400 transition-all duration-200  cursor-pointer',
                        isFavorite && 'hidden',
                    )}
                    width="2.5rem"
                    height="2.5rem"
                />
            )}
            <div
                className="min-h-[600px] flex flex-col-reverse rounded-3xl bg-center bg-no-repeat bg-cover after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-28 after:bg-gradient-to-t after:from-black after:to-transparent after:-z-10"
                style={{
                    backgroundImage: `url(${Config.backDropPath}${backdrop_path})`,
                }}
            >
                <div className="px-4 pb-2">
                    <p className="text-4xl text-left text-white [text-shadow:_0_4px_8px_#ff0000] font-semibold tracking-normal z-10">
                        {title}
                    </p>
                    <div>
                        <ul className="flex flex-wrap items-center space-y-2">
                            {genre_names.map((genre) => (
                                <li
                                    key={genre}
                                    className="bg-black-main border-2 border-white rounded-full text-sm p-2 mr-2"
                                >
                                    {genre}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 text-left font-medium line-clamp-3">{overview}</p>
                        <Button
                            className="my-2 mx-auto mt-8"
                            to={`${mediaType}/${id}`}
                            type="primary"
                            size="lg"
                            text="Watch Now"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { FavoriteCard };
