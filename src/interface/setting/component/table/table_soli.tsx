import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../../assets/css/table_task.css';

// Iconos
import FlagIcon from '@mui/icons-material/Flag';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Solicitud {
    co_solicitud: string;
    fe_vencimiento?: string;
    co_user_credor_soli?: string;
    tx_asunto?: string;
    co_estado?: any;
}

const PriorityIcon: React.FC<{ priority?: any }> = ({ priority }) => {
    const statusStr = String(priority || 'SIN ESTADO').toUpperCase();
    const getPriorityColor = (p: string) => {
        if (p.includes('ALTA') || p.includes('URGENTE') || p === '1') return '#ef4444';
        if (p.includes('MEDIA') || p === '2') return '#f59e0b';
        return '#64748b';
    };
    return <FlagIcon sx={{ fontSize: 16, color: getPriorityColor(statusStr) }} />;
};

const TaskListSoli: React.FC = () => {
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [cargando, setCargando] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<Solicitud[]>("http://localhost:8081/request")
            .then(response => {
                setSolicitudes(Array.isArray(response.data) ? response.data : []);
                setCargando(false);
            })
            .catch(error => {
                console.error("Error API:", error);
                setCargando(false);
            });
    }, []);

    // --- LÓGICA DE FILTRADO ---
    const filteredRows = useMemo(() => {
        return solicitudes.filter(soli => {
            const search = searchTerm.toLowerCase();
            return (
                String(soli.tx_asunto).toLowerCase().includes(search) ||
                String(soli.co_solicitud).toLowerCase().includes(search) ||
                String(soli.co_user_credor_soli).toLowerCase().includes(search)
            );
        });
    }, [solicitudes, searchTerm]);

    // --- LÓGICA DE PAGINACIÓN ---
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    const currentRows = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredRows.slice(start, start + rowsPerPage);
    }, [filteredRows, currentPage]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset a pág 1 al buscar
    };

    const clearSearch = () => {
        setSearchTerm("");
        setCurrentPage(1);
    };

    const getInitials = (name?: string) => {
        if (!name) return '??';
        const parts = String(name).trim().split(' ');
        return parts.length > 1 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : parts[0].substring(0, 2).toUpperCase();
    };




    if (cargando) return <div style={{ padding: '20px' }}>Cargando...</div>;

    return (
        <div className="main-page-wrapper">
            <header className="page-header" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                <h2 style={{ fontWeight: 'bold', fontSize: '24px', margin: 0 }}>
                    Gestión de Solicitudes
                    <span className="badge-count" style={{ background: '#eee', padding: '2px 8px', borderRadius: '5px', fontSize: '14px', marginLeft: '10px' }}>
                        {filteredRows.length}
                    </span>
                </h2>

                <div className="search-container">
                    <SearchIcon className="search-icon" fontSize="small" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by title"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {searchTerm && (
                        <span className="clear-icon" onClick={() => setSearchTerm('')}>
                            ×
                        </span>
                    )}
                </div>
            </header>

            <div className="task-list-container">
                <div className="header-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '10px 20px', background: '#f9f9f9', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
                    <div>Asunto</div>
                    <div>Solicitante</div>
                    <div>Vencimiento</div>
                    <div>Estado</div>
                </div>

                <div className="table-body" style={{ minHeight: '400px' }}>
                    {currentRows.length > 0 ? (
                        currentRows.map(soli => (
                            <div
                                key={soli.co_solicitud}
                                className="task-row-grid"
                                onClick={() => navigate('/detalles', { state: { solicitudSeleccionada: soli } })}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                                    padding: '15px 20px',
                                    borderBottom: '1px solid #eee',
                                    cursor: 'pointer',
                                    alignItems: 'center'
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: 500 }}>{String(soli.tx_asunto || 'Sin asunto').substring(0, 45)}</div>
                                    <div style={{ fontSize: '11px', color: '#888' }}>#{soli.co_solicitud}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>
                                        {getInitials(soli.co_user_credor_soli)}
                                    </div>
                                    <span style={{ fontSize: '14px' }}>{soli.co_user_credor_soli || 'N/A'}</span>
                                </div>
                                <div style={{ color: '#666', fontSize: '14px' }}>
                                    <CalendarTodayIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                                    {soli.fe_vencimiento ? soli.fe_vencimiento.split('T')[0] : '---'}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
                                    <PriorityIcon priority={soli.co_estado} />
                                    <span>{String(soli.co_estado || 'Pendiente')}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                            No se encontraron resultados para "{searchTerm}"
                        </div>
                    )}
                </div>

                {/* --- PAGINADOR --- */}
                <div className="pagination-container">
                    <div className="pagination-info">
                        Mostrando <b>{filteredRows.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0}</b> a <b>{Math.min(currentPage * rowsPerPage, filteredRows.length)}</b> de <b>{filteredRows.length}</b>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                            className="pagination-button"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            <ChevronLeftIcon fontSize="small" />
                        </button>

                        <span style={{ fontSize: '14px', color: '#475569' }}>
                            Página <b>{currentPage}</b> de {totalPages || 1}
                        </span>

                        <button
                            className="pagination-button"
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            <ChevronRightIcon fontSize="small" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskListSoli;