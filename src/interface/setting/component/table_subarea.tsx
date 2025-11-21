import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import * as XLSX from 'xlsx';
import axios from 'axios';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import '../../../assets/css/table.css'


//Componentes
import NewMember from './modal_user';

interface Subarea {
    co_area: string,
    co_subarea: string,
    nb_subarea: string,
    

}


//Definicion inical de filtros para el Datatable
const initialFilters = {
    global: { value: null as string | null, matchMode: FilterMatchMode.CONTAINS },
};

function TableSubarea() {

    const [subarea, setSubarea] = useState<Subarea[]>([]);
    const [cargando, setCargando] = useState(true);

    //Estado para manejar los filtros
    const [filters, setFilters] = useState(initialFilters);

    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        axios.get<Subarea[]>('http://localhost:8080/basetomee/subarea/list')
            .then(response => {
                setSubarea(response.data);
                setCargando(false);
            })

            .catch(error => {
                console.error("Hubo un error al obtener los registros", error);
                setCargando(false);
            });

    }, []);

    //Funcion para exportar el exel
    const exportExcel = () => {
        const dataForExport = subarea.map(subarea => ({
            "Co. area": subarea.co_area,
            "Co. Subarea": subarea.nb_subarea,
            "Nombre": subarea.nb_subarea
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
        'co_subarea',
        'nb_subarea',
        
    ]

    if (cargando) return <p>Cargando registros...</p>

    return (
        <>
            {/* Input de Búsqueda Global (Fuera del DataTable) */}
            <div className="table-empresa">
                <div className="options">
                    <div className="">
                        <p style={{color: '#504e4eff', fontSize: '14px'}}>Registros <span><strong>{subarea.length}</strong></span></p>
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
                            disabled={subarea.length === 0} // Desactivar si no hay datos
                        >Exportar registros</Button>
                    </div>
                </div>

                <DataTable
                    value={subarea}
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
                    <Column field="co_subarea" header="Co. Subarea"></Column>
                    <Column field="nb_subarea" header="Nombre"></Column>
                </DataTable>
            </div>
        </>
    )
}
export default TableSubarea