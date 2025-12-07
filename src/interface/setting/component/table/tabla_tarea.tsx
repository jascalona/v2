import React from 'react';
import '../../../../assets/css/table_task.css'

interface Tag {
  name: string;
  color: string;
}

interface Task {
  id: number;
  nombre: string;
  subtasks: number;
  attachments: number;
  comments: number;
  tags: Tag[];
  personaAsignada: string;
  fechaLimite: string;
  prioridad: 'Urgente' | 'Normal' | 'Baja';
  isCompleted: boolean;
}

interface TaskGroup {
  name: string;
  tasks: Task[];
}

// --- Datos Estáticos (Mantenemos los datos) ---

const staticData: TaskGroup[] = [
  {
    name: 'TAREAS PENDIENTES',
    tasks: [
      {
        id: 1,
        nombre: 'Task 1',
        subtasks: 1,
        attachments: 3,
        comments: 4,
        tags: [{ name: 'syjcoud', color: '#B39DDB' }],
        personaAsignada: 'AE',
        fechaLimite: 'Ayer',
        prioridad: 'Urgente',
        isCompleted: false,
      },
    ],
  },
  {
    name: 'PENDIENTE',
    tasks: [
      {
        id: 2,
        nombre: 'Task 2',
        subtasks: 0,
        attachments: 0,
        comments: 0,
        tags: [],
        personaAsignada: '',
        fechaLimite: '',
        prioridad: 'Normal',
        isCompleted: false,
      },
      {
        id: 3,
        nombre: 'Task 3',
        subtasks: 0,
        attachments: 0,
        comments: 0,
        tags: [],
        personaAsignada: '',
        fechaLimite: '',
        prioridad: 'Normal',
        isCompleted: false,
      },
    ],
  },
];

// --- Componentes Reutilizables (Actualizados para usar clases CSS) ---

const AssignedPersonIcon: React.FC<{ initials: string }> = ({ initials }) => (
  <div className="assigned-person-icon">
    {initials}
  </div>
);

const CalendarIcon: React.FC = () => (
  <span className="calendar-icon">🗓</span>
);

const PriorityIcon: React.FC<{ priority: Task['prioridad'] }> = ({ priority }) => {
  const isUrgent = priority === 'Urgente';
  const iconClass = `priority-icon ${isUrgent ? 'urgent' : ''}`; // Podríamos usar una clase específica para el color rojo

  return (
    <span className={iconClass}>
      {isUrgent ? '🚩' : '🏳️'}
    </span>
  );
};

const AddIcon: React.FC = () => (
  <span className="add-icon">+</span>
);

const StatusCircle: React.FC<{ isCompleted: boolean }> = ({ isCompleted }) => {
    const statusClass = `status-circle ${isCompleted ? 'completed' : ''}`;

    return (
        <span className={statusClass}>
            {/* Usando iconos simples para simular el estado de la tarea */}
            {isCompleted ? '🔵' : '⚪'}
        </span>
    );
};

// --- Componente Principal ---

const TaskList: React.FC = () => {
  return (
    <div className="task-list-container">
      {/* Encabezado global de la tabla */}
      <div className="header-row">
        <div>Nombre</div>
        <div>Persona asignada</div>
        <div>Fecha límite</div>
        <div>Prioridad</div>
        <div><AddIcon /></div>
      </div>

      {/* Renderizado de los grupos de tareas */}
      {staticData.map((group, index) => (
        <React.Fragment key={index}>
          {/* Título de la sección (ej. PENDIENTE 2) */}
          {group.name !== 'TAREAS PENDIENTES' && ( 
            <div className="group-title">
              <span className="group-title-arrow">▼</span>
              {group.name}
              <span className="group-task-count">
                {group.tasks.length}
              </span>
            </div>
          )}
          
          <div className="add-task-button">
            <AddIcon />
            <span className="add-task-text">Solicitudes</span>
          </div>

          {/* Renderizado de las tareas */}
          {group.tasks.map((task) => {
            // Clases condicionales
            const rowClass = `task-row-grid ${task.id === 1 ? 'task-row-active' : ''}`;
            const dateClass = `date-text ${task.fechaLimite === 'Ayer' ? 'urgent-date' : ''}`;
            
            return (
                <div key={task.id} className={rowClass}>
                  {/* Columna Nombre */}
                  <div className="task-name-cell">
                    <StatusCircle isCompleted={task.id === 1} />
                    {task.nombre}
                    <TaskInfoIcons task={task} />
                  </div>

                  {/* Columna Persona asignada */}
                  <div>
                    {task.personaAsignada ? (
                      <AssignedPersonIcon initials={task.personaAsignada} />
                    ) : (
                      <span className="person-placeholder">👤</span> // Placeholder
                    )}
                  </div>

                  {/* Columna Fecha límite */}
                  <div className={dateClass}>
                    {task.fechaLimite ? task.fechaLimite : <CalendarIcon />}
                  </div>

                  {/* Columna Prioridad */}
                  <div>
                    <PriorityIcon priority={task.prioridad} />
                    {task.prioridad === 'Urgente' && <span className="priority-urgent-text">{task.prioridad}</span>}
                  </div>

                  {/* Columna Extra */}
                  <div></div>
                </div>
            );
          })}

        </React.Fragment>
      ))}
      
    </div>
  );
};

export default TaskList;