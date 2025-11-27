import { useState } from "react";

//Icons
import MultilineChartIcon from '@mui/icons-material/MultilineChart';


function CardRequest() {
    return (
        <>
            <div className="card-request">
                <div className="content-header-request">
                    <span><MultilineChartIcon sx={{fontSize: 30}}/></span>
                    <h3>Producto</h3>
                </div>
                <div className="content-request">
                    <span className="warning"><small>Pendientes</small> 10</span>
                    <span className="success"><small>Cerrados</small> 20</span>
                </div>
                <p>Total solicitudes: <strong> 30</strong></p>
            </div>
        </>
    )
}
export default CardRequest