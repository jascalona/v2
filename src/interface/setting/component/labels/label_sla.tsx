import { useState, useEffect } from "react";
import axios from "axios";

// Icons
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


// Componentes
import TextField from '@mui/material/TextField';

// Interfaz para la respuesta de la API (Categoría)
interface SLA {
    co_sla: string,
    nb_sla: string,
    co_unidad_tiempo: string,
    nu_cantidad: string
}

// Interfaz para la estructura de datos que usa el componente internamente
interface Label {
    id: string;
    title: string;
}

function LabelSLA() {

    const [labels, setLabels] = useState<Label[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 7;

    const [deletingLabel, setDeletingLabel] = useState<Label | null>(null);
    const [editlabel, setEditLabel] = useState<Label | null>(null);

    const [newTitle, setNewTitle] = useState('');

    const API_URL = "http://localhost:8081/sla"

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get<SLA[]>(API_URL);

                const transformedLabels: Label[] = response.data.map(subcategoria => ({
                    id: subcategoria.co_sla,
                    title: subcategoria.nb_sla,
                }));

                setLabels(transformedLabels);
                setError(null);
            } catch (err) {
                console.error("Error al obtener los registros:", err);
                setError("Error al cargar los datos de la API: " + (axios.isAxiosError(err) ? err.message : "Error desconocido"));
            } finally {
                setLoading(false);
            }
        };

        fetchCategorias();
    }, []);

    const totalPages = Math.ceil(labels.length / ITEMS_PER_PAGE);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

    const currentLabels = labels.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    //Logica del paginado
    const goToNextPage = () => {
        paginate(currentPage + 1);
    };

    const goToPrevPage = () => {
        paginate(currentPage - 1);
    };

    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    const goToLastPage = () => {
        setCurrentPage(totalPages);
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    const openDeleteModal = (label: Label) => {
        setDeletingLabel(label);
    };

    const openEditLabel = (labelToEdit: Label) => {
        setEditLabel(labelToEdit);
        setNewTitle(labelToEdit.title);
    }

    const closeEditModal = () => {
        setEditLabel(null);
        setNewTitle('');
    }

    const closeDeleteModal = () => {
        setDeletingLabel(null);
    };

    const handeEdit = (id: string, newTitle: string) => {
        const updatedLabels = labels.map(label => {
            if (label.id === id) {
                return { ...label, title: newTitle };
            }
            return label;
        });

        setLabels(updatedLabels);
        closeEditModal();
    }

    const handleDelete = (id: string) => {
        setLabels(labels.filter(label => label.id !== id));
        closeDeleteModal();

        const remainingItemsInPage = labels.filter(label => label.id !== id).slice(indexOfFirstItem, indexOfLastItem).length;
        if (remainingItemsInPage === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (labels.length === 0) {
        return <p>No hay registros disponibles para mostrar.</p>;
    }

    // Estilo para los botones de control de paginación (<<, <, >, >>)
    const controlButtonStyle = (disabled: boolean) => ({
        padding: '6px', // Reduje el padding para que los iconos se vean bien
        border: '1px solid #ddd',
        borderRadius: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: disabled ? '#f5f5f5' : '#fff',
        color: disabled ? '#ccc' : '#666',
        fontWeight: 'normal',
        margin: '0 2px',
        transition: 'all 0.3s ease',
    });

    // Estilo para los botones de número de página
    const pageButtonStyle = (isActive: boolean) => ({
        width: '36px',
        height: '36px',
        borderRadius: '8px', // Rectangular con bordes redondeados
        border: isActive ? 'none' : '1px solid #ddd',
        cursor: 'pointer',
        backgroundColor: isActive ? '#28587d' : '#fff', // Color principal para activo
        color: isActive ? '#fff' : '#28587d', // Color de texto para activo
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '14px',
        fontWeight: isActive ? 'bold' : 'normal',
        margin: '0 2px',
        transition: 'all 0.3s ease',
    });

    return (
        <div className="labels-container">

            {currentLabels.map((label) => (
                <div className="row-item" key={label.id}>
                    <span className="icon-ite"><StackedLineChartIcon sx={{ color: '#4d4c4cff' }} /></span>
                    <div className="content-setting">
                        <p>{label.title}</p>
                    </div>

                    <div className="control-btn" style={{ display: "flex" }}>
                        <button
                            title={`Editar etiqueta "${label.title}"`}
                            className="btn-label"
                            style={{ marginRight: '3px' }}
                            onClick={() => openEditLabel(label)}
                        >
                            <EditIcon sx={{ fontSize: 15 }} />
                        </button>

                        <button className="btn-label"
                            title={`Eliminar etiqueta "${label.title}"`}
                            onClick={() => openDeleteModal(label)}
                        >
                            <CloseIcon sx={{ fontSize: 15 }} />
                        </button>
                    </div>
                </div>
            ))}
            {labels.length === 0 && (
                <p style={{ textAlign: 'center', color: '#aaa', marginTop: '20px' }}>No hay etiquetas para mostrar.</p>
            )}

            {/* --- CONTROLES DE PAGINACIÓN (ESTILOS ACTUALIZADOS) --- */}
            {totalPages > 1 && (
                <div className="pagination-controls" style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4px' // Espacio entre los botones
                }}>
                    {/* Botón de ir a la primera página (<<) */}
                    <button
                        className="control-button"
                        onClick={goToFirstPage}
                        disabled={currentPage === 1}
                        style={controlButtonStyle(currentPage === 1)}
                    >
                        <FirstPageIcon fontSize="small" />
                    </button>

                    {/* Botón de ir a la página anterior (<) */}
                    <button
                        className="control-button"
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        style={controlButtonStyle(currentPage === 1)}
                    >
                        <ChevronLeftIcon fontSize="small" />
                    </button>

                    {/* Generar los botones de número de página */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`page-button ${index + 1 === currentPage ? 'active' : ''}`}
                            onClick={() => paginate(index + 1)}
                            style={pageButtonStyle(index + 1 === currentPage)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Botón de ir a la página siguiente (>) */}
                    <button
                        className="control-button"
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        style={controlButtonStyle(currentPage === totalPages)}
                    >
                        <ChevronRightIcon fontSize="small" />
                    </button>

                    {/* Botón de ir a la última página (>>) */}
                    <button
                        className="control-button"
                        onClick={goToLastPage}
                        disabled={currentPage === totalPages}
                        style={controlButtonStyle(currentPage === totalPages)}
                    >
                        <LastPageIcon fontSize="small" />
                    </button>
                </div>
            )}

            {/* --- MODAL DE EDICIÓN (SIN CAMBIOS) --- */}
            {editlabel && (
                <div className="edit-modal-backdrop" style={{
                    position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center',
                    alignItems: 'center', zIndex: 1001
                }}>
                    <div className="modal-content" style={{
                        backgroundColor: '#fff',
                        padding: '25px',
                        borderRadius: '8px',
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
                    }}>
                        <h3>Editar etiqueta</h3>
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="newTitle" style={{ display: 'block', marginBottom: '5px' }}>Nombre del Articulo:</label>
                            <TextField
                                fullWidth
                                placeholder="Por ejemplo, Desarrollo"
                                variant="outlined"
                                size="small"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '5px',
                                    },
                                }}
                            />
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <button
                                onClick={closeEditModal}
                                style={{ background: '#76777788', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handeEdit(editlabel.id, newTitle)}
                                style={{ marginLeft: '10px', color: '#fafafaff', background: '#3876e5e1', padding: '8px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MODAL DE CONFIRMACIÓN DE ELIMINACIÓN (SIN CAMBIOS) --- */}
            {deletingLabel && (
                <div className="delete-modal-backdrop" style={{
                    position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center',
                    alignItems: 'center', zIndex: 1000
                }}>
                    <div className="modal-content" style={{
                        backgroundColor: '#e7e7ebff',
                        padding: '25px',
                        borderRadius: '8px',
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
                        color: ''
                    }}>
                        <h3>Eliminar etiqueta</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.4' }}>
                            ¿Está seguro de que desea eliminar **{deletingLabel.title}**?
                            Esto eliminará la etiqueta de todos los elementos de trabajo y de las vistas que la filtren.
                        </p>
                        <div style={{ textAlign: 'right' }}>
                            <button
                                onClick={closeDeleteModal}
                                style={{ background: '#76777788', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleDelete(deletingLabel.id)}
                                style={{ marginLeft: '10px', color: '#fafafaff', background: '#e53835e1', padding: '8px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LabelSLA;