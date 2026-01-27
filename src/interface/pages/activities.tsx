import { useAuth } from "../config/AuthContext";
import '../../assets/css//activiades.css'


//ICON
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PersonIcon from '@mui/icons-material/Person';
import BeenhereIcon from '@mui/icons-material/Beenhere';

//COMPONENTES GRAFICOS
import ChartPie from "../setting/component/charts/chart_pie";
import LineCharts from '../setting/component/charts/chart_line';
//import '../../../../assets/css/indicators.css'

// COMPONENTES TABLA
import CardResumenActidades from '../setting/component/card/resumen_solicitud';
import ResumTarea from '../setting/component/card/resumen_tarea';


function Activities() {

    const { user } = useAuth();

    return (
        <>
            <h2 className="title-activiti">Hola,  <strong>{user?.nb_nombre}</strong> Bienvenid@ al panel de actividades </h2>

            <div className="container-resumen-activities">
                <h3>Descripción general</h3>

                <div className="gallery-indicators-i">

                    <div className="card-item-indicator">
                        <span className='icon'><LibraryAddIcon sx={{ fontSize: 18 }} /></span>
                        <div className="item-body">
                            <small>Elementos Creados</small><br />
                            <small>1</small>
                        </div>
                    </div>

                    <div className="card-item-indicator">
                        <span className='icon'><PersonIcon sx={{ fontSize: 18 }} /></span>
                        <div className="item-body">
                            <small>Elementos asignados</small><br />
                            <small>2</small>
                        </div>
                    </div>

                    <div className="card-item-indicator">
                        <span className='icon'><BeenhereIcon sx={{ fontSize: 18 }} /></span>

                        <div className="item-body">
                            <small>Elementos suscritos</small><br />
                            <small>2</small>
                        </div>
                    </div>
                </div>


                <div className="indicators">
                    <h4>Carga de Trabajo</h4>
                    <div className="gallery-indicators-ii">

                        <div className="card-item-indicator">
                            <div className="item-body">
                                <span className='color'></span>
                                <small>En espera</small><br />
                                <small>0</small>
                            </div>

                        </div>

                        <div className="card-item-indicator">
                            <span className='color' style={{ background: 'grey' }}></span>
                            <div className="item-body">
                                <small>Sin comenzar</small><br />
                                <small>0</small>
                            </div>

                        </div>

                        <div className="card-item-indicator">
                            <span className='color' style={{ background: 'green' }}></span>
                            <div className="item-body">
                                <small>Terminado</small><br />
                                <small>0</small>
                            </div>
                        </div>

                        <div className="card-item-indicator">
                            <span className='color' style={{ background: '#FFFF00' }}></span>
                            <div className="item-body">
                                <small>En curso</small><br />
                                <small>0</small>
                            </div>

                        </div>

                        <div className="card-item-indicator">
                            <span className='color' style={{ background: 'red' }}></span>
                            <div className="item-body">
                                <small>Cancelado</small><br />
                                <small>0</small>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="gallery-charts">

                    <div className="card-charts">
                        <p><strong>Elemento de trabajo por prioridad</strong></p>
                        <ChartPie />
                    </div>

                    <div className="card-charts">
                        <p><strong>Elemento de trabajo por Estado</strong></p>
                        <LineCharts />
                    </div>
                </div>

                {/*COLUMNAS PARALELAS*/}
                <div className="container-table-activities">
                    <CardResumenActidades />
                    <ResumTarea />
                </div>

            </div>

        </>
    )
}
export default Activities