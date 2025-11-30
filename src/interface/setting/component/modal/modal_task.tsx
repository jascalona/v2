import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SettingsIcon from '@mui/icons-material/Settings';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxWidth: '90%',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

function CreateTask() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            {/* Botón con Borde de Recorte (dashed) */}
            <Button
                onClick={handleOpen}
                variant="outlined"
                startIcon={<PlaylistAddIcon />}
                sx={{
                    border: '2px dashed #666666',
                    color: '#666666',
                    width: '100%',
                    marginBottom: '10px',
                    borderRadius: '8px',
                    padding: '12px',
                    '&:hover': {
                        border: '2px dashed #999999',
                        backgroundColor: 'rgba(102, 102, 102, 0.05)',
                    }
                }}
            >
                asignar tarea
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="new-request-title"
                aria-describedby="new-request-description"
            >
                <Box sx={modalStyle}>
                    {/* Encabezado del Modal */}
                    <Typography id="new-request-title" variant="h5" component="h2" gutterBottom style={{ color: '#1f1e1eff', fontWeight: 600 }}>
                        Asignar Tarea
                    </Typography>
                    <Typography id="new-request-description" variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, architecto.
                    </Typography>

                    {/* Formulario */}
                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            label="CO. Área"
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            fullWidth
                            label="Descripción de la Solicitud"
                            variant="outlined"
                            multiline
                            rows={4}
                        />

                        {/* Botones de Parámetros */}
                        <Stack direction="row" spacing={1}>
                            <Button variant="outlined" startIcon={<ProductionQuantityLimitsIcon />} size="small">
                                Producto
                            </Button>
                            <Button variant="outlined" startIcon={<SettingsIcon />} size="small">
                                Ambiente
                            </Button>
                        </Stack>

                        {/* Enlace Añadir más */}
                        <Button variant="text" startIcon={<PlaylistAddIcon />} sx={{ justifyContent: 'flex-start', p: 0, textTransform: 'none' }}>
                            Añadir más
                        </Button>
                    </Stack>

                    {/* Footer con botones de acción */}
                    <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 4, pt: 2, borderTop: '1px solid #eee' }}>
                        <Button variant="outlined" onClick={handleClose} sx={{
                            textTransform: 'none',
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                            color: '#333'
                        }}>
                            Cancelar
                        </Button>
                        <Button variant="contained" onClick={handleClose}
                            sx={{
                                textTransform: 'none',
                                backgroundColor: 'rgb(38, 66, 124)',
                                '&:hover': {
                                    backgroundColor: 'rgba(27, 49, 93, 1)',
                                }
                            }}
                        >
                            Crear
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}

export default CreateTask;