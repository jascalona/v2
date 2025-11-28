// Layout.tsx
import React, { useState } from 'react'; // Importar useState
import { Link, Outlet, useLocation } from "react-router-dom";
import Sidebar from './sidebar';
import Main from './main_interface';
import '../../assets/css/App.css'
import WidgetsIcon from '@mui/icons-material/Widgets';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      {/* Botón Flotante para Móvil (Hamburguesa) */}
      <button 
        className={`sidebar-toggle-button ${isSidebarOpen ? 'is-open' : ''}`}
        onClick={toggleSidebar}
      >
        <span className="icon">
          {isSidebarOpen ? '✕' : '☰'} 
        </span>
      </button>

      {/* Navbar Superior*/}
      <div className="top-navbar">
        <div className="logo-section">
          <span className="logo-icon">S</span>
          <span className="logo-text">Sycom</span>
        </div>
      
        <div className="navbar-actions">
          <button className="navbar-button">
            <span className="nav-icon"><WidgetsIcon /></span> Gestionar widgets
          </button>
          <a href="#" className="navbar-star-link">
            <span className="nav-icon">⭐️</span> Despues vemos que ponemos aca
          </a>
          <span className="profile-icon">JE</span>
        </div>
      </div>

      <div className="main-layout">
        {/* Pasar el estado y el toggle al Sidebar para que sepa si debe mostrarse */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> 
        
        <div className="content-area">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default Layout;