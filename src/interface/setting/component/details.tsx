import React, { useState } from 'react'; 
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';

// Componentes Auxiliares
import DetailsSoli from '../component/accordion/detalle_soli';
import DetallesTarea from '../component/accordion/detalle_tareas';
import DetallesEscalamiento from '../component/accordion/detalle_escalamiento';

// ----------------------------------------------------
// DEFINICIÓN COMPLETA DE StyledTextField (Ajustes de Borde Incluidos)
// ----------------------------------------------------
const StyledTextField = styled(TextField, {
    shouldForwardProp: (prop) => prop !== 'isCurrentlyEditing' && prop !== 'multilineInput',
})(({ theme, isCurrentlyEditing, multilineInput }) => ({
    flexGrow: 1, 

    '& .MuiOutlinedInput-root': {
        borderRadius: '5px',
        marginBottom: '0px',
        height: multilineInput ? 'auto' : '40px',
        cursor: isCurrentlyEditing ? 'text' : 'pointer',

        // ESTILOS DE SÓLO LECTURA (isCurrentlyEditing === false)
        ...(isCurrentlyEditing === false && {
            '& .MuiOutlinedInput-notchedOutline': {
                border: 'none', 
            },
            '& .MuiOutlinedInput-input': {
                padding: multilineInput ? '0px 14px' : '6px 14px', 
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                border: 'none',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
            },
        }),
        
        // ESTILOS DE EDICIÓN (isCurrentlyEditing === true) - BORDES PERSONALIZADOS
        ...(isCurrentlyEditing === true && {
             '& .MuiOutlinedInput-input': {
                padding: multilineInput ? '10px' : '6px 14px',
            },

            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#A0A0A0', // Color base del borde
                borderWidth: '1px',      
            },

            // B. Borde en HOVER
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#707070', // Color al pasar el ratón
            },
            
            // C. Borde en FOCO
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#7070709d', // Color de foco personalizado
            },
        }),
    },
}));
// ----------------------------------------------------


function DetallesSolicitud() {
    const [descripcionValue, setDescripcionValue] = useState('Texto de la descripción actual...');
    const [editingField, setEditingField] = useState(null); 

    const handleInputFocus = (fieldName) => {
        setEditingField(fieldName);
    };

    const handleInputBlur = () => {
        setEditingField(null);
    };

    const isCurrentlyEditing = (fieldName) => editingField === fieldName;

    return (
        <>
            <div className="container-interface-description">
                <div className="container-desc-soli">
                    
                    <h2 style={{ margin: 0, paddingBottom: '5px' }}>REVISION DE INCIDENCIA SIMF PRODUCCION</h2>
                    <small style={{ fontSize: 13 }}><strong> Creado el: <span>2025-12-05 12:25:01</span></strong></small>

                    <h4 style={{ marginTop: '40px' }}>Descripción</h4>
                    <div className="content-details">
                        {/* INPUT: Descripción */}
                        <StyledTextField 
                            fullWidth
                            placeholder="Haz clic para editar la descripción..."
                            variant="outlined"
                            size="small"
                            multiline
                            value={descripcionValue}
                            onChange={(e) => setDescripcionValue(e.target.value)}
                            // Lógica de edición
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
                            <DetallesTarea />
                        </div>
                        <br />
                        <div className="asociados">
                            <DetallesEscalamiento />
                        </div>
                    </div>
                </div>

                {/* Sidebar derecho */}
                <div className="container-detalles">
                    <DetailsSoli />
                </div>
            </div>
        </>
    )
}
export default DetallesSolicitud;