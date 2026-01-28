import { useState, useEffect } from 'react';
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
    Paper
} from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentIcon from '@mui/icons-material/Assignment';

// Dropdowns
import OptionProducto from '../dropdown/option_producto';
import OptionUsuario from '../dropdown/option_users';
import OptionPrioridad from '../dropdown/option_prioridad';
import OptionEstado from '../dropdown/option_estado';
import TimeDate from '../dropdown/option_date';
import AccordionEvidencias from '../accordion/evidencias_solicitud';
import OptionArea from '../dropdown/option_area';

import { useAuth } from '../../../config/AuthContext';

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
        '& fieldset': { borderColor: '#e2e8f0' },
        '&:hover fieldset': { borderColor: '#cbd5e0' },
        '&.Mui-focused fieldset': { borderColor: '#26427c' },
    },
    '& .MuiInputLabel-root': { color: '#718096', fontSize: '0.9rem' },
};

interface idSoli {
    co_solicitud: string
}function ModalTarea({ co_solicitud }: idSoli) {
    const { user } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idProduct, setIdProduct] = useState<string>("");
    const [idArea, setIdArea] = useState<string>("");

    const [formData, setFormData] = useState({
        co_solicitud: "",
        tx_asunto: "",
        tx_description: "",
        fe_vencimiento: "",
        co_user_creador_tarea: "",
        co_user_asignado: "",
        nb_contacto: "",
        nu_celular_contacto: "",
        co_area: 0,
        co_estado: 0,
        co_prioridad: 0,
        co_producto: 0
    });

    // CORRECCIÓN: Un solo useEffect limpio para sincronizar props y auth
    useEffect(() => {
        if (isModalOpen) {
            setFormData(prev => ({
                ...prev,
                co_solicitud: co_solicitud || prev.co_solicitud,
                co_user_creador_tarea: user?.co_usuario || prev.co_user_creador_tarea
            }));
        }
    }, [isModalOpen, co_solicitud, user]);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: any) => {
        const numericFields = ['co_area', 'co_estado', 'co_prioridad', 'co_producto'];
        // Si es un campo numérico, lo convertimos, de lo contrario pasamos el valor tal cual
        const finalValue = numericFields.includes(name) && value !== "" ? parseInt(value, 10) : value;
        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = async () => {
        try {
            // Ya no necesitas 'dataToSubmit' porque el useEffect mantiene el formData actualizado
            const response = await fetch('http://localhost:8081/task', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("¡Tarea creada exitosamente!");
                toggleModal();
                // Opcional: Limpiar el formulario aquí si lo deseas
            } else {
                const errorData = await response.json();
                console.error("Error del servidor:", errorData);
                alert("Error al crear la tarea.");
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };
    return (
        <>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={toggleModal}
                sx={{
                    bgcolor: '#26427c',
                    color: 'white',
                    borderRadius: '10px',
                    textTransform: 'none',
                    px: 3,
                    py: 1,
                    marginBottom: 4,
                    '&:hover': { bgcolor: '#1b315d' }
                }}
            >
                Agregar Tarea
            </Button>

            <Modal
                open={isModalOpen}
                onClose={toggleModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500, sx: { backgroundColor: 'rgba(15, 23, 42, 0.7)' } } }}
            >
                <Fade in={isModalOpen}>
                    <Box sx={modalContainerStyle}>
                        {/* Header */}
                        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #edf2f7' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ p: 1, bgcolor: '#f0f4ff', borderRadius: '10px', display: 'flex' }}>
                                    <AssignmentIcon sx={{ color: '#26427c' }} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a202c', fontSize: '1.1rem' }}>Crear una Tarea</Typography>
                            </Box>
                            <IconButton onClick={toggleModal} size="small" sx={{ color: '#a0aec0' }}><CloseIcon /></IconButton>
                        </Box>

                        {/* Formulario */}
                        <Box className="contenedor-con-scroll" sx={{ p: 4, overflowY: 'auto', flexGrow: 1, bgcolor: '#f8fafc' }}>
                            <Grid container spacing={2.5}>
                                <Grid size={{ xs: 12 }} sx={{ mb: 1 }}>
                                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#26427c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Información General</Typography>
                                </Grid>

                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        name="co_solicitud"
                                        label="N# Solicitud"
                                        variant="outlined"
                                        sx={inputStyle}
                                        value={formData.co_solicitud}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 8 }}>
                                    <TextField fullWidth name="tx_asunto" label="Asunto o Resumen" variant="outlined" sx={inputStyle} value={formData.tx_asunto} onChange={handleChange} />
                                </Grid>

                                <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
                                    <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#26427c', mb: 3, textTransform: 'uppercase' }}>
                                            Clasificación y Tiempos
                                        </Typography>
                                        <Grid container spacing={2.5}>
                                            <Grid size={{ xs: 12 }}>
                                                <Box sx={{ mb: 1 }}>
                                                    <TimeDate label='Fecha de Vencimiento' value={formData.fe_vencimiento} onChange={(val) => handleSelectChange('fe_vencimiento', val)} />
                                                </Box>
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6, md: 4 }}><OptionPrioridad onSelect={(v) => handleSelectChange('co_prioridad', v)} /></Grid>
                                            <Grid size={{ xs: 12, sm: 6, md: 4 }}><OptionEstado onSelect={(v) => handleSelectChange('co_estado', v)} /></Grid>
                                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                <OptionProducto onProductoChange={(id) => { setIdProduct(id); handleSelectChange('co_producto', id); }} />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                <Grid size={{ xs: 12 }} sx={{ mt: 2, mb: 1 }}>
                                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#26427c', textTransform: 'uppercase' }}>Asignación de Tarea</Typography>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Creado por"
                                        variant="outlined"
                                        sx={inputStyle}
                                        value={formData.co_user_creador_tarea}
                                        disabled
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 4 }}>
                                    <OptionArea onAreaChange={(id) => { setIdArea(id); handleSelectChange('co_area', id); }} />
                                </Grid>

                                <Grid size={{ xs: 12, md: 4 }}>
                                    <OptionUsuario areaId={idArea} onSelect={(v) => handleSelectChange('co_user_asignado', v)} />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField fullWidth multiline rows={6} name="tx_description" label="Descripción Detallada" sx={inputStyle} value={formData.tx_description} onChange={handleChange} />
                                </Grid>

                                <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
                                    <AccordionEvidencias />
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Footer */}
                        <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'flex-end', gap: 2, bgcolor: 'white', borderTop: '1px solid #edf2f7' }}>
                            <Button onClick={toggleModal} variant="outlined" sx={{ borderRadius: '10px', textTransform: 'none', color: '#64748b', borderColor: '#e2e8f0', px: 3 }}>Cancelar</Button>
                            <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#26427c', borderRadius: '10px', textTransform: 'none', px: 5, fontWeight: 600, '&:hover': { bgcolor: '#1b315d' } }}>Crear Tarea</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default ModalTarea;