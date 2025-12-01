import { useState, useEffect } from "react";
import axios from "axios";

interface Producto {
    coproducto: string,
    nbproducto: string,
    stproducto: string
}

function OptionProducto() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedAmbiente, setSelectedAmbiente] = useState<string | undefined>('');

    const API_URL = "http://localhost:8080/basetomee/producto/listar";

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get<Producto[]>(API_URL)
                setProductos(response.data);

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

    if (productos.length === 0) {
        return <p className="no-records-message">No hay registros disponibles para mostrar</p>
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
                    Producto
                </option>

                {/* Mapeo de los datos para generar las opciones */}
                {productos.map((producto) => (
                    <option key={producto.coproducto} value={producto.coproducto}>
                        {producto.nbproducto}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default OptionProducto