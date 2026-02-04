import { useState, useEffect, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import {
    TextField,
    Button,
    Box,
    Typography,
    Modal,
    Fade,
    Backdrop,
    IconButton,
    Fab,
    Paper
} from '@mui/material';

import { useAuth } from '../../../config/AuthContext';

// Icons
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentIcon from '@mui/icons-material/Assignment';

// Dropdowns
import OptionAmbiente from '../dropdown/option_ambiente';
import OptionProducto from '../dropdown/option_producto';
import OptionUsuario from '../dropdown/option_users';
import OptionTPS from '../dropdown/option_tps';
import OptionSla from '../dropdown/option_sla';
import OptionPrioridad from '../dropdown/option_prioridad';
import OptionEstado from '../dropdown/option_estado';
import TimeDate from '../dropdown/option_date';
import AccordionEvidencias from '../accordion/evidencias_solicitud';
import OptionComponente from '../dropdown/option_componente';
import OptionSubComponente from '../dropdown/option_subcomponente';
import OptionCliente from '../dropdown/option_cliente';
import OptionArea from '../dropdown/option_area';

// --- Interfaces para robustez de Tipado ---
interface FormDataState {
    co_solicitud_bcv: string;
    fe_vencimiento: string;
    fe_cierre: string;
    co_user_creador_soli: string;
    co_user_asignado: string | number;
    co_tp_solicitud: string | number;
    nb_contacto: string;
    nu_celular_contacto: string;
    tx_asunto: string;
    tx_descripcion: string;
    tx_causa: string;
    co_ambiente: string | number;
    co_producto: string | number;
    co_sla: string | number;
    tx_descripcion_resolucion: string;
    co_estado: string | number;
    co_cliente: string | number;
    co_prioridad: string | number;
    co_componente: string | number;
    co_subcomponente: string | number;
    co_area: string | number;
}

const modalContainerStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95%', sm: '85%', md: '70%', lg: '60%' },
    maxWidth: '950px',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    overflow: 'hidden'
};

const inputStyle = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        backgroundColor: 'white',
        '& fieldset': { borderColor: '#e2e8h0' },
        '&:hover fieldset': { borderColor: '#cbd5e0' },
        '&.Mui-focused fieldset': { borderColor: '#26427c' },
    },
    '& .MuiInputLabel-root': { color: '#718096', fontSize: '0.9rem' },
};

