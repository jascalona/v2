import { useState } from "react";

// Componentes
import CardRequest from "./setting/component/card/card_solicitud";
import BarsProduct from "./setting/component/charts/chart_product";
import PieActiveArc from "./setting/component/charts/chart_product_all";
import RequestCreate from "./setting/component/charts/chart_elemet_create";
import TableSolicitud from "./setting/component/table/table_solicitud";
import ModalSolicitud from "./setting/component/modal/modal_request";
import CreateTask from "./setting/component/modal/modal_task";
import ListTask from "./setting/component/card/list_task";


import '../assets/css/dropdown.css'

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
                <div className="card-expenses-summary">
                    <div className="summary-header">
                        <p>Elementos Creados</p>
                        <div className="month-selector">
                            <span>Filtros</span>
                        </div>
                    </div>

                    <div className="summary-content">
                        <div className="chart-container">
                            <RequestCreate />
                        </div>

                        <div className="categories-information">

                            <div className="category-item">
                                <div className="category-marker category-marker-it"></div>
                                <div className="category-details">
                                    <p className="category-name">Nombre de Producto</p>
                                    <p className="category-amount"><strong>2,657.89</strong></p>
                                </div>
                            </div>

                            <div className="category-item">
                                <div className="category-marker category-marker-shopping"></div>
                                <div className="category-details">
                                    <p className="category-name">Nombre de Producto</p>
                                    <p className="category-amount"><strong>2,657.89</strong></p>
                                </div>
                            </div>

                            <div className="category-item">
                                <div className="category-marker category-marker-salary"></div>
                                <div className="category-details">
                                    <p className="category-name">Nombre de Producto</p>
                                    <p className="category-amount"><strong>2,657.89</strong></p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div className="container-solicitudes" style={{ marginTop: '20px', alignItems: 'start' }}>

                <div className="request-generate">
                    <TableSolicitud />
                </div>


                <div>

                    <div className="creation-task">
                        <CreateTask />
                    </div>

                    <div className="card-expenses-summary">
                        <div className="summary-header">
                            <p>Tarea recientes</p>
                            <div className="month-selector">
                                <span>Filtros</span>
                            </div>
                        </div>

                        <ListTask />

                    </div>

                </div>

                <ModalSolicitud />

            </div>

        </>
    )
}
export default UIRequest