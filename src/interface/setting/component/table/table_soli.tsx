import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <-- Hook para la navegación
import '../../../../assets/css/table_task.css'

//Icons
import FlagIcon from '@mui/icons-material/Flag';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CircleIcon from '@mui/icons-material/Circle';

// --- TIPOS DE DATOS ---
interface Solicitud {
    co_solicitud: string,
    fe_registro: string,
    fe_vencimiento: string,
    fe_resolucion: string,
    fe_cierre: string,
    co_user_credor_soli: string,
    co_user_resolutor: string,
    co_tip_solicitud: string,
    nb_contacto: string,
    nu_celular_contacto: string,
    tx_asunto: string,
    tx_descripcion: string,
    tx_causa: string,
    co_ambiente: string,
    co_producto: string,
    co_sla: string,
    co_user_cierre: string,
    tx_desc_resolucion: string,
    tx_nota: string,
    nb_prioridad: string,
    co_estado: string,
    co_cliente: string,
    co_tp_solicitud: string,
}

// Para la agrupación por estado
interface TaskGroup {
    name: string;
    tasks: Solicitud[];
}

// --- COMPONENTES REUTILIZABLES ---

const AssignedPersonIcon: React.FC<{ initials: string }> = ({ initials }) => (
    <div className="assigned-person-icon">
        {initials}
    </div>
);

const CalendarIcon: React.FC = () => (
    <span className="calendar-icon">🗓</span>
);

const PriorityIcon: React.FC<{ priority: Solicitud['nb_prioridad'] }> = ({ priority }) => {
    const priorityString = String(priority || '').trim();
    let icon = <FlagIcon sx={{ fontSize: 14 }} />;
    let iconClass = 'priority-icon';

    return (
        <span className={iconClass} title={`Prioridad: ${priorityString}`}>
            {icon}
        </span>
    );
};



// --- COMPONENTE PRINCIPAL ---

const TaskListSoli: React.FC = () => {
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [cargando, setCargando] = useState(true);

    const navigate = useNavigate();

    // Función para manejar el click en la fila y la redirección
    const handleRowClick = (solicitud: Solicitud) => {
        // Redirige a /detalles y pasa el objeto 'solicitud' completo en el estado
        navigate('/detalles', { state: { solicitudSeleccionada: solicitud } });
    };


    // Carga de datos de la BD
    useEffect(() => {
        axios.get<Solicitud[]>("http://localhost:8081/request")
            .then(response => {
                setSolicitudes(response.data);
                setCargando(false);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los registros", error);
                setCargando(false);
                setSolicitudes([]);
            });
    }, []);


    // Lógica de Agrupación
    const groupedTasks: TaskGroup[] = useMemo(() => {
        if (solicitudes.length === 0) return [];

        const groupsMap = solicitudes.reduce((acc, soli) => {
            const status = soli.co_estado || 'SIN ESTADO';

            if (!acc[status]) {
                acc[status] = { name: status, tasks: [] };
            }

            acc[status].tasks.push(soli);
            return acc;
        }, {} as Record<string, TaskGroup>);

        return Object.values(groupsMap);
    }, [solicitudes]);


    if (cargando) return <p>Cargando registros...</p>
    if (solicitudes.length === 0) return <p>No se encontraron solicitudes.</p>


    // Función auxiliar para obtener las iniciales del asignado
    const getInitials = (fullName: string | undefined): string => {
        if (!fullName) return 'NA';
        const parts = fullName.split(' ').filter(p => p.length > 0);
        if (parts.length === 0) return 'NA';
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();

        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    // Renderizado de los datos agrupados
    return (

        <>
            <div className="header-left" style={{ margin: 20, marginTop: 40 }} >
                <h2>Solicitudes <span className="badge-count">{solicitudes.length} clientes</span></h2>
                <p className="subtitle">Mantén el seguimiento de tus clientes y sus productos.</p>
            </div>

            <div className="task-list-container">

                {/* Encabezado global de la tabla */}
                <div className="header-row">
                    <div>Asunto</div>
                    <div>Persona asignada</div>
                    <div>Fecha límite</div>
                    <div>Prioridad</div>
                </div>

                <div className="add-task-button">
                    <TaskAltIcon sx={{ fontSize: 18 }} />
                    <span className="add-task-text">Solicitudes</span>
                </div>

                {/* Renderizado de los grupos de solicitudes */}
                {groupedTasks.map((group) => (
                    <React.Fragment key={group.name}>

                        {/* Renderizado de las solicitudes dentro del grupo */}
                        {group.tasks.map((soli) => {

                            const dueDate = soli.fe_vencimiento ? new Date(soli.fe_vencimiento) : null;
                            const today = new Date();
                            const isOverdue = dueDate && dueDate < today;

                            const rowClass = `task-row-grid`;
                            const dateClass = `date-text ${isOverdue ? 'urgent-date' : ''}`;

                            const assignedUser = soli.co_user_resolutor;
                            const assignedInitials = getInitials(assignedUser);

                            return (
                                <>

                                    <div
                                        key={soli.co_solicitud}
                                        className={rowClass}
                                        onClick={() => handleRowClick(soli)} // <-- Click que redirige
                                        style={{ cursor: 'pointer' }}    >

                                        <div className="task-name-cell" style={{ marginLeft: 10 }}>
                                            <div className="header-left" style={{lineHeight: 0.1}}>
                                                <h3 style={{fontSize: 17}}>{soli.tx_asunto.substring(0, 35) + '...'}</h3>
                                                <p className="subtitle">{soli.co_solicitud}</p>
                                            </div>
                                        </div>

                                        <div>
                                            {soli.co_user_credor_soli}
                                        </div>

                                        <div className={dateClass}>
                                            {soli.fe_vencimiento ? soli.fe_vencimiento.split('T')[0] : <CalendarIcon />}
                                        </div>

                                        <div>
                                            {soli.nb_prioridad} <PriorityIcon priority={soli.nb_prioridad} />

                                        </div>

                                    </div>

                                </>

                            );
                        })}
                    </React.Fragment >
                ))}
            </div>
        </>
    );
};

export default TaskListSoli;