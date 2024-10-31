import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MovieDetailBanner from './components/Banner/MovieDetailBanner';
import MovieDetailVideoSection from './components/MovieDetailVideoSection/MovieDetailVideoSection';
import SimilarMoviesSection from './components/SimilarMovieSection/SimilarMovieSection';
import { fetchFilmDetails, fetchCredits, fetchSimilarFilms, fetchVideos } from '../../services/detail/detailServices';

const FilmDetailMainView: React.FC = () => {
    const { id, media_type } = useParams<{ id: string; media_type: string }>();

    const urlBase = `${media_type}/${id}`;

    const {
        data: filmDetails,
        isLoading: isFilmDetailsLoading,
        error: filmDetailsError,
    } = useQuery({ queryKey: ['filmDetails', urlBase], queryFn: () => fetchFilmDetails(urlBase) });
    const {
        data: videos,
        isLoading: isVideosLoading,
        error: videosError,
    } = useQuery({ queryKey: ['videos', urlBase], queryFn: () => fetchVideos(urlBase) });
    const {
        data: similarFilms,
        isLoading: isSimilarFilmsLoading,
        error: similarFilmsError,
    } = useQuery({ queryKey: ['similarFilms', urlBase], queryFn: () => fetchSimilarFilms(urlBase) });
    const {
        data: credits,
        isLoading: isCreditsLoading,
        error: creditsError,
    } = useQuery({ queryKey: ['credits', urlBase], queryFn: () => fetchCredits(urlBase) });

    const loading = isFilmDetailsLoading || isVideosLoading || isSimilarFilmsLoading || isCreditsLoading;
    const error = filmDetailsError || videosError || similarFilmsError || creditsError;

    if (!id || !media_type) return <div>Movie information not available.</div>;
    if (loading) return <div className="spinner" aria-label="Loading..." />;
    if (error) return <div>Error loading movie details.</div>;
    if (!filmDetails) return <div>No details available</div>;

    return (
        <main className="w-full flex flex-col items-center bg-black">
            <MovieDetailBanner filmDetails={filmDetails} credits={credits} />
            <MovieDetailVideoSection videos={videos || []} />
            <SimilarMoviesSection media_type={media_type} similarFilms={similarFilms || []} />
        </main>
    );
};

export default FilmDetailMainView;
