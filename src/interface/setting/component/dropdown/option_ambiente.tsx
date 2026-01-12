import { useState, useEffect } from "react";
import axios from "axios";


interface Ambiente {
    co_ambiente: string,
    nb_ambiente: string,
    fe_registro: string
}

interface Props {
    onSelect: (value: any) => void;
}

function OptionAmbiente({ onSelect }: Props) {
    const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAmbiente, setSelectedAmbiente] = useState<string>(''); 

    const API_URL = "http://localhost:8081/ambiente";

    useEffect(() => {
        const fetchAmbientes = async () => {
            try {
                const response = await axios.get<Ambiente[]>(API_URL);
                setAmbientes(response.data);
                setError(null);
            } catch (error) {
                setError("Error al cargar datos");
            } finally {
                setLoading(false);
            }
        };
        fetchAmbientes();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedAmbiente(value);

        // Envía el valor seleccionado al componente Padre (ModalSolicitud)
        onSelect(value);
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="select-container">
            <select
                name="ambiente"
                id="ambiente-select"
                className="styled-select"
                value={selectedAmbiente}
                onChange={handleChange}
            >
                <option value="" disabled>Seleccione Ambiente</option>
                {ambientes.map((ambiente) => (
                    <option key={ambiente.co_ambiente} value={ambiente.co_ambiente}>
                        {ambiente.nb_ambiente}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default OptionAmbiente