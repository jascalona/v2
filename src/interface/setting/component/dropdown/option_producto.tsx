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

    // 1. Asegúrate de que el nombre del setter sea coherente (estaba como setSelectedAmbiente)
    const [selectedProducto, setSelectedProducto] = useState<string>("");

    const API_URL = "http://localhost:8081/products";

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get<Producto[]>(API_URL);
                setProductos(response.data);
                setError(null);
            } catch (error) {
                setError("Error al cargar los productos");
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;

        // 2. ACTUALIZA EL ESTADO LOCAL para que el nombre se vea en pantalla
        setSelectedProducto(newValue);

        // 3. Notifica al ModalSolicitud para que lo guarde en el formData
        onProductoChange(newValue);
    };

    if (loading) return <p className="loading-message">Cargando productos...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="select-container">
            <select
                name="producto"
                id="producto-select"
                className="styled-select"
                value={selectedProducto} 
                onChange={handleChange}
            >
                <option value="" disabled>
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