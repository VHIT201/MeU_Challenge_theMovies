import React from "react";
import { useParams } from "react-router-dom";
import { FilmDetails, Video, SimilarFilm, Credits } from "../../Types/Types";
import useMovieDetailContainer from "./MovieDetailContainer"; // Import custom hook
import Config from "../../configuration";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import FilmItem from "../../components/FilmItem";

const MovieDetailMainView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Kiểm tra nếu id là undefined
  if (!id) {
    return <div>Không có thông tin phim.</div>;
  }

  // Sử dụng hook để lấy chi tiết phim
  const {
    filmDetails,
    videos,
    similarFilms,
    credits,
    loading,
    error,
  } = useMovieDetailContainer(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!filmDetails) {
    return <div>No details available</div>;
  }

  return (
    <main className="w-full flex flex-col items-center justify-start bg-black">
      <div
        className='relative w-full px-4 md:px-8 lg:px-16 py-12 md:pt-32 md:pb-20 bg-center bg-no-repeat bg-cover z-0 before:content-[""] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-1/2 before:bg-black-main before:-z-10 after:content-[""] after:absolute after:top-0 after:left-0 after:right-0 after:h-1/2 after:bg-gradient-to-t after:from-black-main after:to-transparent after:-z-10'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${filmDetails.backdrop_path})`,
        }}
      >
        <div className="flex items-start -mx-4 max-h-fit">
          <div className="hidden md:block w-64 lg:w-96 px-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`}
              alt={filmDetails.title}
              className="w-full rounded-3xl"
            />
          </div>
          <div className="px-4 flex-1 flex flex-col items-start justify-between -my-2 lg:-my-4">
            <h2 className="py-2 lg:py-4 font-bold text-white text-3xl md:text-5xl lg:text-7xl">
              {filmDetails.title}
            </h2>
            <div className="py-4 flex flex-wrap items-center -mx-1">
              {filmDetails.genres.map((genre) => (
                <div className="px-1 mb-4" key={genre.id}>
                  <span className="bg-black-main px-4 py-1 border-2 border-white rounded-full text-white text-xs lg:text-sm">
                    {genre.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="py-2 lg:py-4 text-white text-xs md:text-sm lg:text-base text-left">
              {filmDetails.overview}
            </p>
            <div className="py-2 lg:py-4 text-left">
              <h3 className="text-white text-xl font-medium">Casts</h3>
              <div className="flex flex-wrap -mx-2 mt-1">
                {credits?.cast.slice(0, 5).map((item) => (
                  <div className="w-28 px-2 mb-1" key={item.id}>
                    <img
                      src={Config.imgPath + item.profile_path}
                      className="rounded-xl"
                      alt={item.name}
                    />
                    <span className="text-white text-xs md:text-sm font-sm">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='relative px-4 md:px-8 lg:px-16 w-full text-left z-0 before:content-[""] before:absolute before:top-0 before:left-0 before:right-0 before:h-1/2 before:bg-black-main before:-z-10 after:content-[""] after:absolute after:top-0 after:left-0 after:right-0 after:h-1/2 after:bg-gradient-to-t after:from-black-main after:to-transparent after:-z-10'>
        {videos.length > 0 &&
          videos.slice(0, 5).map((item) => (
            <div key={item.id} className="mb-16">
              <h3 className="text-white text-base md:text-2xl font-semibold mb-4">
                {item.name}
              </h3>
              <iframe
                src={`https://www.youtube.com/embed/${item.key}`}
                title={item.name}
                width="100%"
                height="800px"
                loading="lazy"
                allowFullScreen={true}
              ></iframe>
            </div>
          ))}
      </div>

      <div className="px-4 w-full md:px-8 lg:px-16 pb-16 mt-16 text-left">
        <h3 className="text-white text-base md:text-2xl font-semibold mb-4">
          Similar Movies
        </h3>

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
                  poster_path={movie.poster_path}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </main>
  );
};

export default MovieDetailMainView;
