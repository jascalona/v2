import { useState, useEffect } from "react";
import axios from "axios";

// Icons
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SpokeIcon from '@mui/icons-material/Spoke';

// Componentes
import TextField from '@mui/material/TextField';


// Interfaz para la respuesta de la API (Categoría)
interface CategoriaAPI {
    cosubcategoria: string,
    nbsubcategoria: string 
}

// Interfaz para la estructura de datos que usa el componente internamente
interface Label {
    id: string; 
    title: string;
}

function LabelSubCategory() {

    // Estado principal para la lista de etiquetas, se inicializa vacío
    const [labels, setLabels] = useState<Label[]>([]); 
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Los estados de control de modales
    const [deletingLabel, setDeletingLabel] = useState<Label | null>(null);
    const [editlabel, setEditLabel] = useState<Label | null>(null);

    // Estado local para el formulario de edición
    const [newTitle, setNewTitle] = useState('');

    const API_URL = "http://localhost:8080/basetomee/subcategoria/listar"

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get<CategoriaAPI[]>(API_URL);
                
                // Mapeamos los datos de la API a la estructura interna (Label)
                const transformedLabels: Label[] = response.data.map(subcategoria => ({
                    id: subcategoria.cosubcategoria, 
                    title: subcategoria.nbsubcategoria, 
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
            {labels.map((label) => (
                <div className="row-item" key={label.id}> 
                    <span className="icon-ite"><SpokeIcon sx={{ color: 'grey'}} /></span> 
                    <div className="content-setting">
                        <p>{label.title}</p> {/* Usamos label.title que ahora es nbcategoria */}
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
            {labels.length === 0 && (
                <p style={{ textAlign: 'center', color: '#aaa', marginTop: '20px' }}>No hay etiquetas para mostrar.</p>
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

export default LabelSubCategory;