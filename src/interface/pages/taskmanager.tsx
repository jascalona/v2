import '../../assets/css/task.css';

//Incons
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GppGoodIcon from '@mui/icons-material/GppGood';

//Componentes
import TabsTaskMnagaer from "../setting/component/tabs/tabs_task"


//GRaficos
import BarsProduct from '../setting/component/charts/chart_product';

function TaskManager() {
    return (
        <>
            <div className="container-solicitudes">

                <div>
                    <div className="chart-task">

                        <div className="card-item-indicator">
                            <span className='icon'><EventRepeatIcon sx={{ fontSize: 18 }} /></span>
                            <div className="item-body">
                                <small>Tareas en Curso</small><br />
                                <small>1</small>
                            </div>
                        </div>

                        <div className="card-item-indicator">
                            <span className='icon'><CrisisAlertIcon sx={{ fontSize: 18 }} /></span>
                            <div className="item-body">
                                <small>Tareas Pendientes</small><br />
                                <small>2</small>
                            </div>
                        </div>

                        <div className="card-item-indicator">
                            <span className='icon'><TaskAltIcon sx={{ fontSize: 18 }} /></span>
                            <div className="item-body">
                                <small>Tareas Finalizadas</small><br />
                                <small>2</small>
                            </div>
                        </div>

                        <div className="card-item-indicator">
                            <span className='icon'><EventBusyIcon sx={{ fontSize: 18 }} /></span>
                            <div className="item-body">
                                <small>Tareas Canceladas</small><br />
                                <small>2</small>
                            </div>
                        </div>
                    </div>

                    <div className="chart-escalamientos">
                        <div className="card-item-indicator">
                            <span className='icon'><TrendingUpIcon sx={{ fontSize: 18 }} /></span>
                            <div className="item-body">
                                <small>Escalamientos asignados</small><br />
                                <small>2</small>
                            </div>
                        </div>

                        <div className="card-item-indicator" style={{marginTop: 10}}>
                            <span className='icon'><GppGoodIcon sx={{ fontSize: 18 }} /></span>
                            <div className="item-body">
                                <small>Escalamientos finalizados</small><br />
                                <small>2</small>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="card-chart">
                    <BarsProduct />
                </div>

            </div>

            <div className="container-taskmanager">
                <TabsTaskMnagaer />
            </div>
        </>
    )
}

export default TaskManager