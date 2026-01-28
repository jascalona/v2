import { useState, useEffect } from 'react';
// Material UI Components
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
} from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentIcon from '@mui/icons-material/Assignment';

// Dropdowns 
import AccordionEvidencias from '../accordion/evidencias_solicitud';

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
    '& .Mui-disabled': {
        backgroundColor: '#f1f5f9',
        color: '#475569',
        borderRadius: '12px',
    }
};

interface idSoli{
    co_solicitud: string
}

function ModalNota({co_solicitud}: idSoli) {
    const { user } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        co_solicitud: "",
        tx_asunto: "",
        tx_descripcion: "",
        co_user_creador_nota: "",
    });

    useEffect(() => {
        if (user?.co_usuario) {
            setFormData(prev => ({
                ...prev,
                co_solicitud: co_solicitud || prev.co_solicitud,
                co_user_creador_nota: user.co_usuario
            }));
        }
    }, [user]);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8081/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert("Nota Creada exitosamente!");
                // Opcional: Limpiar campos excepto el usuario
                setFormData(prev => ({ ...prev, co_solicitud: "", tx_asunto: "", tx_descripcion: "" }));
                toggleModal();
            }
        } catch (error) {
            console.error("Error:", error);
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
                Agregar Nota
            </Button>

            <Modal open={isModalOpen} onClose={toggleModal} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500, sx: { backgroundColor: 'rgba(15, 23, 42, 0.7)' } } }}>
                <Fade in={isModalOpen}>
                    <Box sx={modalContainerStyle}>
                        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #edf2f7' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ p: 1, bgcolor: '#f0f4ff', borderRadius: '10px', display: 'flex' }}>
                                    <AssignmentIcon sx={{ color: '#26427c' }} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a202c', fontSize: '1.1rem' }}>Crear una Nota</Typography>
                            </Box>
                            <IconButton onClick={toggleModal} size="small" sx={{ color: '#a0aec0' }}><CloseIcon /></IconButton>
                        </Box>

                        <Box className="contenedor-con-scroll" sx={{ p: 4, overflowY: 'auto', flexGrow: 1, bgcolor: '#f8fafc' }}>
                            <Grid container spacing={2.5}>
                                <Grid size={12} sx={{ mb: 1 }}>
                                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#26427c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Información General</Typography>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
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

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        name="co_user_creador_nota"
                                        label="Creado por:"
                                        variant="outlined"
                                        sx={inputStyle}
                                        value={formData.co_user_creador_nota}
                                        disabled
                                    />
                                </Grid>

                                <Grid size={12}>
                                    <TextField fullWidth name="tx_asunto" label="Asunto o Resumen" variant="outlined" sx={inputStyle} value={formData.tx_asunto} onChange={handleChange} />
                                </Grid>

                                <Grid size={12}>
                                    <TextField fullWidth multiline rows={6} name="tx_descripcion" label="Descripción Detallada" sx={inputStyle} value={formData.tx_descripcion} onChange={handleChange} />
                                </Grid>

                                <Grid size={12} sx={{ mt: 2 }}>
                                    <AccordionEvidencias />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'flex-end', gap: 2, bgcolor: 'white', borderTop: '1px solid #edf2f7' }}>
                            <Button onClick={toggleModal} variant="outlined" sx={{ borderRadius: '10px', textTransform: 'none', color: '#64748b', borderColor: '#e2e8f0', px: 3 }}>Cancelar</Button>
                            <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#26427c', borderRadius: '10px', textTransform: 'none', px: 5, fontWeight: 600, '&:hover': { bgcolor: '#1b315d' } }}>Crear Nota</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default ModalNota;