import { useState, useEffect } from "react";
import axios from "axios";

interface SLA {
    co_sla: number,
    nb_sla: string,
    co_unidad_tiempo: string
    nu_cantidad: number
}

interface Props {
    onSelect: (value: any) => void;
}

function OptionPrioridad({ onSelect }: Props) {
    const [sla, setSLA] = useState<SLA[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedTPS, setSelectedTPS] = useState<string | undefined>('');

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
        const value = event.target.value;
        setSelectedTPS(value);

        onSelect(value);

    };


    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;


    return (
     <div className="select-container">
            <select
                name="sla"
                id="tps-select"
                className="styled-select"
                value={selectedTPS}
                onChange={handleChange}
            >
                <option value="" disabled>Seleccione SLA</option>
                {sla.map((sla) => (
                    <option key={sla.co_sla} value={sla.co_sla}>
                        {sla.nb_sla}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default OptionPrioridad