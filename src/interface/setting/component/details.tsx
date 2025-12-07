import { useState } from "react";
// Asegúrate de que esta ruta apunte al archivo CSS que contendrá los nuevos estilos
import '../../../assets/css/details.css';

// componentes
import DetailsSoli from '../component/accordion/detalle_soli';
import DetallesTarea from '../component/accordion/detalle_tareas';
import DetallesEscalamiento from '../component/accordion/detalle_escalamiento';


function DetallesSolicitud() {
    return (
        <>
            {/* Usaremos esta clase para establecer Flexbox/Grid y la disposición de las columnas */}
            <div className="container-interface-description">
                <div className="container-desc-soli">
                    <h2 style={{ margin: 0, paddingBottom: '5px' }}>REVISION DE INCIDENCIA SIMF PRODUCCION</h2>
                    <small style={{ fontSize: 13 }}><strong> Creado el: <span>2025-12-05 12:25:01</span></strong></small>

                    <h4 style={{ marginTop: '40px' }}>Descripción</h4>
                    <div className="content-details">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, sequi?
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut cupiditate facere exercitationem rem ipsum minus quisquam suscipit.
                            Tempora debitis, molestias quis omnis illum eveniet nisi explicabo odit porro voluptas facere?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi a maxime et praesentium cupiditate vitae possimus tenetur adipisci, illo sit, velit culpa deserunt nisi! Dicta porro alias eos exercitationem! Quis dolorum omnis deleniti nihil quibusdam, iure incidunt optio itaque, esse, alias sed ipsam maiores cum facilis fuga illum? Pariatur voluptate nulla temporibus voluptatem esse sint omnis, consequatur, praesentium repudiandae quia iure sed, suscipit sapiente cumque assumenda accusamus dolorum rem natus enim ipsam libero ad perferendis nobis. Reprehenderit aliquid dolores aut maiores error commodi corrupti amet veniam at, itaque, magni tempora, labore temporibus harum ex a minus quam eum ab cum!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi a maxime et praesentium cupiditate vitae possimus tenetur adipisci, illo sit, velit culpa deserunt nisi! Dicta porro alias eos exercitationem! Quis dolorum omnis deleniti nihil quibusdam, iure incidunt optio itaque, esse, alias sed ipsam maiores cum facilis fuga illum? Pariatur voluptate nulla temporibus voluptatem esse sint omnis, consequatur, praesentium repudiandae quia iure sed, suscipit sapiente cumque assumenda accusamus dolorum rem natus enim ipsam libero ad perferendis nobis. Reprehenderit aliquid dolores aut maiores error commodi corrupti amet veniam at, itaque, magni tempora, labore temporibus harum ex a minus quam eum ab cum!

                        </p>
                    </div>

                    <div className="activities">
                        <h4>Actividades vinculadas</h4>


                        <div className="asociados">
                            <DetallesTarea />
                        </div>
                        <br />
                        <div className="asociados">
                            <DetallesEscalamiento />
                        </div>
                    </div>

                </div>

                {/* Este será el Sidebar derecho */}
                <div className="container-detalles">
                    <DetailsSoli />
                </div>
            </div>
        </>
    )
}
export default DetallesSolicitud