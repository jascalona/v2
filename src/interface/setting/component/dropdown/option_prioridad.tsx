import { useState, useEffect } from "react";
import axios from "axios";

interface Prioridad {
    co_prioridad: number,
    nb_prioridad: string,
}

interface Props {
    onSelect: (value: any) => void;
}

function OptionPrioridad({ onSelect }: Props) {
    const [prioridad, setPrioridad] = useState<Prioridad[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedPrioridad, setSelectedPrioridad] = useState<string | undefined>('');

    const API_URL = "http://localhost:8081/priority";

    useEffect(() => {
        const fetchAmbientes = async () => {
            try {
                const response = await axios.get<Prioridad[]>(API_URL)
                setPrioridad(response.data);

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
        setSelectedPrioridad(value);

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
                value={selectedPrioridad}
                onChange={handleChange}
            >
                <option value="" disabled>Seleccione SLA</option>
                {prioridad.map((prioridades) => (
                    <option key={prioridades.co_prioridad} value={prioridades.co_prioridad}>
                        {prioridades.nb_prioridad}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default OptionPrioridad