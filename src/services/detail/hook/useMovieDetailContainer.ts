import useFetchData from "./useFetchData";

export const useMovieDetailContainer = (id: string, mediaType: string) => {
  const urlBase = `${mediaType}/${id}`;

  // Fetch movie details
  const { data: filmDetails = [], isLoading: isFilmDetailsLoading, error: filmDetailsError } = 
    useFetchData(["filmDetails", id], `${urlBase}?language=en-US`);

  // Fetch movie videos
  const { data: videos = [], isLoading: isVideosLoading, error: videosError } = 
    useFetchData(["videos", id], `${urlBase}/videos?language=en-US`, "results");

  // Fetch similar movies
  const { data: similarFilms = [], isLoading: isSimilarFilmsLoading, error: similarFilmsError } = 
    useFetchData(["similarFilms", id], `${urlBase}/similar?language=en-US&page=1`, "results");

  // Fetch cast credits
  const { data: credits = [], isLoading: isCreditsLoading, error: creditsError } = 
    useFetchData(["credits", id], `${urlBase}/credits?language=en-US`);

  // Combine loading and error states
  const loading = isFilmDetailsLoading || isVideosLoading || isSimilarFilmsLoading || isCreditsLoading;
  const error = filmDetailsError || videosError || similarFilmsError || creditsError;

  return {
    filmDetails,
    videos,
    similarFilms,
    credits,
    loading,
    error,
  };
};
