// Sidebar.tsx
import { Link, Outlet, useLocation } from "react-router-dom";
import React from 'react';
import '../../assets/css/App.css'


//Icons
import HomeIcon from '@mui/icons-material/Home';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SettingsIcon from '@mui/icons-material/Settings';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import GroupsIcon from '@mui/icons-material/Groups';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import WidgetsIcon from '@mui/icons-material/Widgets';


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
    

      {/* Menú Principal */}
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item active">
            <Link to="home" onClick={toggleSidebar}><span className="nav-icon"><HomeIcon /></span> Inicio</Link> {/* Agregamos onClick */}
          </li>
          <li className="nav-item">
            <Link to="inbox" onClick={toggleSidebar}><span className="nav-icon"><MoveToInboxIcon /></span> Inbox</Link>
          </li>
          {/* ... otros elementos del menú ... */}
          <li className="nav-item has-dropdown">
            <Link to="activities" onClick={toggleSidebar}><span className="nav-icon"><AutoStoriesIcon /></span> Para mi</Link>
          </li>
          <li className="nav-item has-dropdown">
            <Link to="setting" onClick={toggleSidebar}><span className="nav-icon"><SettingsIcon /></span> Herramientas</Link>
          </li>

          <li className="nav-item has-dropdown">
            <Link to="uirequest" onClick={toggleSidebar}><span className="nav-icon"><MarkUnreadChatAltIcon /></span> Solicitudes</Link>
          </li>
        </ul>

        <div className="nav-separator">Espacio de trabajo</div>

        <ul>
          <li className="nav-item">
            <Link to="product" onClick={toggleSidebar}><span className="nav-icon"><PrecisionManufacturingIcon /></span> Productos</Link>
          </li>

          <li className="nav-item">
            <Link to="proyectos" onClick={toggleSidebar}><span className="nav-icon"><ColorLensIcon /></span> Proyectos</Link>
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
        <a href="#" className="footer-link"><span className="icon"><GroupsIcon /> </span> Comunidad</a>
        
      </div>
    </div>
  );
};

export default Sidebar;