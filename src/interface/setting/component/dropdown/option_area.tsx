import { useState, useEffect } from "react";
import axios from "axios";

interface Usuarios {
    co_area: string,
    nb_area: string,
}

interface Props {
    onSelect: (value: any) => void;
}

function OptionArea({ onSelect }: Props) {
    const [usuarios, setUsurios] = useState<Usuarios[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedUsuario, setSelectedUsuario] = useState<string | undefined>('');

    const API_URL = "http://localhost:8081/area";

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get<Usuarios[]>(API_URL)
                setUsurios(response.data);

                setError(null);
            } catch (error) {
                console.log("Error al obtener los registros: ", error);
                setError("Error al cargar los datos de la API");
            } finally {
                setLoading(false);
            }
        };
        fetchUsuarios();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedUsuario(value);

        // Envía el valor seleccionado al componente Padre (ModalSolicitud)
        onSelect(value);
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;


    return (
        <div className="select-container">
            <select
                name="area"
                id="area-select"
                className="styled-select"
                value={selectedUsuario}
                onChange={handleChange}
            >

                <option value="" disabled>
                    Seleccionar Area
                </option>

                {/* Mapeo de los datos para generar las opciones */}
                {usuarios.map((usuario) => (
                    <option key={usuario.co_area} value={usuario.co_area}>
                        {usuario.nb_area}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default OptionArea