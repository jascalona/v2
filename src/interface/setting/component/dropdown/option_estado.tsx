import { useState, useEffect } from "react";
import axios from "axios";


interface Estado {
    co_estado: number,
    nb_estado: string,
    fe_registro: string
}

interface Props {
    onSelect: (value: any) => void;
}


function OptionEstado({ onSelect }: Props) {
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
        const value = event.target.value;
        setSelectedEstado(value);

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
                value={selectedEstado}
                onChange={handleChange}
            >

             <option value="" disabled>Seleccione el Estado</option>
                {estado.map((estados) => (
                    <option key={estados.co_estado} value={estados.co_estado}>
                        {estados.nb_estado}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default OptionEstado