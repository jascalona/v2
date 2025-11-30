import { useState } from "react";
// Si estás usando Material UI, puedes importar los íconos de navegación
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// Definición de tipo para una tarea
interface Task {
    id: number;
    asunto: string;
    prioridad: string;
    asignado: string;
}

// Datos de ejemplo para simular una lista larga (más de 5)
const mockTasks: Task[] = [
    { id: 1, asunto: "Monitorización del componente Prometheus 1", prioridad: "Alto", asignado: "Jose Escalona" },
    { id: 2, asunto: "Revisar logs del servidor web 2", prioridad: "Medio", asignado: "Ana Torres" },
    { id: 3, asunto: "Actualización de la librería de seguridad 3", prioridad: "Bajo", asignado: "Pedro García" },
    { id: 4, asunto: "Despliegue de nuevo microservicio 4", prioridad: "Alto", asignado: "Laura Soto" },
    { id: 5, asunto: "Análisis de rendimiento de base de datos 5", prioridad: "Medio", asignado: "Carlos Ruiz" },
    { id: 6, asunto: "Ajuste de estilos CSS en el dashboard 6", prioridad: "Bajo", asignado: "Jose Escalona" },
    { id: 7, asunto: "Configurar caché para API de usuarios 7", prioridad: "Alto", asignado: "Ana Torres" },
    { id: 8, asunto: "Limpieza de datos de prueba antiguos 8", prioridad: "Medio", asignado: "Pedro García" },
    { id: 9, asunto: "Documentación del proceso de build 9", prioridad: "Alto", asignado: "Laura Soto" },
    { id: 10, asunto: "Testing de regresión en módulo de pagos 10", prioridad: "Bajo", asignado: "Carlos Ruiz" },
    { id: 11, asunto: "Revisión de vulnerabilidades de Docker 11", prioridad: "Alto", asignado: "Jose Escalona" },
    { id: 12, asunto: "Optimización de consultas SQL lentas 12", prioridad: "Medio", asignado: "Ana Torres" },
];

// ************************************************************
// Componente para renderizar un solo ítem de tarea
const TaskItem: React.FC<{ task: Task }> = ({ task }) => (
    <div className="item-task">
        <div>
            {/* Limitamos el asunto a 35 caracteres y añadimos "..." si es más largo */}
            <h4>
                {task.asunto.length > 35 
                    ? task.asunto.substring(0, 35) + '...' 
                    : task.asunto}
            </h4>
            <p>Asignado: <strong>{task.asignado}</strong></p>
        </div>
        <div>
            <p>Prioridad: <strong>{task.prioridad}</strong></p>
        </div>
    </div>
);

// ************************************************************
// Componente ListTask principal
const ListTask: React.FC<{ tasks?: Task[] }> = ({ tasks = mockTasks }) => {
    // Estado para la página actual, inicia en 1
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5; // Límite de 5 registros por página

    // Cálculo de índices para el "slice" de la lista
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    // Obtener los registros de la página actual
    const currentRecords = tasks.slice(indexOfFirstRecord, indexOfLastRecord);

    // Cálculo del número total de páginas
    const totalPages = Math.ceil(tasks.length / recordsPerPage);

    // Función para cambiar de página
    const paginate = (pageNumber: number) => {
        // Asegura que el número de página esté dentro de los límites válidos
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Array con los números de página (para generar los botones)
    const pageNumbers: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="list-task-container">
            {/* Contenedor de la lista de tareas */}
            <div className="list-task">
                {currentRecords.map(task => (
                    <TaskItem key={task.id} task={task} />
                ))}

                {/* Mensaje si no hay registros */}
                {tasks.length === 0 && (
                    <p style={{ textAlign: 'center', padding: '20px' }}>No hay registros para mostrar.</p>
                )}
            </div>

            {/* Paginado, solo se muestra si hay más de 5 registros */}
            {totalPages > 1 && (
                <div className="pagination">
                    {/* Botón Anterior */}
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        {/* Usamos el ícono si está disponible, sino texto */}
                        {typeof NavigateBeforeIcon !== 'undefined' ? <NavigateBeforeIcon /> : 'Anterior'}
                    </button>
                    
                    {/* Renderizamos los botones de número de página */}
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            // Aplica la clase 'active' para el estilo del botón actual
                            className={currentPage === number ? 'active' : ''} 
                        >
                            {number}
                        </button>
                    ))}

                    {/* Botón Siguiente */}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        {/* Usamos el ícono si está disponible, sino texto */}
                        {typeof NavigateNextIcon !== 'undefined' ? <NavigateNextIcon /> : 'Siguiente'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default ListTask;