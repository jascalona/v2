import { Link, Outlet, useLocation } from "react-router-dom"; 
import React from 'react';
import '../../assets/css/App.css'

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      {/* Sección Superior de Búsqueda y Creación */}
      <div className="sidebar-header">
        <a href="#" className="create-button">
          <span className="icon">+</span> Nuevo elemento
        </a>
      
      </div>

      {/* Menú Principal */}
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item active">
            <Link to="home"><span className="nav-icon">🏠</span> Inicio</Link>
          </li>
          <li className="nav-item">
            <Link to="inbox"><span className="nav-icon">📥</span> Inbox</Link>
          </li>
          <li className="nav-item has-dropdown">
            <Link to="activities"><span className="nav-icon">💼</span> Para mi</Link>
          </li>
          <li className="nav-item has-dropdown">
            <Link to="setting"><span className="nav-icon">⚙️</span> Herramientas</Link>
          </li>
        </ul>

        <div className="nav-separator">Espacio de trabajo</div>

        <ul>
          <li className="nav-item">
            <Link to="project"><span className="nav-icon">🗄️</span> Proyectos</Link>
          </li>
          <li className="nav-item has-dropdown">
            <Link to="mas.."><span className="nav-icon">...</span> Más</Link>
          </li>
        </ul>

        <div className="nav-separator">Proyectos</div>
        <div className="add-project">
          <Link to="new_project">Añadir proyecto</Link>
        </div>
      </nav>
      
      {/* Pie de la Barra Lateral */}
      <div className="sidebar-footer">
        <a href="#" className="footer-link"><span className="icon">💬</span> Comunidad</a>
        <div className="footer-icons">
          <span className="footer-icon">💬</span>
          <span className="footer-icon">⚙️</span>
          <span className="footer-icon">⏹</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;