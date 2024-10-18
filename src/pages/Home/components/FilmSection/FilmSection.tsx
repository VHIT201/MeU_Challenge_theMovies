//Core
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// App
import Skeleton from "react-loading-skeleton"; // Import thư viện Skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Thêm CSS cho skeleton

//Component
import FilmItem from "../../../../components/FilmItem";

//Types
import FilmSectionProps from "./lib/types";

const FilmSection: React.FC<FilmSectionProps> = ({
  viewMoreLink,
  mediaType,
  data,
  isLoading,
  title,
}) => {
  const skeletonItems = Array.from({ length: 6 });

  return (
    <div className="w-full mx-auto mt-8">
      {/* Hiển thị tiêu đề */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-white font-medium text-lg md:text-2xl">
          {title}
        </span>
        <a className="btn-sm btn-default" href={viewMoreLink}>
          More
        </a>
      </div>

      {isLoading ? (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="w-full"
        >
          {skeletonItems.map((_, index) => (
            <SwiperSlide key={index}>
              <Skeleton height={300} width="100%" />
              <Skeleton width="80%" style={{ marginTop: "8px" }} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="w-full"
        >
          {data.map((movie) => (
            <SwiperSlide key={movie.id}>
              <FilmItem
                id={movie.id}
                original_title={movie.original_title}
                original_name={movie.original_name}
                name={movie.name}
                poster_path={movie.poster_path}
                media_type={mediaType}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default FilmSection;
