import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';


// Componente auxiliar para aplicar estilos condicionales al TextField
const StyledTextField = styled(TextField, {
    shouldForwardProp: (prop) => prop !== 'isCurrentlyEditing' && prop !== 'multilineInput',
})(({ theme, isCurrentlyEditing, multilineInput }) => ({
    flexGrow: 1,

    '& .MuiOutlinedInput-root': {
        borderRadius: '5px',
        marginBottom: '0px',
        height: multilineInput ? 'auto' : '40px',
        // Cursor: pointer cuando es solo lectura, text cuando está en edición
        cursor: isCurrentlyEditing ? 'text' : 'pointer',

        // 1. ESTILOS DE SÓLO LECTURA (isCurrentlyEditing === false)
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
                // Restaurar padding estándar
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


function DetailsSoli() {
    const [editingField, setEditingField] = useState(null);
    const [estadoValue, setEstadoValue] = useState('Asignado');
    const [fechaSolucionValue, setFechaSolucionValue] = useState('2025-12-05');
    const [resueltoPorValue, setResueltoPorValue] = useState('Jose Escalona');
    const [causaValue, setCausaValue] = useState('El error fue detectado en la base de datos...');
    const [observacionesValue, setObservacionesValue] = useState('Todo parece indicar que es un problema de concurrencia.');

    const handleInputFocus = (fieldName) => {
        setEditingField(fieldName);
    };

    const handleInputBlur = () => {
        setEditingField(null);
    };

    const isCurrentlyEditing = (fieldName) => editingField === fieldName;

    // --- Estilos ---
    const itemStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    };

    const spanStyle = {
        minWidth: '150px',
        marginRight: '10px',
    };

    const titleMultilineStyle = {
        marginBottom: '5px',
        display: 'block',
    };
    // ---------------


    return (
        <div>
            {/* Primer Accordion (Detalles) */}
            <Accordion defaultExpanded style={{ background: 'none', boxShadow: 'none', border: 'solid 1px #ccc2c271', borderRadius: '5px' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    style={{ borderBottom: 'solid 1px #ccc2c271' }}
                >
                    <Typography component="span"><strong>Detalles</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component="div">
                        <div className="sidebar-content-soli">

                            {/* INPUT: Estado (Añadí onClick para activar la edición en un click) */}
                            <div style={itemStyle}>
                                <span style={spanStyle}>Ambiente: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="Produccion"
                                    variant="outlined"
                                    size="small"
                                    value={estadoValue}
                                    onChange={(e) => setEstadoValue(e.target.value)}
                                    onFocus={() => handleInputFocus('estado')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('estado')}
                                    isCurrentlyEditing={isCurrentlyEditing('estado')}
                                />
                            </div>

                            <div style={itemStyle}>
                                <span style={spanStyle}>Prodcuto: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="Produccion"
                                    variant="outlined"
                                    size="small"
                                    value={estadoValue}
                                    onChange={(e) => setEstadoValue(e.target.value)}
                                    onFocus={() => handleInputFocus('estado')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('estado')}
                                    isCurrentlyEditing={isCurrentlyEditing('estado')}
                                />
                            </div>


                            <div style={itemStyle}>
                                <span style={spanStyle}>Tipo: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="Produccion"
                                    variant="outlined"
                                    size="small"
                                    value={estadoValue}
                                    onChange={(e) => setEstadoValue(e.target.value)}
                                    onFocus={() => handleInputFocus('estado')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('estado')}
                                    isCurrentlyEditing={isCurrentlyEditing('estado')}
                                />
                            </div>


                            <div style={itemStyle}>
                                <span style={spanStyle}>Personal asignado: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="Produccion"
                                    variant="outlined"
                                    size="small"
                                    value={estadoValue}
                                    onChange={(e) => setEstadoValue(e.target.value)}
                                    onFocus={() => handleInputFocus('estado')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('estado')}
                                    isCurrentlyEditing={isCurrentlyEditing('estado')}
                                />
                            </div>


                            <div style={itemStyle}>
                                <span style={spanStyle}>Prioridad: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="Produccion"
                                    variant="outlined"
                                    size="small"
                                    value={estadoValue}
                                    onChange={(e) => setEstadoValue(e.target.value)}
                                    onFocus={() => handleInputFocus('estado')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('estado')}
                                    isCurrentlyEditing={isCurrentlyEditing('estado')}
                                />
                            </div>

                            <div style={itemStyle}>
                                <span style={spanStyle}>Estado: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="Produccion"
                                    variant="outlined"
                                    size="small"
                                    value={estadoValue}
                                    onChange={(e) => setEstadoValue(e.target.value)}
                                    onFocus={() => handleInputFocus('estado')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('estado')}
                                    isCurrentlyEditing={isCurrentlyEditing('estado')}
                                />
                            </div>

                            <div style={itemStyle}>
                                <span style={spanStyle}>Creado el: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="Produccion"
                                    variant="outlined"
                                    size="small"
                                    value={estadoValue}
                                    onChange={(e) => setEstadoValue(e.target.value)}
                                    onFocus={() => handleInputFocus('estado')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('estado')}
                                    isCurrentlyEditing={isCurrentlyEditing('estado')}
                                />
                            </div>

                            <div style={itemStyle}>
                                <span style={spanStyle}>Fecha de vencimiento: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="Produccion"
                                    variant="outlined"
                                    size="small"
                                    value={estadoValue}
                                    onChange={(e) => setEstadoValue(e.target.value)}
                                    onFocus={() => handleInputFocus('estado')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('estado')}
                                    isCurrentlyEditing={isCurrentlyEditing('estado')}
                                />
                            </div>


                            <div style={itemStyle}>
                                <span style={spanStyle}>Cliente: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="Produccion"
                                    variant="outlined"
                                    size="small"
                                    value={estadoValue}
                                    onChange={(e) => setEstadoValue(e.target.value)}
                                    onFocus={() => handleInputFocus('estado')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('estado')}
                                    isCurrentlyEditing={isCurrentlyEditing('estado')}
                                />
                            </div>

                            <div style={itemStyle}>
                                <span style={spanStyle}>Comercio: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="Produccion"
                                    variant="outlined"
                                    size="small"
                                    value={estadoValue}
                                    onChange={(e) => setEstadoValue(e.target.value)}
                                    onFocus={() => handleInputFocus('estado')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('estado')}
                                    isCurrentlyEditing={isCurrentlyEditing('estado')}
                                />
                            </div>

                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* Segundo Accordion (Detalles de Solucion) - Inputs */}
            <Accordion style={{ background: 'none', boxShadow: 'none', border: 'solid 1px #ccc2c271', borderRadius: '5px' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    style={{ borderBottom: 'solid 1px #ccc2c271' }}
                >
                    <Typography component="span"><strong>Detalles de Solucion</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component="div">
                        <div className="sidebar-content-soli">

                            {/* INPUT: Estado (Añadí onClick para activar la edición en un click) */}
                            <div style={itemStyle}>
                                <span style={spanStyle}>Estado: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="Estado de la solución"
                                    variant="outlined"
                                    size="small"
                                    value={estadoValue}
                                    onChange={(e) => setEstadoValue(e.target.value)}
                                    onFocus={() => handleInputFocus('estado')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('estado')}
                                    isCurrentlyEditing={isCurrentlyEditing('estado')}
                                />
                            </div>

                            {/* INPUT: Fecha de solucion (Añadí onClick) */}
                            <div style={itemStyle}>
                                <span style={spanStyle}>Fecha de solucion:</span>
                                <StyledTextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={fechaSolucionValue}
                                    onChange={(e) => setFechaSolucionValue(e.target.value)}
                                    onFocus={() => handleInputFocus('fechaSolucion')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('fechaSolucion')}
                                    isCurrentlyEditing={isCurrentlyEditing('fechaSolucion')}
                                />
                            </div>

                            {/* INPUT: Resuelto por (Añadí onClick) */}
                            <div style={itemStyle}>
                                <span style={spanStyle}>Resuelto por: </span>
                                <StyledTextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={resueltoPorValue}
                                    onChange={(e) => setResueltoPorValue(e.target.value)}
                                    onFocus={() => handleInputFocus('resueltoPor')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('resueltoPor')}
                                    isCurrentlyEditing={isCurrentlyEditing('resueltoPor')}
                                />
                            </div>
                        </div>

                        <hr style={{ margin: '10px 0' }} />

                        <div className="descript-solution">
                            {/* TEXTAREA: Causa de la Incidencia (Añadí onClick) */}
                            <div className="item-multiline">
                                <span style={titleMultilineStyle}><strong>Causa de la Incidencia:</strong> </span>
                                <StyledTextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    multiline
                                    minRows={4}
                                    maxRows={10}
                                    value={causaValue}
                                    onChange={(e) => setCausaValue(e.target.value)}
                                    onFocus={() => handleInputFocus('causa')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('causa')}
                                    isCurrentlyEditing={isCurrentlyEditing('causa')}
                                    multilineInput={true}
                                />
                            </div>

                            <br />

                            {/* TEXTAREA: Observaciones (Añadí onClick) */}
                            <div className="item-multiline">
                                <span style={titleMultilineStyle}><strong>Observaciones:</strong> </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="Por ejemplo, El error fue detectado en la base de datos..."
                                    variant="outlined"
                                    size="small"
                                    multiline
                                    minRows={4}
                                    maxRows={10}
                                    value={observacionesValue}
                                    onChange={(e) => setObservacionesValue(e.target.value)}
                                    onFocus={() => handleInputFocus('observaciones')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('observaciones')}
                                    isCurrentlyEditing={isCurrentlyEditing('observaciones')}
                                    multilineInput={true}
                                />
                            </div>
                        </div>

                    </Typography>
                </AccordionDetails>
            </Accordion>

        </div >
    );
}
export default DetailsSoli;