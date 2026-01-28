import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog'; // 1. Importar Dialog
import axios from 'axios';
import '../../../../assets/css/table_customer.css'

import EditSquareIcon from '@mui/icons-material/EditSquare';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CreateTask from '../modal/modal_task';



interface Tarea {
    co_tarea: string,
    tx_asunto: string,
    tx_descripcion: string,
    fe_registro: string,
    fe_vencimiento: string,
    co_user_creador_tarea: string,
    co_user_asignado: string,
    fe_cierre: string,
    co_solicitud: string,
    co_area: string,
    co_estado: string
}

function TableTask() {
    const [task, setTask] = useState<Tarea[]>([]);
    const [cargando, setCargando] = useState(true);

    // --- ESTADOS PARA EL MODAL ---
    const [displayModal, setDisplayModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Tarea | null>(null);

    useEffect(() => {
        axios.get<Tarea[]>('http://localhost:8081/task')
            .then(response => {
                setTask(response.data);
                setCargando(false);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los registros", error);
                setCargando(false);
            });
    }, []);

    // --- FUNCIÓN PARA ABRIR MODAL ---
    const openCustomerModal = (customer: Tarea) => {
        setSelectedCustomer(customer);
        setDisplayModal(true);
    };

    if (cargando) return <p>Cargando registros...</p>

    return (
        <div className="container-main-table">
            <header className="table-header-custom">
                <div className="header-left">
                    <h2>Gestion de Tareas <span className="badge-count">{task.length} tasks</span></h2>
                    <p className="subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, officiis.</p>
                </div>
            </header>

            <div className='bt-task' >
                <div className="btn-tarea">
                    <CreateTask />
                </div>
            </div>

            <div className="table-card">
                <div className="table-toolbar">
                    {/*CARGAR FILTROS*/}
                </div>

                <DataTable
                    value={task}
                    paginator
                    rows={10}
                    className="custom-datatable"
                    globalFilterFields={['co_rif', 'nb_cliente', 'co_rol', 'co_producto']}
                    responsiveLayout="scroll"
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="nb_cliente" header="Cliente" body={(rowData) => (
                        <div className="client-cell">
                            <span className="client-name">{rowData.co_tarea}</span>
                            <span className="client-sub">{rowData.tx_asunto}</span>
                        </div>
                    )} sortable></Column>
                    <Column field="co_tarea" header="ID Tarea"></Column>
                    <Column field="co_user_emisor" header="Creado por:"></Column>
                    <Column field="fe_registro" header="Último registro"></Column>


                    {/* COLUMNA DE ACCIONES MODIFICADA */}
                    <Column body={(rowData: Tarea) => (
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
                            <label>ID Tarea</label>
                            <span>{selectedCustomer.co_tarea}</span>
                        </div>

                        <div className="info-item">
                            <label>Estado</label>
                            <span>{selectedCustomer.co_estado}</span>
                        </div>

                        <div className="info-item">
                            <label>Creado por:</label>
                            <span>{selectedCustomer.co_user_creador_tarea}</span>
                        </div>

                        <div className="info-item">
                            <label>Fe. de Registro</label>
                            <span className="badge-rol">{selectedCustomer.fe_registro}</span>
                        </div>

                        <div className="info-item">
                            <label>Area Asignada</label>
                            <span>{selectedCustomer.co_area}</span>
                        </div>

                        <div className="info-item">
                            <label>Fe. vencimiento</label>
                            <span className="badge-rol">{selectedCustomer.fe_vencimiento}</span>
                        </div>

                        <div className="info-item">
                            <label>Personal Asigando</label>
                            <span>{selectedCustomer.co_user_asignado}</span>
                        </div>


                        <div className="info-item">
                            <label>Fe. Cierre</label>
                            <span className="badge-rol">{selectedCustomer.fe_cierre}</span>
                        </div>

                        <div className="info-item full-width">
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

export default TableTask;