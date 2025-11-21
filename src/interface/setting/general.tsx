import { useState } from "react";
import '../../assets/css/setting.css';
import { Link, Outlet, useLocation } from "react-router-dom";


//ICONS
import AddHomeIcon from '@mui/icons-material/AddHome';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MultilineChartIcon from '@mui/icons-material/MultilineChart';


function General() {
    // Llama al hook useLocation() para obtener el objeto location
    const location = useLocation();
    const isBaseRoute = location.pathname.endsWith('/setting/general');
    const isExactBaseRoute = location.pathname.split('/').filter(Boolean).length === 1 && location.pathname.endsWith('/setting/general');
    const isCurrentlyBaseRoute = location.pathname === '/setting/general' || location.pathname === '/setting/general';


    return (
        <>
            {isCurrentlyBaseRoute && (
                <>
                    <div className="dashboard-content">

                        {/* Encabezado */}
                        <div className="content-header">
                            <h2>⚙️ Ajustes Generales</h2>

                            <p style={{ padding: '5px 10px' }}>
                                En este apartado podra administrar y diseñar distintos recursos de su organizacion
                            </p>
                        </div>

                        {/* Guía de inicio rápido */}
                        <div className="section quick-start-section">
                            <div className="section-header">

                            </div>

                            <div className="container-setting-general">
                                <div className="list-item">

                                    <div className="row-item">
                                        <span className="icon-item"><AddHomeIcon /></span>
                                        <div className="content-setting">
                                            <div>
                                                <p>Organizacion</p>
                                                <small style={{ lineHeight: 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, culpa.</small>
                                            </div>
                                            <Link style={{ marginRight: 30, marginTop: 20 }} to={"empresa"}>Nuevo</Link>

                                        </div>
                                    </div>

                                    <div className="row-item">
                                        <span className="icon-item"><GroupsIcon /></span>
                                        <div className="content-setting">
                                            <div>
                                                <p>Area</p>
                                                <small style={{ lineHeight: 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, culpa.</small>
                                            </div>
                                            <Link style={{ marginRight: 30, marginTop: 20 }} to={"area"}>Nuevo</Link>

                                        </div>
                                    </div>

                                    <div className="row-item">
                                        <span className="icon-item"><PersonIcon /></span>
                                        <div className="content-setting">
                                            <div>
                                                <p>Subarea</p>
                                                <small style={{ lineHeight: 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, culpa.</small>
                                            </div>
                                            <Link style={{ marginRight: 30, marginTop: 20 }} to={"subarea"}>Nuevo</Link>
                                        </div>
                                    </div>

                                </div>

                                <div className="other-setting" style={{ marginTop: 40 }}>

                                    <h2> Configuración de Cuenta</h2>
                                    <p>
                                        En este apartado podra administrar y diseñar distintos recursos de su organizacion
                                    </p>

                                    <div className="row-item">
                                        <span className="icon-ite"><PersonIcon /></span>
                                        <div className="content-setting">
                                            <div>
                                                <p>Perfil</p>
                                                <small style={{ lineHeight: 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, culpa.</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row-item">
                                        <span className="icon-ite"><ColorLensIcon /></span>
                                        <div className="content-setting">
                                            <div>
                                                <p>Preferencias</p>
                                                <small style={{ lineHeight: 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, culpa.</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row-item">
                                        <span className="icon-ite"><NotificationsIcon /></span>
                                        <div className="content-setting">
                                            <div>
                                                <p>Notificaciones</p>
                                                <small style={{ lineHeight: 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, culpa.</small>
                                            </div>
                                        </div>
                                    </div>

                                     <div className="row-item">
                                        <span className="icon-ite"><MultilineChartIcon /></span>
                                        <div className="content-setting">
                                            <div>
                                                <p>Actividad</p>
                                                <small style={{ lineHeight: 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, culpa.</small>
                                            </div>
                                        </div>
                                    </div>

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
export default General