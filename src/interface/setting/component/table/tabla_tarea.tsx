import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../../../../assets/css/table_task.css'

//Icons
import FlagIcon from '@mui/icons-material/Flag';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CircleIcon from '@mui/icons-material/Circle';


// --- TIPOS DE DATOS ---
interface Solicitud {
    co_tarea: string,
    tx_asunto: string,
    tx_description: string,
    fe_registro: string,
    fe_vencimiento: string,
    co_user_emisor: string,
    co_user_asignado: string,
    fe_cierre: string,
    co_solicitud: string,
    co_estado: string
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

const PriorityIcon: React.FC<{ priority: Solicitud['co_estado'] }> = ({ priority }) => {

    const priorityString = String(priority || '').trim();

    const p = priorityString.toUpperCase();

    // Clasificación de prioridad (la misma lógica que antes)
    let icon = <FlagIcon sx={{ fontSize: 15}} />; // Por defecto
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


// --- COMPONENTE PRINCIPAL ---

const TaskList: React.FC = () => {
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [cargando, setCargando] = useState(true);

    // 1. Carga de datos de la BD
    useEffect(() => {
        axios.get<Solicitud[]>("http://localhost:8081/task")
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
            const status = soli.co_estado || 'SIN ESTADO';

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
    if (solicitudes.length === 0) return <p>No se encontraron Tarea.</p>


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
                <TaskAltIcon sx={{fontSize: 16}}/>
                <span className="add-task-text">Tareas</span>
            </div>

            {/* Renderizado de los grupos de solicitudes (agrupados por stSolicitud) */}
            {groupedTasks.map((group) => (
                <React.Fragment key={group.name}>

                    {/* Renderizado de las solicitudes dentro del grupo */}
                    {group.tasks.map((soli) => {

                        // Determinar si la fecha de vencimiento es urgente
                        const dueDate = soli.fe_vencimiento ? new Date(soli.fe_vencimiento) : null;
                        const today = new Date();
                        const isOverdue = dueDate && dueDate < today;

                        // Clases condicionales
                        const rowClass = `task-row-grid`;
                        const dateClass = `date-text ${isOverdue ? 'urgent-date' : ''}`;

                        const assignedUser = soli.co_user_asignado;
                        const assignedInitials = getInitials(assignedUser);

                        return (
                            <div key={soli.co_tarea} className={rowClass}>

                                {/* Columna Asunto (txAsunto) */}
                                <div className="task-name-cell">
                                    {soli.tx_asunto}
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
                                    {soli.fe_vencimiento ? soli.fe_vencimiento.split('T')[0] : <CalendarIcon />}
                                </div>

                                {/* Columna Prioridad (coPrioridad) */}
                                <div>
                                    <PriorityIcon priority={soli.co_estado} />
                                    <span > {soli.co_estado}</span>
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