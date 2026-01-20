import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

//Icons
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import GroupsIcon from '@mui/icons-material/Groups';
import StorageIcon from '@mui/icons-material/Storage';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SettingsIcon from '@mui/icons-material/Settings';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';


function Setting() {
    // Llama al hook useLocation() para obtener el objeto location
    const location = useLocation();
    const isBaseRoute = location.pathname.endsWith('/setting');
    const isExactBaseRoute = location.pathname.split('/').filter(Boolean).length === 1 && location.pathname.endsWith('setting');
    const isCurrentlyBaseRoute = location.pathname === '/setting' || location.pathname === '/setting/';


    return (
        <>
            {isCurrentlyBaseRoute && (
                <>
                    <div className="dashboard-content">

                        {/* Encabezado */}
                        <div className="content-header">
                            <h2><SettingsIcon /> Herramientas</h2>

                            <p>
                                <span className="header-emoji"><OfflineBoltIcon /></span> Jueves, 13 de noviembre, 22:19
                            </p>
                        </div>

                        {/* Guía de inicio rápido */}
                        <div className="section quick-start-section">
                            <div className="section-header">
                                <small>Administre, diseñe y observe los distintos recursos de helpdesk pone a su disposicion para gestionar los recursos de su organizacion.</small>
                            </div>

                            <div className="quick-start-cards">
                                {/* Tarjeta 1 */}
                                <div className="quick-start-card">
                                    <div className="card-icon-container"><span className="card-icon"><DisplaySettingsIcon /></span></div>
                                    <h4>Ajustes Generales</h4>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, harum.</p>
                                    <button className="primary-button link-style"><Link to={"general"}>Comienza</Link></button>
                                </div>

                                {/* Tarjeta 2 */}
                                <div className="quick-start-card">
                                    <div className="card-icon-container"><span className="card-icon"><GroupsIcon /></span></div>
                                    <h4>Gestion de Usuarios</h4>
                                    <p>Construye, lanza y gestiona con tus compañeros de trabajo.</p>
                                    <button className="primary-button link-style"><Link to={"members"}>Invitar a mi equipo</Link></button>
                                </div>

                                {/* Tarjeta 3 */}
                                <div className="quick-start-card">
                                    <div className="card-icon-container"><span className="card-icon"><StorageIcon /></span></div>
                                    <h4>Núcleo Maestro</h4>
                                    <p>Activa, crear, desactiva funciones, o ve más allá.</p>
                                    <a href="#" className="link-text"><Link to={"mastercore"}>Configura tu estacion de trabajo</Link></a>
                                </div>

                                {/* Tarjeta 4 */}
                                <div className="quick-start-card">
                                    <div className="card-icon-container"><span className="card-icon"><ColorLensIcon /></span></div>
                                    <h4>Proyectos</h4>
                                    <p>Elige tu imagen, colores y más.</p>
                                    <a href="#" className="link-text"><Link to={"managerproduct"}>Nuevo Proyecto</Link></a>
                                </div>
                            </div>
                        </div>

                    </div>

                </>
            )}

            <Outlet />
        </>
    )
}
export default Setting