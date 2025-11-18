// Sidebar.tsx
import { Link, Outlet, useLocation } from "react-router-dom";
import React from 'react';
import '../../assets/css/App.css'

// Definir las props del componente Sidebar
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// Actualizar la firma del componente para aceptar las props
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    // Aplicar la clase 'is-open' si isOpen es true
    <div className={`sidebar ${isOpen ? 'is-open' : ''}`}>
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
            <Link to="home" onClick={toggleSidebar}><span className="nav-icon">🏠</span> Inicio</Link> {/* Agregamos onClick */}
          </li>
          <li className="nav-item">
            <Link to="inbox" onClick={toggleSidebar}><span className="nav-icon">📥</span> Inbox</Link>
          </li>
          {/* ... otros elementos del menú ... */}
          <li className="nav-item has-dropdown">
            <Link to="activities" onClick={toggleSidebar}><span className="nav-icon">💼</span> Para mi</Link>
          </li>
          <li className="nav-item has-dropdown">
            <Link to="setting" onClick={toggleSidebar}><span className="nav-icon">⚙️</span> Herramientas</Link>
          </li>
        </ul>

        <div className="nav-separator">Espacio de trabajo</div>

        <ul>
          <li className="nav-item">
            <Link to="project" onClick={toggleSidebar}><span className="nav-icon">🗄️</span> Proyectos</Link>
          </li>
          <li className="nav-item has-dropdown">
            <Link to="mas.." onClick={toggleSidebar}><span className="nav-icon">...</span> Más</Link>
          </li>
        </ul>

        <div className="nav-separator">Proyectos</div>
        <div className="add-project">
          <Link to="new_project" onClick={toggleSidebar}>Añadir proyecto</Link>
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