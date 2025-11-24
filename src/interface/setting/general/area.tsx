import { useState } from "react"

//component
import SimpleBarChart from '../component/chart_organization';
import TableArea from '../component/table_area';
import ModalArea from '../component/modal_area';


function Area() {
    return (
        <>
            <div className="content-header">
                <h2 >Gestion de Area</h2>

                <p style={{}}>
                    <span className="header-emoji">⚡</span> Jueves, 13 de noviembre, 22:19
                </p>
            </div>

        <div className="btn" style={{textAlign: 'end', padding: '30px 60px'}}>
            <ModalArea />
        </div>    

            <div className="container-organization">
                <div className="gallery-organization">
                    <div className="card-resumen-organization">
                        <p>Elementos totales de trabajo</p>
                        <h2>2</h2>
                    </div>

                    <div className="card-resumen-organization">
                        <p>Elementos totales de trabajo</p>
                        <h2>2</h2>
                    </div>

                    <div className="card-resumen-organization">
                        <p>Elementos totales de trabajo</p>
                        <h2>2</h2>
                    </div>

                    <div className="card-resumen-organization">
                        <p>Elementos totales de trabajo</p>
                        <h2>2</h2>
                    </div>

                    <div className="card-resumen-organization">
                        <p>Elementos totales de trabajo</p>
                        <h2>2</h2>
                    </div>
                </div>


                <div className="chart-organization">
                    <SimpleBarChart />
                </div>

                <div className="container-table">
                    <TableArea />
                </div>
                


            </div>
        </>
    )
}
export default Area