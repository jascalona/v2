import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../config/AuthContext';
import AvatarI from '../Avatar';

// Material UI Components
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Box,
    Divider,
    Slide
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';

// Icons
import ViewListIcon from '@mui/icons-material/ViewList';
import CloseIcon from '@mui/icons-material/Close';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonIcon from '@mui/icons-material/Person';

import '../../../../assets/css/link.css';

// Animación de entrada ajustada para evitar el error de "any"
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Tarea {
    co_tarea: string;
    co_solicitud: string;
    fe_registro: string;
    co_prioridad: string;
    co_estado: string;
    co_producto: string;
    Co_user_creador_tarea: string;
    co_area: number;
    co_user_asignado: string;
    tx_asunto: string;
    tx_descripcion: string;
    fe_vencimiento: string;
    fe_cierre: string;
}

interface ResumUserProp {
    idUser?: string;
}

const ResumTarea: React.FC<ResumUserProp> = ({ idUser }) => {
    const { user } = useAuth();
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [cargando, setCargando] = useState(true);

    // Estado para el modal
    const [selectedTarea, setSelectedTarea] = useState<Tarea | null>(null);

    const activeUserId = idUser || user?.co_usuario;

    useEffect(() => {
        if (!activeUserId) return;

        let isMounted = true;
        // setCargando(true);

        // He mantenido tu URL original, pero recuerda que podrías usar `${activeUserId}` si es dinámico
        axios.get<Tarea[]>(`http://localhost:8081/task/${activeUserId}/resutask`)
            .then(response => {
                if (isMounted) {
                    setTareas(Array.isArray(response.data) ? response.data : []);
                }
            })
            .catch(error => console.error("Error API Tareas:", error))
            .finally(() => {
                if (isMounted) setCargando(false);
            });

        return () => { isMounted = false; };
    }, [activeUserId]);

    const handleClose = () => setSelectedTarea(null);

    return (
        <div className="resum-container">
            {/* Header con estilo minimalista */}
            <div className="resum-header">
                <h3>Tareas Recientes</h3>
                <Link to="/taskmanager" className="nav-link-custom">
                    <ViewListIcon sx={{ fontSize: 18 }} />
                    Ver todas
                </Link>
            </div>

            <div className="colum-i">
                {cargando ? (
                    <div className="loading-text">Cargando tareas...</div>
                ) : tareas.length > 0 ? (
                    tareas.map((item) => (
                        <div
                            className="row-activities-card"
                            key={item.co_tarea}
                            onClick={() => setSelectedTarea(item)}
                        >
                            <div className='container-row'>
                                <AvatarI idUser={user?.nb_nombre?.charAt(0) || "U"} />
                                <div className="content-activities" style={{ marginLeft: 10 }}>
                                    <span className="asunto-text">{item.tx_asunto}</span>
                                    <span className="descripcion-text">
                                        {item.tx_descripcion?.substring(0, 45)}...
                                    </span>
                                </div>
                            </div>
                            <div className="date-badge">
                                {item.fe_registro?.substring(0, 10)}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="empty-state">No tienes tareas pendientes.</p>
                )}
            </div>

            {/* MODAL DETALLE DE TAREA */}
            <Dialog
                open={Boolean(selectedTarea)}
                TransitionComponent={Transition}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
                PaperProps={{
                    style: { borderRadius: 16, padding: '8px' }
                }}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TaskAltIcon color="primary" />
                        <Typography variant="h6" fontWeight="700">Detalle de Tarea</Typography>
                    </Box>
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <Divider />

                <DialogContent>
                    {selectedTarea && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 1 }}>

                            <Box>
                                <Typography variant="overline" color="text.secondary">Asunto de la Tarea</Typography>
                                <Typography variant="body1" fontWeight="600">
                                    {selectedTarea.tx_asunto}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#f0f0f0', p: 1.5, borderRadius: 2 }}>
                                <Typography variant="caption"><strong>ID Tarea:</strong> {selectedTarea.co_tarea}</Typography>
                                <Typography variant="caption"><strong>Solicitud:</strong> {selectedTarea.co_solicitud}</Typography>
                            </Box>

                            <Box>
                                <Typography variant="overline" color="text.secondary">Descripción</Typography>
                                <Typography variant="body2" sx={{
                                    background: '#f4f7f6',
                                    p: 1,
                                    borderRadius: 1,
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {selectedTarea.tx_descripcion}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                <div>
                                    <Typography variant="overline" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <EventNoteIcon sx={{ fontSize: 14 }} /> Registro
                                    </Typography>
                                    <Typography variant="body2">{selectedTarea.fe_registro}</Typography>
                                </div>
                                <div>
                                    <Typography variant="overline" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <EventNoteIcon sx={{ fontSize: 14 }} /> Vencimiento
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#d32f2f', fontWeight: '500' }}>
                                        {selectedTarea.fe_vencimiento || 'Sin fecha'}
                                    </Typography>
                                </div>
                            </Box>



                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                <div>
                                    <Typography variant="overline" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <PersonIcon sx={{ fontSize: 17 }} /> Creado por:
                                    </Typography>
                                    <Typography variant="body2">{selectedTarea.Co_user_creador_tarea}</Typography>
                                </div>

                                <div>
                                    <Typography variant="overline" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <PersonIcon sx={{ fontSize: 17 }} /> Area:
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        Area asignada: {selectedTarea.co_area}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography variant="overline" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <PersonIcon sx={{ fontSize: 17 }} /> Persona asiganda:
                                    </Typography>
                                    <Typography variant="body2">{selectedTarea.co_user_asignado}</Typography>
                                </div>

                                <div>
                                    <Typography variant="overline" color="text.secondary">Prioridad de la Solicitud</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        Prioridad: {selectedTarea.co_prioridad}
                                    </Typography>
                                </div>


                                <div>
                                    <Typography variant="overline" color="text.secondary">Estado</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        Estado actual: {selectedTarea.co_estado}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography variant="overline" color="text.secondary">Tipo de Producto</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        Producto: {selectedTarea.co_producto}
                                    </Typography>
                                </div>

                            </Box>

                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ResumTarea;