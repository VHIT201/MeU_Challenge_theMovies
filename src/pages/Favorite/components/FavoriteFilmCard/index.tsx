import { Button } from '@/components';
import { ArrowLeftIcon, BarChartFillIcon, HeartFillIcon, HeartIcon } from '@/components/Icon';
import Config from '@/configuration';
import { cn } from '@/utils';
import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { FavoriteCardProps } from './lib/types';

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
    const [isChangeFront, setIsChangeFront] = useState(false);
    const toastId = React.useRef(null);

    const handleRemoveFavorite = () => {
        console.log('here');
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
        <div className="perspective group">
            <div
                className={cn(
                    'preserve-3d min-h-[600px] relative transition-transform duration-500',
                    isChangeFront && 'rotate-y-180',
                )}
            >
                <div className={cn('backface-hidden absolute inset-0 text-white rounded-3xl bg-[#262626]', className)}>
                    {isFavorite ? (
                        <HeartFillIcon
                            className={cn(
                                'hidden absolute top-5 right-5 z-10 text-red-main hover:text-red-400 transition-all duration-200 cursor-pointer',
                                isFavorite && 'block',
                                isChangeFront && 'hidden',
                            )}
                            width="2.5rem"
                            height="2.5rem"
                            onClick={handleRemoveFavorite}
                        />
                    ) : (
                        <HeartIcon
                            className={cn(
                                'block absolute top-5 right-5 z-10 text-red-main hover:text-red-400 transition-all duration-200  cursor-pointer',
                                isFavorite && 'hidden',
                                isChangeFront && 'hidden',
                            )}
                            width="2.5rem"
                            height="2.5rem"
                        />
                    )}
                    <div
                        className="absolute top-5 left-5 text-md text-red-500 font-semibold hover:text-red-400 cursor-pointer"
                        onClick={() => setIsChangeFront(true)}
                    >
                        <BarChartFillIcon />
                    </div>
                    <div
                        className="min-h-[600px] flex flex-col-reverse rounded-3xl bg-center bg-no-repeat bg-cover"
                        style={{
                            backgroundImage: `url(${Config.backDropPath}${backdrop_path})`,
                        }}
                    >
                        <div className="px-4 pb-2">
                            <p className="text-4xl text-left text-white [text-shadow:_0_4px_8px_#ff0000] font-semibold tracking-normal z-10">
                                {title}
                            </p>
                            <div>
                                <ul className="flex flex-wrap items-center">
                                    {genre_names.map((genre, index) => (
                                        <li
                                            key={genre ?? index}
                                            className="my-1 bg-black-main border-2 border-white rounded-full text-sm p-2 mr-2"
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
                <div
                    className={cn(
                        'rotate-y-180 backface-hidden absolute inset-0 text-white rounded-3xl bg-[#262626]',
                        className,
                    )}
                >
                    <div
                        className="absolute top-5 left-5 text-md text-red-500 font-semibold hover:text-white cursor-pointer z-50"
                        onClick={() => setIsChangeFront(false)}
                    >
                        <ArrowLeftIcon />
                    </div>
                    <div className="min-h-[600px] flex flex-col-reverse rounded-3xl bg-center bg-no-repeat bg-cover bg-transparent"></div>
                </div>
            </div>
        </div>
    );
};

export { FavoriteCard };
