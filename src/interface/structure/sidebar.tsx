// Sidebar.tsx
import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import '../../assets/css/App.css';

// Icons de Material UI
import HomeIcon from '@mui/icons-material/Home';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SettingsIcon from '@mui/icons-material/Settings';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AddTaskIcon from '@mui/icons-material/AddTask';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  
  // Recuperamos el nombre guardado durante el login
  const userName = localStorage.getItem('userName') || 'Usuario';
  const userSurname = localStorage.getItem('userSurname') || 'Usuario';


  const handleLogout = () => {
    // Limpiar toda la sesión
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');

    // Cerrar el sidebar si está en modo móvil
    if (isOpen) toggleSidebar();

    // Redirigir al Login de forma limpia
    navigate('/', { replace: true });
  };

  return (
    <div className={`sidebar ${isOpen ? 'is-open' : ''}`}>
      
      {/* Sección de Perfil del Usuario */}
      <div className="sidebar-profile" style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #33333317' }}>
        <AccountCircleIcon style={{ fontSize: 40, color: '#aaa' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{userName}</span>
          <span style={{ fontSize: '11px', color: '#888' }}>En línea</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item active">
            <Link to="home" onClick={toggleSidebar}><span className="nav-icon"><HomeIcon /></span> Inicio</Link>
          </li>
          <li className="nav-item">
            <Link to="inbox" onClick={toggleSidebar}><span className="nav-icon"><MoveToInboxIcon /></span> Inbox</Link>
          </li>
          <li className="nav-item">
            <Link to="activities" onClick={toggleSidebar}><span className="nav-icon"><AutoStoriesIcon /></span> Para mi</Link>
          </li>
          <li className="nav-item">
            <Link to="uirequest" onClick={toggleSidebar}><span className="nav-icon"><MarkUnreadChatAltIcon /></span> Solicitudes</Link>
          </li>
          <li className="nav-item">
            <Link to="taskmanager" onClick={toggleSidebar}><span className="nav-icon"><AddTaskIcon /></span> Task Manager</Link>
          </li>
          <li className="nav-item">
            <Link to="customer" onClick={toggleSidebar}><span className="nav-icon"><SupervisorAccountIcon /></span> Clientes</Link>
          </li>
        </ul>

        <div className="nav-separator">Espacio de trabajo</div>

        <ul>
          <li className="nav-item">
            <Link to="product" onClick={toggleSidebar}><span className="nav-icon"><PrecisionManufacturingIcon /></span> Productos</Link>
          </li>
          <li className="nav-item">
            <Link to="setting" onClick={toggleSidebar}><span className="nav-icon"><SettingsIcon /></span> Herramientas</Link>
          </li>
          <li className="nav-item">
            <Link to="proyectos" onClick={toggleSidebar}><span className="nav-icon"><ColorLensIcon /></span> Proyectos</Link>
          </li>
        </ul>
      </nav>

      {/* Pie de la Barra Lateral con Logout */}
      <div className="sidebar-footer" style={{ marginTop: 'auto', padding: '10px' }}>
        {/* Botón de Cerrar Sesión */}
        <button 
          onClick={handleLogout}
          className="nav-item"
          style={{
            width: '100%',
            background: 'rgba(211, 47, 47, 0.1)', // Fondo rojizo suave
            border: 'none',
            color: '#ff5252',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '10px',
            transition: '0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(211, 47, 47, 0.2)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(211, 47, 47, 0.1)'}
        >
          <LogoutIcon style={{ fontSize: 20 }} />
          <span style={{ fontWeight: 'bold' }}>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;