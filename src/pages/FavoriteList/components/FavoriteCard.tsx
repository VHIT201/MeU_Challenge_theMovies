import { Button } from '@/components';
import { HeartFillIcon } from '@/components/Icon';
import Config from '@/configuration';
import { MediaType } from '@/services/media/lib/type';
import { ComponentProps } from '@/types';
import { cn } from '@/utils';
import React, { FC } from 'react';

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
    return (
        <div className={cn('relative text-white rounded-3xl bg-[#262626]', className)}>
            <HeartFillIcon
                className="absolute top-5 right-5 z-10 text-red-main hover:text-red-400 cursor-pointer"
                width="2.5rem"
                height="2.5rem"
            />
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
                            className="mx-auto mt-8"
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
