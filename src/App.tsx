//Core
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// CSS
import "./App.css";

// Components
import Spinner from "./components/Spinner/Spinner";
import MainLayout from "./layouts/mainlayout/mainLayout";

// Lazy loading pages
const Home = lazy(() => import("./pages/Home/Home"));
const MovieDetail = lazy(() => import("./pages/MovieDetail/MovieDetail"));
const Media = lazy(() => import("./pages/Media/Media"));
const Login = lazy(() => import("./pages/Authenticate/Login/Login"));
const SignUp = lazy(() => import("./pages/Authenticate/SignUp/SignUp"));

function App() {
  return (
    <div className="app-container bg-black">
      <Router>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/"
              element={
                <MainLayout>
                  <Home />
                </MainLayout>
              }
            />
            <Route
              path="/:media_type"
              element={
                <MainLayout>
                  <Media />
                </MainLayout>
              }
            />
            <Route
              path="/:media_type/:id"
              element={
                <MainLayout>
                  <MovieDetail />
                </MainLayout>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
