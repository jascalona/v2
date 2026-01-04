import { useState } from "react";
import TabsCustomers from "./setting/component/tabs/tabs_customer";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import '../assets/css/customer.css'


function Customer() {
    return (
        <>
            <div className="container-card-customer">
                <div className="card-item-indicator">
                    <span className='icon'><PrecisionManufacturingIcon sx={{ fontSize: 18 }} /></span>
                    <div className="item-body">
                        <small>Clientes SyPago</small><br />
                        <small>1</small>
                    </div>
                </div>

                <div className="card-item-indicator">
                    <span className='icon'><PrecisionManufacturingIcon sx={{ fontSize: 18 }} /></span>
                    <div className="item-body">
                        <small>Clientes SIMF</small><br />
                        <small>1</small>
                    </div>
                </div>


                <div className="card-item-indicator">
                    <span className='icon'><PrecisionManufacturingIcon sx={{ fontSize: 18 }} /></span>
                    <div className="item-body">
                        <small>Clientes SGLPAR</small><br />
                        <small>1</small>
                    </div>
                </div>


                <div className="card-item-indicator">
                    <span className='icon'><PrecisionManufacturingIcon sx={{ fontSize: 18 }} /></span>
                    <div className="item-body">
                        <small>Tareas Middleware</small><br />
                        <small>1</small>
                    </div>
                </div>

            </div>
            <TabsCustomers />
        </>
    )
}

export default Customer