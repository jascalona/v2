import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import * as XLSX from 'xlsx';
import axios from 'axios';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import '../../../../assets/css/table.css'

//Componentes
import NewMember from '../modal/modal_user';

interface Solicitud {
    coambiente: string,
    coprioridad: string,
    coproducto: string,
    cosla: string,
    cosolicitud: string,
    cotipsolicitud: string,
    cousercierre: string,
    cousercredorsoli: string,
    couserresolutor: string,
    featencion: string,
    fecierre: string,
    feregistro: string,
    feresolucion: string,
    feultmodif: string,
    fevencimiento: string,
    nbcontacto: string,
    nucelularcontacto: string,
    stsolicitud: string,
    txasuntosolic: string,
    txcausasoli: string,
    txdescresolucion: string,
    txdescripsolic: string,
    txnota: string,
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
        axios.get<Solicitud[]>('http://localhost:8080/basetomee/solicitud/listar')
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
            "Co. Ambiente": solicitud.coambiente,
            "Co. Prioridad": solicitud.coprioridad,
            "Co. Producto": solicitud.coproducto,
            "Co. SLA": solicitud.cosla,
            "Co. Solicitud": solicitud.cosolicitud,
            "Co. Tipo solicitud": solicitud.cotipsolicitud,
            "Co. User cierre": solicitud.cousercierre,
            "Co. User creador soli": solicitud.cousercredorsoli,
            "Co. user resolutor": solicitud.couserresolutor,
            "Fe. atencion": solicitud.featencion,
            "Fe. cierre": solicitud.fecierre,
            "Fe. registro": solicitud.feregistro,
            "Fe. resolucion": solicitud.feresolucion,
            "Fe. ultmodif": solicitud.feultmodif,
            "Fe. vencimiento": solicitud.fevencimiento,
            "Nb. contacto": solicitud.nbcontacto,
            "Nb. celular contacto": solicitud.nucelularcontacto,
            "St. solicitud": solicitud.stsolicitud,
            "Tx. asunto solic": solicitud.txasuntosolic,
            "Tx. causa soli": solicitud.txcausasoli,
            "Tx. descrip. solucion": solicitud.txdescresolucion,
            "Tx. descrip solic": solicitud.txdescripsolic,
            "Tx. nota": solicitud.txnota,
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
        'coambiente',
        'coprioridad',
        'coproducto',
        'cosla',
        'cosolicitud',
        'cotipsolicitud',
        'cousercierre',
        'cousercredorsoli',
        'couserresolutor',
        'nbcontacto',
        'nucelularcontacto',
        'stsolicitud',
        'txasuntosolic',
        'txcausasoli',
        'txdescresolucion',
        'txdescripsolic',
        'txnota',
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
                        <Column field="cosolicitud" header="Código Solicitud"></Column>
                        <Column field="txasuntosolic" header="Asunto"></Column>
                        <Column field="stsolicitud" header="Estado"></Column>
                        <Column field="coprioridad" header="Prioridad"></Column>
                        <Column field="cotipsolicitud" header="Tipo Solicitud"></Column>
                        <Column field="coproducto" header="Producto"></Column>
                        <Column field="cousercredorsoli" header="Creador"></Column>
                        <Column field="feregistro" header="Fec. Registro"></Column>
                        <Column field="fevencimiento" header="Fec. Vencimiento"></Column>

                        <Column field="fevencimiento" header="Fec. Vencimiento"></Column>
                        <Column field="fevencimiento" header="Fec. Vencimiento"></Column>

                    </DataTable>
                </div>
            </div>
        </>
    )
}

export default TableSolicitud