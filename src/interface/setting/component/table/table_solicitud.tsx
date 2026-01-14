import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import * as XLSX from 'xlsx';
import axios from 'axios';
import '../../../../assets/css/table.css'

//Componentes
import NewMember from '../modal/modal_user';

interface Solicitud {
   co_solicitud: string,
    fe_registro: string,
    fe_vencimiento: string,
    fe_resolucion: string, 
    fe_cierre: string,
    co_user_credor_soli: string,
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
}

//Definicion inical de filtros para el Datatable
const initialFilters = {
    global: { value: null as string | null, matchMode: FilterMatchMode.CONTAINS },
};

function TableSolicitud() {

    const [solicitud, setSolicitud] = useState<Solicitud[]>([]);
    const [cargando, setCargando] = useState(true);

    //Estado para manejar los filtros
    const [filters, setFilters] = useState(initialFilters);

    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        axios.get<Solicitud[]>("http://localhost:8081/request")
            .then(response => {
                setSolicitud(response.data);
                setCargando(false);
            })

            .catch(error => {
                console.error("Hubo un error al obtener los registros", error);
                setCargando(false);
            });

    }, []);

    //Funcion para exportar el excel
    const exportExcel = () => {
        const dataForExport = solicitud.map(solicitud => ({
            "Cliente": solicitud.co_cliente,
            "Co. Ambiente": solicitud.co_ambiente,
            "Co. Producto": solicitud.co_producto,
            "Co. SLA": solicitud.co_sla,
            "Co. Solicitud": solicitud.co_solicitud,
            "Co. Tipo solicitud": solicitud.co_tip_solicitud,
            "Co. User cierre": solicitud.co_user_cierre,
            "Co. User creador soli": solicitud.co_user_credor_soli,
            "Co. user resolutor": solicitud.co_user_resolutor,
            "Fe. cierre": solicitud.fe_cierre,
            "Fe. registro": solicitud.fe_registro,
            "Fe. resolucion": solicitud.fe_resolucion,
            "Fe. vencimiento": solicitud.fe_vencimiento,
            "Nb. contacto": solicitud.nb_contacto,
            "Nb. celular contacto": solicitud.nu_celular_contacto,
            "St. solicitud": solicitud.co_estado,
            "Tx. asunto solic": solicitud.tx_asunto,
            "Tx. causa soli": solicitud.tx_causa,
            "Tx. descrip. solucion": solicitud.tx_desc_resolucion,
            "Tx. descrip solic": solicitud.tx_desc_resolucion,
            "Tx. nota": solicitud.tx_nota,
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataForExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Solicitudes");

        XLSX.writeFile(workbook, "solicitudes.xlsx");
    };

    // FUNCION CORREGIDA
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);

        setGlobalFilterValue(value);
    };

    //Campos donde se aplicara la busqueda
    const globalFilterFields = [
        'co_solicitud',
        'fe_registro',
        'fe_vencimiento',
        'fe_resolucion',
        'fe_cierre',
        'co_user_credor_soli',
        'co_user_resolutor',
        'co_tip_solicitud',
        'nb_contacto',
        'nu_celular_contacto',
        'tx_asunto',
        'co_ambiente',
        'co_producto',
        'co_sla',
        'co_user_cierre',
        'tx_nota',
        'co_estado',
        'co_cliente',
        'txCusaSoli',
    ]

    if (cargando) return <p>Cargando registros...</p>

    return (
        <>
            {/* Input de Búsqueda Global (Fuera del DataTable) */}
            <div className="table-empresa" style={{ width: '100%'}}>
                <div className="options">
                    <div className="registros-count">
                        <p style={{ color: '#504e4eff', fontSize: '14px' }}>Registros <span><strong>{solicitud.length}</strong></span></p>
                    </div>

                    <div className="group-btn">
                        <div className="p-input-icon-left" >
                            <i className="pi pi-search" />
                            <InputText style={{ background: '#fffffff6', border: 'solid 1px #7776b352', padding: '10px', borderRadius: 5, color: '#333', maxWidth: '300px', outline: 'none' }}
                                value={globalFilterValue}
                                onChange={onGlobalFilterChange}
                                placeholder="Buscar..."
                            />
                        </div>

                        <Button style={{ color: '#fff', padding: '10px', marginLeft: '10px', background: 'rgba(38, 67, 124, 0.24)' }}
                            type="button"
                            icon="pi pi-file-excel"
                            className="p-button-success"
                            onClick={exportExcel}
                            disabled={solicitud.length === 0}
                        >Exportar registros</Button>
                    </div>
                </div>

                {/* Contenedor ajustado a 500px con scroll horizontal */}
                <div>
                    <DataTable
                        value={solicitud}
                        tableStyle={{ minWidth: '100rem' }} /* Ancho MÍNIMO grande para forzar el scroll horizontal */
                        scrollable /* Habilita el scroll (necesario para PrimeReact) */
                        paginator
                        rows={10}
                        emptyMessage="No se encontraron registros relacionados"
                        className="tabla-empresa"
                        paginatorClassName="mi-paginador-personalizado"
                        filters={filters}
                        globalFilterFields={globalFilterFields}
                    >
                        {/* COLUMNAS CON LOS DATOS BASICOS */}
                        <Column field="co_solicitud" header="Código Solicitud"></Column>
                        <Column field="co_cliente" header="Cliente"></Column>
                        <Column field="tx_asunto" header="Asunto"></Column>
                        <Column field="co_estado" header="Estado"></Column>
                        <Column field="nb_proridad" header="Prioridad"></Column>
                        <Column field="co_tip_solicitud" header="Tipo Solicitud"></Column>
                        <Column field="co_producto" header="Producto"></Column>
                        <Column field="co_user_resolutor" header="Creador"></Column>
                        <Column field="fe_registro" header="Fec. Registro"></Column>
                        <Column field="fe_vencimiento" header="Fec. Vencimiento"></Column>
                    </DataTable>
                </div>
            </div>
        </>
    )
}

export default TableSolicitud