
import '../../../../assets/css/scroll.css';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

//Data para los Dropdown
import OptionAmbiente from '../dropdown/option_ambiente';
import OptionProducto from '../dropdown/option_producto';
import OptionUsuario from '../dropdown/option_users';
import OptionTPS from '../dropdown/option_tps';
import OptionPrioridad from '../dropdown/option_sla';
import OptionEstado from '../dropdown/option_estado';
import TimeDate from '../dropdown/option_date';
import AccordionEvidencias from '../accordion/evidencias_solicitud';
import OptionComponente from '../dropdown/option_componente';
import OptionSubComponente from '../dropdown/option_subcomponente';
import OptionCliente from '../dropdown/option_cliente';

//Icons
import AddIcon from '@mui/icons-material/Add';


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
                    zIndex: 1000,
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
                            maxHeight: '750px',
                            overflow: 'auto'
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className='contenedor-con-scroll'
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
                                    <div className="persona-contacto">

                                        <TextField
                                            fullWidth
                                            label="Cliente Directo"
                                            placeholder="Por ejemplo, Bancaribe"
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '5px',
                                                    marginBottom: '15px'
                                                },
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Comercio"
                                            placeholder="Por ejemplo, Seguros FRP"
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '5px',
                                                    marginBottom: '15px'
                                                },
                                            }}
                                        />
                                    </div>


                                    <TextField
                                        fullWidth
                                        label="Asunto"
                                        placeholder="Por ejemplo, Revision de logs microservicios"
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '5px',
                                                marginBottom: '15px'
                                            },
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        label="Causa de la intervención"
                                        placeholder="Por ejemplo, Fallo en los microservicios"
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

                                    <div className="persona-contacto">

                                        <TextField
                                            fullWidth
                                            label="Persona de Contacto"
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

                                        <TextField
                                            fullWidth
                                            label="Contacto"
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
                                    </div>

                                    <div className="content-formulario">
                                        <TimeDate label='Fe. Vencimiento' />
                                    </div>

                                    <div className="title-label">
                                        <h2>Detalles de la Solicitud</h2>
                                        <p style={{ color: '#595959ff' }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, architecto.</p>
                                    </div>
                                    <div className="content-formulario">
                                        {/*ESTADO-SOLI*/}
                                        <OptionAmbiente />
                                        <OptionTPS />
                                        <OptionPrioridad />
                                        <OptionEstado />

                                    </div>

                                    <div className="content-formulario">
                                        <OptionUsuario />
                                        <OptionUsuario />
                                    </div>

                                    <div className='content-formulario'>
                                        <OptionProducto />
                                        <OptionComponente />
                                        <OptionSubComponente />
                                        <OptionCliente />
                                    </div>

                                </Grid>

                                {/* Enlace para añadir más */}
                                <AccordionEvidencias />

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