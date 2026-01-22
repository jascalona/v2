import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//import { FilterMatchMode } from 'primereact/api';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';

// Importación de estilos y nuevos iconos
import '../../../../../assets/css/activiades.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FlagIcon from '@mui/icons-material/Flag';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EditSquareIcon from '@mui/icons-material/EditSquare';



interface Solicitud {
    co_solicitud: number;
    co_solicitud_bcv: string;
    fe_registro: string;
    co_prioridad: string;
    co_tp_solicitud: string;
    co_sla: string;
    fe_vencimiento: string;
    co_ambiente: string;
    co_estado: string;
    co_producto: string;
    co_componente: string;
    co_subcomponente: string;
    co_cliente: string;
    nb_contacto: string;
    nu_celular_contacto: string;
    co_user_creador_soli: string;
    co_user_asignado: string;
    tx_asunto: string;
    tx_descripcion: string;
    tx_descripcion_resolucion: string;
    tx_causa: string;
    co_user_resolutor: string;
    fe_cierre: string;
    co_area: string;
}

/* Se desactivaron los filtros por el momento
const initialFilters = {
    global: { value: null as string | null, matchMode: FilterMatchMode.CONTAINS },
};
*/

interface SoliUserProp {
    idUser?: string;
}

function RequestActivities({ idUser }: SoliUserProp) {
    const [task, setTask] = useState<Solicitud[]>([]);
    const [cargando, setCargando] = useState(true);
    //const [filters, setFilters] = useState(initialFilters);

    // Estados para el Modal
    const [displayModal, setDisplayModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Solicitud | null>(null);

    useEffect(() => {
        if (!idUser) return;
        axios.get<Solicitud[]>(`http://localhost:8081/request/${idUser}/users`)
            .then(response => {
                setTask(response.data);
                setCargando(false);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los registros", error);
                setCargando(false);
            });
    }, [idUser]);

    const openCustomerModal = (customer: Solicitud) => {
        setSelectedCustomer(customer);
        setDisplayModal(true);
    };

    // Cabecera de grupo (La franja azul o gris que separa los estados)
    const headerTemplate = (data: Solicitud) => {
        const isEnCurso = data.co_estado === 'EN CURSO';
        return (
            <div className={`group-header ${isEnCurso ? 'header-blue' : 'header-gray'}`}>
                <span className="group-title">{data.co_estado}</span>
                <span className="group-count">
                    {task.filter(t => t.co_estado === data.co_estado).length}
                </span>
            </div>
        );
    };

    // Celda de Prioridad con banderita
    const priorityBodyTemplate = (rowData: Solicitud) => {
        const isUrgent = rowData.co_prioridad === 'Urgente';
        return (
            <span className="priority-cell">
                <FlagIcon style={{ color: isUrgent ? '#d32f2f' : '#bdbdbd', fontSize: '16px' }} />
                <span style={{ marginLeft: '5px' }}>{rowData.co_prioridad}</span>
            </span>
        );
    };

    // Celda de Estado (Badge redondo)
    const statusBodyTemplate = (rowData: Solicitud) => {
        const statusClass = rowData.co_estado === 'EN CURSO' ? 'status-in-progress' : 'status-pending';
        return (
            <span className={`status-badge ${statusClass}`}>
                <span className="dot"></span> {rowData.co_estado}
            </span>
        );
    };

    if (cargando) return <p>Cargando registros...</p>;

    return (
        <div className="modern-tasks-container">
            <header className="table-header-custom">
                <div className="header-left">
                    <p className=""><strong>Solicitudes Asignadas <span style={{ color: 'blue' }}>{task.length}</span></strong></p>
                </div>
            </header>

            <div className="table-card">
                <DataTable
                    value={task}
                    rowGroupMode="subheader"
                    groupRowsBy="co_estado"
                    rowGroupHeaderTemplate={headerTemplate}
                    className="clickup-style-table"
                    responsiveLayout="scroll"
                   // filters={filters}
                    showGridlines={false}
                    rowHover
                >
                    {/* Columna de Nombre / Asunto */}
                    <Column field="tx_asunto" header="Nombre" body={(rowData) => (
                        <div className="name-cell">
                            <span className="status-circle-icon"></span>
                            <span className="task-text">{rowData.tx_asunto}</span>
                            {rowData.co_solicitud_bcv && (
                                <span className="tag-bcv">{rowData.co_solicitud_bcv}</span>
                            )}
                        </div>
                    )} />

                    {/* Columna Persona Asignada */}
                    <Column field="co_user_asignado" header="Persona asignada" body={(rowData) => (
                        <span className="date-cell">{rowData.co_user_asignado}</span>

                    )} />

                    {/* Columna Fecha Límite */}
                    <Column field="fe_vencimiento" header="Fecha límite" body={(rowData) => (
                        <span className="date-cell overdue">{rowData.fe_vencimiento}</span>
                    )} />

                    {/* Columna Prioridad */}
                    <Column field="co_prioridad" header="Prioridad" body={priorityBodyTemplate} />

                    {/* Columna Estado */}
                    <Column field="co_estado" header="Estado" body={statusBodyTemplate} />

                    {/* Columna Comentarios */}
                    <Column header="Comentarios" body={() => (
                        <div className="comment-cell">
                            <ChatBubbleOutlineIcon style={{ color: '#bdbdbd', fontSize: '18px' }} />
                        </div>
                    )} />

                    {/* Columna de Acciones */}
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

            {/* --- MODAL DETALLES --- */}
            <Dialog
                header="Detalles de la solicitud"
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
                            <label>ID Solicitud</label>
                            <span>{selectedCustomer.co_solicitud}</span>
                        </div>


                        <div className="info-item">
                            <label>ID Solicitud BCV</label>
                            <span>{selectedCustomer.co_solicitud_bcv}</span>
                        </div>

                        <div className="info-item">
                            <label>Estado</label>
                            <span>{selectedCustomer.co_estado}</span>
                        </div>

                        <div className="info-item">
                            <label>Creado por:</label>
                            <span>{selectedCustomer.co_user_creador_soli}</span>
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

export default RequestActivities;