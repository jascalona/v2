// Layout.tsx
import React from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";
import Sidebar from './sidebar';
import Main from './main_interface';
import '../../assets/css/App.css'

const Layout: React.FC = () => {
  return (
    <div className="app-container">
      {/* Navbar Superior*/}
      <div className="top-navbar">
        <div className="logo-section">
          <span className="logo-icon">S</span>
          <span className="logo-text">Sycom</span>
        </div>
        <div className="navbar-links">
          <a href="#" className="nav-link active"><span className="nav-icon">🏠</span> Inicio</a>
        </div>
        <div className="navbar-actions">
          <button className="navbar-button">
            <span className="nav-icon">⚙️</span> Gestionar widgets
          </button>
          <a href="#" className="navbar-star-link">
            <span className="nav-icon">⭐️</span> Danos una estrella en GitHub
          </a>
          <span className="profile-icon">JE</span>
        </div>
      </div>

      <div className="main-layout">
        <Sidebar />
        <div className="content-area">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default Layout;