import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import FilmSlide from "../../components/FilmSlide";
import FilmItem from "../../components/FilmItem";
import { slides } from "../../data/filmData";
import useHomeContainer from "./homeContainer"; // Import hook mới

const HomeMainView: React.FC = () => {
  const { swipersData, loading, error } = useHomeContainer();

  if (loading) {
    return <div>Loading...</div>; // Hiển thị thông báo khi đang tải
  }

  if (error) {
    return <div>{error}</div>; // Hiển thị thông báo lỗi
  }

  return (
    <main className="w-full flex flex-col items-center justify-start ">
      {/* header swiper */}
      <Swiper
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        className="w-full mb-0 p-0"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <FilmSlide
              title={slide.title}
              description={slide.description}
              backgroundImage={slide.backgroundImage}
              posterImage={slide.posterPath}
              watchLink={slide.watchLink}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Render các Swiper từ swipersData */}
      {swipersData.map((swiper, index) => (
        <div key={index} className="bg-black-main w-full px-10 md:px-8 py-6 md:py-0">
          <div className="max-w-screen-2xl mx-auto mb-8">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium text-lg md:text-2xl">
                {swiper.title}
              </span>
              <a className="btn-sm btn-default" href={swiper.viewMoreLink}>
                View more
              </a>
            </div>
            <div className="max-w-screen-2xl mx-auto mt-8">
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
                {swiper.data.map((movie) => (
                  <SwiperSlide key={movie.id}>
                    <FilmItem
                      id={movie.id}
                      original_title={movie.original_title}
                      original_name={movie.original_name}
                      name={movie.name}
                      media_type={movie.media_type}
                      poster_path={movie.poster_path}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};

export default HomeMainView;
