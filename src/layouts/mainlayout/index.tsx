// Core
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Internal

function MainLayout() {
    return (
        <div className="main-layout">
            <Header />
            <div className="app-content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default MainLayout;
