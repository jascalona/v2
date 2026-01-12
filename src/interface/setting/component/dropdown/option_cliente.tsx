import { useState, useEffect } from "react";
import axios from "axios";

interface OptionClienteProps {
    productoId: string;
}

interface Cliente {
    co_cliente: number;
    co_rif: string;
    nb_cliente: string;
    co_rol: string;
    fe_registro: string;
}

function OptionCliente({ productoId }: OptionClienteProps) {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState("");

    useEffect(() => {
        const fetchClientes = async () => {
            if (!productoId) {
                setClientes([]);
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get<Cliente[]>(`http://localhost:8081/customers/${productoId}/product`);
                
                const data = response.data || [];
                setClientes(data);
                
            } catch (error) {
                console.error("Error al cargar clientes:", error);
                setClientes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchClientes();
    }, [productoId]);

    // Lógica para determinar si el select debe estar bloqueado
    // Se bloquea si: No hay producto, está cargando, o si la lista de clientes está vacía
    const isInvalid = !productoId || loading || clientes.length === 0;

    return (
        <div className="select-container">
            <select
                className="styled-select"
                value={selectedCliente}
                onChange={(e) => setSelectedCliente(e.target.value)}
                disabled={isInvalid}
                style={clientes.length === 0 && productoId && !loading ? { border: '1px solid #ffa726' } : {}}
            >
                <option value="">
                    {loading ? "Cargando..." : 
                     (!productoId) ? "Seleccione un producto primero" :
                     (clientes.length === 0) ? "No hay clientes asociados" : 
                     "Seleccione Cliente"}
                </option>

                {/* El operador ?. asegura que no falle si por alguna razón sigue siendo null */}
                {clientes?.map((cliente) => (
                    <option key={cliente.co_cliente} value={cliente.co_cliente}>
                        {cliente.nb_cliente}
                    </option>
                ))}
            </select>
            
            {productoId && !loading && clientes.length === 0 && (
                <span style={{ fontSize: '10px', color: '#ffa726', marginTop: '4px', display: 'block' }}>
                    * Este producto no posee clientes registrados.
                </span>
            )}
        </div>
    );
}
export default OptionCliente;