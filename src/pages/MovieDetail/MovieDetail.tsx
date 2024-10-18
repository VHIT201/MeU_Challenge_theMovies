/**
 * Core: Contains core components such as libraries, routing, and general configurations.
 */
import React from "react";
import { useParams } from "react-router-dom";

//Hook
import { useMovieDetailContainer } from "../../services/detail/hook/useMovieDetailContainer";

//Component
import MovieDetailBanner from "./components/Banner/MovieDetailBanner";
import MovieDetailVideoSection from "./components/MovieDetailVideoSection/MovieDetailVideoSection";
import SimilarMoviesSection from "./components/SimilarMovieSection/SimilarMovieSection";

/**
 * App: Handles the main layout of the detailed movie view.
 */
const MovieDetailMainView: React.FC = () => {
  const { id, media_type } = useParams<{ id: string; media_type: string }>();

  // Check if movie id and media type exist
  if (!id || !media_type) {
    return <div>Movie information not available.</div>;
  }

  // Use custom hook to fetch movie details
  const { filmDetails, videos, similarFilms, credits, loading, error } =
    useMovieDetailContainer(id, media_type);

  // Loading state display
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="spinner" aria-label="Loading..." />
      </div>
    );
  }

  // Error handling display
  if (error) {
    return (
      <div className="text-white text-opacity-50 text-2xl h-[70vh] flex items-center justify-center">
        Error loading movie details.
      </div>
    );
  }

  // Display message when no movie details are available
  if (!filmDetails) {
    return <div>No details available</div>;
  }

  // Main layout with hero, videos, and similar movies sections
  return (
    <main className="w-full flex flex-col items-center justify-start bg-black">
      <MovieDetailBanner filmDetails={filmDetails} credits={credits} />
      <MovieDetailVideoSection videos={videos} />
      <SimilarMoviesSection
        media_type={media_type}
        similarFilms={similarFilms}
      />
    </main>
  );
};

export default MovieDetailMainView;
