import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
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

function NewMember() {
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
                Agregar Usuario
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
                            Agragar nuevo usuario
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                            Invita a otras personas a colaborar en tu espacio de trabajo.
                        </Typography>
                    </Box>

                    {/* Contenido principal con campos de entrada */}
                    <Box sx={{ p: 3, pt: 2 }}>
                        <Grid container spacing={2} alignItems="center">

                            {/* Campo de Email */}
                            <Grid container spacing={1} alignItems="center">
                                <TextField
                                    fullWidth
                                    placeholder="Por ejemplo, V123456789"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '5px',
                                        },
                                    }}
                                />

                                   <TextField
                                    fullWidth
                                    placeholder="Por ejemplo, Jose"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '5px',
                                        },
                                    }}
                                />

                                   <TextField
                                    fullWidth
                                    placeholder="Por ejemplo, Escalona"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '5px',
                                        },
                                    }}
                                />

                                   <TextField
                                    fullWidth
                                    placeholder="Por ejemplo, example@sycom.com.ve"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '5px',
                                        },
                                    }}
                                />

                                   <TextField
                                    fullWidth
                                    placeholder="Por ejemplo, 04241234768"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '5px',
                                        },
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    placeholder="Por ejemplo, 1"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '5px',
                                        },
                                    }}
                                />
                                
                            </Grid>

                            {/* Selector de Rol */}
                            <Grid item xs={1}>
                                <FormControl fullWidth size="small">
                                    <Select
                                        value={rol}
                                        onChange={handleRolChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Seleccionar rol' }}
                                        sx={{
                                            borderRadius: '5px',
                                        }}
                                    >
                                        <MenuItem value="Invitado">administrator</MenuItem>
                                        <MenuItem value="Invitado">project manager</MenuItem>
                                        <MenuItem value="Miembro">member</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
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
                            Enviar invitación
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default NewMember;