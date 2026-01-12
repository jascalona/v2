import { useState, useEffect } from "react";
import axios from "axios";

interface OptionComponenteProps {
    productoId: string
}

interface Componente {
    co_componente: number,
    nb_componente: string,
}

function OptionComponente({ productoId }: OptionComponenteProps) {
    const [componente, setComponente] = useState<Componente[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedComponente, setSelectedComponente] = useState("");

    useEffect(() => {
        const fetchComponente = async () => {
            if (!productoId) {
                setComponente([]);
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get<Componente[]>(`http://localhost:8081/components/${productoId}/product`);

                const data = response.data || [];
                setComponente(data);

            } catch (error) {
                console.error("Error al cargar componentes:", error);
                setComponente([]);
            } finally {
                setLoading(false);
            }
        };

        fetchComponente();
    }, [productoId]);

    // Lógica para determinar si el select debe estar bloqueado
    // Se bloquea si: No hay producto, está cargando, o si la lista de clientes está vacía
    const isInvalid = !productoId || loading || componente.length === 0;



    return (
        <div className="select-container">
            <select
                className="styled-select"
                value={selectedComponente}
                onChange={(e) => setSelectedComponente(e.target.value)}
                disabled={isInvalid}
                style={componente.length === 0 && productoId && !loading ? { border: '1px solid #ffa726' } : {}}
            >
                <option value="">
                    {loading ? "Cargando..." :
                        (!productoId) ? "Seleccione un producto primero" :
                            (componente.length === 0) ? "No hay componentes asociados" :
                                "Seleccione Cliente"}
                </option>

                {/* El operador ?. asegura que no falle si por alguna razón sigue siendo null */}
                {componente?.map((componentes) => (
                    <option key={componentes.co_componente} value={componentes.co_componente}>
                        {componentes.nb_componente}
                    </option>
                ))}
            </select>

            {productoId && !loading && componente.length === 0 && (
                <span style={{ fontSize: '10px', color: '#ffa726', marginTop: '4px', display: 'block' }}>
                    * Este producto no posee componentes registrados.
                </span>
            )}
        </div>
    );

}
export default OptionComponente