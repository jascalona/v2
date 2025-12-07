import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function DetailsSoli() {
    return (
        <div>
            <Accordion defaultExpanded style={{ background: 'none', boxShadow: 'none', border: 'solid 1px #ccc2c271', borderRadius: '5px' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    style={{ borderBottom: 'solid 1px #ccc2c271' }}

                >
                    <Typography component="span"><strong>Detalles</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div className="sidebar-content-soli">

                            <div className="item">
                                <span>Ambiente: </span>
                                <span>Produccion</span>
                            </div>

                            <div className="item">
                                <span>Prodcuto:</span>
                                <span>SyPago</span>
                            </div>

                            <div className="item">
                                <span>Tipo: </span>
                                <span>Incidencia</span>
                            </div>

                            <div className="item">
                                <span>Personal asignado: </span>
                                <span>Jose Escalona</span>
                            </div>

                            <div className="item">
                                <span>Prioridad: </span>
                                <span>Medio</span>
                            </div>

                            <div className="item">
                                <span>Estado: </span>
                                <span>Asigando</span>
                            </div>

                            <div className="item">
                                <span>Creado el: </span>
                                <span>2025-12-05 12:25:01</span>
                            </div>

                            <div className="item">
                                <span>Fecha de vencimiento: </span>
                                <span>2025-12-05 12:25:01</span>
                            </div>

                            <hr />

                            <div className="item">
                                <span>Cliente: </span>
                                <span>Bancaribe</span>
                            </div>

                            <div className="item">
                                <span>Comercio</span>
                                <span>Seguros FRP</span>
                            </div>





                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion style={{ background: 'none', boxShadow: 'none', border: 'solid 1px #ccc2c271', borderRadius: '5px' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    style={{ borderBottom: 'solid 1px #ccc2c271' }}

                >
                    <Typography component="span"><strong>Detalles de Solucion</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div className="sidebar-content-soli">

                            <div className="item">
                                <span>Estado: </span>
                                <span>Resuelto</span>
                            </div>

                            <div className="item">
                                <span>Fecha de solucion:</span>
                                <span>2025-11-30T15:11:16</span>
                            </div>

                            <div className="item">
                                <span>Resuelto por: </span>
                                <span>Jose Escalona</span>
                            </div>

                            <hr />
                        </div>

                        <div className="descript-solution">

                            <div className="item">
                                <span><strong>Causa de la Incidencia:</strong> </span>
                                <br />
                                <p>
                                    quasi at ullam repellat nisi consequuntur ipsam voluptatem.
                                    Esse cumque quibusdam quidem voluptatibus cupiditate laboriosam
                                    dolorem quis at inventore fugiat ipsa iusto pariatur dolore officiis quasi,
                                </p>
                            </div>

                            <br />

                            <div className="item">
                                <span><strong>Observaciones:</strong> </span>
                                <br />
                                <p>
                                    quasi at ullam repellat nisi consequuntur ipsam voluptatem.
                                    Esse cumque quibusdam quidem voluptatibus cupiditate laboriosam
                                </p>
                            </div>
                        </div>

                    </Typography>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}
export default DetailsSoli
