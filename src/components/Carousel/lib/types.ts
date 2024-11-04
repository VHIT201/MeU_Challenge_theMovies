// Type
import { ComponentProps } from '@/types';
import { SwiperProps } from 'swiper/react';

export type CarouselProps = SwiperProps &
    ComponentProps & {
        children: React.ReactElement[] | React.ReactElement;
};