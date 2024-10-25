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
          
            <FilmSlide
              id={movie.id}
              title={movie.original_title}
              description={movie.overview}
              backgroundImage={Config.backDropPath + movie.backdrop_path}
              posterImage={Config.imgPath + movie.poster_path}
              onWatchNow={() => onWatchNow(movie.id)} // Pass the navigation function
              onWatchTrailer={() => onWatchTrailer(movie.id)}
            />
          
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeaderSwiper;
