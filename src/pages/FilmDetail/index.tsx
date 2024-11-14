// Core
import React from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// Internal
import MovieDetailBanner from './components/Banner/MovieDetailBanner';
import MovieDetailVideoSection from './components/MovieDetailVideoSection/MovieDetailVideoSection';
import SimilarMoviesSection from './components/SimilarMovieSection/SimilarMovieSection';

// Components
import { getCreditList, getFilmDetail, getSimilarFilmList, getVideoList } from '@/services/media';
import { analyticCommentList, getCommentList } from '@/services/review';
import { MediaType } from '@/types/media/media';
import CommentList from './components/CommentList';
import ReviewAnalytic from './components/ReviewAnalytic';

const FilmDetailPage: React.FC = () => {
    const { id, media_type } = useParams<{ id: string; media_type: string }>();
    const urlBase = `${media_type}/${id}`;
    const mediaType = media_type === MediaType.Movie ? MediaType.Movie : MediaType.TV;
    const filmId = parseInt(id ?? '1', 10);

    const {
        data: filmDetails,
        isLoading: isFilmDetailsLoading,
        error: filmDetailsError,
    } = useQuery({ queryKey: ['filmDetails', urlBase], queryFn: () => getFilmDetail(urlBase) });

    const {
        data: videos,
        isLoading: isVideosLoading,
        error: videosError,
    } = useQuery({ queryKey: ['videos', urlBase], queryFn: () => getVideoList(urlBase) });

    const {
        data: similarFilms,
        isLoading: isSimilarFilmsLoading,
        error: similarFilmsError,
    } = useQuery({ queryKey: ['similarFilms', urlBase], queryFn: () => getSimilarFilmList(urlBase) });

    const {
        data: credits,
        isLoading: isCreditsLoading,
        error: creditsError,
    } = useQuery({ queryKey: ['credits', urlBase], queryFn: () => getCreditList(urlBase) });

    const {
        data: commentList,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['commentList', filmId, media_type],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await getCommentList({ id: filmId, page: pageParam, mediaType });
            return response ?? [];
        },
        getNextPageParam: (lastPage, pages) => {
            if (lastPage && lastPage.length < 20) {
                return undefined;
            }
            return pages.length + 1;
        },
        initialPageParam: 1,
        enabled: !!filmId,
    });

    const { data: analyticData } = useQuery({
        queryKey: ['analytic', filmId],
        queryFn: () => analyticCommentList({ id: filmId, page: 1, mediaType }),
        enabled: !!filmId,
    });

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
            {analyticData && <ReviewAnalytic data={analyticData} />}
            {commentList && (
                <CommentList
                    commentList={commentList}
                    isFetchingNextPage={isFetchingNextPage}
                    hasNextPage={hasNextPage}
                    fetchNextPage={fetchNextPage}
                />
            )}
            <SimilarMoviesSection media_type={media_type} similarFilms={similarFilms || []} />
        </main>
    );
};

export default FilmDetailPage;
