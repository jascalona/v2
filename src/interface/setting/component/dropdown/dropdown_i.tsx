import React, { useState, useRef, useEffect } from 'react';

//Icons
import PersonIcon from '@mui/icons-material/Person';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';


interface MenuItem {
    id: string;
    label: string;
    type: 'personal' | 'project';
}

// Define los datos estáticos para simular la estructura de la imagen
const initialItems: MenuItem[] = [
    { id: '1', label: 'Lista personal', type: 'personal' },
    { id: 'p1', label: 'Proyecto 1', type: 'project' },
    { id: 'p2', label: 'Proyecto 2', type: 'project' },
    { id: 'p3', label: 'Empieza con ClickUp', type: 'project' },
];

const CustomDropdown: React.FC = () => {
    // Estado para controlar si el menú está abierto o cerrado
    const [isOpen, setIsOpen] = useState(false);
    // Estado para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState('');

    // Referencia para detectar clics fuera del dropdown y cerrarlo
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Lógica de filtrado de elementos
    const filteredItems = initialItems.filter(item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Manejar el cierre al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Función para renderizar los elementos
    const renderItem = (item: MenuItem) => (
        <div key={item.id} className="dropdown-item">
            {/* Podrías añadir íconos aquí basados en item.type */}
            {item.type === 'personal' && <span><PersonIcon /></span>}
            {item.type === 'project' && <span>✅</span>}
            <span>{item.label}</span>
        </div>
    );

    return (
        <div className="custom-dropdown-container" ref={dropdownRef}>
            {/* Botón de Activación */}
            <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)} style={{ display: 'flex', alignContent: 'center' }}>
                <ChecklistIcon sx={{ fontSize: 15 }} /> Asignar...
            </button>

            {/* Menú Desplegable */}
            {isOpen && (
                <div className="dropdown-menu">

                    {/* Campo de Búsqueda */}
                    <div className="search-box">
                        <span><ManageSearchIcon /></span> {/* Ícono de búsqueda */}
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Lista de Resultados */}
                    <div className="dropdown-list">

                        {/* Título de Lista Personal */}
                        <div className="dropdown-group-title">
                            <span className="group-icon">👤</span>
                            Lista personal
                        </div>

                        {/* Renderizar Lista Personal Filtrada */}
                        {filteredItems
                            .filter(item => item.type === 'personal')
                            .map(renderItem)}

                        <div className="separator"></div>

                        {/* Título de Espacios de Equipo */}
                        <div className="dropdown-group-header">
                            <div className="group-title-left">
                                <span>▼</span>
                                Espacios de Equipo
                            </div>
                            <button className="add-button">+</button>
                        </div>

                        {/* Renderizar Proyectos Filtrados */}
                        <div className="project-list">
                            {filteredItems
                                .filter(item => item.type === 'project')
                                .map(renderItem)}
                        </div>

                        {filteredItems.length === 0 && (
                            <div className="no-results">No se encontraron resultados.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;