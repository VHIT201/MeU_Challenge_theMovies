import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import FilmSlide from "../../components/FilmSlide";
import FilmItem from "../../components/FilmItem";
import Config from "../../configuration";
import useHomeContainer from "./homeContainer";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const HomeMainView: React.FC = () => {
  const navigate = useNavigate(); // Get the navigate function from useNavigate
  const { swipersData, loading, error, fetchVideos } = useHomeContainer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null); // State to hold the video ID

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleWatchTrailer = (id: number) => {
    setVideoId(id.toString()); // Set the video ID when the button is clicked
    toggleModal(); // Open the modal
  };

  // Fetch videos when videoId is set
  const {
    data: videos = [],
    isLoading: isVideosLoading,
    error: videosError,
  } = fetchVideos(videoId!);

  if (loading || isVideosLoading) {
    return (
      <div className="h-[70vh] bg-black flex justify-center items-center">
        <div role="status">Loading...</div>
      </div>
    );
  }

  const handleWatchNow = (id: number) => {
    navigate(`/movie/${id}`); // Navigate to the detail page with media_type as 'movie'
  };

  if (error || videosError) {
    return <div>Error occurred</div>;
  }

  return (
    <main className="w-full flex flex-col items-center justify-start">
      {/* Header Swiper */}
      <Swiper
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        className="w-full mb-0 p-0"
        onSlideChange={() => {
          // Reset animation on slide change by forcing a re-render or reset the animation
          document
            .querySelectorAll(".animate-fallDown, .animate-scaleUp")
            .forEach((element) => {
              element.classList.remove("animate-fallDown", "animate-scaleUp");
              setTimeout(() => {
                element.classList.add("animate-fallDown", "animate-scaleUp");
              }, 0);
            });
        }}
      >
        {swipersData[0].data.slice(0, 4).map((movie, index) => (
          <SwiperSlide key={index}>
            <FilmSlide
              id={movie.id}
              title={movie.original_title}
              description={movie.overview}
              backgroundImage={'https://image.tmdb.org/t/p/original//' + movie.backdrop_path}
              posterImage={Config.imgPath + movie.poster_path}
              onWatchNow={() => handleWatchNow(movie.id)} // Pass the navigation function
              onWatchTrailer={() => handleWatchTrailer(movie.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Render swipers for movies */}
      {swipersData.map((swiper, index) => (
        <div
          key={index}
          className="bg-black-main w-full px-10 md:px-8 py-6 md:py-0"
        >
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
                autoplay={{ delay: 2500, disableOnInteraction: false }}
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
                      poster_path={movie.poster_path}
                      media_type={swiper.media_type}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      ))}

      {/* Modal section for video */}
      {isModalOpen && videoId && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/40 py-16 md:py-64 lg:py-16 z-[60]">
          <div className="relative max-w-screen-md bg-black-main h-full z-50 mx-auto p-8">
            <iframe
              allowFullScreen={true}
              src={`https://www.youtube.com/embed/${videos[0]?.key}`} // Use the first video key
              className="w-full h-full"
            ></iframe>
            <svg
              onClick={toggleModal}
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="absolute top-2 right-2 text-xl text-white cursor-pointer hover:text-red-main"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"></path>
            </svg>
          </div>
        </div>
      )}
    </main>
  );
};

export default HomeMainView;
