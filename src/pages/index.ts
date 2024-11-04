import { lazy } from 'react';

export const HomePage = lazy(() => import('./Home/HomePage'));
export const FilmDetailPage = lazy(() => import('./FilmDetail/FilmDetail'));
export const MediaPage = lazy(() => import('./Media/MediaPage'));
export const LoginPage = lazy(() => import('./Authenticate/Login/Login'));
export const SignUpPage = lazy(() => import('./Authenticate/SignUp/SignUp'));
export const FavoriteListPage = lazy(() => import('./FavoriteList/FavoriteListPage'));
