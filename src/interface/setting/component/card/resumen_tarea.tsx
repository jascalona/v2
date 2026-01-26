import type React from 'react';
import AvatarI from '../Avatar';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../config/AuthContext';
import axios from 'axios';

interface Tarea {
    co_tarea: string,
    co_solicitud: string,
    fe_registro: string,
    co_prioridad: string,
    co_estado: string,
    co_producto: string,
    Co_user_creador_tarea: string, 
    co_area: 5,
    co_user_asignado: string,
    tx_asunto: string,
    tx_descripcion: string,
    fe_vencimiento: string,
    fe_cierre: string,
}

// pasamos el id del usuario conectado
interface ResumUserProp {
    idUser?: string
}

const ResumTarea: React.FC<ResumUserProp> = ({ idUser }) => {
    const { user } = useAuth();
    const [solicitudes, setSolicitudes] = useState<Tarea[]>([]);

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

        axios.get<Tarea[]>(`http://localhost:8081/task/V30221960/resutask`)
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
            <h3>Tareas Recientes</h3>
            <div className="colum-i">
                {solicitudes.length > 0 ? (
                    solicitudes.map((item) => (
                        <div className="row-activities" key={item.co_tarea}>
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

export default ResumTarea;