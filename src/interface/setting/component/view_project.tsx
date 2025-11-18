import React, { useState } from 'react';
import '../../../assets/css/view_project.css';
import NewProject from './modal_project'

// --- 1. Definición de Tipos (Interface) ---
interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    status: 'Activo' | 'En curso' | 'Pendiente';
    priority: 'Baja' | 'Media' | 'Urgente';
    assigned: string;
    tags: string[];
    module: string;
    cycle: string;
    date: string;
    imageUrl: string;
}

// --- Datos Estáticos Tipados ---
const PROJECTS: Project[] = [
    {
        id: 'BANC-2',
        title: 'Certificación',
        subtitle: 'CERTIFICADO',
        description: 'probador y probador',
        status: 'Activo',
        priority: 'Baja',
        assigned: 'Cesionarios',
        tags: ['Frontend', 'UI/UX'],
        module: 'Módulo A',
        cycle: 'Q4 2024',
        date: '10 de noviembre',
        imageUrl: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=1555&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 'BANC-1',
        title: 'Producción Bancrecer',
        subtitle: 'BANCR',
        description: 'certificacion de bancrecer/produccion',
        status: 'En curso',
        priority: 'Urgente',
        assigned: 'Cesionarios',
        tags: ['Backend', 'API'],
        module: 'Módulo B',
        cycle: 'Q1 2025',
        date: '1 de noviembre',
        imageUrl: 'https://images.unsplash.com/photo-1488229297570-58520851e868?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 'BANC-3',
        title: 'BANCR-1 | Desarrollo TestStep',
        subtitle: 'Nuevo Feature',
        description: 'Implementación del nuevo flujo de pagos',
        status: 'Pendiente',
        priority: 'Media',
        assigned: 'Jane Doe',
        tags: ['Database', 'Refactor'],
        module: 'Módulo C',
        cycle: 'Q4 2024',
        date: '15 de diciembre',
        imageUrl: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
];

// Tipo para la vista
type ViewType = 'card' | 'table';

// --- 3. Iconos SVG ---
const LayoutGridIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
);

const ListOrderedIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" /><path d="M4 6h1" /><path d="M4 12h1" /><path d="M4 18h1" />
    </svg>
);

const SettingsIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.44a2 2 0 0 0-2 2H4a2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2h.44a2 2 0 0 0 2 2v.44a2 2 0 0 0 2 2h.44a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.44a2 2 0 0 0 2-2h.44a2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2h-.44a2 2 0 0 0-2-2v-.44a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" />
    </svg>
);

const PinIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 17V5h6v12h-6zM8 5v12M12 5l-3 3M12 17l3 3" />
    </svg>
);

// --- 4. Componentes de Vista Tipados ---

interface ViewProps {
    projects: Project[];
}

// Componente para la Vista de Tarjetas (Imagen 1)
const CardView: React.FC<ViewProps> = ({ projects }) => (
    <div className="card-grid">
        {projects.map((project) => (
            <div key={project.id} className="card">
                {/* Imagen de encabezado */}
                <div className="card-image-wrapper">
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="card-image"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://placehold.co/600x250/9CA3AF/ffffff?text=Proyecto';
                        }}
                    />
                    {/* Superposición con título y acciones */}
                    <div className="card-overlay">
                        <div className="card-title-actions">
                            <h2 className="card-title">{project.title}</h2>
                        </div>
                        <p className="card-subtitle">{project.subtitle}</p>
                    </div>
                </div>

                {/* Cuerpo de la tarjeta */}
                <div className="card-body">
                    <p className="card-description">{project.description}</p>
                    <div className="card-footer">
                        {/*DEFINIR DEPUES*/}
                    </div>
                </div>
            </div>
        ))}
    </div>
);

// Componente para la Vista de Tabla (Imagen 2)
const TableView: React.FC<ViewProps> = ({ projects }) => (
    <div className="table-wrapper">
        {/* Encabezado de la tabla, simulando filtros */}
        <div className="table-header">
            <div className="header-col">Elementos de trabajo <span className="sort-icon">▼</span></div>
            <div className="header-col-small">Estado <span className="sort-icon">▼</span></div>
            <div className="header-col-small">Prioridad <span className="sort-icon">▼</span></div>
            <div className="header-col-small">Cesionarios <span className="sort-icon">▼</span></div>
            <div className="header-col-small cell-placeholder">Etiquetas <span className="sort-icon">▼</span></div>
            <div className="header-col-small cell-placeholder">Módulos <span className="sort-icon">▼</span></div>
            <div className="header-col-small cell-placeholder">Ciclo <span className="sort-icon">▼</span></div>
            <div className="header-col-date">Fecha de creación <span className="sort-icon">▼</span></div>
        </div>

        {/* Filas de datos */}
        {projects.map((project) => (
            <div key={project.id} className="table-row">
                {/* Elementos de trabajo (ID + Título) */}
                <div className="cell-title">
                    <span className="cell-id">{project.id}</span>
                    {project.title}
                </div>

                {/* Estado */}
                <div className="cell-small">
                    <span className={`badge status-${project.status.toLowerCase().replace(/\s/g, '-')}`}>
                        {project.status}
                    </span>
                </div>

                {/* Prioridad */}
                <div className="cell-small">
                    <span className={`badge priority-${project.priority.toLowerCase()}`}>
                        {project.priority}
                    </span>
                </div>

                {/* Cesionarios */}
                <div className="cell cell-small">{project.assigned}</div>

                {/* Etiquetas */}
                <div className="cell cell-small cell-placeholder">Seleccionar etiquetas</div>

                {/* Módulos */}
                <div className="cell cell-small cell-placeholder">Seleccionar módulos</div>

                {/* Ciclo */}
                <div className="cell cell-small cell-placeholder">Seleccionar ciclo</div>

                {/* Fecha */}
                <div className="cell cell-date">{project.date}</div>
            </div>
        ))}
    </div>
);

// --- 5. Componente Principal Tipado y con CSS embebido ---

const ProjectExplorer: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewType>('card');

    return (
        <div className="app-container">


            {/* Barra de Navegación/Control de Vista (show-nav) */}
            <div className="nav-bar">
                <div className="nav-content">

                    {/* Título de la sección */}
                    <h3 className="title">
                        Gestion de Proyectos
                    </h3>

                    {/* Barra de botones de vista */}
                    <div className="view-toggle-container">
                        <div className="view-buttons-group">

                            {/* Botón de Vista de Tarjetas */}
                            <button
                                onClick={() => setCurrentView('card')}
                                className={`view-button ${currentView === 'card' ? 'active' : ''}`}
                                title="Vista en Tarjetas"
                            >
                                <LayoutGridIcon />
                                <span>Canvas</span>
                            </button>

                            {/* Botón de Vista de Tabla */}
                            <button
                                onClick={() => setCurrentView('table')}
                                className={`view-button ${currentView === 'table' ? 'active' : ''}`}
                                title="Vista en Tabla"
                            >
                                <ListOrderedIcon />
                                <span>Tabla</span>
                            </button>
                        </div>

                        <div className="btn-modal" style={{ marginLeft: 10 }}>
                            <NewProject />
                        </div>

                    </div>
                </div>
            </div>

            {/* Contenido Dinámico de la Vista */}
            <main className="main-content">
                {currentView === 'card' && <CardView projects={PROJECTS} />}
                {currentView === 'table' && <TableView projects={PROJECTS} />}
            </main>

            {/* Footer para visualización en móvil */}
            <footer style={{ height: '4rem' }}></footer>
        </div>
    );
};

export default ProjectExplorer;