
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

//Data para los Dropdown
import { DROPDOWN_PRODUCTO, CONFIG_PRODUCTO } from '../dropdown/DT_productos'; 
import {DROPDOWN_AMBIENTE, CONFIG_AMBIENTE} from '../dropdown/TD_ambiente';


//Icons
import AddIcon from '@mui/icons-material/Add';
import CustomDropdown from '../dropdown/dropdown_i';


function ModalSolicitud() {

    // Estado para controlar la visibilidad del modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para alternar el estado del modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>

            {/* Botón flotante*/}
            <div
                onClick={toggleModal}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: 'rgb(38, 66, 124)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '56px',
                    height: '56px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                    zIndex: 1000, // Asegura que esté por encima de otros elementos
                }}
            >
                <AddIcon style={{ fontSize: '30px' }} />
            </div>


            {/* Modal */}
            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1001,
                    }}
                    onClick={toggleModal}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '30px',
                            borderRadius: '8px',
                            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                            width: '100%',
                            maxWidth: '50%',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="container-formulario">
                            <Box sx={{ p: 3, pb: 1, borderBottom: '1px solid #eee' }}>
                                <Typography id="invite-collaborator-title" variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                                    Nueva Solicitud
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, architecto.
                                </Typography>
                            </Box>

                            {/* Contenido principal con campos de entrada */}
                            <Box sx={{ p: 3, pt: 2 }}>

                                <Grid alignItems="center">
                                    <TextField
                                        fullWidth
                                        label="CO. Area"
                                        placeholder="Por ejemplo, 1"
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '5px',
                                                marginBottom: '15px'
                                            },
                                        }}
                                    />



                                    <TextField style={{ marginTop: 5 }}
                                        fullWidth
                                        label="Descripción  de la Solicitud"
                                        placeholder="Por ejemplo, El error fue detectado en la base de datos..."
                                        variant="outlined"
                                        size="small"
                                        multiline
                                        minRows={4}
                                        maxRows={4}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '5px',
                                                '& textarea': {
                                                    resize: 'none',
                                                },
                                            },
                                        }}
                                    />

                                    <div className="content-formulario">
                                        {/*AMBIENTE, PRIORIDAD, PRODUCTO, TP-SOLI, SLA, CREADOR-SOLI, USER-ASIGANDO, ESTADO-SOLI*/}
                                        <CustomDropdown
                                            items={DROPDOWN_PRODUCTO}
                                            title={CONFIG_PRODUCTO.title}
                                            icon={CONFIG_PRODUCTO.icon}
                                        />

                                        <CustomDropdown
                                            items={DROPDOWN_AMBIENTE}
                                            title={CONFIG_AMBIENTE.title}
                                            icon={CONFIG_AMBIENTE.icon}
                                        />

                                   

                                    </div>

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
                                    onClick={toggleModal}
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
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalSolicitud