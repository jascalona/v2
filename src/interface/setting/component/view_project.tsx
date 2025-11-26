import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'; // Importación necesaria para las columnas
import axios from 'axios';

// Asegúrate de que esta ruta de CSS sea correcta
import '../../../assets/css/view_project.css';

import NewProject from './modal/modal_project'


// Interfaz para los proyectos estáticos (usados en CardView)
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

// Interfaz para los datos de la API
interface Producto {
    coproducto: string,
    nbproducto: string,
    stproducto: string
}

// --- Datos Estáticos Tipados ---
const PROJECTS: Project[] = [
    // ... Tus datos estáticos originales aquí ...
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

// Interfaz de props para CardView (usa los datos estáticos)
interface CardViewProps {
    productos_card: Producto[];
}

// Interfaz de props para TableView (usa los datos del API)
interface TableViewProps {
    productos_table: Producto[];
}


// Componente para la Vista de Tarjetas (Imagen 1)
const CardView: React.FC<CardViewProps> = ({ productos_card }) => (
    <div className="card-grid">
        {productos_card.map((producto) => (
            <div key={producto.coproducto} className="card">
                {/* Imagen de encabezado */}
                <div className="card-image-wrapper">
                    <img
                        src={"https://images.unsplash.com/photo-1488229297570-58520851e868?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt={producto.nbproducto}
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
                            <h2 className="card-title">{producto.nbproducto}</h2>
                        </div>
                        <p className="card-subtitle">Soluciones Sycom</p>
                    </div>
                </div>

                {/* Cuerpo de la tarjeta */}
                <div className="card-body">
                    <p className='card-description'>{producto.stproducto}</p>
                    <p className="card-description">aqui va la descripcion</p>
                    <div className="card-footer">
                        {/*DEFINIR DEPUES*/}
                    </div>
                </div>
            </div>
        ))}
    </div>
);


// Ahora recibe y renderiza los datos de la API usando DataTable
const TableView: React.FC<TableViewProps> = ({ productos_table }) => {
    return (
        <div className="p-card">
            <DataTable
                value={productos_table}
                paginator
                rows={15}
                dataKey="coproducto" // Clave única para la tabla
                emptyMessage="No hay productos disponibles."
                className="tabla-empresa"
                paginatorClassName="mi-paginador-personalizado"
            >
                {/* Columnas de la tabla, basadas en la interfaz Producto */}
                <Column field="coproducto" header="Código Producto" sortable />
                <Column field="nbproducto" header="Nombre del Producto" sortable />
                <Column field="stproducto" header="Estado" sortable />
            </DataTable>
        </div>
    );
};


// --- Componente Principal Tipado y con CSS embebido ---
const ProjectExplorer: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewType>('card');

    // Estado para almacenar los datos del API
    const [producto, setProducto] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true);

    // useEffect para la llamada al API con Axios
    useEffect(() => {
        axios.get<Producto[]>("http://localhost:8080/basetomee/producto/listar")
            .then(response => {
                setProducto(response.data);
                setCargando(false);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los registros", error);
                setCargando(false);
            });
    }, []);


    if (cargando) return <p>Cargando registros...</p>

    return (
        <div className="app-container">

            {/* Barra de Navegación/Control de Vista (show-nav) */}
            <div className="nav-bar">
                <div className="nav-content">

                    {/* Título de la sección */}
                    <h3 className="title">
                        Gestion de Productos
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

                    </div>
                </div>
            </div>

            {/* Contenido Dinámico de la Vista */}
            <main className="main-content">
                {/* CardView usa los datos estáticos PROJECTS */}
                {currentView === 'card' && <CardView productos_card={producto} />}

                {/* TableView usa los datos del API almacenados en el estado 'producto' */}
                {currentView === 'table' && <TableView productos_table={producto} />}
            </main>

            {/* Footer para visualización en móvil */}
            <footer style={{ height: '4rem' }}></footer>
        </div>
    );
};

export default ProjectExplorer;