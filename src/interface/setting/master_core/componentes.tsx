import CardComponent from "../component/labels/label_component";
import ModalComponent from '../component/modal_component';

import '../../../assets/css/label.css';

function Componentes() {
    return (
        <>
            <div className="dashboard-content">

                {/* Encabezado */}


                {/* Guía de inicio rápido */}
                <div className="section quick-start-section">

                    <div className="container-setting-general">

                        <div className="other-setting" style={{ marginTop: 40 }}>

                            <h2>Componentes</h2>
                            <div className="h" style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', paddingBottom: '15px' }}>
                                <p>
                                    En este apartado podra administrar y diseñar distintos recursos de su organizacion
                                </p>

                                <div className="section-modal" >
                                    <ModalComponent />
                                </div>
                            </div>

                            <div className="card-component">
                                <CardComponent />
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Componentes