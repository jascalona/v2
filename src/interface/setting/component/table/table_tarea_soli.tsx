import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog'; // 1. Importar Dialog
import axios from 'axios';
import '../../../../assets/css/table_customer.css'

import EditSquareIcon from '@mui/icons-material/EditSquare';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface TaskSoli {
    co_tarea: string,
    tx_asunto: string,
    tx_description: string,
    fe_registro: string,
    fe_vencimiento: string,
    co_user_emisor: string,
    co_user_asignado: string,
    fe_cierre: string,
    co_solicitud: string,
    co_area: string,
    co_estado: string
}

const initialFilters = {
    global: { value: null as string | null, matchMode: FilterMatchMode.CONTAINS },
};


// INTERFAZ QUE RECIBE EL ID SOLICITUD
interface TaskBySoliProps {
    idSolicitud: string | number;
}


function TaskBySoli({ idSolicitud }: TaskBySoliProps) {
    const [task, setTask] = useState<TaskSoli[]>([]);
    const [cargando, setCargando] = useState(true);
    const [filters, setFilters] = useState(initialFilters);

    // --- ESTADOS PARA EL MODAL ---
    const [displayModal, setDisplayModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<TaskSoli | null>(null);

    useEffect(() => {
        if (!idSolicitud) return; //validar que no este vacio
        setCargando(true)

        axios.get<TaskSoli[]>(`http://localhost:8081/request/${idSolicitud}/task`)
            .then(response => {
                setTask(response.data);
                setCargando(false);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los registros", error);
                setCargando(false);
            });
    }, [idSolicitud]);

    // --- FUNCIÓN PARA ABRIR MODAL ---
    const openCustomerModal = (customer: TaskSoli) => {
        setSelectedCustomer(customer);
        setDisplayModal(true);
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
    };

    if (cargando) return <p>Cargando registros...</p>

    return (
        <div className="container-main-table">

            <div className="table-card">
                <DataTable
                    value={task}
                    paginator
                    rows={10}
                    className="custom-datatable"
                    filters={filters}
                    responsiveLayout="scroll"
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="tx_asunto" header="Detalles" body={(rowData) => (
                        <div className="client-cell">
                            <span className="client-name">{rowData.co_tarea}</span>
                            <span className="client-sub">{rowData.tx_asunto}</span>
                        </div>
                    )} sortable></Column>
                    <Column field="co_user_emisor" header="Creado por:"></Column>
                    <Column field="fe_registro" body={(rowData) => rowData.fe_registro?.substring(0, 19)}
                        header="Fe. Registro"></Column>


                    {/* COLUMNA DE ACCIONES MODIFICADA */}
                    <Column body={(rowData: TaskSoli) => (
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
                            <span>{selectedCustomer.co_user_emisor}</span>
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
                            <span>{selectedCustomer.tx_asunto}</span>
                        </div>


                        <div className="info-item full-width" style={{ maxHeight: '250px', overflow: "auto" }}>
                            <label>Descripcion</label>
                            <span>{selectedCustomer.tx_description}</span>
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
}

export default TaskBySoli;