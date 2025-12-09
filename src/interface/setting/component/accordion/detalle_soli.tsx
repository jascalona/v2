import React, { useState, useEffect } from 'react'; // <-- Importar useEffect
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';


// Componente auxiliar para aplicar estilos condicionales al TextField (sin cambios)
const StyledTextField = styled(TextField, {
    shouldForwardProp: (prop) => prop !== 'isCurrentlyEditing' && prop !== 'multilineInput',
})(({ theme, isCurrentlyEditing, multilineInput }) => ({
    flexGrow: 1,

    '& .MuiOutlinedInput-root': {
        borderRadius: '5px',
        marginBottom: '0px',
        height: multilineInput ? 'auto' : '40px',
        cursor: isCurrentlyEditing ? 'text' : 'pointer',

        // 1. ESTILOS DE SÓLO LECTURA
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
    cliComercio: string,
    cliDirecto: string,
    coAmbiente: string,
    coPrioridad: string,
    coProducto: string,
    coSLA: string,
    coSolicitud: string,
    co_tip_solicitud: string,
    coUserCierre: string,
    c_user_resolutor: string,
    feRegistro: string,
    feVencimiento: string,
    stSolicitud: string,
    txDesSoli: string,
    feResolucion: string,
    txCusaSoli: string,
    tx_desc_resolucion: string,
    txNota: string,
}

// interfaz de Props: Recibe la solicitud completa
interface DetailsSoliProps {
    solicitud?: Solicitud; // Es opcional porque el padre puede pasar 'undefined' si no hay registro
}


// 🔑 Componente que recibe 'solicitud' como prop
function DetailsSoli({ solicitud }: DetailsSoliProps) {
    const [editingField, setEditingField] = useState<string | null>(null);

    // Estados iniciales para los inputs
    const [ambienteValue, setAmbienteValue] = useState('N/A');
    const [productoValue, setProductoValue] = useState('N/A');
    const [tipoValue, setTipoValue] = useState('N/A');
    const [asignadoValue, setAsignadoValue] = useState('N/A');
    const [prioridadValue, setPrioridadValue] = useState('N/A');
    const [estadoValue, setEstadoValue] = useState('N/A');
    const [fechaRegistroValue, setFechaRegistroValue] = useState('N/A');
    const [fechaVencimientoValue, setFechaVencimientoValue] = useState('N/A');
    const [clienteValue, setClienteValue] = useState('N/A');
    const [comercioValue, setComercioValue] = useState('N/A');

    // Estados para la sección "Detalles de Solución"
    const [estadoSolucionValue, setEstadoSolucionValue] = useState('N/A');
    const [fechaSolucionValue, setFechaSolucionValue] = useState('N/A');
    const [resueltoPorValue, setResueltoPorValue] = useState('N/A');
    const [causaValue, setCausaValue] = useState('N/A');
    const [observacionesValue, setObservacionesValue] = useState('N/A');


    useEffect(() => {
        if (solicitud) {
            // Sección "Detalles"
            setAmbienteValue(solicitud.coAmbiente || 'No definido');
            setProductoValue(solicitud.coProducto || 'No definido');
            setTipoValue(solicitud.co_tip_solicitud || 'No definido');
            setAsignadoValue(solicitud.c_user_resolutor || 'No asignado');
            setPrioridadValue(solicitud.coPrioridad || 'Baja');
            setEstadoValue(solicitud.stSolicitud || 'Nuevo');
            setFechaRegistroValue(solicitud.feRegistro ? solicitud.feRegistro.split('T')[0] : 'N/A');
            setFechaVencimientoValue(solicitud.feVencimiento ? solicitud.feVencimiento.split('T')[0] : 'N/A');
            setClienteValue(solicitud.cliDirecto || 'N/A');
            setComercioValue(solicitud.cliComercio || 'N/A');
            setEstadoSolucionValue(solicitud.stSolicitud || 'N/A');
            setFechaSolucionValue(solicitud.feResolucion ? solicitud.feResolucion.split('T')[0] : 'N/A');
            setResueltoPorValue(solicitud.coUserCierre || 'N/A');
            setCausaValue(solicitud.txCusaSoli || 'Sin causa registrada.');
            setObservacionesValue(solicitud.tx_desc_resolucion || 'Sin observaciones.');

        } else {
            // Resetear o mantener N/A si no hay datos
            // Los estados iniciales de 'N/A' manejan este caso.
        }
    }, [solicitud]); // Se vuelve a ejecutar si la prop 'solicitud' cambia


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

                            {/* INPUT: Ambiente */}
                            <div style={itemStyle}>
                                <span style={spanStyle}>Ambiente: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="N/A"
                                    variant="outlined"
                                    size="small"
                                    value={ambienteValue}
                                    onChange={(e) => setAmbienteValue(e.target.value)}
                                    onFocus={() => handleInputFocus('ambiente')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('ambiente')}
                                    isCurrentlyEditing={isCurrentlyEditing('ambiente')}
                                />
                            </div>

                            <div style={itemStyle}>
                                <span style={spanStyle}>Prodcuto: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="N/A"
                                    variant="outlined"
                                    size="small"
                                    value={productoValue}
                                    onChange={(e) => setProductoValue(e.target.value)}
                                    onFocus={() => handleInputFocus('producto')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('producto')}
                                    isCurrentlyEditing={isCurrentlyEditing('producto')}
                                />
                            </div>


                            <div style={itemStyle}>
                                <span style={spanStyle}>Tipo: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="N/A"
                                    variant="outlined"
                                    size="small"
                                    value={tipoValue}
                                    onChange={(e) => setTipoValue(e.target.value)}
                                    onFocus={() => handleInputFocus('tipo')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('tipo')}
                                    isCurrentlyEditing={isCurrentlyEditing('tipo')}
                                />
                            </div>

                            <div style={itemStyle}>
                                <span style={spanStyle}>Personal asignado: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="N/A"
                                    variant="outlined"
                                    size="small"
                                    value={asignadoValue}
                                    onChange={(e) => setAsignadoValue(e.target.value)}
                                    onFocus={() => handleInputFocus('asignado')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('asignado')}
                                    isCurrentlyEditing={isCurrentlyEditing('asignado')}
                                />
                            </div>

                            <div style={itemStyle}>
                                <span style={spanStyle}>Prioridad: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="N/A"
                                    variant="outlined"
                                    size="small"
                                    value={prioridadValue}
                                    onChange={(e) => setPrioridadValue(e.target.value)}
                                    onFocus={() => handleInputFocus('prioridad')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('prioridad')}
                                    isCurrentlyEditing={isCurrentlyEditing('prioridad')}
                                />
                            </div>

                            <div style={itemStyle}>
                                <span style={spanStyle}>Estado: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="N/A"
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
                                    placeholder="N/A"
                                    variant="outlined"
                                    size="small"
                                    value={fechaRegistroValue}
                                    onChange={(e) => setFechaRegistroValue(e.target.value)}
                                    onFocus={() => handleInputFocus('fechaRegistro')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('fechaRegistro')}
                                    isCurrentlyEditing={isCurrentlyEditing('fechaRegistro')}
                                />
                            </div>

                            <div style={itemStyle}>
                                <span style={spanStyle}>Fecha de vencimiento: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="N/A"
                                    variant="outlined"
                                    size="small"
                                    value={fechaVencimientoValue}
                                    onChange={(e) => setFechaVencimientoValue(e.target.value)}
                                    onFocus={() => handleInputFocus('fechaVencimiento')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('fechaVencimiento')}
                                    isCurrentlyEditing={isCurrentlyEditing('fechaVencimiento')}
                                />
                            </div>

                            <div style={itemStyle}>
                                <span style={spanStyle}>Cliente: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="N/A"
                                    variant="outlined"
                                    size="small"
                                    value={clienteValue}
                                    onChange={(e) => setClienteValue(e.target.value)}
                                    onFocus={() => handleInputFocus('cliente')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('cliente')}
                                    isCurrentlyEditing={isCurrentlyEditing('cliente')}
                                />
                            </div>

                            <div style={itemStyle}>
                                <span style={spanStyle}>Comercio: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="N/A"
                                    variant="outlined"
                                    size="small"
                                    value={comercioValue}
                                    onChange={(e) => setComercioValue(e.target.value)}
                                    onFocus={() => handleInputFocus('comercio')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('comercio')}
                                    isCurrentlyEditing={isCurrentlyEditing('comercio')}
                                />
                            </div>

                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>

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

                            <div style={itemStyle}>
                                <span style={spanStyle}>Estado: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="Estado de la solución"
                                    variant="outlined"
                                    size="small"
                                    value={estadoSolucionValue}
                                    onChange={(e) => setEstadoSolucionValue(e.target.value)}
                                    onFocus={() => handleInputFocus('estadoSolucion')}
                                    onBlur={handleInputBlur}
                                    onClick={() => handleInputFocus('estadoSolucion')}
                                    isCurrentlyEditing={isCurrentlyEditing('estadoSolucion')}
                                />
                            </div>

                            <div style={itemStyle}>
                                <span style={spanStyle}>Fecha de solucion:</span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="N/A"
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

                            <div style={itemStyle}>
                                <span style={spanStyle}>Resuelto por: </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="N/A"
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
                            <div className="item-multiline">
                                <span style={titleMultilineStyle}><strong>Causa de la Incidencia:</strong> </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="Sin causa registrada."
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

                            <div className="item-multiline">
                                <span style={titleMultilineStyle}><strong>Observaciones:</strong> </span>
                                <StyledTextField
                                    fullWidth
                                    placeholder="Sin observaciones."
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