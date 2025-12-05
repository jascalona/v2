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
    cliComercio: string,
    cliDirecto: string,
    coAmbiente: string,
    coPrioridad: string,
    coProducto: string,
    coSLA: string,
    coSolicitud: string,
    co_tip_solicitud: string,
    coUserCierre: string,
    co_user_credor_soli: string,
    c_user_resolutor: string,
    feCierre: string,
    feRegistro: string,
    feResolucion: string,
    fe_ult_modif: string,
    feVencimiento: string,
    nbContacto: string,
    nuContacto: string,
    stSolicitud: string,
    txAsunto: string,
    txCusaSoli: string,
    tx_desc_resolucion: string,
    txDesSoli: string,
    txNota: string,
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
        axios.get<Solicitud[]>("http://localhost:8080/basetomee/solicitud/list")
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
            "Cliente": solicitud.cliDirecto,
            "Comercio": solicitud.cliComercio,
            "Co. Ambiente": solicitud.coAmbiente,
            "Co. Prioridad": solicitud.coPrioridad,
            "Co. Producto": solicitud.coProducto,
            "Co. SLA": solicitud.coSLA,
            "Co. Solicitud": solicitud.coSolicitud,
            "Co. Tipo solicitud": solicitud.co_tip_solicitud,
            "Co. User cierre": solicitud.coUserCierre,
            "Co. User creador soli": solicitud.co_user_credor_soli,
            "Co. user resolutor": solicitud.c_user_resolutor,
            "Fe. cierre": solicitud.feCierre,
            "Fe. registro": solicitud.feRegistro,
            "Fe. resolucion": solicitud.feResolucion,
            "Fe. ultmodif": solicitud.fe_ult_modif,
            "Fe. vencimiento": solicitud.feVencimiento,
            "Nb. contacto": solicitud.nbContacto,
            "Nb. celular contacto": solicitud.nuContacto,
            "St. solicitud": solicitud.stSolicitud,
            "Tx. asunto solic": solicitud.txAsunto,
            "Tx. causa soli": solicitud.txCusaSoli,
            "Tx. descrip. solucion": solicitud.tx_desc_resolucion,
            "Tx. descrip solic": solicitud.txDesSoli,
            "Tx. nota": solicitud.txNota,
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
        'cliComercio',
        'cliDirecto',
        'coAmbiente',
        'coPrioridad',
        'coProducto',
        'coSLA',
        'coSolicitud',
        'co_tip_solicitud',
        'coUserCierre',
        'co_user_credor_soli',
        'c_user_resolutor',
        'feCierre',
        'feRegistro',
        'feResolucion',
        'fe_ult_modif',
        'feVencimiento',
        'nbContacto',
        'nuContacto',
        'stSolicitud',
        'txAsunto',
        'txCusaSoli'
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
                        <Column field="coSolicitud" header="Código Solicitud"></Column>
                        <Column field="cliDirecto" header="Cliente"></Column>
                        <Column field="cliComercio" header="Comercio"></Column>
                        <Column field="txAsunto" header="Asunto"></Column>
                        <Column field="stSolicitud" header="Estado"></Column>
                        <Column field="coPrioridad" header="Prioridad"></Column>
                        <Column field="co_tip_solicitud" header="Tipo Solicitud"></Column>
                        <Column field="coProducto" header="Producto"></Column>
                        <Column field="c_user_resolutor" header="Creador"></Column>
                        <Column field="feRegistro" header="Fec. Registro"></Column>
                        <Column field="feVencimiento" header="Fec. Vencimiento"></Column>
                    </DataTable>
                </div>
            </div>
        </>
    )
}

export default TableSolicitud