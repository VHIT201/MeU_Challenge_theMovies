// Core
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useFavoriteStore } from '@/store/favoriteStore';

// App
import Config from '@/configuration';
import { FeatureType, MediaType } from '@/types/media';
import { Carousel, FilmSlide } from '@/components';

// Internal
import { useFilmQuery } from './hooks/useFilmQuery';
import TrailerModal from './components/Modal/TrailerModal';
import FilmSection from './components/FilmSection/FilmSection';
import { getFavoriteMedia, getMovieTrailer } from '@/services/media';

//Types

// Component
const HomePage: React.FC = () => {
    const navigate = useNavigate();

    //State
    const [videoId, setVideoId] = useState<string | null>(null);

    // Queries: Fetching data from the API using useQuery
    const { data: trendingFilmList } = useFilmQuery(FeatureType.Popular, MediaType.Movie);
    const { data: topRatedFilmList } = useFilmQuery(FeatureType.TopRated, MediaType.Movie);
    const { data: trendingTVFilmList } = useFilmQuery(FeatureType.Popular, MediaType.TV);
    const { data: topRatedTVFilmList } = useFilmQuery(FeatureType.TopRated, MediaType.TV);

    useInfiniteQuery({
        queryKey: ['film', 'favorite', 'movie'],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await getFavoriteMedia(MediaType.Movie, pageParam);

            // Chỉ lấy id và media_type
            const favoriteMovies = response ? response.map((item) => ({ id: item.id, media_type: 'movie' })) : [];

            // Đẩy chỉ id và media_type vào store Zustand
            favoriteMovies.forEach((item) => useFavoriteStore.getState().addFavorite(item));

            return favoriteMovies;
        },
        getNextPageParam: (lastPage, pages) => {
            if (lastPage && lastPage.length < 20) {
                return undefined;
            }
            return pages.length + 1;
        },
        initialPageParam: 1,
    });

    useInfiniteQuery({
        queryKey: ['film', 'favorite', 'tv'],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await getFavoriteMedia(MediaType.TV, pageParam);

            // Chỉ lấy id và media_type
            const favoriteTVs = response ? response.map((item) => ({ id: item.id, media_type: 'tv' })) : [];

            // Đẩy chỉ id và media_type vào store Zustand
            favoriteTVs.forEach((item) => useFavoriteStore.getState().addFavorite(item));

            return favoriteTVs;
        },
        getNextPageParam: (lastPage, pages) => {
            if (lastPage && lastPage.length < 20) {
                return undefined;
            }
            return pages.length + 1;
        },
        initialPageParam: 1,
    });

    // Query to fetch trailer based on videoId
    const { data: videos = [], error: videosError } = useQuery({
        queryKey: ['videos', videoId],
        queryFn: () => getMovieTrailer(Number(videoId)),
        enabled: !!videoId, // Only run the query if videoId is set
    });

    // Methods: Toggle modal
    const handleToggleModal = () => {
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
            <Carousel loop className="w-full mb-0 p-0">
                {trendingFilmList ? (
                    trendingFilmList
                        .slice(0, 4)
                        .map((movie) => (
                            <FilmSlide
                                key={movie.id}
                                id={movie.id}
                                title={movie.original_title}
                                description={movie.overview}
                                backgroundImage={Config.backDropPath + movie.backdrop_path}
                                posterImage={Config.imgPath + movie.poster_path}
                                onWatchNow={() => handleWatchNow(movie.id)}
                                onWatchTrailer={() => handleWatchTrailer(movie.id)}
                            />
                        ))
                ) : (
                    <></>
                )}
            </Carousel>

            {/* Render FilmSections with titles */}
            <div className="container mx-auto py-6 space-y-8">
                <FilmSection
                    title="Trending Movies"
                    viewMoreLink="/movie"
                    mediaType="movie"
                    data={trendingFilmList || []}
                />

                <FilmSection
                    title="Top Rated Movies"
                    viewMoreLink="/movie"
                    mediaType="movie"
                    data={topRatedFilmList || []}
                />

                <FilmSection
                    title="Top Trending TV"
                    viewMoreLink="/tvseries"
                    mediaType="tv"
                    data={trendingTVFilmList || []}
                />

                <FilmSection
                    title="Top Rated TV"
                    viewMoreLink="/tvseries"
                    mediaType="tv"
                    data={topRatedTVFilmList || []}
                />
            </div>

            {/* Component: Modal section for video */}
            <TrailerModal videoKey={videos[0]?.key} onClose={handleToggleModal} />
        </main>
    );
};

export default HomePage;
