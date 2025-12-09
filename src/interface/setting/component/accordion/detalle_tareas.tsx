import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../../../assets/css/details.css'

//Componentes
import TaskList from '../table/tabla_tarea';


//Icons

function DetallesTarea() {
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
                <AccordionDetails style={{paddingTop: 30}}>
                    <Typography>
                       <TaskList />
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi impedit eligendi animi necessitatibus vero non assumenda? Ab cupiditate ratione incidunt eos doloremque autem sunt harum, nulla unde magni quisquam dolor reiciendis reprehenderit officia vel, ipsa dolores. At maxime consectetur aut mollitia, doloremque distinctio omnis optio, fugiat nemo provident officiis repudiandae?
                    </Typography>
                </AccordionDetails>
            </Accordion>


        </div>
    );
}

export default DetallesTarea
