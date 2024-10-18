//Core
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

//Component
import FilmItem from "../../../../components/FilmItem";

//Type
import { SimilarMoviesSectionProps } from "./lib/type";

const SimilarMoviesSection: React.FC<SimilarMoviesSectionProps> = ({
  similarFilms,
  media_type,
}) => {
  return (
    <div className="px-4 w-full md:px-8 lg:px-16 pb-16 mt-16 text-left">
      <h3 className="text-white text-base md:text-2xl font-semibold mb-4">
        Similar
      </h3>
      {similarFilms.length > 0 ? (
        <div className="flex flex-wrap -mx-2">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="w-full"
          >
            {similarFilms.map((movie) => (
              <SwiperSlide key={movie.id}>
                <FilmItem
                  id={movie.id}
                  original_title={movie.original_title}
                  original_name={movie.original_name}
                  name={movie.name}
                  poster_path={movie.poster_path}
                  media_type={media_type}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="w-full py-20 text-center">
          <span className="text-2xl font-bold text-white opacity-50">
            There are no movies similar to this one.
          </span>
        </div>
      )}
    </div>
  );
};

export default SimilarMoviesSection;
