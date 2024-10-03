/**
 * Core: Chứa các thành phần cốt lõi của ứng dụng như các thư viện, router, và cấu hình chung.
 * App: Xử lý bố cục tổng thể của màn hình chính.
 * Internal: Các dịch vụ hoặc API được sử dụng trong dự án.
 * Component: Các thành phần giao diện hiển thị dữ liệu.
 * Hooks: Custom hooks để quản lý logic trong ứng dụng.
 * States: Các state và hook quản lý state.
 * Queries: Các truy vấn sử dụng `useQuery` để lấy dữ liệu từ API.
 * Methods: Các phương thức xử lý logic khác nhau.
 * Stores: Không có store nào được dùng (nếu cần, có thể bổ sung sau).
 * Client: Các hàm client để gọi API.
 * Effects: Các hiệu ứng bên ngoài, ví dụ điều hướng hoặc mở modal.
 */

// Core
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// App
import FilmSlide from "../../components/FilmSlide";
import FilmItem from "../../components/FilmItem";
import Config from "../../configuration";

// Internal (Client)
import apiClient from "../../services/apiServices/apiServices";

// Component: Types
import { SwiperData } from "./lib/types";

//Component: Spinner
import Spinner from "../../components/Spinner/Spinner";

// Hooks: useHomeContainer hook
const useHomeContainer = () => {
  // Queries: Fetching data from the API using useQuery
  const {
    data: trendingMovies = [],
    isLoading: isTrendingMoviesLoading,
    error: trendingMoviesError,
  } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: async () => {
      const response = await apiClient.get("/trending/all/day?language=en-US");
      return response.data.results;
    },
  });

  const {
    data: topRatedMovies = [],
    isLoading: isTopRatedMoviesLoading,
    error: topRatedMoviesError,
  } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: async () => {
      const response = await apiClient.get(
        "/movie/top_rated?language=en-US&page=1"
      );
      return response.data.results;
    },
  });

  const {
    data: trendingTV = [],
    isLoading: isTrendingTVLoading,
    error: trendingTVError,
  } = useQuery({
    queryKey: ["trendingTV"],
    queryFn: async () => {
      const response = await apiClient.get("/trending/tv/day?language=en-US");
      return response.data.results;
    },
  });

  const {
    data: topRatedTV = [],
    isLoading: isTopRatedTVLoading,
    error: topRatedTVError,
  } = useQuery({
    queryKey: ["topRatedTV"],
    queryFn: async () => {
      const response = await apiClient.get(
        "/tv/top_rated?language=en-US&page=1"
      );
      return response.data.results;
    },
  });

  // States: Store the fetched data and status
  const swipersData: SwiperData[] = [
    {
      title: "Trending Movies",
      data: trendingMovies,
      viewMoreLink: "/movie",
      media_type: "movie",
    },
    {
      title: "Top Rated Movies",
      data: topRatedMovies,
      viewMoreLink: "/movie",
      media_type: "movie",
    },
    {
      title: "Top Trending TV",
      data: trendingTV,
      viewMoreLink: "/tvseries",
      media_type: "tv",
    },
    {
      title: "Top Rated TV",
      data: topRatedTV,
      viewMoreLink: "/tvseries",
      media_type: "tv",
    },
  ];

  // Methods: Check for loading or errors
  const loading =
    isTrendingMoviesLoading ||
    isTopRatedMoviesLoading ||
    isTrendingTVLoading ||
    isTopRatedTVLoading;
  const error =
    trendingMoviesError ||
    topRatedMoviesError ||
    trendingTVError ||
    topRatedTVError;

  // Queries: Fetch videos for a specific movie
  const fetchVideos = (movieId: string) => {
    return useQuery({
      queryKey: ["videos", movieId],
      queryFn: async () => {
        if (!movieId) return [];
        const response = await apiClient.get(
          `/movie/${movieId}/videos?language=en-US`
        );
        return response.data.results;
      },
      enabled: !!movieId, // Only run the query if movieId is set
    });
  };

  return {
    swipersData,
    loading,
    error,
    fetchVideos, // Return fetchVideos function
  };
};

// App: Main view component
const HomeMainView: React.FC = () => {
  // Effects: Navigation
  const navigate = useNavigate();

  // Hooks: Fetch data using custom hook
  const { swipersData, loading, error, fetchVideos } = useHomeContainer();

  // States: Modal open/close state and video ID state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);

  // Methods: Toggle modal
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Methods: Handle trailer watch button click
  const handleWatchTrailer = (id: number) => {
    setVideoId(id.toString()); // Set the video ID when the button is clicked
    toggleModal(); // Open the modal
  };

  // Queries: Fetch videos when videoId is set
  const {
    data: videos = [],
    isLoading: isVideosLoading,
    error: videosError,
  } = fetchVideos(videoId!);

  // Methods: Handle movie navigation
  const handleWatchNow = (id: number) => {
    navigate(`/movie/${id}`); // Navigate to the detail page with media_type as 'movie'
  };

  // UI: Loading or error states
  if (loading || isVideosLoading) {
    return (
      <div className="h-[70vh] bg-black flex justify-center items-center flex-row gap-10">
        <Spinner/>
        <span className="text-white text-xl md:text-2xl">Đang tải dữ liệu, vui lòng đợi</span>
      </div>
    );
  }

  if (error || videosError) {
    return <div>Error occurred</div>;
  }

  return (
    <main className="w-full flex flex-col items-center justify-start">
      {/* Component: Header Swiper */}
      <Swiper
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        className="w-full mb-0 p-0"
        onSlideChange={() => {
          // Effects: Reset animation on slide change
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
              backgroundImage={
                "https://image.tmdb.org/t/p/original//" + movie.backdrop_path
              }
              posterImage={Config.imgPath + movie.poster_path}
              onWatchNow={() => handleWatchNow(movie.id)} // Methods: Pass the navigation function
              onWatchTrailer={() => handleWatchTrailer(movie.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Component: Render swipers for movies */}
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

      {/* Component: Modal section for video */}
      {isModalOpen && videos.length > 0 && (
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
