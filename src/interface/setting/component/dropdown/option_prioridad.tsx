import { useState, useEffect } from "react";
import axios from "axios";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    CircularProgress,
    Typography,
    type SelectChangeEvent
} from '@mui/material';
// Importación de estilos centralizados
import { commonSelectStyle, commonMenuProps } from "./selectStyle";

interface Prioridad {
    co_prioridad: number;
    nb_prioridad: string;
}

interface Props {
    onSelect: (value: any) => void;
}

function OptionPrioridad({ onSelect }: Props) {
    const [prioridades, setPrioridad] = useState<Prioridad[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPrioridad, setSelectedPrioridad] = useState<string>('');

    const API_URL = "http://localhost:8081/priority";

    useEffect(() => {
        const fetchPrioridades = async () => {
            try {
                const response = await axios.get<Prioridad[]>(API_URL);
                setPrioridad(response.data);
                setError(null);
            } catch (error) {
                console.error("Error al obtener prioridades: ", error);
                setError("Error al cargar prioridades");
            } finally {
                setLoading(false);
            }
        };
        fetchPrioridades();
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        setSelectedPrioridad(value);
        onSelect(value);
    };

    if (loading) return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '45px', gap: 1, px: 1 }}>
            <CircularProgress size={16} sx={{ color: '#26427c' }} />
            <Typography variant="caption" color="textSecondary">Cargando...</Typography>
        </Box>
    );

    if (error) return (
        <Typography sx={{ color: '#d32f2f', fontSize: '0.75rem', p: 1 }}>
            ⚠️ {error}
        </Typography>
    );

    return (
        <FormControl fullWidth sx={commonSelectStyle} size="small">
            <InputLabel id="prioridad-select-label">Prioridad</InputLabel>
            <Select
                labelId="prioridad-select-label"
                id="prioridad-select"
                value={selectedPrioridad}
                label="Prioridad"
                onChange={handleChange}
                // Aplicamos el menú centralizado (con scroll y bordes redondeados)
                MenuProps={commonMenuProps}
            >
                <MenuItem value="" disabled>
                    <em>Seleccione Prioridad</em>
                </MenuItem>
                
                {prioridades.map((p) => (
                    <MenuItem key={p.co_prioridad} value={p.co_prioridad.toString()}>
                        {p.nb_prioridad}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default OptionPrioridad;