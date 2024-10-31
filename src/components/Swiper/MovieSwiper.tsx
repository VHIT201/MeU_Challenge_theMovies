// components/CustomSwiper.tsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

type CustomSwiperProps<T> = {
  customData: T[];
  slidesPerView?: number;
  breakpoints?: Record<number, { slidesPerView: number }>;
  loop?: boolean;
  autoplay?: { delay: number; disableOnInteraction: boolean };
  children: (item: T) => React.ReactNode;
};

function CustomSwiper<T>({
  customData,
  slidesPerView = 2,
  breakpoints = {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 4 },
    1024: { slidesPerView: 6 },
  },
  loop = true,
  autoplay = { delay: 2500, disableOnInteraction: false },
  children,
}: CustomSwiperProps<T>) {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={20}
      loop={loop}
      autoplay={autoplay}
      slidesPerView={slidesPerView}
      breakpoints={breakpoints}
      className="w-full"
    >
      {customData.map((item, index) => (
        <SwiperSlide key={index}>
          {children(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CustomSwiper;
