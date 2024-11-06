import { lazy } from 'react';

export const HomePage = lazy(() => import('./Home'));
export const FilmDetailPage = lazy(() => import('./FilmDetail'));
export const MediaPage = lazy(() => import('./Media'));
export const AuthenticatePage = lazy(() => import('./Authenticate'));
export const FavoriteListPage = lazy(() => import('./Favorite'));
