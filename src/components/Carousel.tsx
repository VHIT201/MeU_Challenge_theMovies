import React, { FC } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

// App
import { cn } from '@/utils';

// Type
import { ComponentProps } from '@/types';

type CarouselProps = SwiperProps &
    ComponentProps & {
        childWidth?: string;
        children: React.ReactElement[] | React.ReactElement;
    };

// Component
const Carousel: FC<CarouselProps> = ({
    breakpoints,
    autoplay,
    effect,
    navigation,
    coverflowEffect,
    centeredSlides,
    pagination,
    childWidth,
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
            navigation={navigation}
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
                    <SwiperSlide style={{ width: childWidth }} key={'slide' + slide.key}>
                        {React.cloneElement(slide)}
                    </SwiperSlide>
                ))
            ) : (
                <SwiperSlide>{React.cloneElement(children)}</SwiperSlide>
            )}
        </Swiper>
    );
};

export { Carousel };
