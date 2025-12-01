import { useState, useEffect } from "react";
import axios from "axios";

//Icon
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';


interface SLA {
    cosla: string,
    nbsla: string,
}

function OptionPrioridad() {
    const [sla, setSLA] = useState<SLA[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedAmbiente, setSelectedAmbiente] = useState<string | undefined>('');

    const API_URL = "http://localhost:8080/basetomee/SLA/listar";

    useEffect(() => {
        const fetchAmbientes = async () => {
            try {
                const response = await axios.get<SLA[]>(API_URL)
                setSLA(response.data);

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
        setSelectedAmbiente(event.target.value);
        console.log("Prioridad seleccionado para formulario:", event.target.value);
    };

    if (loading) {
        return <p className="loading-message">Cargando...</p>
    }

    if (error) {
        return <p className="error-message">{error}</p>
    }

    if (sla.length === 0) {
        return <p className="no-records-message">No hay registros disponibles para mostrar</p>
    }

    return (
        <div className="select-container">
            <select
                name="ambiente"
                id="ambiente-select"
                className="styled-select"
                value={selectedAmbiente}
                onChange={handleChange}
            >

                <option value="" disabled>
                    Prioridad
                </option>

                {/* Mapeo de los datos para generar las opciones */}
                {sla.map((prioridad) => (
                    <option key={prioridad.cosla} value={prioridad.cosla}>
                        {prioridad.nbsla}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default OptionPrioridad