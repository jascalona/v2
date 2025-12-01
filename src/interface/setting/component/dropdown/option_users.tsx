import { useState, useEffect } from "react";
import axios from "axios";

interface Usuarios {
    coUsuario: string,
    cosubarea: string,
    nbNombre: string,
    nbApellido: string
}

function OptionUsuario() {
    const [usuarios, setUsurios] = useState<Usuarios[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedAmbiente, setSelectedAmbiente] = useState<string | undefined>('');

    const API_URL = "http://localhost:8080/basetomee/usuario/list";

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get<Usuarios[]>(API_URL)
                setUsurios(response.data);

                setError(null);
            } catch (error) {
                console.log("Error al obtener los registros: ", error);
                setError("Error al cargar los datos de la API");
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
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

    if (usuarios.length === 0) {
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
                    Asignar
                </option>

                {/* Mapeo de los datos para generar las opciones */}
                {usuarios.map((usuario) => (
                    <option key={usuario.coUsuario} value={usuario.coUsuario}>
                        {usuario.nbNombre +  " " + usuario.nbApellido}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default OptionUsuario