function ModalSolicitud() {
    const { user } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idProduct, setIdProduct] = useState<string>("");
    const [idArea, setIdArea] = useState<string>("");
    const [idComponente, setIdComponente] = useState<string>("");

    // Inicializamos el estado directamente con el usuario de AuthContext
    const [formData, setFormData] = useState<FormDataState>({
        co_solicitud_bcv: "",
        fe_vencimiento: "",
        fe_cierre: "",
        co_user_creador_soli: user?.co_usuario || "", 
        co_user_asignado: "",
        co_tp_solicitud: "",
        nb_contacto: "",
        nu_celular_contacto: "",
        tx_asunto: "",
        tx_descripcion: "",
        tx_causa: "",
        co_ambiente: "",
        co_producto: "",
        co_sla: "",
        tx_descripcion_resolucion: "",
        co_estado: "",
        co_cliente: "",
        co_prioridad: "",
        co_componente: "",
        co_subcomponente: "",
        co_area: ""
    });

    // Actualizar el creador si el usuario de la sesión cambia
    useEffect(() => {
        if (user?.co_usuario) {
            setFormData(prev => ({ ...prev, co_user_creador_soli: user.co_usuario }));
        }
    }, [user?.co_usuario]);

    // VALIDACIÓN: Comprobar si los campos críticos están llenos
    const isFormValid = useMemo(() => {
        const requiredFields: (keyof FormDataState)[] = [
            'tx_asunto', 'tx_descripcion', 'co_tp_solicitud', 
            'co_ambiente', 'co_producto', 'co_area'
        ];
        return requiredFields.every(field => formData[field] !== "");
    }, [formData]);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Ajuste de Any y conversión numérica
    const handleSelectChange = (name: keyof FormDataState, value: string | number) => {
        const numericFields = [
            'co_tp_solicitud', 'co_ambiente', 'co_producto', 'co_sla', 
            'co_estado', 'co_prioridad', 'co_componente', 
            'co_subcomponente', 'co_area', 'co_cliente'
        ];
        
        const finalValue = (numericFields.includes(name) && value !== "" && typeof value === 'string') 
            ? parseInt(value, 10) 
            : value;

        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = async () => {
        // Quitamos valores vacíos y corregimos el error de variable '_' no usada
        const dataToSend = Object.fromEntries(
            Object.entries(formData).filter(([, v]) => v !== "" && v !== null)
        );

        try {
            const response = await fetch('http://localhost:8081/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                alert("Solicitud Creada con éxito");
                toggleModal();
            } else {
                const errorMsg = await response.text();
                alert("Error al insertar: " + errorMsg);
            }
        } catch (error) { 
            console.error("Error de red:", error); 
        }
    };

    return (
        <>
            <Fab onClick={toggleModal} sx={{ position: 'fixed', bottom: 30, right: 30, bgcolor: '#26427c', color: 'white', '&:hover': { bgcolor: '#1b315d' }, zIndex: 1000 }}>
                <AddIcon />
            </Fab>

            <Modal open={isModalOpen} onClose={toggleModal} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500, sx: { backgroundColor: 'rgba(15, 23, 42, 0.7)' } } }}>
                <Fade in={isModalOpen}>
                    <Box sx={modalContainerStyle}>
                        {/* Header */}
                        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #edf2f7' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ p: 1, bgcolor: '#f0f4ff', borderRadius: '10px', display: 'flex' }}>
                                    <AssignmentIcon sx={{ color: '#26427c' }} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a202c', fontSize: '1.1rem' }}>Crear Ticket de Solicitud</Typography>
                            </Box>
                            <IconButton onClick={toggleModal} size="small" sx={{ color: '#a0aec0' }}><CloseIcon /></IconButton>
                        </Box>

                        {/* Body */}
                        <Box sx={{ p: 4, overflowY: 'auto', flexGrow: 1, bgcolor: '#f8fafc' }}>
                            <Grid container spacing={2.5}>
                                <Grid size={12}>
                                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#26427c', textTransform: 'uppercase' }}>Información General</Typography>
                                </Grid>

                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField fullWidth name="co_solicitud_bcv" label="N# Solicitud BCV    " variant="outlined" sx={inputStyle} value={formData.co_solicitud_bcv} onChange={handleChange} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 8 }}>
                                    <TextField fullWidth name="tx_asunto" label="Asunto o Resumen *" variant="outlined" sx={inputStyle} value={formData.tx_asunto} onChange={handleChange} />
                                </Grid>
                                <Grid size={12}>
                                    <TextField fullWidth multiline rows={2} name="tx_descripcion" label="Descripción Detallada *" sx={inputStyle} value={formData.tx_descripcion} onChange={handleChange} />
                                </Grid>

                                <Grid size={12} sx={{ mt: 2 }}>
                                    <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#26427c', mb: 3, textTransform: 'uppercase' }}>Clasificación y Tiempos</Typography>
                                        <Grid container spacing={2.5}>
                                            <Grid size={12}>
                                                <TimeDate label='Fecha de Vencimiento' value={formData.fe_vencimiento} onChange={(val) => handleSelectChange('fe_vencimiento', val)} />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6, md: 4 }}><OptionAmbiente onSelect={(v) => handleSelectChange('co_ambiente', v)} /></Grid>
                                            <Grid size={{ xs: 12, sm: 6, md: 4 }}><OptionTPS onSelect={(v) => handleSelectChange('co_tp_solicitud', v)} /></Grid>
                                            <Grid size={{ xs: 12, sm: 6, md: 4 }}><OptionSla onSelect={(v) => handleSelectChange('co_sla', v)} /></Grid>
                                            <Grid size={{ xs: 12, sm: 6, md: 4 }}><OptionPrioridad onSelect={(v) => handleSelectChange('co_prioridad', v)} /></Grid>
                                            <Grid size={{ xs: 12, sm: 6, md: 4 }}><OptionEstado onSelect={(v) => handleSelectChange('co_estado', v)} /></Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                <Grid size={12} sx={{ mt: 2 }}>
                                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#26427c', textTransform: 'uppercase' }}>Asignación de Negocio</Typography>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField fullWidth label="Creado por" variant="outlined" sx={inputStyle} value={formData.co_user_creador_soli} disabled />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <OptionArea onAreaChange={(id) => { setIdArea(id); handleSelectChange('co_area', id); }} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <OptionUsuario areaId={idArea} onSelect={(v) => handleSelectChange('co_user_asignado', v)} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <OptionProducto onProductoChange={(id) => { setIdProduct(id); handleSelectChange('co_producto', id); }} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <OptionCliente productoId={idProduct} onSelect={(v) => handleSelectChange('co_cliente', v)} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <OptionComponente productoId={idProduct} onComponenteChange={(id) => { setIdComponente(id); handleSelectChange('co_componente', id); }} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <OptionSubComponente componenteId={idComponente} onSelect={(v) => handleSelectChange('co_subcomponente', v)} />
                                </Grid>

                                <Grid size={12} sx={{ mt: 2 }}>
                                    <AccordionEvidencias />
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Footer con validación de botón */}
                        <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'flex-end', gap: 2, bgcolor: 'white', borderTop: '1px solid #edf2f7' }}>
                            <Button onClick={toggleModal} variant="outlined" sx={{ borderRadius: '10px', textTransform: 'none', px: 3 }}>
                                Cancelar
                            </Button>
                            <Button 
                                onClick={handleSubmit} 
                                variant="contained" 
                                disabled={!isFormValid} // Deshabilitado si faltan campos obligatorios
                                sx={{ 
                                    bgcolor: isFormValid ? '#26427c' : '#cbd5e0', 
                                    borderRadius: '10px', 
                                    textTransform: 'none', 
                                    px: 5, 
                                    fontWeight: 600,
                                    '&:hover': { bgcolor: '#1b315d' }
                                }}
                            >
                                Crear Ticket
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default ModalSolicitud;