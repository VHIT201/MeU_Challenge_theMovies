import { useEffect, useState } from "react";
import { FilmDetails, Video, SimilarFilm, Credits } from "../../Types/Types";
import apiClient from "../../services/apiServices/apiServices";

const useMovieDetailContainer = (id: string) => {
  const [filmDetails, setFilmDetails] = useState<FilmDetails | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [similarFilms, setSimilarFilms] = useState<SimilarFilm[]>([]);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const response = await apiClient.get(`movie/${id}?language=en-US`);
        setFilmDetails(response.data);

        // Fetch videos
        const videoResponse = await apiClient.get(
          `movie/${id}/videos?language=en-US`
        );
        setVideos(videoResponse.data.results);

        // Fetch similar films
        const similarResponse = await apiClient.get(
          `movie/${id}/similar?language=en-US&page=1`
        );
        setSimilarFilms(similarResponse.data.results);

        // Fetch credits
        const creditsResponse = await apiClient.get(
          `movie/${id}/credits?language=en-US`
        );
        setCredits(creditsResponse.data);
      } catch (err) {
        setError("Failed to fetch film details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmDetails();
  }, [id]);

  return {
    filmDetails,
    videos,
    similarFilms,
    credits,
    loading,
    error,
  };
};

export default useMovieDetailContainer;
