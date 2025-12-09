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
    cliComercio: string,
    cliDirecto: string,
    coAmbiente: string,
    coPrioridad: string, 
    coProducto: string,
    coSLA: string,
    coSolicitud: string,
    co_tip_solicitud: string,
    coUserCierre: string,
    co_user_credor_soli: string,
    c_user_resolutor: string, // Persona asignada
    feCierre: string,
    feRegistro: string, // Fecha de registro
    feResolucion: string,
    fe_ult_modif: string,
    feVencimiento: string, // Fecha Límite
    nbContacto: string,
    nuContacto: string,
    stSolicitud: string, // Estado
    txAsunto: string, // Título
    txCusaSoli: string,
    tx_desc_resolucion: string,
    txDesSoli: string, // Descripción
    txNota: string,
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

const PriorityIcon: React.FC<{ priority: Solicitud['coPrioridad'] }> = ({ priority }) => {
    const priorityString = String(priority || '').trim(); 
    let icon = <FlagIcon sx={{ fontSize: 18 }} />; 
    let iconClass = 'priority-icon';

    return (
        <span className={iconClass} title={`Prioridad: ${priorityString}`}>
            {icon}
        </span>
    );
};

const AddIcon: React.FC = () => (
    <span className="add-icon">+</span>
);

const StatusCircle: React.FC<{ status: Solicitud['stSolicitud'] }> = ({ status }) => {
    const isCompleted = status?.toUpperCase() === 'CERRADO' || status?.toUpperCase() === 'RESUELTO';
    const statusClass = `status-circle ${isCompleted ? 'completed' : 'in-progress'}`;

    return (
        <span className={statusClass} title={`Estado: ${status}`}>
            <CircleIcon sx={{fontSize: 20}}/>
        </span>
    );
};

// --- COMPONENTE PRINCIPAL ---

const TaskList: React.FC = () => {
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
        axios.get<Solicitud[]>("http://localhost:8080/basetomee/solicitud/list")
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
            const status = soli.stSolicitud || 'SIN ESTADO';

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
        <div className="task-list-container">

            {/* Encabezado global de la tabla */}
            <div className="header-row">
                <div>Asunto</div>
                <div>Persona asignada</div>
                <div>Fecha límite</div>
                <div>Prioridad</div>
            </div>

            <div className="add-task-button">
                <TaskAltIcon />
                <span className="add-task-text">Solicitudes</span>
            </div>

            {/* Renderizado de los grupos de solicitudes */}
            {groupedTasks.map((group) => (
                <React.Fragment key={group.name}>

                    {/* Renderizado de las solicitudes dentro del grupo */}
                    {group.tasks.map((soli) => {

                        const dueDate = soli.feVencimiento ? new Date(soli.feVencimiento) : null;
                        const today = new Date();
                        const isOverdue = dueDate && dueDate < today;

                        const rowClass = `task-row-grid`;
                        const dateClass = `date-text ${isOverdue ? 'urgent-date' : ''}`;

                        const assignedUser = soli.c_user_resolutor;
                        const assignedInitials = getInitials(assignedUser);

                        return (
                            <div 
                                key={soli.coSolicitud} 
                                className={rowClass}
                                onClick={() => handleRowClick(soli)} // <-- Click que redirige
                                style={{cursor: 'pointer' }}    >

                                {/* Columna Asunto (txAsunto) */}
                                <div className="task-name-cell">
                                    <StatusCircle status={soli.stSolicitud} />
                                    {soli.txAsunto}
                                </div>

                                {/* Columna Persona asignada (c_user_resolutor) */}
                                <div>
                                    {assignedUser ? (
                                        <AssignedPersonIcon initials={assignedInitials} />
                                    ) : (
                                        <span className="person-placeholder" title="No Asignado">👤</span>
                                    )}
                                </div>

                                {/* Columna Fecha límite (feVencimiento) */}
                                <div className={dateClass}>
                                    {soli.feVencimiento ? soli.feVencimiento.split('T')[0] : <CalendarIcon />}
                                </div>

                                {/* Columna Prioridad (coPrioridad) */}
                                <div>
                                    <PriorityIcon priority={soli.coPrioridad} />
                                    {soli.coPrioridad}
                                </div>

                            </div>
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    );
};

export default TaskList;