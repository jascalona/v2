import { useState, useEffect } from "react";
import axios from "axios";

interface Area {
    co_area: string,
    nb_area: string,
}

interface OptionAreaProps {
    onAreaChange: (value: string) => void;
}


function OptionArea({ onAreaChange }: OptionAreaProps) {
    const [areas, setArea] = useState<Area[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedArea, setSelectedArea] = useState<string | undefined>('');

    const API_URL = "http://localhost:8081/area";

    useEffect(() => {
        const fetchArea = async () => {
            try {
                const response = await axios.get<Area[]>(API_URL)
                setArea(response.data);
                setError(null);
            } catch (error) {
                console.log("Error al obtener los registros: ", error);
                setError("Error al cargar los datos de la API");
            } finally {
                setLoading(false);
            }
        };
        fetchArea();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;

        // ACTUALIZA EL ESTADO LOCAL para que el nombre se vea en pantalla
        setSelectedArea(newValue);

        // Notifica al ModalSolicitud para que lo guarde en el formData
        onAreaChange(newValue);
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;


    return (
        <div className="select-container">
            <select
                name="area"
                id="producto-select"
                className="styled-select"
                value={selectedArea} 
                onChange={handleChange}
            >
                <option value="" disabled>
                    Seleccione un Area
                </option>

                {areas.map((area) => (
                    <option key={area.co_area} value={area.co_area}>
                        {area.nb_area}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default OptionArea