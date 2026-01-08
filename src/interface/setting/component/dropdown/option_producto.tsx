import { useState, useEffect } from "react";
import axios from "axios";

interface Producto {
    co_producto: number,
    nb_producto: string,
    tx_descripcion: string,
    st_producto: string,
    fe_registro: string

}

function OptionProducto() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedAmbiente, setSelectedAmbiente] = useState<string | undefined>('');

    const API_URL = "http://localhost:8081/products";

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
                    <option key={producto.co_producto} value={producto.co_producto}>
                        {producto.nb_producto}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default OptionProducto