//Core
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// CSS
import './App.css';

// Components
import Spinner from './components/Spinner/Spinner';

// Lazy loading pages

import { HomePage, MediaPage, FilmDetailPage, FavoriteListPage } from './pages';
import MainLayout from './layouts/MainLayout/MainLayout';

const Authenticate = lazy(() => import('./pages/Authenticate/Authenticate'));

function App() {
    return (
        <div className="app-container bg-black">
            <Router>
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path="/" element={<Authenticate />} />
                        <Route element={<MainLayout />}>
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/:media_type" element={<MediaPage />} />
                            <Route path="/:media_type/:id" element={<FilmDetailPage />} />
                            <Route path="/:media_type/favorite" element={<FavoriteListPage />} />
                        </Route>
                    </Routes>
                </Suspense>
            </Router>
        </div>
    );
}

export default App;
