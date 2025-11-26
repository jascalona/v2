import { Link } from 'react-router-dom';
import LabelSLA from '../component/labels/label_sla';


function SLA() {
    return (

        <>
            <div className="dashboard-content">

                {/* Encabezado */}


                {/* Guía de inicio rápido */}
                <div className="section quick-start-section">

                    <div className="container-setting-general">

                        <div className="other-setting" style={{ marginTop: 40 }}>

                            <h2>SLA (Labels)</h2>
                            <p>
                                En este apartado podra administrar y diseñar distintos recursos de su organizacion
                            </p>
                            {/*CONTENIDO LABELS*/}
                            <LabelSLA />
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default SLA