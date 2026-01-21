import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { Dialog } from 'primereact/dialog'; // 1. Importar Dialog
import axios from 'axios';
import '../../../../assets/css/activiades..css'

import EditSquareIcon from '@mui/icons-material/EditSquare';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Solicitud {
    co_solicitud: string,
    fe_registro: string,
    fe_vencimiento: string,
    fe_resolucion: string,
    fe_cierre: string,
    co_user_credor_soli: string,
    co_user_asignado: string
    co_user_resolutor: string,
    co_tip_solicitud: string,
    nb_contacto: string,
    nu_celular_contacto: string,
    tx_asunto: string,
    tx_descripcion: string,
    tx_causa: string,
    co_ambiente: string,
    co_producto: string,
    co_sla: string,
    co_user_cierre: string,
    tx_desc_resolucion: string,
    tx_nota: string,
    co_estado: string,
    co_cliente: string,
    co_prioridad: string
    co_area: string
}

const initialFilters = {
    global: { value: null as string | null, matchMode: FilterMatchMode.CONTAINS },
};

interface SoliUserProp {
    idUser?: string
}

function RequestActivities({ idUser }: SoliUserProp) {
    const [solicitud, setSolicitud] = useState<Solicitud[]>([]);
    const [cargando, setCargando] = useState(true);
    const [filters, setFilters] = useState(initialFilters);

    // --- ESTADOS PARA EL MODAL ---
    const [displayModal, setDisplayModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Solicitud | null>(null);

    useEffect(() => {
        if (!idUser) return; // validar que no se pase vacio
        setCargando(true)

        axios.get<Solicitud[]>(`http://localhost:8081/request/${idUser}/users`)
            .then(response => {
                setSolicitud(response.data);
                setCargando(false);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los registros", error);
                setCargando(false);
            });
    }, []);

    // --- FUNCIÓN PARA ABRIR MODAL ---
    const openCustomerModal = (customer: Solicitud) => {
        setSelectedCustomer(customer);
        setDisplayModal(true);
    };

    if (cargando) return <p>Cargando registros...</p>

    return (
        <div className="container-main-table">
            <header className="table-header-custom">
                <div className="header-left">
                    <h2>Gestion de Tareas <span className="badge-count">{solicitud.length} tasks</span></h2>
                    <p className="subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, officiis.</p>
                </div>
            </header>

            <div className="table-card">
                <div className="table-toolbar">
                    {/*CARGAR FILTROS*/}
                </div>

                <DataTable
                    value={solicitud}
                    paginator
                    rows={10}
                    className="custom-datatable"
                    filters={filters}
                    globalFilterFields={['co_rif', 'nb_cliente', 'co_rol', 'co_producto']}
                    responsiveLayout="scroll"
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="nb_cliente" header="Cliente" body={(rowData) => (
                        <div className="client-cell">
                            <span className="client-name">{rowData.co_solicitud}</span>
                            <span className="client-sub">{rowData.tx_asunto}</span>
                        </div>
                    )} sortable></Column>
                    <Column field="co_solicitud" header="ID Solicitud"></Column>
                    <Column field="co_user_credor_soli" header="Creado por:"></Column>
                    <Column field="fe_registro" header="Creado el:"></Column>


                    {/* COLUMNA DE ACCIONES MODIFICADA */}
                    <Column body={(rowData: Solicitud) => (
                        <div className="action-buttons">
                            <button className="btn-secondary" style={{ marginRight: 4 }}>
                                <EditSquareIcon sx={{ fontSize: 15, color: '#17306a' }} />
                            </button>

                            <button
                                className="btn-secondary"
                                onClick={() => openCustomerModal(rowData)}
                            >
                                <VisibilityIcon sx={{ fontSize: 15, color: '#17306a' }} />
                            </button>
                        </div>
                    )} headerStyle={{ width: '8rem' }}></Column>
                </DataTable>
            </div>

            {/* --- COMPONENTE DIALOG (MODAL) --- */}
            <Dialog
                header="Detalles de la tarea"
                visible={displayModal}
                style={{ width: '45vw', minWidth: '400px' }}
                breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                onHide={() => setDisplayModal(false)}
                draggable={false}
                resizable={false}
                maskClassName="custom-mask"
                className="custom-customer-modal"
            >
                {selectedCustomer && (
                    <div className="customer-info-grid">
                        <div className="info-item full-width">
                            <label>N# Solicitud</label>
                            <span>{selectedCustomer.co_solicitud}</span>
                        </div>

                        <div className="info-item">
                            <label>Ambiente</label>
                            <span>{selectedCustomer.co_ambiente}</span>
                        </div>

                        <div className="info-item">
                            <label>Estado</label>
                            <span>{selectedCustomer.co_producto}</span>
                        </div>

                        <div className="info-item">
                            <label>Tipo de Solicitud</label>
                            <span>{selectedCustomer.co_tip_solicitud}</span>
                        </div>

                        <div className="info-item">
                            <label>Creado por:</label>
                            <span>{selectedCustomer.co_user_credor_soli}</span>
                        </div>

                        <div className="info-item">
                            <label>Personal Asignado:</label>
                            <span>{selectedCustomer.co_user_asignado}</span>
                        </div>

                        <div className="info-item">
                            <label>Prioridad</label>
                            <span className="badge-rol">{selectedCustomer.co_prioridad}</span>
                        </div>

                        <div className="info-item">
                            <label>Area Asignada</label>
                            <span>{selectedCustomer.co_area}</span>
                        </div>

                        <div className="info-item">
                            <label>Estado</label>
                            <span>{selectedCustomer.co_estado}</span>
                        </div>

                        <div className="info-item">
                            <label>Personal Asigando</label>
                            <span>{selectedCustomer.co_user_asignado}</span>
                        </div>

                        <div className="info-item">
                            <label>Creado el:</label>
                            <span className="badge-rol">{selectedCustomer.fe_registro}</span>
                        </div>

                        <div className="info-item">
                            <label>Fe. vencimiento</label>
                            <span className="badge-rol">{selectedCustomer.fe_vencimiento}</span>
                        </div>

                        <div className="info-item">
                            <label>Fe. Cierre</label>
                            <span className="badge-rol">{selectedCustomer.fe_cierre}</span>
                        </div>


                        <div className="info-item">
                            <label>Cliente</label>
                            <span className="badge-rol">{selectedCustomer.co_cliente}</span>
                        </div>

                        <div className="info-item ">
                            <label>Asunto</label>
                            <span><strong>{selectedCustomer.tx_asunto}</strong></span>
                        </div>


                        <div className="info-item full-width" style={{ maxHeight: '250px', overflow: "auto" }}>
                            <label>Descripcion</label>
                            <span>{selectedCustomer.tx_descripcion}</span>
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
}

export default RequestActivities;