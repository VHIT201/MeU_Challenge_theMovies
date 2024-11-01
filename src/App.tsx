//Core
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const Authenticate = lazy(() => import('./pages/Authenticate/Authenticate'));

// Components
function App() {
    return (
        <div className="app-container bg-black-main">
            <Router>
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path="/login" element={<Authenticate />} />
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/:media_type" element={<MediaPage />} />
                            <Route path="/:media_type/:id" element={<FilmDetailPage />} />
                            <Route path="/:media_type/favorite" element={<FavoriteListPage />} />
                        </Route>
                        <Route path="*" element={<NotFound404 />} />
                    </Routes>
                </Suspense>
            </Router>
            <ToastContainer />
        </div>
    );
}

export default App;
