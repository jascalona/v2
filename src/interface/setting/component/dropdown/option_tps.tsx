import { useState, useEffect } from "react";
import axios from "axios";



interface TPS {
    co_tpsolicitud: number,
    nb_tpsolicitud: string,
    fe_registro: string
}

interface Props {
    onSelect: (value: any) => void;
}


function OptionTPS({ onSelect }: Props) {
    const [tpsolicitud, setTPS] = useState<TPS[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedTPS, setSelectedTPS] = useState<string | undefined>('');

    const API_URL = "http://localhost:8081/tprequest";

    useEffect(() => {
        const fetchTPS = async () => {
            try {
                const response = await axios.get<TPS[]>(API_URL)
                setTPS(response.data);

                setError(null);
            } catch (error) {
                console.log("Error al obtener los registros: ", error);
                setError("Error al cargar los datos de la API");
            } finally {
                setLoading(false);
            }
        };
        fetchTPS();
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
                name="tpsolicitud"
                id="ambiente-select"
                className="styled-select"
                value={selectedTPS}
                onChange={handleChange}
            >
                <option value="" disabled>Seleccione Tipo de solicitud</option>
                {tpsolicitud.map((tpsolicituds) => (
                    <option key={tpsolicituds.co_tpsolicitud} value={tpsolicituds.co_tpsolicitud}>
                        {tpsolicituds.nb_tpsolicitud}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default OptionTPS