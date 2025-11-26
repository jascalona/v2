import { useState } from "react";

//Icons
import MultilineChartIcon from '@mui/icons-material/MultilineChart';


function CardRequest() {
    return (
        <>
            <div className="card-request">
                <span><MultilineChartIcon /></span>
                <h3>Producto</h3>
                <div className="content-request">
                    <span><small>Pendientes</small><strong className="count-span warning">10</strong></span>
                    <span><small>Cerrados</small><strong className="count-span success">20</strong></span>  
                </div>
                <p>Total solicitudes: <strong>30</strong></p>
            </div>
        </>
    )
}
export default CardRequest