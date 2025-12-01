import { useState, useEffect } from "react";
import axios from "axios";

//Icon
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';


interface Ambiente {
    coambiente: string,
    nbambiente: string,
    feregistro: string
}

function OptionAmbiente() {
    const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedAmbiente, setSelectedAmbiente] = useState<string | undefined>('');

    const API_URL = "http://localhost:8080/basetomee/ambiente/listar";

    useEffect(() => {
        const fetchAmbientes = async () => {
            try {
                const response = await axios.get<Ambiente[]>(API_URL)
                setAmbientes(response.data);

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
        console.log("Ambiente seleccionado para formulario:", event.target.value);
    };

    if (loading) {
        return <p className="loading-message">Cargando...</p>
    }

    if (error) {
        return <p className="error-message">{error}</p>
    }

    if (ambientes.length === 0) {
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
                    Ambiente
                </option>

                {/* Mapeo de los datos para generar las opciones */}
                {ambientes.map((ambiente) => (
                    <option key={ambiente.coambiente} value={ambiente.coambiente}>
                        {ambiente.nbambiente}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default OptionAmbiente