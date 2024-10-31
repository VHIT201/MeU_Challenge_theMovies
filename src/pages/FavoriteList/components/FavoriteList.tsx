import React from 'react';
import { FavoriteCard } from './FavoriteCard';

const FavoriteList = () => {
    return (
        <div>
            <h1 className="mt-16 mb-8 text-4xl text-center text-white font-bold tracking-normal">Favorite Films</h1>
            <div className="grid grid-cols-3 gap-8">
                <FavoriteCard />
                <FavoriteCard />
                <FavoriteCard />
                <FavoriteCard />
                <FavoriteCard />
                <FavoriteCard />
            </div>
        </div>
    );
};

export { FavoriteList };
