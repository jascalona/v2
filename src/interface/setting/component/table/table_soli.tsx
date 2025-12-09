import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../../../../assets/css/table_task.css' // Asumiendo que esta ruta es correcta

//Icons
import FlagIcon from '@mui/icons-material/Flag';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import TaskAltIcon from '@mui/icons-material/TaskAlt';


// --- TIPOS DE DATOS ---
interface Solicitud {
    cliComercio: string,
    cliDirecto: string,
    coAmbiente: string,
    coPrioridad: string, // Usaremos este para la prioridad
    coProducto: string,
    coSLA: string,
    coSolicitud: string,
    co_tip_solicitud: string,
    coUserCierre: string,
    co_user_credor_soli: string,
    c_user_resolutor: string, // Usaremos este como "Persona asignada"
    feCierre: string,
    feRegistro: string,
    feResolucion: string,
    fe_ult_modif: string,
    feVencimiento: string, // Usaremos este como "Fecha Límite"
    nbContacto: string,
    nuContacto: string,
    stSolicitud: string, 
    txAsunto: string, 
    txCusaSoli: string,
    tx_desc_resolucion: string,
    txDesSoli: string,
    txNota: string,
}

// Para la agrupación por estado
interface TaskGroup {
    name: string;
    tasks: Solicitud[];
}

// --- COMPONENTES REUTILIZABLES (Actualizados) ---

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

    const p = priorityString.toUpperCase();

    // Clasificación de prioridad (la misma lógica que antes)
    let icon = <FlagIcon sx={{ fontSize: 18 }} />; // Por defecto
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

// Modificado para usar stSolicitud
const StatusCircle: React.FC<{ status: Solicitud['stSolicitud'] }> = ({ status }) => {
    const isCompleted = status?.toUpperCase() === 'CERRADO' || status?.toUpperCase() === 'RESUELTO';
    const statusClass = `status-circle ${isCompleted ? 'completed' : 'in-progress'}`;

    return (
        <span className={statusClass} title={`Estado: ${status}`}>
            {isCompleted ? '🔵' : '🟡'}
        </span>
    );
};

// --- COMPONENTE PRINCIPAL ---

const TaskList: React.FC = () => {
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [cargando, setCargando] = useState(true);

    // 1. Carga de datos de la BD
    useEffect(() => {
        axios.get<Solicitud[]>("http://localhost:8080/basetomee/solicitud/list")
            .then(response => {
                setSolicitudes(response.data);
                setCargando(false);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los registros", error);
                setCargando(false);
                // Si la solicitud falla, inicializa con un array vacío para evitar errores
                setSolicitudes([]);
            });
    }, []);

    // Lógica de Agrupación (useMemo para optimizar el rendimiento)
    const groupedTasks: TaskGroup[] = useMemo(() => {
        if (solicitudes.length === 0) return [];

        const groupsMap = solicitudes.reduce((acc, soli) => {
            // Usamos stSolicitud como la clave para agrupar
            const status = soli.stSolicitud || 'SIN ESTADO';

            if (!acc[status]) {
                acc[status] = { name: status, tasks: [] };
            }

            acc[status].tasks.push(soli);
            return acc;
        }, {} as Record<string, TaskGroup>);

        // Convertir el mapa de grupos a un array para renderizar
        return Object.values(groupsMap);
    }, [solicitudes]); // Se recalcula si 'solicitudes' cambia


    if (cargando) return <p>Cargando registros...</p>
    if (solicitudes.length === 0) return <p>No se encontraron solicitudes.</p>


    // Función auxiliar para obtener las iniciales del asignado
    const getInitials = (fullName: string | undefined): string => {
        if (!fullName) return 'NA'; // No Asignado
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

            {/* Renderizado de los grupos de solicitudes (agrupados por stSolicitud) */}
            {groupedTasks.map((group) => (
                <React.Fragment key={group.name}>

                    {/* Renderizado de las solicitudes dentro del grupo */}
                    {group.tasks.map((soli) => {

                        // Determinar si la fecha de vencimiento es urgente
                        const dueDate = soli.feVencimiento ? new Date(soli.feVencimiento) : null;
                        const today = new Date();
                        const isOverdue = dueDate && dueDate < today;

                        // Clases condicionales
                        const rowClass = `task-row-grid`;
                        const dateClass = `date-text ${isOverdue ? 'urgent-date' : ''}`;

                        const assignedUser = soli.c_user_resolutor;
                        const assignedInitials = getInitials(assignedUser);

                        return (
                            <div key={soli.coSolicitud} className={rowClass}>

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