import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


function AccordionEvidencias() {
    return (
        <div>
            <Accordion sx={{
                boxShadow: 'none'
            }}>
                <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{
                        width: 'auto'
                    }}
                >
                    <Typography component="span" sx={{
                        padding: '8px',
                        borderRadius: '8px',
                        color: '#ffff',
                        backgroundColor: 'rgb(38, 66, 124)',
                        '&:hover': {
                            backgroundColor: 'rgba(27, 49, 93, 1)',
                        }
                    }}>+ Añadir más</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>



                        <TextField style={{ marginTop: 5 }}
                            fullWidth
                            label="Observaciones"
                            placeholder="Por ejemplo, Se realizo la validacion adecuada de los logs, sin embargo..."
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
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default AccordionEvidencias
