import { useState } from "react";

//Icons
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import GroupIcon from '@mui/icons-material/Group';
import FileOpenIcon from '@mui/icons-material/FileOpen';

function Home() {
    return (
        <>
            <div className="dashboard-content">

                {/* Encabezado */}
                <div className="content-header">
                    <h2>Buenas noches, José Escalona</h2>
                    <p>
                        <span className="header-emoji"><OfflineBoltIcon /> </span> Jueves, 13 de noviembre, 22:19
                    </p>
                </div>

                {/* Guía de inicio rápido */}
                <div className="section quick-start-section">
                    <div className="section-header">
                        <h3>Tu guía de inicio rápido</h3>
                        <button className="dismiss-button">✕ Ahora mismo no.</button>
                    </div>

                    <div className="quick-start-cards">
                        {/* Tarjeta 1 */}
                        <div className="quick-start-card">
                            <div className="card-icon-container"><span className="card-icon"><FileOpenIcon /></span></div>
                            <h4>Crea un proyecto</h4>
                            <p>La mayoría de las cosas comienzan con un proyecto en Plane.</p>
                            <button className="primary-button link-style">Comienza</button>
                        </div>

                        {/* Tarjeta 2 */}
                        <div className="quick-start-card">
                            <div className="card-icon-container"><span className="card-icon"><GroupIcon /></span></div>
                            <h4>Invita a tu equipo</h4>
                            <p>Construye, lanza y gestiona con tus compañeros de trabajo.</p>
                            <button className="primary-button link-style">Consíguelos</button>
                        </div>

                        {/* Tarjeta 3 */}
                        <div className="quick-start-card">
                            <div className="card-icon-container"><span className="card-icon"><AttachFileIcon /></span></div>
                            <h4>Configura tu espacio de trabajo.</h4>
                            <p>Activa o desactiva funciones, o ve más allá.</p>
                            <a href="#" className="link-text">Configura este espacio de trabajo</a>
                        </div>

                        {/* Tarjeta 4 */}
                        <div className="quick-start-card">
                            <div className="card-icon-container"><span className="card-icon"><DarkModeIcon /></span></div>
                            <h4>Haz tuyo el diseño.</h4>
                            <p>Elige tu imagen, colores y más.</p>
                            <a href="#" className="link-text">Personaliza ahora</a>
                        </div>
                    </div>
                </div>

                {/* Enlaces rápidos */}
                <div className="section quick-links-section">
                    <div className="section-header">
                        <h3>Enlaces rápidos</h3>
                        <button className="add-link-button">+ Agregar enlace rápido</button>
                    </div>
                    <div className="empty-state">
                        <span className="empty-state-icon"><FolderCopyIcon /></span>
                        <p>Guarda enlaces a cosas del trabajo que quieras tener a mano.</p>
                    </div>
                </div>

                {/* Recientes */}
                <div className="section recent-section">
                    <div className="section-header">
                        <h3>Recientes</h3>
                        <select className="recent-filter">
                            <option>Todo</option>
                        </select>
                    </div>
                    <div className="empty-state">
                        <span className="empty-state-icon"><EventAvailableIcon /></span>
                        <p>Aún no tienes ninguna publicación reciente.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home