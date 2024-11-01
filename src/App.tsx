// Core
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

// CSS
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

// Lazy loading pages
import { HomePage, MediaPage, FilmDetailPage, FavoriteListPage } from './pages';
import MainLayout from './layouts/MainLayout/MainLayout';
import Spinner from './components/Spinner/Spinner';
import { NotFound404 } from './components/Error/NotFound404';
import { MediaType } from './services/media/lib/type';

const Authenticate = lazy(() => import('./pages/Authenticate/Authenticate'));

// Components
function App() {
    const router = createBrowserRouter([
        {
            path: '/login',
            element: <Authenticate />,
        },
        {
            element: <MainLayout />,
            children: [
                {
                    path: '/',
                    element: <HomePage />,
                },
                {
                    path: '/:media_type',
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
                    path: '/:media_type/:id',
                    element: <FilmDetailPage />,
                    loader: async ({ params }) => {
                        if (params.media_type !== MediaType.Movie && params.media_type !== MediaType.TV) {
                            throw redirect('/404');
                        }
                        return null;
                    },
                },
                {
                    path: '/:media_type/favorite',
                    element: <FavoriteListPage />,
                    loader: async ({ params }) => {
                        if (params.media_type !== MediaType.Movie && params.media_type !== MediaType.TV) {
                            throw redirect('/404');
                        }
                        return null;
                    },
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

    return (
        <div className="app-container bg-black-main">
            <Suspense fallback={<Spinner />}>
                <RouterProvider router={router} />
            </Suspense>
            <ToastContainer />
        </div>
    );
}

export default App;
