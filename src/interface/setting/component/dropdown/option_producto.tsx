import { useState, useEffect } from "react";
import axios from "axios";

// Definimos la interfaz para las props que recibe el componente
interface OptionProductoProps {
    onProductoChange: (value: string) => void;
}



interface Producto {
    co_producto: number;
    nb_producto: string;
    tx_descripcion: string;
    st_producto: string;
    fe_registro: string;
}

function OptionProducto({ onProductoChange }: OptionProductoProps) {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // El valor seleccionado localmente
    const [selectedAmbiente, setSelectedAmbiente] = useState<string>("");

    const API_URL = "http://localhost:8081/products";

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get<Producto[]>(API_URL);
                setProductos(response.data);
                setError(null);
            } catch (error) {
                console.error("Error al obtener los registros: ", error);
                setError("Error al cargar los productos");
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);
    
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onProductoChange(e.target.value);
    };


    if (loading) return <p className="loading-message">Cargando productos...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="select-container">
            <select
                name="producto"
                id="producto-select"
                className="styled-select"
                value={selectedAmbiente}
                onChange={handleChange}
            >
                {/* Opción por defecto vacía pero visible */}
                <option value="">
                    Seleccione un Producto
                </option>

                {productos.map((producto) => (
                    <option key={producto.co_producto} value={producto.co_producto}>
                        {producto.nb_producto}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default OptionProducto;