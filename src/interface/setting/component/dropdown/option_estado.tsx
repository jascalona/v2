import { useState, useEffect } from "react";
import axios from "axios";

//Icon
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';


interface Estado {
    co_estado: number,
    nb_estado: string,
    fe_registro: string
}

function OptionEstado() {
    const [estado, setEstado] = useState<Estado[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedEstado, setSelectedEstado] = useState<string | undefined>('');

    const API_URL = "http://localhost:8081/status";

    useEffect(() => {
        const fetchAmbientes = async () => {
            try {
                const response = await axios.get<Estado[]>(API_URL)
                setEstado(response.data);

                setError(null);
            } catch (error) {
                console.log("Error al obtener los registros: ", error);
                setError("Error al cargar los datos de la API");
            } finally {
                setLoading(false);
            }
        };
        fetchAmbientes();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEstado(event.target.value);
        console.log("Prioridad seleccionado para formulario:", event.target.value);
    };

    if (loading) {
        return <p className="loading-message">Cargando...</p>
    }

    if (error) {
        return <p className="error-message">{error}</p>
    }

    if (estado.length === 0) {
        return <p className="no-records-message">No hay registros disponibles para mostrar</p>
    }

    return (
        <div className="select-container">
            <select
                name="ambiente"
                id="ambiente-select"
                className="styled-select"
                value={selectedEstado}
                onChange={handleChange}
            >

                <option value="" disabled>
                    Estado
                </option>

                {/* Mapeo de los datos para generar las opciones */}
                {estado.map((estado) => (
                    <option key={estado.co_estado} value={estado.co_estado}>
                        {estado.nb_estado}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default OptionEstado