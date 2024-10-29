import React, { useEffect, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

//Component
import FilmSlide from "../../../../components/FilmSlide";

//Config
import Config from "../../../../configuration";

//Types
import { HeaderSwiperProps } from "./lib/Type";

const HeaderSwiper: React.FC<HeaderSwiperProps> = ({
  swipersData,
  onWatchNow,
  onWatchTrailer,
}) => {

  return (
    <Swiper
      loop
      autoplay={{ delay: 3000, disableOnInteraction: true }}
      className="w-full mb-0 p-0"
      
    >
      {swipersData[0].data.slice(0, 4).map((movie, index) => (
        <SwiperSlide key={index}>
          
            
          
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeaderSwiper;
