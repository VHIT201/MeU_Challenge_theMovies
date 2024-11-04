// Core
import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// App
import { cn } from '@/utils';

// Internal
import { CarouselProps } from './lib/types';



// Component
const Carousel: FC<CarouselProps> = ({
    breakpoints,
    autoplay,
    effect,
    coverflowEffect,
    centeredSlides,
    pagination,
    navigation,
    className,
    children,
    ...props
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
                ...(pagination ? [Pagination] : []),
                ...(navigation ? [Navigation] : []),
            ]}
            {...props}
        >
            {Array.isArray(children) ? (
                children.map((slide) => (
                    <SwiperSlide style={{ width: '800px' }} key={'slide' + slide.key}>
                        {React.cloneElement(slide)}
                    </SwiperSlide>
                ))
            ) : (
                <SwiperSlide>{React.cloneElement(children)}</SwiperSlide>
            )}
        </Swiper>
    );
};

export default Carousel;
