import { MediaType } from '@/types/media';
import {
    HomePage,
    MediaPage,
    FilmDetailPage,
    FavoriteListPage,
    AuthenticatePage,
    RankingPage,
    ProfilePage,
} from '@/pages';
import { MainLayout } from '@/layouts';
import { NotFound404 } from '@/components';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';

const requireAuth = async () => {
    const userInfo = useUserStore.getState().userInfo;
    if (!userInfo) {
        console.log('User not authenticated, redirecting to login');
        throw redirect('/login');
    }
    return null;
};

const router = createBrowserRouter([
    {
        path: '/login',
        element: <AuthenticatePage />,
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: ':media_type',
                element: <MediaPage />,
                loader: async ({ params }) => {
                    if (params.media_type !== MediaType.Movie && params.media_type !== MediaType.TV) {
                        console.log('Redirecting to 404 page');
                        throw redirect('/404');
                    }
                    return null;
                },
            },
            {
                path: ':media_type/:id',
                element: <FilmDetailPage />,
                loader: async ({ params }) => {
                    if (params.media_type !== MediaType.Movie && params.media_type !== MediaType.TV) {
                        throw redirect('/404');
                    }
                    return null;
                },
            },
            {
                path: 'favorite',
                element: <FavoriteListPage />,
                loader: requireAuth,
            },
            {
                path: 'ranking',
                element: <RankingPage />,
                loader: requireAuth,
            },
            {
                path: 'profile',
                element: <ProfilePage />,
                loader: requireAuth,
            },
        ],
    },
    {
        path: '/404',
        element: <NotFound404 />,
    },
    {
        path: '*',
        element: <NotFound404 />,
    },
]);

export default router;
