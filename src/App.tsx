import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeMainView from './pages/Home/HomeMainView';
import { MoviesMainView } from './pages/Movies/MoviesMainView';
import TVSeriesMainView from './pages/TVSeries/TVSeriesMainView';
import MovieDetailMainView from './pages/MovieDetail/MovieDetailMainView';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="h-screen w-full p-0 m-0 bg-black">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomeMainView />} />
          <Route path="/movie" element={<MoviesMainView />} />
          <Route path="/tvseries" element={<TVSeriesMainView />} />
          <Route path="/:media_type/:id" element={<MovieDetailMainView />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
