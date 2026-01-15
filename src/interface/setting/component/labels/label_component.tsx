import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

interface Componente {
    co_componente: string
    nb_componente: string;
    co_producto: string
    fe_registro: string
}

function CardComponent() {

    const [componentes, setComponentes] = useState<Componente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const API_URL = "http://localhost:8081/components"

    useEffect(() => {
        const fetchComponentes = async () => {
            try {
                const response = await axios.get<Componente[]>(API_URL);
                setComponentes(response.data);
                setError(null);
            } catch (err) {
                console.error("Error al obtener los registros:", err);
                setError("Error al cargar los datos de la API.");
            } finally {
                setLoading(false);
            }
        };

        fetchComponentes();
    }, []);


    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    // Verificar si no hay registros para mostrar un mensaje
    if (componentes.length === 0) {
        return <p>No hay registros disponibles para mostrar.</p>;
    }

    return (
        <>
            {componentes.map((componente) => (
                <div className="label-component">
                    <div className="content-left" >
                        <h4 >{componente.nb_componente}</h4>
                        <p>Codigo del Producto: {componente.co_producto}</p>
                        <small > {componente.fe_registro.substring(10)}</small>
                    </div>

                    <div className="content-rigth">
                        <AccountTreeIcon sx={{ fontSize: '40px' }} />
                    </div>
                </div>
            ))}

        </>
    )
}

export default CardComponent