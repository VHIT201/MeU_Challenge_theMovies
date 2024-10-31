import { Button } from '@/components';
import { HeartFillIcon } from '@/components/Icon';
import { ComponentProps } from '@/types';
import { cn } from '@/utils';
import React, { FC } from 'react';

interface FavoriteCardProps extends ComponentProps {
    enable?: boolean;
}

const FavoriteCard: FC<FavoriteCardProps> = ({ className }) => {
    return (
        <div className={cn('relative rounded-3xl bg-[#262626]', className)}>
            <HeartFillIcon
                className="absolute top-5 right-5 z-10 text-red-main hover:text-red-400 cursor-pointer"
                width="2.5rem"
                height="2.5rem"
            />
            <div
                className="min-h-[400px] flex flex-col-reverse rounded-t-3xl bg-center bg-no-repeat bg-cover after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-28 after:bg-gradient-to-t after:from-black after:to-transparent after:-z-10"
                style={{
                    backgroundImage: 'url(https://image.tmdb.org/t/p/original///kgSdCYEGeR4r2NqXwpAMWjjnKV9.jpg)',
                }}
            >
                <div className="pl-4 pb-2">
                    <p className="text-4xl text-left text-white font-semibold tracking-normal z-10">MOVIE NAME</p>
                </div>
            </div>
            <div className="p-4 text-white rounded-b-3xl">
                <ul className="flex items-center">
                    <li className="bg-black-main border-2 border-white rounded-full text-sm p-2 mr-2">Action</li>
                    <li className="bg-black-main border-2 border-white rounded-full text-sm p-2 mr-2">Horror</li>
                </ul>
                <p className="mt-4 text-left font-medium">
                    While struggling with his dual identity, Arthur Fleck not only stumbles upon true love, but also
                    finds the music that's always been inside him.
                </p>
                <Button className="mx-auto mt-8" type="primary" size="lg" text="Watch Now" />
            </div>
        </div>
    );
};

export { FavoriteCard };
