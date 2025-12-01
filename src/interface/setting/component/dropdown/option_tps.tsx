import { useState, useEffect } from "react";
import axios from "axios";

interface TPS {
    coTps: string,
    nbTps: string,
    fe_registro: string
}

function OptionTPS() {
    const [tpsolicitud, setTPS] = useState<TPS[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedAmbiente, setSelectedAmbiente] = useState<string | undefined>('');

    const API_URL = "http://localhost:8080/basetomee/tpsolicitud/list";

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
        setSelectedAmbiente(event.target.value);
        console.log("Ambiente seleccionado para formulario:", event.target.value);
    };

    if (loading) {
        return <p className="loading-message">Cargando...</p>
    }

    if (error) {
        return <p className="error-message">{error}</p>
    }

    if (tpsolicitud.length === 0) {
        return <p className="no-records-message">No hay registros</p>
    }

    return (
        <div className="select-container">
            <select
                name="producto"
                id="producto-select"
                className="styled-select"
                value={selectedAmbiente}
                onChange={handleChange}
            >

                <option value="" disabled>
                    Tipo
                </option>

                {/* Mapeo de los datos para generar las opciones */}
                {tpsolicitud.map((tps) => (
                    <option key={tps.coTps} value={tps.coTps}>
                        {tps.nbTps}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default OptionTPS