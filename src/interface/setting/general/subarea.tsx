import { useState } from "react"

//component
import SimpleBarChart from '../component/charts/chart_organization';
import TableSubarea from '../component/table/table_subarea';
import ModalSubarea from '../component/modal/modal_subarea';


function Subarea() {
    return (
        <>
            <div className="content-header">
                <h2 >Gestion de Subarea</h2>

                <p style={{}}>
                    <span className="header-emoji">⚡</span> Jueves, 13 de noviembre, 22:19
                </p>
            </div>

        <div className="btn" style={{textAlign: 'end', padding: '30px 60px'}}>
            <ModalSubarea />
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
                    <TableSubarea />
                </div>
                


            </div>
        </>
    )
}
export default Subarea