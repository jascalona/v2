// CustomDropdown.tsx

import React, { useState, useRef, useEffect } from 'react';

// Icons
import PersonIcon from '@mui/icons-material/Person';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SettingsIcon from '@mui/icons-material/Settings';

// *** IMPORTAMOS LA INTERFAZ CENTRALIZADA ***
import type {MenuItem} from '../dropdown/interface';

// Definición de Props usando la interfaz MenuItem importada
interface CustomDropdownProps {
    items: MenuItem[];
    title: string;
    icon?: React.ReactNode;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ items, title, icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Lógica de filtrado
    const filteredItems = items.filter(item =>
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
            {item.type === 'ambiente' && <span><PersonIcon /></span>}
            {item.type === 'producto' && <span><BusinessCenterIcon sx={{ fontSize: 15 }} /></span>}

            <span>{item.label}</span>
        </div>
    );

    return (
        <div className="custom-dropdown-container" ref={dropdownRef}>
            {/* Botón de Activación */}
            <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)} style={{ display: 'flex', alignContent: 'center', margin: 3 }}>
                {icon && <span style={{ marginRight: 5 }}>{icon}</span>}
                {title}
            </button>

            {/* Menú Desplegable */}
            {isOpen && (
                <div className="dropdown-menu">
                    {/* Campo de Búsqueda */}
                    <div className="search-box">
                        <span><ManageSearchIcon /></span>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Lista de Resultados */}
                    <div className="dropdown-list">

                        {/* Renderizar Ambiente Filtrado */}
                        {filteredItems
                            .filter(item => item.type === 'ambiente')
                            .map(renderItem)}

                        <div className="separator"></div>

                        {/* Renderizar Productos Filtrados */}
                        <div className="project-list">
                            {filteredItems
                                .filter(item => item.type === 'producto' || item.type === 'project')
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