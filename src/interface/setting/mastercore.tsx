import { Link, Outlet, useLocation } from "react-router-dom"

//ICONS
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AppsOutageIcon from '@mui/icons-material/AppsOutage';
import CategoryIcon from '@mui/icons-material/Category';
import SpokeIcon from '@mui/icons-material/Spoke';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FmdBadIcon from '@mui/icons-material/FmdBad';

function MasterCore() {

    // Llama al hook useLocation() para obtener el objeto location
    const location = useLocation();
    const isBaseRoute = location.pathname.endsWith('/setting/mastercore');
    const isExactBaseRoute = location.pathname.split('/').filter(Boolean).length === 1 && location.pathname.endsWith('/setting/mastercore');
    const isCurrentlyBaseRoute = location.pathname === '/setting/mastercore' || location.pathname === '/setting/mastercore';

    return (
        <>

            {isCurrentlyBaseRoute && (
                <div className="container-maestro">

                    {/* Encabezado */}
                    <div className="content-header">
                        <h2>⚙️ Núcleo Maestro</h2>

                        <p style={{ padding: '5px 10px' }}>
                            En este apartado podra administrar y diseñar distintos recursos de su organizacion
                        </p>
                    </div>

                    {/* Guía de inicio rápido */}
                    <div className="section quick-start-section">
                        <div className="section-header">

                        </div>

                        <div className="container-setting-general">


                            <div className="other-setting" style={{ marginTop: 40 }}>

                                <div className="row-item">
                                    <span className="icon-ite"><PrecisionManufacturingIcon /></span>
                                    <div className="content-setting">
                                        <div>
                                            <p>Productos</p>
                                            <small style={{ lineHeight: 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, culpa.</small>
                                        </div>
                                        <Link style={{ marginRight: 30, marginTop: 20 }} to={"product"}>Administrar </Link>

                                    </div>
                                </div>

                                <div className="row-item">
                                    <span className="icon-ite"><AppsOutageIcon /></span>
                                    <div className="content-setting">
                                        <div>
                                            <p>Componentes</p>
                                            <small style={{ lineHeight: 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, culpa.</small>
                                        </div>
                                        <Link style={{ marginRight: 30, marginTop: 20 }} to={"componentes"}>Administrar</Link>

                                    </div>
                                </div>

                                <div className="row-item">
                                    <span className="icon-ite"><CategoryIcon /></span>
                                    <div className="content-setting">
                                        <div>
                                            <p>Categorias</p>
                                            <small style={{ lineHeight: 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, culpa.</small>
                                        </div>
                                        <Link style={{ marginRight: 30, marginTop: 20 }} to={"category"}>Administrar</Link>

                                    </div>
                                </div>

                                <div className="row-item">
                                    <span className="icon-ite"><SpokeIcon /></span>
                                    <div className="content-setting">
                                        <div>
                                            <p>Subcategorias</p>
                                            <small style={{ lineHeight: 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, culpa.</small>
                                        </div>
                                        <Link style={{ marginRight: 30, marginTop: 20 }} to={"subcategory"}>Administrar</Link>

                                    </div>
                                </div>

                                <div className="row-item">
                                    <span className="icon-ite"><PostAddIcon /></span>
                                    <div className="content-setting">
                                        <div>
                                            <p>Articulos</p>
                                            <small style={{ lineHeight: 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, culpa.</small>
                                        </div>
                                        <Link style={{ marginRight: 30, marginTop: 20 }} to={"article"}>Administrar</Link>

                                    </div>
                                </div>

                                <div className="row-item">
                                    <span className="icon-ite"><FmdBadIcon /></span>
                                    <div className="content-setting">
                                        <div>
                                            <p>SLA</p>
                                            <small style={{ lineHeight: 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, culpa.</small>
                                        </div>
                                        <Link style={{ marginRight: 30, marginTop: 20 }} to={"sla"}>Administrar</Link>

                                    </div>
                                </div>


                            </div>

                        </div>

                    </div>

                </div>
            )}

            <Outlet />

        </>
    )
}
export default MasterCore