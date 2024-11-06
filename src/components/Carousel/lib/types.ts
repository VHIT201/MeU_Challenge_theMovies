// Type
import { ComponentProps } from '@/types';
import { SwiperProps } from 'swiper/react';

export type CarouselProps = SwiperProps &
    ComponentProps & {
        childWidth?: string;
        children: React.ReactElement[] | React.ReactElement;
    };
