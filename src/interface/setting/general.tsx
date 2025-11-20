import { useState } from "react";
import '../../assets/css/setting.css';
import { Link, Outlet, useLocation } from "react-router-dom";


//ICONS
import AddHomeIcon from '@mui/icons-material/AddHome';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';


function General() {
    return (
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
                                    <Link style={{ marginRight: 30, marginTop: 20 }} to={"mantequilla"}>Nuevo</Link>

                                </div>
                            </div>

                            <div className="row-item">
                                <span className="icon-item"><GroupsIcon /></span>
                                <div className="content-setting">
                                    <div>
                                        <p>Area</p>
                                        <small style={{ lineHeight: 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, culpa.</small>
                                    </div>
                                    <Link style={{ marginRight: 30, marginTop: 20 }} to={"mantequilla"}>Nuevo</Link>

                                </div>
                            </div>

                            <div className="row-item">
                                <span className="icon-item"><PersonIcon /></span>
                                <div className="content-setting">
                                    <div>
                                        <p>Subarea</p>
                                        <small style={{ lineHeight: 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, culpa.</small>
                                    </div>
                                    <Link style={{ marginRight: 30, marginTop: 20 }} to={"mantequilla"}>Nuevo</Link>
                                </div>
                            </div>

                        </div>

                        <div className="other-setting" style={{ marginTop: 40 }}>

                            <h2> Otros Componentes</h2>
                            <p>
                                En este apartado podra administrar y diseñar distintos recursos de su organizacion
                            </p>

                            <div className="row-item">
                                <span className="icon-ite"><PersonIcon /></span>
                                <div className="content-setting">
                                    <div>
                                        <p>Subarea</p>
                                        <small style={{ lineHeight: 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, culpa.</small>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}
export default General