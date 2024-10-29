import React, { FC } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';

// App
import { cn } from '@/utils';

// Type
import { ComponentProps } from '@/types';

type CarouselProps = SwiperProps &
    ComponentProps & {
        children: React.ReactElement[] | React.ReactElement;
    };

// Component
const Carousel: FC<CarouselProps> = ({
    breakpoints,
    autoplay,
    effect,
    coverflowEffect,
    centeredSlides,
    pagination,
    className,
    children,
}) => {
    // Template
    return (
        <Swiper
            className={cn(className, 'flex justify-center items-center')}
            pagination={pagination}
            autoplay={autoplay}
            breakpoints={breakpoints}
            effect={effect}
            coverflowEffect={coverflowEffect}
            centeredSlides={centeredSlides}
            modules={[
                ...(coverflowEffect ? [EffectCoverflow] : []),
                ...(autoplay ? [Autoplay] : []),
                Navigation,
                Pagination,
            ]}
        >
            {Array.isArray(children) ? (
                children.map((slide) => (
                    <SwiperSlide key={'slide' + slide.key}>{React.cloneElement(slide)}</SwiperSlide>
                ))
            ) : (
                <SwiperSlide>{React.cloneElement(children)}</SwiperSlide>
            )}
        </Swiper>
    );
};

export { Carousel };
