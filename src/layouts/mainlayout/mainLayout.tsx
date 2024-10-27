// MainLayout.tsx
import React, { ReactNode } from "react"; // Import React để sử dụng JSX
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <Header />
      <div className="app-content">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
