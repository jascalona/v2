import type React from 'react';
import AvatarI from '../Avatar';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../config/AuthContext';
import axios from 'axios';

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
    tx_descripcion: string; // <-- Corregida la coma faltante aquí
    tx_descripcion_resolucion: string;
    tx_causa: string;
    co_user_resolutor: string;
    fe_cierre: string;
    co_area: number;
}


// pasamos el id del usuario conectado
interface ResumUserProp {
    idUser?: string
}

const ResumSolicitud: React.FC<ResumUserProp> = ({ idUser }) => {
    const { user } = useAuth();
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);

    // Determinamos el ID activo fuera del efecto
    const activeUserId = idUser || user?.co_usuario;

    // Iniciamos cargando en true solo si ya tenemos un ID para buscar
    const [cargando, setCargando] = useState(!!activeUserId);

    useEffect(() => {
        // Si no hay ID, nos aseguramos de que no se quede cargando infinitamente
        if (!activeUserId) {
            // setCargando(false);
            return;
        }

        // Solo seteamos a true si por alguna razón estaba en false (evita el cascading render)
        // setCargando(prev => (prev === false ? true : prev));

        let isMounted = true; // Para evitar fugas de memoria si el componente se desmonta

        axios.get<Solicitud[]>(`http://localhost:8081/request/${activeUserId}/resurequest`)
            .then(response => {
                if (isMounted) {
                    setSolicitudes(Array.isArray(response.data) ? response.data : []);
                }
            })
            .catch(error => {
                console.error("Error API:", error);
            })
            .finally(() => {
                if (isMounted) {
                    setCargando(false);
                }
            });

        return () => { isMounted = false; }; // Cleanup function
    }, [activeUserId]);
    

    // Renderizado...
    if (cargando && solicitudes.length === 0) {
        return <div style={{ padding: '20px' }}>Cargando actividades...</div>;
    }

    return (
        <div>
            <h3>Solicitudes Recientes</h3>
                <div className="colum-i">
                    {solicitudes.length > 0 ? (
                        solicitudes.map((item) => (
                            <div className="row-activities" key={item.co_solicitud}>
                                <div className='container-row'>
                                    {/* Usamos la inicial del nombre */}
                                    <AvatarI idUser={user?.nb_nombre?.charAt(0) || "U"} />
                                    <div className="content-activities">
                                        <span>
                                            Asunto: <strong>{item.tx_asunto}</strong>
                                        </span>
                                        <br />
                                        <span>
                                            Actividad: <strong>{item.tx_descripcion?.substring(0, 20)}...</strong>
                                        </span>
                                    </div>
                                </div>
                                <div className="date">
                                    <small>Creado el: {item.fe_registro?.substring(0, 10)}</small>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ padding: '10px' }}>No hay actividades recientes para mostrar.</p>
                    )}
                </div>
            </div>
    
    );
}

export default ResumSolicitud;