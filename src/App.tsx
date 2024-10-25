//Core
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// CSS
import "./App.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner/Spinner";

// Lazy loading pages
const Home = lazy(() => import("./pages/Home/Home"));
const MovieDetail = lazy(() => import("./pages/MovieDetail/MovieDetail"));
const Media = lazy(() => import("./pages/Media/Media"));

function App() {
  return (
    <div className="app-container bg-black">
      <Router>
        <Header />
        <div className="app-content">
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:media_type" element={<Media />} />
              <Route path="/:media_type/:id" element={<MovieDetail />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
