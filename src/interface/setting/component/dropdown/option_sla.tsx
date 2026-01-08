import { useState, useEffect } from "react";
import axios from "axios";

//Icon
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';


interface SLA {
    co_sla: number,
    nb_sla: string,
    co_unidad_tiempo: string 
    nu_cantidad: number
}

function OptionPrioridad() {
    const [sla, setSLA] = useState<SLA[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedAmbiente, setSelectedAmbiente] = useState<string | undefined>('');

    const API_URL = "http://localhost:8081/sla";

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
                    <option key={prioridad.co_sla} value={prioridad.co_sla}>
                        {prioridad.nb_sla}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default OptionPrioridad