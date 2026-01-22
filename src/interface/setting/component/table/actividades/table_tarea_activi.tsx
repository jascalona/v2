import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//import { FilterMatchMode } from 'primereact/api';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';

// Importación de estilos y nuevos iconos
import '../../../../../assets/css/activiades.css'
import EditSquareIcon from '@mui/icons-material/EditSquare';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FlagIcon from '@mui/icons-material/Flag';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

interface Tarea {
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
    co_estado: string,
    co_prioridad?: string // Añadido para consistencia visual
}

/*
const initialFilters = {
    global: { value: null as string | null, matchMode: FilterMatchMode.CONTAINS },
};
*/

interface TaskUserProp {
    idUser?: string
}

function TaskActivities({ idUser }: TaskUserProp) {
    const [task, setTask] = useState<Tarea[]>([]);
    const [cargando, setCargando] = useState(true);
    //const [filters, setFilters] = useState(initialFilters);

    const [displayModal, setDisplayModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Tarea | null>(null);

    useEffect(() => {
        if (!idUser) {
            //      setCargando(false);
            return;
        }

        //   setCargando(true);
        axios.get<Tarea[]>(`http://localhost:8081/task/${idUser}/users`)
            .then(response => {
                setTask(response.data);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los registros", error);
            })
            .finally(() => {
                setCargando(false);
            });
    }, [idUser]);

    const openCustomerModal = (customer: Tarea) => {
        setSelectedCustomer(customer);
        setDisplayModal(true);
    };

    // --- TEMPLATES VISUALES ---

    const headerTemplate = (data: Tarea) => {
        const isEnCurso = data.co_estado === 'EN CURSO' || data.co_estado === 'ACTIVO';
        return (
            <div className={`group-header ${isEnCurso ? 'header-blue' : 'header-gray'}`}>
                <span className="group-title">{data.co_estado}</span>
                <span className="group-count">
                    {task.filter(t => t.co_estado === data.co_estado).length}
                </span>
            </div>
        );
    };

    const statusBodyTemplate = (rowData: Tarea) => {
        const statusClass = (rowData.co_estado === 'EN CURSO' || rowData.co_estado === 'ACTIVO')
            ? 'status-in-progress'
            : 'status-pending';
        return (
            <span className={`status-badge ${statusClass}`}>
                <span className="dot"></span> {rowData.co_estado}
            </span>
        );
    };

    if (cargando) return (
        <div className="loading-container" style={{ padding: '2rem', textAlign: 'center' }}>
            <p>Cargando tareas...</p>
        </div>
    );

    return (
        <div className="modern-tasks-container">
            <header className="table-header-custom">
                <div className="header-left">
                    <p className=""><strong>Tareas Asignadas <span style={{ color: 'blue' }}>{task.length}</span></strong></p>
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
                    //   filters={filters}
                    showGridlines={false}
                    rowHover
                    emptyMessage="No se encontraron tareas asignadas."
                >
                    {/* Nombre y Asunto */}
                    <Column field="tx_asunto" header="Nombre" body={(rowData) => (
                        <div className="name-cell">
                            <span className="status-circle-icon"></span>
                            <div className="task-info">
                                <span className="task-text">{rowData.tx_asunto}</span>
                                <small className="task-subtext" style={{ display: 'block', color: '#888', fontSize: '11px' }}>
                                    ID: {rowData.co_tarea}
                                </small>
                            </div>
                        </div>
                    )} />

                    {/* Persona Asignada (Avatar) */}
                    <Column field="co_user_asignado" header="Asignado" body={(rowData) => (
                        <span className="date-cell">{rowData.co_user_asignado}</span>

                    )} />

                    {/* Fecha Límite */}
                    <Column field="fe_vencimiento" header="Fecha límite" body={(rowData) => (
                        <span className="date-cell overdue">{rowData.fe_vencimiento}</span>
                    )} />

                    {/* Prioridad (Icono Banderita) */}
                    <Column header="Prioridad" body={() => (
                        <span className="priority-cell">
                            <FlagIcon style={{ color: '#bdbdbd', fontSize: '18px' }} />
                        </span>
                    )} />

                    {/* Estado (Badge) */}
                    <Column field="co_estado" header="Estado" body={statusBodyTemplate} />

                    {/* Comentarios */}
                    <Column header="Comentarios" body={() => (
                        <div className="comment-cell">
                            <ChatBubbleOutlineIcon style={{ color: '#bdbdbd', fontSize: '18px' }} />
                        </div>
                    )} />

                    {/* Acciones Minimalistas */}
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

            {/* --- MODAL DETALLES --- */}
            <Dialog
                header="Detalles de la tarea"
                visible={displayModal}
                style={{ width: '45vw', minWidth: '400px' }}
                onHide={() => setDisplayModal(false)}
                className="custom-customer-modal"
            >
                {selectedCustomer && (
                    <div className="customer-info-grid">
                        <div className="info-item full-width">
                            <label>Asunto</label>
                            <span><strong>{selectedCustomer.tx_asunto}</strong></span>
                        </div>
                        <div className="info-item">
                            <label>ID Tarea</label>
                            <span>{selectedCustomer.co_tarea}</span>
                        </div>
                        <div className="info-item">
                            <label>Estado</label>
                            <span className="status-badge status-pending" style={{ color: '#000' }}>
                                {selectedCustomer.co_estado}
                            </span>
                        </div>
                        <div className="info-item full-width">
                            <label>Descripción</label>
                            <div className="description-box" style={{ padding: '10px', background: '#f9f9f9', borderRadius: '4px' }}>
                                {selectedCustomer.tx_description}
                            </div>
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
}

export default TaskActivities;