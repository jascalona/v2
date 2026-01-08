import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import '../../../../assets/css/table_customer.css'

import EditSquareIcon from '@mui/icons-material/EditSquare';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { green } from "@mui/material/colors";

interface Customer {
    co_cliente: string;
    co_rif: string;
    nb_cliente: string;
    co_rol: string;
    fe_registro: string;
    co_use_creador: string;
    co_producto: string;
}

interface Contact {
    co_contacto: number;
    co_cliente: string;
    co_rif: string;
    nb_contacto: string;
    nb_cargo: string;
    nu_contacto: string;
    tx_email: string;
    fe_registro: string;
    co_user_emisor: string;
}

const initialFilters = {
    global: { value: null as string | null, matchMode: FilterMatchMode.CONTAINS },
};

function TableCustomer() {
    const [cliente, setCliente] = useState<Customer[]>([]);
    const [cargando, setCargando] = useState(true);
    const [filters, setFilters] = useState(initialFilters);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const [displayModal, setDisplayModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [contactos, setContactos] = useState<Contact[]>([]);
    const [cargandoContactos, setCargandoContactos] = useState(false);

    useEffect(() => {
        axios.get<Customer[]>('http://localhost:8081/customers')
            .then(response => {
                setCliente(response.data);
                setCargando(false);
            })
            .catch(error => {
                console.error("Error:", error);
                setCargando(false);
            });
    }, []);

    const openCustomerModal = async (customer: Customer) => {
        setSelectedCustomer(customer);
        setDisplayModal(true);
        setContactos([]);
        setCargandoContactos(true);

        try {
            const response = await axios.get<Contact[]>(`http://localhost:8081/customers/${customer.co_cliente}/contact`);
            if (response.data) {
                setContactos(response.data);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setCargandoContactos(false);
        }
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    if (cargando) return <p>Cargando registros...</p>

    return (
        <div className="container-main-table">
            <header className="table-header-custom">
                <div className="header-left">
                    <h2>Gestion de Clientes <span className="badge-count">{cliente.length} clientes</span></h2>
                    <p className="subtitle">Mantén el seguimiento de tus clientes y sus productos.</p>
                </div>
                <div className="header-right">
                    <Button label="Importar" icon="pi pi-cloud-upload" className="btn-secondary" />
                    <Button label="Agregar cliente" icon="pi pi-plus" className="btn-primary" />
                </div>
            </header>

            <div className="table-card">
                <div className="table-toolbar">
                    <div className="toolbar-left">
                        <button className="filter-tab active">Ver todos</button>
                    </div>

                    <div className="toolbar-right">
                        <span className="p-input-icon-left search-container">
                            <i className="pi pi-search" />
                            <InputText value={globalFilterValue}
                                onChange={onGlobalFilterChange}
                                placeholder="Buscar..."
                                className="search-input"
                            />
                        </span>
                    </div>
                </div>

                <DataTable
                    value={cliente}
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
                            <span className="client-name">{rowData.nb_cliente}</span>
                            <span className="client-sub">{rowData.co_rif}</span>
                        </div>
                    )} sortable></Column>
                    <Column field="co_rol" header="Rol"></Column>
                    <Column field="co_producto" header="Producto"></Column>
                    <Column field="fe_registro" header="Último registro"></Column>

                    <Column body={(rowData: Customer) => (
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

            <Dialog
                header="Detalles del Cliente"
                visible={displayModal}
                style={{ width: '55vw', minWidth: '500px' }}
                breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                onHide={() => {
                    setDisplayModal(false);
                    setSelectedCustomer(null);
                }}
                draggable={false}
                resizable={false}
                className="custom-customer-modal"
                blockScroll={true}
            >
                {selectedCustomer && (
                    <div className="customer-info-grid">
                        <div className="info-item full-width">
                            <label>Cliente</label>
                            <span>{selectedCustomer.nb_cliente}</span>
                        </div>
                        <div className="info-item">
                            <label>RIF</label>
                            <span>{selectedCustomer.co_rif}</span>
                        </div>
                        <div className="info-item">
                            <label>ID Cliente</label>
                            <span>{selectedCustomer.co_cliente}</span>
                        </div>
                        <div className="info-item">
                            <label>Rol</label>
                            <span className="badge-rol">{selectedCustomer.co_rol}</span>
                        </div>
                        <div className="info-item">
                            <label>Producto</label>
                            <span>{selectedCustomer.co_producto}</span>
                        </div>
                        <div className="info-item full-width">
                            <label>Fecha de Registro</label>
                            <span>{selectedCustomer.fe_registro}</span>
                        </div>

                        <div className="info-item full-width" style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                            <label style={{ color: '#17306a', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px', display: 'block' }}>
                                Datos de Contacto Asociados
                            </label>

                            {cargandoContactos ? (
                                <div style={{ textAlign: 'center', padding: '20px' }}>
                                    <i className="pi pi-spin pi-spinner" style={{ fontSize: '1.5rem', color: '#17306a' }}></i>
                                    <p>Cargando información...</p>
                                </div>
                            ) : contactos.length > 0 ? (
                                <DataTable
                                    value={contactos}
                                    className="custom-datatable"
                                    responsiveLayout="scroll"
                                    style={{color: '#767676ff'}}
                                >
                                    <Column field="nb_contacto" header="Nombre" body={(rowData: Contact) => (
                                        <div className="client-cell">
                                            <span className="client-name">{rowData.nb_contacto}</span>
                                        </div>
                                    )}></Column>
                                    <Column field="nb_cargo" header="Cargo"></Column>
                                    <Column field="nu_contacto" header="Movil"></Column>
                                    <Column field="tx_email" header="Email"></Column>
                                    <Column field="fe_registro" header="Fe. registro"></Column>

                                </DataTable>
                            ) : (
                                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '6px', textAlign: 'center' }}>
                                    <span style={{ color: '#888', fontStyle: 'italic' }}>
                                        Este cliente no posee contactos asociados.
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
}

export default TableCustomer;