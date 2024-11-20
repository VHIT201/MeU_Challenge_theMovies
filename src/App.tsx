// Core
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

// CSS
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

// Lazy loading pages
import { Spinner } from './components';
import router from './router';

// Components
function App() {
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
