import { useState, useEffect } from "react";
import axios from "axios";

//Icons
import CloseIcon from '@mui/icons-material/Close';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import EditIcon from '@mui/icons-material/Edit';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


//Componentes
import TextField from '@mui/material/TextField';
import { green } from "@mui/material/colors";


// Interfaz para la respuesta de la API (Categoría)
interface Articulo {
    co_estado: string,
    nb_estado: string
}

// Interfaz para la estructura de datos que usa el componente internamente
interface Label {
    id: string;
    title: string;
}

function Labels() {

    // Estado principal para la lista de etiquetas, se inicializa vacío
    const [labels, setLabels] = useState<Label[]>([]);

    //Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 7;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Los estados de control de modales
    const [deletingLabel, setDeletingLabel] = useState<Label | null>(null);
    const [editlabel, setEditLabel] = useState<Label | null>(null);

    // Estado local para el formulario de edición
    const [newTitle, setNewTitle] = useState('');

    const API_URL = "http://localhost:8081/status"

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get<Articulo[]>(API_URL);

                // Mapeo de los datos de la API a la estructura interna (Label)
                const transformedLabels: Label[] = response.data.map(articulo => ({
                    id: articulo.co_estado,
                    title: articulo.nb_estado,
                }));

                setLabels(transformedLabels); // Establecemos los datos mapeados
                setError(null);
            } catch (err) {
                console.error("Error al obtener los registros:", err);
                // Usamos type assertion para el error, o lo manejamos como 'any'
                setError("Error al cargar los datos de la API: " + (axios.isAxiosError(err) ? err.message : "Error desconocido"));
            } finally {
                setLoading(false);
            }
        };

        fetchCategorias();
    }, []);

    //Logica del paginado
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




    // --- RENDERIZADO CONDICIONAL DE ESTADO ---
    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    // --- LOGICA DE GESTION DE LA MODAL Y ELIMINACION Y EDICION---

    // Abre la modal de confirmacion al hacer clic en 'x'
    const openDeleteModal = (label: Label) => {
        setDeletingLabel(label);
    };

    // Abre el modal de edicion y prepara el estado del formulario
    const openEditLabel = (labelToEdit: Label) => {
        setEditLabel(labelToEdit);
        setNewTitle(labelToEdit.title);
    }

    // Cierra el modal de edicion
    const closeEditModal = () => {
        setEditLabel(null);
        setNewTitle('');
    }

    // Cierra la modal de eliminación
    const closeDeleteModal = () => {
        setDeletingLabel(null);
    };


    // Ejecuta la EDICIÓN de la etiqueta
    const handeEdit = (id: string, newTitle: string) => {
        // Aquí  integrar la lógica para llamar a tu API de edición

        // Usa map para encontrar y reemplazar el elemento
        const updatedLabels = labels.map(label => {
            if (label.id === id) {
                // Devuelve una nueva etiqueta con el título actualizado
                return { ...label, title: newTitle };
            }
            return label;
        });

        setLabels(updatedLabels);
        closeEditModal(); // Cierra el modal después de editar
    }


    // Ejecuta la ELIMINACION de la etiqueta
    const handleDelete = (id: string) => {
        // Aquí integrar la lógica para llamar a tu API de eliminación

        setLabels(labels.filter(label => label.id !== id));
        closeDeleteModal(); // Cierra la modal después de eliminar
    };

    // Mensaje si no hay etiquetas después de la carga
    if (labels.length === 0) {
        return <p>No hay registros disponibles para mostrar.</p>;
    }


    return (
        <div className="labels-container">
            {/* LISTADO DE ETIQUETAS */}
            {currentLabels.map((label) => (
                <div className="row-item" key={label.id}>
                    <span className="icon-ite"><TurnedInIcon sx={{ color: '#666565ff' }} /></span>
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

                        {/* Botón de Eliminación: Llama a openDeleteModal */}
                        <button className="btn-label"
                            title={`Eliminar etiqueta "${label.title}"`}
                            onClick={() => openDeleteModal(label)}
                        >
                            <CloseIcon sx={{ fontSize: 15 }} />
                        </button>
                    </div>
                </div>
            ))}

            {/* Mensaje si no hay etiquetas */}
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


            {/* --- MODAL DE EDICIÓN --- */}
            {editlabel && (
                <div className="edit-modal-backdrop" style={{
                    position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center',
                    alignItems: 'center', zIndex: 1001 // Z-index superior
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
                            <label htmlFor="newTitle" style={{ display: 'block', marginBottom: '5px' }}>Nombre del estado:</label>
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
                                style={{ background: '#76777788', border: 'none', padding: '8px', borderRadius: '5px' }}
                            >
                                Cancelar
                            </button>
                            <button
                                // Llama a handeEdit con el ID de la etiqueta actual y el nuevo título
                                onClick={() => handeEdit(editlabel.id, newTitle)}
                                style={{ marginLeft: '10px', color: '#fafafaff', background: '#3876e5e1', padding: '8px', border: 'none', borderRadius: '5px' }}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MODAL DE CONFIRMACIÓN DE ELIMINACIÓN --- */}
            {deletingLabel && (
                <div className="delete-modal-backdrop" style={{
                    position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center',
                    alignItems: 'center', zIndex: 1000 // Z-index inferior al de edición
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
                                style={{ background: '#76777788', border: 'none', padding: '8px', borderRadius: '5px' }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleDelete(deletingLabel.id)}
                                style={{ marginLeft: '10px', color: '#fafafaff', background: '#e53835e1', padding: '8px', border: 'none', borderRadius: '5px' }} // Botón de "Borrar" en rojo
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

export default Labels;