//Core
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

// CSS
import './App.css';

// Components
import Spinner from './components/Spinner/Spinner';
import MainLayout from './layouts/MainLayout/MainLayout';

// Lazy loading pages
import { HomePage, MediaPage, FilmDetailPage, LoginPage, SignUpPage, FavoriteListPage } from './pages';

function App() {
    return (
        <div className="app-container bg-black">
            <Router>
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route element={<MainLayout />}>
                            <Route path="" element={<HomePage />} />
                            <Route path="/:media_type" element={<MediaPage />} />
                            <Route path="/:media_type/:id" element={<FilmDetailPage />} />
                            <Route path="/favorite" element={<FavoriteListPage />} />
                        </Route>
                    </Routes>
                </Suspense>
            </Router>
        </div>
    );
}

export default App;
