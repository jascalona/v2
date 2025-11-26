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

interface Usuario {
    coUsuario: string,
    nbNombre: string,
    nbApellido: string,
    txEmail: string,
    nucelular: string,
    cosubarea: number
}


//Definicion inical de filtros para el Datatable
const initialFilters = {
    global: { value: null as string | null, matchMode: FilterMatchMode.CONTAINS },
};

function TableMembers() {

    const [usuario, setUsuarios] = useState<Usuario[]>([]);
    const [cargando, setCargando] = useState(true);

    //Estado para manejar los filtros
    const [filters, setFilters] = useState(initialFilters);

    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        axios.get<Usuario[]>('http://localhost:8080/basetomee/usuario/list')
            .then(response => {
                setUsuarios(response.data);
                setCargando(false);
            })

            .catch(error => {
                console.error("Hubo un error al obtener los registros", error);
                setCargando(false);
            });

    }, []);

    //Funcion para exportar el exel
    const exportExcel = () => {
        const dataForExport = usuario.map(usuario => ({
            "SCID": usuario.coUsuario,
            "Nombre": usuario.nbNombre,
            "Apellido": usuario.nbApellido,
            "Email": usuario.txEmail,
            "CELE": usuario.nucelular,
            "CO. Area": usuario.cosubarea,

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
        'coUsuario',
        'nbNombre',
        'nbApellido',
        'txEmail',
        'nucelular',
        'cosubarea'
    ]

    if (cargando) return <p>Cargando registros...</p>

    return (
        <>
            {/* Input de Búsqueda Global (Fuera del DataTable) */}
            <div className="table-empresa">
                <div className="options">
                    <div className="title">
                        <h2>Miembros <span className="total-row">{usuario.length}</span></h2>
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
                        <div className="btn-modal" style={{marginLeft: 10}}>
                            <NewMember />
                        </div>

                        <Button style={{ color: '#fff', fontSize: '20px', padding: '10px', marginLeft: '10px', background: 'rgb(38, 66, 124)' }}
                            type="button"
                            icon="pi pi-file-excel"
                            className="p-button-success"
                            onClick={exportExcel}
                            disabled={usuario.length === 0} // Desactivar si no hay datos
                        ><FileDownloadIcon sx={{ fontSize: 15, color: '#fff' }} /></Button>
                    </div>
                </div>

                <DataTable
                    value={usuario}
                    tableStyle={{ minWidth: '50rem' }}
                    paginator
                    rows={8}
                    emptyMessage="No se encontraron registros relacionados"
                    className="tabla-empresa"
                    paginatorClassName="mi-paginador-personalizado"
                    // Propiedades para el filtro global
                    filters={filters} // Se pasa el objeto de filtros actualizado
                    globalFilterFields={globalFilterFields} // Se indican las columnas a filtrar
                >
                    <Column field="coUsuario" header="SCID"></Column>
                    <Column field="nbNombre" header="Nombre"></Column>
                    <Column field="nbApellido" header="Apellido"></Column>
                    <Column field="txEmail" header="Email"></Column>
                    <Column field="nucelular" header="CELE"></Column>
                    <Column field="cosubarea" header="Co. Subarea"></Column>

                </DataTable>
            </div>
        </>
    )
}
export default TableMembers