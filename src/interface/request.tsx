import { useState } from "react";

// Componentes
import CardRequest from "./setting/component/card/card_solicitud";
import BarsProduct from "./setting/component/charts/chart_product";
import PieActiveArc from "./setting/component/charts/chart_product_all";

function UIRequest() {
    return (
        <>

            <div className="container-solicitudes">

                <div className="container-request">
                    <CardRequest />
                    <CardRequest />
                    <CardRequest />
                </div>

                <div className="card-chart">
                    <PieActiveArc />
                </div>

            </div>

            <div className="container-solicitudes-ii">
                <div className="card-chart">
                    <BarsProduct />
                </div>

                <div className="card-chart">
                    <BarsProduct />
                </div>

                <div className="card-chart">
                    <BarsProduct />
                </div>

            </div>

        </>
    )
}
export default UIRequest