//Core
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// CSS
import './App.css';

// Components
import Spinner from './components/Spinner/Spinner';
import MainLayout from './layouts/MainLayout/MainLayout';

// Lazy loading pages
import { HomePage } from './pages';
const MovieDetail = lazy(() => import('./pages/MovieDetail/MovieDetail'));
const Media = lazy(() => import('./pages/FilmList/FilmListPage'));
const Login = lazy(() => import('./pages/Authenticate/Login/Login'));
const SignUp = lazy(() => import('./pages/Authenticate/SignUp/SignUp'));

function App() {
    return (
        <div className="app-container bg-black">
            <Router>
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route element={<MainLayout />}>
                            <Route path="" element={<HomePage />} />
                            <Route path="/:media_type" element={<Media />} />
                            <Route path="/:media_type/:id" element={<MovieDetail />} />
                        </Route>
                    </Routes>
                </Suspense>
            </Router>
        </div>
    );
}

export default App;
