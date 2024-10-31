import React from 'react';
import { Banner } from './components/Banner';
import { Carousel } from '@/components/Carousel';
import { RankingBoard } from './components/RankingBoard';
import { FavoriteList } from './components/FavoriteList';

const FavoriteListPage = () => {
    return (
        <main className="mt-32 mb-16 px-32 space-y-16">
            <div className="w-[1000px]">
                <Carousel
                    loop={true}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 150,
                        modifier: 2.5,
                        slideShadows: true,
                    }}
                >
                    <Banner />
                    <Banner />
                    <Banner />
                    <Banner />
                </Carousel>
            </div>
            <RankingBoard />
            <FavoriteList />
        </main>
    );
};

export default FavoriteListPage;
