import { useState, useEffect } from "react";
import axios from "axios";

interface Usuarios {
    co_usuario: string,
    nb_nombre: string,
    nb_apellido: string,
    tx_email: string,
    nu_celular: string,
    co_subarea: number
}

interface Props {
    areaId: string;
    onSelect: (value: any) => void;
}


function OptionUsuario({ onSelect, areaId }: Props) {
    const [usuarios, setUsurios] = useState<Usuarios[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUsuario, setSelectedUsuario] = useState("");


    useEffect(() => {
        const fetchClientes = async () => {
            if (!areaId) {
                setUsurios([]);
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get<Usuarios[]>(`http://localhost:8081/users/${areaId}/area`);

                const data = response.data || [];
                setUsurios(data);

            } catch (error) {
                console.error("Error al cargar usuarios:", error);
                setUsurios([]);
            } finally {
                setLoading(false);
            }
        };

        fetchClientes();
    }, [areaId]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedUsuario(value);
        onSelect(value); // <--- Notificamos al modal principal
    };

    const isInvalid = !areaId || loading || usuarios.length === 0;


    return (
     
        <div className="select-container">
            <select
                className="styled-select"
                value={selectedUsuario}
                onChange={handleChange} 
                disabled={isInvalid}
                style={usuarios.length === 0 && areaId && !loading ? { border: '1px solid #ffa726' } : {}}
            >
                <option value="">
                    {loading ? "Cargando..." :
                        (!areaId) ? "Seleccione el area primero" :
                            (usuarios.length === 0) ? "No hay usuarios asociados" :
                                "Seleccione un Usuario"}
                </option>

                {/* El operador ?. asegura que no falle si por alguna razón sigue siendo null */}
                {usuarios?.map((usuario) => (
                    <option key={usuario.co_usuario} value={usuario.co_usuario}>
                        {usuario.nb_nombre +  " " + usuario.nb_apellido}
                    </option>
                ))}
            </select>

            {areaId && !loading && usuarios.length === 0 && (
                <span style={{ fontSize: '10px', color: '#ffa726', marginTop: '4px', display: 'block' }}>
                    * Este producto no posee clientes registrados.
                </span>
            )}
        </div>
    )
}
export default OptionUsuario