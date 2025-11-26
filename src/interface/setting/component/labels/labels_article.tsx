import { useState } from "react";

//Icons
import CloseIcon from '@mui/icons-material/Close';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import EditIcon from '@mui/icons-material/Edit';


//Componentes
import TextField from '@mui/material/TextField';


// Datos iniciales de las etiquetas
const initialLabels = [
    { id: 1, title: "Desarrollando" },
    { id: 2, title: "Mantequilla" },
    { id: 3, title: "Pendientes" },
];

function Labels() {
    // Estado principal para la lista de etiquetas
    const [labels, setLabels] = useState(initialLabels);

    // Estado para controlar la modal de eliminación
    const [deletingLabel, setDeletingLabel] = useState(null);

    // Estado para controlar el modal de edición
    const [editlabel, setEditLabel] = useState(null);

    // Estado local para el formulario de edición (para el input de texto)
    const [newTitle, setNewTitle] = useState('');

    // --- LOGICA DE GESTION DE LA MODAL Y ELIMINACION Y EDICION---

    // Abre la modal de confirmacion al hacer clic en 'x'
    const openDeleteModal = (label) => {
        setDeletingLabel(label);
    };


    // Abre el modal de edicion y prepara el estado del formulario
    const openEditLabel = (labelToEdit) => {
        setEditLabel(labelToEdit);
        setNewTitle(labelToEdit.title); // Inicializa el input con el título actual
    }

    // Cierra el modal de edicion
    const closeEditModal = () => {
        setEditLabel(null);
        setNewTitle(''); // Limpia el estado del formulario
    }

    // Cierra la modal de eliminación
    const closeDeleteModal = () => {
        setDeletingLabel(null);
    };

    // Ejecuta la EDICIÓN de la etiqueta
    const handeEdit = (id, newTitle) => {
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
    const handleDelete = (id) => {
        setLabels(labels.filter(label => label.id !== id));
        closeDeleteModal(); // Cierra la modal después de eliminar
    };

    return (
        <div className="labels-container">
            {/* LISTADO DE ETIQUETAS */}
            {labels.map((label) => (
                <div className="row-item" key={label.id}>
                    <span className="icon-ite"><TurnedInIcon sx={{ color: label }} /></span>
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

export default Labels;