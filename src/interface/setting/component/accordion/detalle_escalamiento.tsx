import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../../../assets/css/details.css';

function DetallesEscalamiento() {
    return (
        <div>
            <Accordion style={{ background: 'none', border: 'none', boxShadow: 'none' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className='details-accordion'
                    style={{ borderBottom: 'solid 1px #ccc2c271' }}
                >

                    <Typography component="span">
                        <span style={{ fontSize: 20 }}>+ </span> Escalamientos asociados</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ paddingTop: 30 }}>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}
export default DetallesEscalamiento