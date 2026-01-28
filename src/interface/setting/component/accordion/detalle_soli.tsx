import React, { useState, useEffect } from 'react';
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
})<{ isCurrentlyEditing?: boolean; multilineInput?: boolean }>(({ theme, isCurrentlyEditing, multilineInput }) => ({
    flexGrow: 1,
    '& .MuiOutlinedInput-root': {
        borderRadius: '5px',
        marginBottom: '0px',
        height: multilineInput ? 'auto' : '40px',
        cursor: isCurrentlyEditing ? 'text' : 'pointer',

        // ESTILOS DE SÓLO LECTURA
        ...(isCurrentlyEditing === false && {
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '& .MuiOutlinedInput-input': { padding: multilineInput ? '0px 14px' : '6px 14px' },
            '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
        }),

        // ESTILOS DE EDICIÓN
        ...(isCurrentlyEditing === true && {
            '& .MuiOutlinedInput-input': { padding: multilineInput ? '10px' : '6px 14px' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#A0A0A0', borderWidth: '1px' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#707070' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#7070709d' },
        }),
    },
}));

interface Solicitud {
    co_solicitud: string;
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

interface DetailsSoliProps {
    solicitud?: Solicitud;
}

function DetailsSoli({ solicitud }: DetailsSoliProps) {
    const [editingField, setEditingField] = useState<string | null>(null);

    // Estados para los nuevos campos y existentes
    const [coSolicitud, setCoSolicitud] = useState('N/A');
    const [coSolicitudBcv, setCoSolicitudBcv] = useState('N/A');
    const [ambienteValue, setAmbienteValue] = useState('N/A');
    const [productoValue, setProductoValue] = useState('N/A');
    const [tipoValue, setTipoValue] = useState('N/A');
    const [asignadoValue, setAsignadoValue] = useState('N/A');
    const [prioridadValue, setPrioridadValue] = useState('N/A');
    const [estadoValue, setEstadoValue] = useState('N/A');
    const [fechaRegistroValue, setFechaRegistroValue] = useState('N/A');
    const [fechaVencimientoValue, setFechaVencimientoValue] = useState('N/A');
    const [clienteValue, setClienteValue] = useState('N/A');

    const [estadoSolucionValue, setEstadoSolucionValue] = useState('N/A');
    const [fechaSolucionValue, setFechaSolucionValue] = useState('N/A');
    const [resueltoPorValue, setResueltoPorValue] = useState('N/A');
    const [causaValue, setCausaValue] = useState("Desconocida")
    const [observacionesValue, setObservacionesValue] = useState('N/A');

    useEffect(() => {
        if (solicitud) {
            setCoSolicitud(solicitud.co_solicitud || 'N/A');
            setCoSolicitudBcv(solicitud.co_solicitud_bcv || 'N/A');
            setAmbienteValue(solicitud.co_ambiente || 'No definido');
            setProductoValue(solicitud.co_producto || 'No definido');
            setTipoValue(solicitud.co_tp_solicitud || 'No definido');
            setAsignadoValue(solicitud.co_user_asignado || 'No asignado');
            setPrioridadValue(solicitud.co_prioridad || 'N/A');
            setEstadoValue(solicitud.co_estado || 'Nuevo');
            setFechaRegistroValue(solicitud.fe_registro ? solicitud.fe_registro.split('T')[0] : 'N/A');
            setFechaVencimientoValue(solicitud.fe_vencimiento ? solicitud.fe_vencimiento.split('T')[0] : 'N/A');
            setClienteValue(solicitud.co_cliente || 'N/A');
            setEstadoSolucionValue(solicitud.co_estado || 'N/A');
            setFechaSolucionValue(solicitud.fe_cierre ? solicitud.fe_cierre.split('T')[0] : 'N/A');
            setResueltoPorValue(solicitud.co_user_resolutor || 'N/A');
            setCausaValue(solicitud.tx_causa || 'Desconocida');
            setObservacionesValue(solicitud.tx_descripcion_resolucion || 'Sin observaciones.');
        }
    }, [solicitud]);

    const handleInputFocus = (fieldName: string) => setEditingField(fieldName);
    const handleInputBlur = () => setEditingField(null);
    const isCurrentlyEditing = (fieldName: string) => editingField === fieldName;

    const itemStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', marginBottom: '10px' };
    const spanStyle: React.CSSProperties = { minWidth: '150px', marginRight: '10px' };
    const titleMultilineStyle: React.CSSProperties = { marginBottom: '5px', display: 'block' };

    return (
        <div>
            <Accordion defaultExpanded style={{ background: 'none', boxShadow: 'none', border: 'solid 1px #ccc2c271', borderRadius: '5px', backgroundColor: '#fff' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ borderBottom: 'solid 1px #ccc2c271' }}>
                    <Typography component="span"><strong>Detalles</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="sidebar-content-soli">
                        
                        {/* INPUT: CO SOLICITUD */}
                        <div style={itemStyle}>
                            <span style={spanStyle}>ID Solicitud: </span>
                            <StyledTextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={coSolicitud}
                                onChange={(e) => setCoSolicitud(e.target.value)}
                                onFocus={() => handleInputFocus('coSolicitud')}
                                onBlur={handleInputBlur}
                                isCurrentlyEditing={isCurrentlyEditing('coSolicitud')}
                            />
                        </div>

                        {/* INPUT: CO SOLICITUD BCV */}
                        <div style={itemStyle}>
                            <span style={spanStyle}>ID Solicitud BCV: </span>
                            <StyledTextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={coSolicitudBcv}
                                onChange={(e) => setCoSolicitudBcv(e.target.value)}
                                onFocus={() => handleInputFocus('coSolicitudBcv')}
                                onBlur={handleInputBlur}
                                isCurrentlyEditing={isCurrentlyEditing('coSolicitudBcv')}
                            />
                        </div>

                        {/* INPUT: Ambiente */}
                        <div style={itemStyle}>
                            <span style={spanStyle}>Ambiente: </span>
                            <StyledTextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={ambienteValue}
                                onChange={(e) => setAmbienteValue(e.target.value)}
                                onFocus={() => handleInputFocus('ambiente')}
                                onBlur={handleInputBlur}
                                isCurrentlyEditing={isCurrentlyEditing('ambiente')}
                            />
                        </div>

                        <div style={itemStyle}>
                            <span style={spanStyle}>Producto: </span>
                            <StyledTextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={productoValue}
                                onChange={(e) => setProductoValue(e.target.value)}
                                onFocus={() => handleInputFocus('producto')}
                                onBlur={handleInputBlur}
                                isCurrentlyEditing={isCurrentlyEditing('producto')}
                            />
                        </div>

                        <div style={itemStyle}>
                            <span style={spanStyle}>Tipo: </span>
                            <StyledTextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={tipoValue}
                                onChange={(e) => setTipoValue(e.target.value)}
                                onFocus={() => handleInputFocus('tipo')}
                                onBlur={handleInputBlur}
                                isCurrentlyEditing={isCurrentlyEditing('tipo')}
                            />
                        </div>

                        <div style={itemStyle}>
                            <span style={spanStyle}>Personal asignado: </span>
                            <StyledTextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={asignadoValue}
                                onChange={(e) => setAsignadoValue(e.target.value)}
                                onFocus={() => handleInputFocus('asignado')}
                                onBlur={handleInputBlur}
                                isCurrentlyEditing={isCurrentlyEditing('asignado')}
                            />
                        </div>

                        <div style={itemStyle}>
                            <span style={spanStyle}>Prioridad: </span>
                            <StyledTextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={prioridadValue}
                                onChange={(e) => setPrioridadValue(e.target.value)}
                                onFocus={() => handleInputFocus('prioridad')}
                                onBlur={handleInputBlur}
                                isCurrentlyEditing={isCurrentlyEditing('prioridad')}
                            />
                        </div>

                        <div style={itemStyle}>
                            <span style={spanStyle}>Estado: </span>
                            <StyledTextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={estadoValue}
                                onChange={(e) => setEstadoValue(e.target.value)}
                                onFocus={() => handleInputFocus('estado')}
                                onBlur={handleInputBlur}
                                isCurrentlyEditing={isCurrentlyEditing('estado')}
                            />
                        </div>

                        <div style={itemStyle}>
                            <span style={spanStyle}>Creado el: </span>
                            <StyledTextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={fechaRegistroValue}
                                onChange={(e) => setFechaRegistroValue(e.target.value)}
                                onFocus={() => handleInputFocus('fechaRegistro')}
                                onBlur={handleInputBlur}
                                isCurrentlyEditing={isCurrentlyEditing('fechaRegistro')}
                            />
                        </div>

                        <div style={itemStyle}>
                            <span style={spanStyle}>Vencimiento: </span>
                            <StyledTextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={fechaVencimientoValue}
                                onChange={(e) => setFechaVencimientoValue(e.target.value)}
                                onFocus={() => handleInputFocus('fechaVencimiento')}
                                onBlur={handleInputBlur}
                                isCurrentlyEditing={isCurrentlyEditing('fechaVencimiento')}
                            />
                        </div>

                        <div style={itemStyle}>
                            <span style={spanStyle}>Cliente: </span>
                            <StyledTextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={clienteValue}
                                onChange={(e) => setClienteValue(e.target.value)}
                                onFocus={() => handleInputFocus('cliente')}
                                onBlur={handleInputBlur}
                                isCurrentlyEditing={isCurrentlyEditing('cliente')}
                            />
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion style={{ background: 'none', boxShadow: 'none', border: 'solid 1px #ccc2c271', borderRadius: '5px', backgroundColor: '#fff', marginTop: '10px' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ borderBottom: 'solid 1px #ccc2c271' }}>
                    <Typography component="span"><strong>Detalles de Solución</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="sidebar-content-soli">
                        <div style={itemStyle}>
                            <span style={spanStyle}>Estado: </span>
                            <StyledTextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={estadoSolucionValue}
                                onChange={(e) => setEstadoSolucionValue(e.target.value)}
                                onFocus={() => handleInputFocus('estadoSolucion')}
                                onBlur={handleInputBlur}
                                isCurrentlyEditing={isCurrentlyEditing('estadoSolucion')}
                            />
                        </div>
                        <div style={itemStyle}>
                            <span style={spanStyle}>Fecha de solución:</span>
                            <StyledTextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={fechaSolucionValue}
                                onChange={(e) => setFechaSolucionValue(e.target.value)}
                                onFocus={() => handleInputFocus('fechaSolucion')}
                                onBlur={handleInputBlur}
                                isCurrentlyEditing={isCurrentlyEditing('fechaSolucion')}
                            />
                        </div>
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
                                isCurrentlyEditing={isCurrentlyEditing('resueltoPor')}
                            />
                        </div>

                        <hr style={{ margin: '15px 0', border: '0.5px solid #eee' }} />

                        <span style={titleMultilineStyle}><strong>Causa de la Incidencia:</strong> </span>
                        <StyledTextField
                            fullWidth
                            variant="outlined"
                            multiline
                            minRows={3}
                            value={causaValue}
                            onChange={(e) => setCausaValue(e.target.value)}
                            onFocus={() => handleInputFocus('causa')}
                            onBlur={handleInputBlur}
                            isCurrentlyEditing={isCurrentlyEditing('causa')}
                            multilineInput={true}
                        />

                        <br /><br />

                        <span style={titleMultilineStyle}><strong>Resolución:</strong> </span>
                        <StyledTextField
                            fullWidth
                            variant="outlined"
                            multiline
                            minRows={3}
                            value={observacionesValue}
                            onChange={(e) => setObservacionesValue(e.target.value)}
                            onFocus={() => handleInputFocus('observaciones')}
                            onBlur={handleInputBlur}
                            isCurrentlyEditing={isCurrentlyEditing('observaciones')}
                            multilineInput={true}
                        />
                    </div>
                </AccordionDetails>
            </Accordion>
            
            <p style={{ fontSize: 12, textAlign: 'end', color: '#666', marginTop: '10px' }}>
                <strong> Creado el: <span>{fechaRegistroValue}</span></strong>
            </p>
        </div>
    );
}

export default DetailsSoli;