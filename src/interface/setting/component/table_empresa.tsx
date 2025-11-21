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

interface Empresa {
    co_emp: string,
    nb_emp: string,
    st_estado: string,
    fe_registro: string,
    autor: string,
}


//Definicion inical de filtros para el Datatable
const initialFilters = {
    global: { value: null as string | null, matchMode: FilterMatchMode.CONTAINS },
};

function TableEmpresa() {

    const [empresa, setEmpresa] = useState<Empresa[]>([]);
    const [cargando, setCargando] = useState(true);

    //Estado para manejar los filtros
    const [filters, setFilters] = useState(initialFilters);

    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        axios.get<Empresa[]>('http://localhost:8080/basetomee/empresas/listar')
            .then(response => {
                setEmpresa(response.data);
                setCargando(false);
            })

            .catch(error => {
                console.error("Hubo un error al obtener los registros", error);
                setCargando(false);
            });

    }, []);

    //Funcion para exportar el exel
    const exportExcel = () => {
        const dataForExport = empresa.map(empresa => ({
            "CoEmpresa": empresa.co_emp,
            "Nombre": empresa.nb_emp,
            "Estado": empresa.st_estado,
            "Fe Registro": empresa.fe_registro,
            "Autor": empresa.autor
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
        'co_emp',
        'nb_emp',
        'st_estado',
        'fe_registro',
        'autor'
    ]

    if (cargando) return <p>Cargando registros...</p>

    return (
        <>
            {/* Input de Búsqueda Global (Fuera del DataTable) */}
            <div className="table-empresa">
                <div className="options">
                    <div className="">
                        <p style={{color: '#504e4eff', fontSize: '14px'}}>Registros <span><strong>{empresa.length}</strong></span></p>
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
                            disabled={empresa.length === 0} // Desactivar si no hay datos
                        >Exportar registros</Button>
                    </div>
                </div>

                <DataTable
                    value={empresa}
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
                    <Column field="co_emp" header="Co Empresa"></Column>
                    <Column field="nb_emp" header="Nombre"></Column>
                    <Column field="st_estado" header="Status"></Column>
                    <Column field="fe_registro" header="Re. Registro"></Column>
                    <Column field="auto" header="Autor"></Column>

                </DataTable>
            </div>
        </>
    )
}
export default TableEmpresa