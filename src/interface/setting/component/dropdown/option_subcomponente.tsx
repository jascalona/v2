import { useState, useEffect } from "react";
import axios from "axios";

interface OptionSubComponenteProps {
    componenteId: string;
}

interface SubComponente {
    co_subcomponente: number,
    nb_subcomponente: string,
}

interface OptionSubComponenteProps {
    componenteId: string;
    onSelect: (value: string) => void;
}

function OptionSubComponente({ componenteId, onSelect }: OptionSubComponenteProps) {
    const [subComponentes, setSubComponentes] = useState<SubComponente[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedSubcomponente, setSelectedSubcomponente] = useState("");

    useEffect(() => {
        const fetchSubComponentes = async () => {
            if (!componenteId) {
                setSubComponentes([]);
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get<SubComponente[]>(`http://localhost:8081/subcomponents/${componenteId}/components`);

                const data = response.data || [];
                setSubComponentes(data);

            } catch (error) {
                console.error("Error al cargar Sub-componentes:", error);
                setSubComponentes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSubComponentes();
    }, [componenteId]);


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedSubcomponente(value);
        onSelect(value);
    };

    const isInvalid = !componenteId || loading || subComponentes.length === 0;


    return (
        <>
            <div className="select-container">
                <select
                    className="styled-select"
                    value={selectedSubcomponente}
                    onChange={handleChange}
                    disabled={isInvalid}
                    style={subComponentes.length === 0 && componenteId && !loading ? { border: '1px solid #ffa726' } : {}}
                >
                    <option value="">
                        {loading ? "Cargando..." :
                            (!componenteId) ? "Seleccione un producto primero" :
                                (subComponentes.length === 0) ? "No hay clientes asociados" :
                                    "Seleccione un Cliente"}
                    </option>

                    {/* El operador ?. asegura que no falle si por alguna razón sigue siendo null */}
                    {subComponentes?.map((subcomponente) => (
                        <option key={subcomponente.co_subcomponente} value={subcomponente.co_subcomponente}>
                            {subcomponente.nb_subcomponente}
                        </option>
                    ))}
                </select>

                {componenteId && !loading && subComponentes.length === 0 && (
                    <span style={{ fontSize: '10px', color: '#ffa726', marginTop: '4px', display: 'block' }}>
                        * Este Componente no posee Sub-Componentes registrados.
                    </span>
                )}
            </div>
        </>
    )
}
export default OptionSubComponente