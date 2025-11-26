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

interface Area {
    co_area: string,
    co_empresa: string,
    fe_registro: string,
    nb_area: string,
    st_area: string,
}


//Definicion inical de filtros para el Datatable
const initialFilters = {
    global: { value: null as string | null, matchMode: FilterMatchMode.CONTAINS },
};

function TableEmpresa() {

    const [area, setArea] = useState<Area[]>([]);
    const [cargando, setCargando] = useState(true);

    //Estado para manejar los filtros
    const [filters, setFilters] = useState(initialFilters);

    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        axios.get<Area[]>('http://localhost:8080/basetomee/area/list')
            .then(response => {
                setArea(response.data);
                setCargando(false);
            })

            .catch(error => {
                console.error("Hubo un error al obtener los registros", error);
                setCargando(false);
            });

    }, []);

    //Funcion para exportar el exel
    const exportExcel = () => {
        const dataForExport = area.map(area => ({
            "Co. Area": area.co_area,
            "nb_area": area.nb_area,
            "Co. Empresa": area.co_empresa,
            "Fe. Registro": area.fe_registro,
            "Status": area.st_area
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataForExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

        XLSX.writeFile(workbook, "members.xlsx");
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
        'co_area',
        'co_empresa',
        'nb_area',
        'st_estado',
        'fe_registro',
    ]

    if (cargando) return <p>Cargando registros...</p>

    return (
        <>
            {/* Input de Búsqueda Global (Fuera del DataTable) */}
            <div className="table-empresa">
                <div className="options">
                    <div className="">
                        <p style={{ color: '#504e4eff', fontSize: '14px' }}>Registros <span><strong>{area.length}</strong></span></p>
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
                            disabled={area.length === 0} // Desactivar si no hay datos
                        >Exportar registros</Button>
                    </div>
                </div>

                <DataTable
                    value={area}
                    tableStyle={{ minWidth: '50rem' }}
                    paginator
                    rows={10}
                    emptyMessage="No se encontraron registros relacionados"
                    className="tabla-empresa"
                    paginatorClassName="mi-paginador-personalizado"
                    // Propiedades para el filtro global
                    filters={filters} // Se pasa el objeto de filtros actualizado
                    globalFilterFields={globalFilterFields} // Se indican las columnas a filtrar
                >
                    <Column field="co_area" header="Co Area"></Column>
                    <Column field="nb_area" header="Nombre"></Column>
                    <Column field="co_empresa" header="RIF"></Column>
                    <Column field="fe_registro" header="Re. Registro"></Column>
                    <Column field="st_area" header="Status"></Column>
                </DataTable>
            </div>
        </>
    )
}
export default TableEmpresa