import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../../../assets/css/details.css'

//Componentes
import TaskBySoli from '../table/table_tarea_soli';
import NotekBySoli from '../table/table_nota_soli';
import ModalTarea from '../modal/modal_task';
import ModalNota from '../modal/modal_nota';
//Icons

interface idSolicitud {
    co_solicitud: string
}

function DetallesTarea({ co_solicitud }: idSolicitud) {
    return (
        <div>
            <Accordion defaultExpanded style={{ background: 'none', border: 'none', boxShadow: 'none' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className='details-accordion'
                    style={{ borderBottom: 'solid 1px #ccc2c271' }}
                >

                    <Typography component="span">
                        <span style={{ fontSize: 20 }}>+ </span> Tareas asociadas</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ paddingTop: 30 }}>
                    <Typography>

                            <ModalTarea co_solicitud={co_solicitud}/>

                        {/*AQUI PASAMOS EL ID DE LA SOLICITUD*/}
                        <TaskBySoli idSolicitud={co_solicitud} />
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded style={{ background: 'none', border: 'none', boxShadow: 'none' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className='details-accordion'
                    style={{ borderBottom: 'solid 1px #ccc2c271' }}
                >

                    <Typography component="span">
                        <span style={{ fontSize: 20 }}>+ </span> Notas Asociadas</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ paddingTop: 30 }}>
                    <Typography>
                        <ModalNota />

                        <NotekBySoli idSolicitud={co_solicitud} />
                    </Typography>
                </AccordionDetails>
            </Accordion>


        </div>
    );
}

export default DetallesTarea
