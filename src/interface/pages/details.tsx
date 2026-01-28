import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';

// Hooks para recibir datos y redirigir
import { useLocation, useNavigate } from 'react-router-dom';

// Componentes
import DetailsSoli from '../setting/component/accordion/detalle_soli';
import DetallesTarea from '../setting/component/accordion/detalle_tareas';
import DetallesEscalamiento from '../setting/component/accordion/detalle_escalamiento';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import SaveIcon from '@mui/icons-material/Save';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';


interface Solicitud {
   co_solicitud: number;
    co_solicitud_bcv: string;
    fe_registro: string;
    co_prioridad: string;
    co_tp_solicitud: string;
    co_sla: string;
    fe_vencimiento: string;
    co_ambiente: string;
    co_estado: string;
    co_producto: string;
    co_componente: string;
    co_subcomponente: string;
    co_cliente: string;
    nb_contacto: string;
    nu_celular_contacto: string;
    co_user_creador_soli: string;
    co_user_asignado: string;
    tx_asunto: string;
    tx_descripcion: string;
    tx_descripcion_resolucion: string;
    tx_causa: string;
    co_user_resolutor: string;
    fe_cierre: string;
    co_area: string;
}

const StyledTextField = styled(TextField, {
    shouldForwardProp: (prop) => prop !== 'isCurrentlyEditing' && prop !== 'multilineInput',
})(({ theme, isCurrentlyEditing, multilineInput }) => ({
    flexGrow: 1,
    // ... (Estilos de StyledTextField)
    '& .MuiOutlinedInput-root': {
        borderRadius: '5px',
        marginBottom: '0px',
        height: multilineInput ? 'auto' : '40px',
        cursor: isCurrentlyEditing ? 'text' : 'pointer',

        // ESTILOS DE SÓLO LECTURA (isCurrentlyEditing === false)
        ...(isCurrentlyEditing === false && {
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '& .MuiOutlinedInput-input': { padding: multilineInput ? '0px 14px' : '6px 14px' },
            '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
        }),

        // ESTILOS DE EDICIÓN (isCurrentlyEditing === true) - BORDES PERSONALIZADOS
        ...(isCurrentlyEditing === true && {
            '& .MuiOutlinedInput-input': { padding: multilineInput ? '10px' : '6px 14px' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#A0A0A0', borderWidth: '1px' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#707070' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#7070709d' },
        }),
    },
}));
// ----------------------------------------------------


function DetallesSolicitud() {
    // Obtener la data y el hook de navegación
    const location = useLocation();
    const navigate = useNavigate();
    const selectedSolicitud: Solicitud | undefined = location.state?.solicitudSeleccionada;

    // Estados
    const [descripcionValue, setDescripcionValue] = useState('Cargando descripción...');
    const [titulo, setTitulo] = useState('Detalle de Solicitud');
    const [fechaRegistro, setFechaRegistro] = useState('N/A');
    const [editingField, setEditingField] = useState(null);

    // Lógica de Bloqueo y Renderizado
    useEffect(() => {
        // Bloqueo: Si no hay selectedSolicitud, redirige.
        if (!selectedSolicitud) {
            console.warn("Acceso directo detectado. Redirigiendo a la lista.");
            // Redirige a la ruta donde está TaskList, asumiendo /taskmanager
            navigate('/uirequest', { replace: true });
            return;
        }

        // Renderizado: Si hay datos, pobla los estados.
        setDescripcionValue(selectedSolicitud.tx_descripcion || 'No se encontró descripción.');
        setTitulo(selectedSolicitud.tx_asunto || `Solicitud ${selectedSolicitud.co_solicitud}`);

        const registro = selectedSolicitud.fe_registro ? selectedSolicitud.fe_registro.replace('T', ' ').substring(0, 19) : 'N/A';
        setFechaRegistro(registro);

    }, [selectedSolicitud, navigate]);


    const handleInputFocus = (fieldName) => { setEditingField(fieldName); };
    const handleInputBlur = () => { setEditingField(null); };
    const isCurrentlyEditing = (fieldName) => editingField === fieldName;

    if (!selectedSolicitud) {
        return <p>Cargando o redirigiendo...</p>;
    }

    return (
        <>
            <div className="container-interface-description">
                <div className="container-desc-soli">

                    <h2 style={{ margin: 0}}>{titulo}</h2>
                    <small style={{ fontSize: 13 }}><strong> Creado el: <span>{fechaRegistro}</span></strong></small>

                    <div className="btn-group">
                        <button className='btn-crud'>
                            <StickyNote2Icon sx={{color: '#fff'}}/>
                        </button>
                    </div>

                    <h4 style={{ marginTop: '40px' }}>Descripción</h4>
                    <div className="content-details">
                        <StyledTextField
                            fullWidth
                            placeholder="Haz clic para editar la descripción..."
                            variant="outlined"
                            size="small"
                            multiline
                            value={descripcionValue}
                            onChange={(e) => setDescripcionValue(e.target.value)}
                            onFocus={() => handleInputFocus('descripcion')}
                            onBlur={handleInputBlur}
                            onClick={() => handleInputFocus('descripcion')}
                            isCurrentlyEditing={isCurrentlyEditing('descripcion')}
                            multilineInput={true}
                        />
                    </div>

                    <div className="activities">
                        <h4>Actividades vinculadas</h4>

                        <div className="asociados">
                            <DetallesTarea co_solicitud={selectedSolicitud.co_solicitud}/>
                        </div>
                        
                        <br />
                        <div className="asociados">
                            <DetallesEscalamiento />
                        </div>
                    </div>
                </div>

                <div className="container-detalles">
                    <DetailsSoli  solicitud={selectedSolicitud} />
                </div>
            </div>

            <Box sx={{ '& > :not(style)': { m: 1 } }}

                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    zIndex: 1000,
                }}
            >
                <Fab variant="extended" style={{background: 'rgb(0, 0, 255)', color: '#fff'}}>
                    <SaveIcon sx={{ mr: 1 }} />
                    Guardar
                </Fab>
            </Box>
        </>
    )
}
export default DetallesSolicitud;