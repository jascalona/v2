import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../config/AuthContext';
import AvatarI from '../Avatar';

// Material UI Components para el Modal
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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssignmentIcon from '@mui/icons-material/Assignment';

import '../../../../assets/css/link.css';

// Animación de entrada para el modal
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Solicitud {
    co_solicitud: string;
    co_solicitud_bcv: string;
    fe_registro: string;
    co_prioridad: number;
    co_tp_solicitud: number;
    co_sla: number;
    fe_vencimiento: string;
    co_ambiente: number;
    co_estado: number;
    co_producto: number;
    co_componente: number;
    co_subcomponente: number;
    co_cliente: string;
    nb_contacto: number;
    nu_celular_contacto: string;
    co_user_creador_soli: string;
    co_user_asignado: string;
    tx_asunto: string;
    tx_descripcion: string;
    tx_descripcion_resolucion: string;
    tx_causa: string;
    co_user_resolutor: string;
    fe_cierre: string;
    co_area: number;
}

interface ResumUserProp {
    idUser?: string;
}

const ResumSolicitud: React.FC<ResumUserProp> = ({ idUser }) => {
    const { user } = useAuth();
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [cargando, setCargando] = useState(true);

    // Estado para controlar qué solicitud mostrar en el Modal
    const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(null);

    const activeUserId = idUser || user?.co_usuario;

    useEffect(() => {
        if (!activeUserId) return;

        let isMounted = true;
        //setCargando(true);

        axios.get<Solicitud[]>(`http://localhost:8081/request/${activeUserId}/resurequest`)
            .then(response => {
                if (isMounted) {
                    setSolicitudes(Array.isArray(response.data) ? response.data : []);
                }
            })
            .catch(error => console.error("Error API:", error))
            .finally(() => {
                if (isMounted) setCargando(false);
            });

        return () => { isMounted = false; };
    }, [activeUserId]);

    const handleCloseModal = () => setSelectedSolicitud(null);

    return (
        <div className="resum-container">
            {/* Header con el Link minimalista */}
            <div className="resum-header">
                <h3>Solicitudes Recientes</h3>
                <Link to="/uirequest" className="nav-link-custom">
                    <ViewListIcon sx={{ fontSize: 18 }} />
                    Ver todas
                </Link>
            </div>

            {/* Listado de Registros */}
            <div className="colum-i">
                {cargando ? (
                    <div className="loading-text">Cargando actividades...</div>
                ) : solicitudes.length > 0 ? (
                    solicitudes.map((item) => (
                        <div
                            className="row-activities-card"
                            key={item.co_solicitud}
                            onClick={() => setSelectedSolicitud(item)}
                        >
                            <div className='container-row'>
                                <AvatarI idUser={user?.nb_nombre?.charAt(0) || "U"} />
                                <div className="content-activities" style={{ marginLeft: 10 }}>
                                    <span className="asunto-text">{item.tx_asunto}</span>
                                    <span className="descripcion-text">
                                        {item.tx_descripcion?.substring(0, 50)}...
                                    </span>
                                </div>
                            </div>
                            <div className="date-badge">
                                {item.fe_registro?.substring(0, 10)}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="empty-state">No hay actividades recientes para mostrar.</p>
                )}
            </div>

            {/* Modal de Detalle */}
            <Dialog
                open={Boolean(selectedSolicitud)}
                TransitionComponent={Transition}
                onClose={handleCloseModal}
                fullWidth
                maxWidth="md"
                PaperProps={{
                    style: { borderRadius: 16, padding: '8px' }
                }}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="700">Detalles de Solicitud</Typography>
                    <IconButton onClick={handleCloseModal} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <Divider />

                <DialogContent>
                    {selectedSolicitud && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 1 }}>

                            <Box>
                                <Typography variant="overline" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <AssignmentIcon sx={{ fontSize: 14 }} /> Asunto
                                </Typography>
                                <Typography variant="body1" fontWeight="600" color="primary.main">
                                    {selectedSolicitud.tx_asunto}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="overline" color="text.secondary">Descripción Detallada</Typography>
                                <Typography variant="body2" sx={{ background: '#f9f9f9', p: 2, borderRadius: 2, borderLeft: '4px solid #ccc' }}>
                                    {selectedSolicitud.tx_descripcion}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                <div>
                                    <Typography variant="overline" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CalendarTodayIcon sx={{ fontSize: 14 }} /> Fecha Registro
                                    </Typography>
                                    <Typography variant="body2">{selectedSolicitud.fe_registro}</Typography>
                                </div>
                                <div>
                                    <Typography variant="overline" color="text.secondary">Estado del Ticket</Typography>
                                    <Typography variant="body2" sx={{ color: '#050E70', fontWeight: 'bold' }}>
                                        (Estado: {selectedSolicitud.co_estado})
                                    </Typography>
                                </div>

                                <div>
                                    <Typography variant="overline" color="text.secondary">Prioridad de la Solicitud</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        Prioridad: {selectedSolicitud.co_prioridad}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography variant="overline" color="text.secondary">Tipo de Solicitud</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        Tipo de Solicitud: {selectedSolicitud.co_tp_solicitud}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography variant="overline" color="text.secondary">SLA</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        SLA: {selectedSolicitud.co_sla}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography variant="overline" color="text.secondary">Ambiente</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        Ambiente: {selectedSolicitud.co_ambiente}
                                    </Typography>
                                </div>


                                <div>
                                    <Typography variant="overline" color="text.secondary">Tipo Producto</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        Producto: {selectedSolicitud.co_producto}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography variant="overline" color="text.secondary">Componente afectado</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        Componente: {selectedSolicitud.co_componente}
                                    </Typography>
                                </div>


                                <div>
                                    <Typography variant="overline" color="text.secondary">Subcomponente afectado</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        Subcomponente: {selectedSolicitud.co_subcomponente}
                                    </Typography>
                                </div>
                            </Box>

                            <Box>
                                <Typography variant="overline" color="text.secondary">Información del Cliente</Typography>
                                <Typography variant="body2">
                                    <strong>Código Cliente:</strong> {selectedSolicitud.co_cliente}
                                </Typography>
                            </Box>


                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                <p>Definir si renderizar datos de contactos o cliente</p>
                                {/*
                                <div>
                                    <Typography variant="overline" color="text.secondary">Persona de Contacto</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        Subcomponente: {selectedSolicitud.co_subcomponente}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography variant="overline" color="text.secondary">Subcomponente afectado</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        Subcomponente: {selectedSolicitud.co_subcomponente}
                                    </Typography>
                                </div>
                            */}
                            </Box>

                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ResumSolicitud;