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
// IMPORTANTE: Importamos los estilos centralizados
import { commonSelectStyle, commonMenuProps } from "./selectStyle";

interface TPS {
    co_tpsolicitud: number;
    nb_tpsolicitud: string;
    fe_registro: string;
}

interface Props {
    onSelect: (value: any) => void;
}

function OptionTPS({ onSelect }: Props) {
    const [tpsolicitud, setTPS] = useState<TPS[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTPS, setSelectedTPS] = useState<string>('');

    const API_URL = "http://localhost:8081/tprequest";

    useEffect(() => {
        const fetchTPS = async () => {
            try {
                const response = await axios.get<TPS[]>(API_URL);
                setTPS(response.data);
                setError(null);
            } catch (error) {
                console.error("Error al obtener los registros: ", error);
                setError("Error al cargar los datos");
            } finally {
                setLoading(false);
            }
        };
        fetchTPS();
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        const newValue = event.target.value as string;
        setSelectedTPS(newValue);
        onSelect(newValue);
    };

    if (loading) return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '45px', gap: 1, px: 1 }}>
            <CircularProgress size={16} sx={{ color: '#26427c' }} />
            <Typography variant="caption" color="textSecondary">Cargando tipos...</Typography>
        </Box>
    );

    if (error) return (
        <Typography sx={{ color: '#d32f2f', fontSize: '0.75rem', p: 1 }}>
            {error}
        </Typography>
    );

    return (
        <FormControl fullWidth sx={commonSelectStyle} size="small">
            <InputLabel id="tps-select-label">Tipo de Solicitud</InputLabel>
            <Select
                labelId="tps-select-label"
                id="tps-select"
                value={selectedTPS}
                label="Tipo de Solicitud"
                onChange={handleChange}
                // Usamos la propiedad centralizada para el menú y el scroll
                MenuProps={commonMenuProps}
            >
                <MenuItem value="" disabled>
                    <em>Seleccione Tipo de solicitud</em>
                </MenuItem>
                
                {tpsolicitud.map((item) => (
                    <MenuItem key={item.co_tpsolicitud} value={item.co_tpsolicitud.toString()}>
                        {item.nb_tpsolicitud}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default OptionTPS;