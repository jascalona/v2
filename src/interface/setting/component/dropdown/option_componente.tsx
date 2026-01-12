import { useState, useEffect } from "react";
import axios from "axios";

interface OptionComponenteProps {
    productoId: string;
    onComponenteChange: (value: string) => void;
}

interface Componente {
    co_componente: number;
    nb_componente: string;
}

function OptionComponente({ productoId, onComponenteChange }: OptionComponenteProps) {
    const [componentes, setComponentes] = useState<Componente[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedComponente, setSelectedComponente] = useState("");

    // Efecto que reacciona al cambio de Producto
    useEffect(() => {
        const fetchComponente = async () => {
            if (!productoId) {
                setComponentes([]);
                setSelectedComponente(""); // Resetear selección local
                onComponenteChange("");    // Resetear en el padre
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get<Componente[]>(`http://localhost:8081/components/${productoId}/product`);
                setComponentes(response.data || []);
            } catch (error) {
                console.error("Error al cargar componentes:", error);
                setComponentes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchComponente();
    }, [productoId]); // Solo depende de productoId

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        setSelectedComponente(id);
        onComponenteChange(id); // <--- Aquí pasamos el ID al padre para el SubComponente
    };

    const isInvalid = !productoId || loading || componentes.length === 0;

    return (
        <div className="select-container">
            <select
                className="styled-select"
                value={selectedComponente}
                onChange={handleChange}
                disabled={isInvalid}
                style={componentes.length === 0 && productoId && !loading ? { border: '1px solid #ffa726' } : {}}
            >
                <option value="">
                    {loading ? "Cargando..." :
                        (!productoId) ? "Seleccione un producto primero" :
                            (componentes.length === 0) ? "No hay componentes asociados" :
                                "Seleccione un Componente"}
                </option>

                {componentes.map((item) => (
                    <option key={item.co_componente} value={item.co_componente}>
                        {item.nb_componente}
                    </option>
                ))}
            </select>

            {productoId && !loading && componentes.length === 0 && (
                <span style={{ fontSize: '10px', color: '#ffa726', marginTop: '4px', display: 'block' }}>
                    * Este producto no posee componentes registrados.
                </span>
            )}
        </div>
    );
}

export default OptionComponente;