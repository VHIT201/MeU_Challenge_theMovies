// Core
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// App
import HeaderSwiper from "./components/Banner/Banner";
import Modal from "./components/Modal/Modal";

// Internal (Client)
import {fetchMovieTrailer} from "../../services/movies/moviesServices";

//Hooks
import { useFilmQuery } from "./queries/useFilmQuery";

// Component: FilmSection
import FilmSection from "./components/FilmSection/FilmSection";

const Home: React.FC = () => {
  const navigate = useNavigate();

  //State
  const [videoId, setVideoId] = useState<string | null>(null);

  // Queries: Fetching data from the API using useQuery
  const trendingMoviesQuery = useFilmQuery("trending", "movie");
  const topRatedMoviesQuery = useFilmQuery("top_rated", "movie");
  const trendingTVQuery = useFilmQuery("trending", "tv");
  const topRatedTVQuery = useFilmQuery("top_rated", "tv");

  // Query to fetch trailer based on videoId
  const {
    data: videos = [],
    isLoading: isVideosLoading,
    error: videosError,
  } = useQuery({
    queryKey: ["videos", videoId],
    queryFn: () => fetchMovieTrailer(Number(videoId)),
    enabled: !!videoId, // Only run the query if videoId is set
  });

  // Methods: Toggle modal
  const toggleModal = () => {
    setVideoId(null);
  };

  // Methods: Handle trailer watch button click
  const handleWatchTrailer = (id: number) => {
    setVideoId(id.toString()); // Set the video ID when the button is clicked
  };

  // Methods: Handle movie navigation
  const handleWatchNow = (id: number) => {
    navigate(`/movie/${id}`); // Navigate to the detail page with media_type as 'movie'
  };

  // UI: Loading or error states
  if (videosError) {
    return <div>Error occurred while fetching videos</div>;
  }

  return (
    <main className="w-full flex flex-col items-center justify-start gap bg-black">
      {/* Component: Header Swiper */}
      <HeaderSwiper
        swipersData={[
          {
            title: "Trending Movies",
            viewMoreLink: "/movie",
            media_type: "movie",
            isLoading: trendingMoviesQuery.isLoading,
            data: trendingMoviesQuery.data || [],
          },
          // { title: "Top Rated Movies", viewMoreLink: "/movie", media_type: "movie", isLoading: topRatedMoviesQuery.isLoading, data: topRatedMoviesQuery.data || [] },
          // { title: "Top Trending TV", viewMoreLink: "/tvseries", media_type: "tv", isLoading: trendingTVQuery.isLoading, data: trendingTVQuery.data || [] },
          // { title: "Top Rated TV", viewMoreLink: "/tvseries", media_type: "tv", isLoading: topRatedTVQuery.isLoading, data: topRatedTVQuery.data || [] },
        ]}
        onWatchNow={handleWatchNow}
        onWatchTrailer={handleWatchTrailer}
      />

      {/* Render FilmSections with titles */}
      <div className="container mx-auto py-6 space-y-8">
        <FilmSection
          title="Trending Movies" 
          viewMoreLink="/movie"
          mediaType="movie"
          data={trendingMoviesQuery.data}
          isLoading={trendingMoviesQuery.isLoading}
        />

        <FilmSection
          title="Top Rated Movies" 
          viewMoreLink="/movie"
          mediaType="movie"
          data={topRatedMoviesQuery.data || []}
          isLoading={topRatedMoviesQuery.isLoading}
        />

        <FilmSection
          title="Top Trending TV" 
          viewMoreLink="/tvseries"
          mediaType="tv"
          data={trendingTVQuery.data || []}
          isLoading={trendingTVQuery.isLoading}
        />

        <FilmSection
          title="Top Rated TV" 
          viewMoreLink="/tvseries"
          mediaType="tv"
          data={topRatedTVQuery.data || []}
          isLoading={topRatedTVQuery.isLoading}
        />
      </div>

      {/* Component: Modal section for video */}
      <Modal videoKey={videos[0]?.key} onClose={toggleModal} />
    </main>
  );
};

export default Home;
