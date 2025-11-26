import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550, // Ancho ajustado
    maxWidth: '90%',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 0,
};

function ModalSubCategory() {
    const [open, setOpen] = React.useState(false);
    const [rol, setRol] = React.useState('Miembro');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleRolChange = (event: SelectChangeEvent) => {
        setRol(event.target.value as string);
    };

    return (
        <div>
            <Button
                onClick={handleOpen}
                style={{
                    color: '#333',
                    border: 'solid 1px rgba(128, 128, 128, 0.333)',
                    fontSize: '13px',
                    borderRadius: 5,
                    textTransform: 'capitalize',
                    fontFamily: 'sans-serif'
                }}
            >
                Nueva Sub-Categoria
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="invite-collaborator-title"
                aria-describedby="invite-collaborator-description"
            >
                <Box sx={style}>
                    {/* Encabezado del Modal */}
                    <Box sx={{ p: 3, pb: 1, borderBottom: '1px solid #eee' }}>
                        <Typography id="invite-collaborator-title" variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                            Nueva Sub-Categoria
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, architecto.
                        </Typography>
                    </Box>

                    {/* Contenido principal con campos de entrada */}
                    <Box sx={{ p: 3, pt: 2 }}>
                        <Grid container spacing={2} alignItems="center">

                                <TextField
                                    fullWidth
                                    label="Nombre"
                                    placeholder="Por ejemplo, C. Componentes de Negocio"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '5px',
                                        },
                                    }}
                                />

                            </Grid>

                        {/* Enlace para añadir más */}
                        <Button
                            variant="text"
                            startIcon={<span style={{ fontSize: 18 }}>+</span>}
                            sx={{
                                mt: 1,
                                textTransform: 'none',
                                color: '#1976d2',
                                p: 0,
                                fontSize: '0.875rem'
                            }}
                        >
                            Añadir más
                        </Button>
                    </Box>

                    {/* Pie de página con botones de acción */}
                    <Box
                        sx={{
                            p: 2,
                            pt: 1,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 1,
                            borderTop: '1px solid #eee'
                        }}
                    >
                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            sx={{
                                textTransform: 'none',
                                borderColor: 'rgba(0, 0, 0, 0.23)',
                                color: '#333'
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
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
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalSubCategory;