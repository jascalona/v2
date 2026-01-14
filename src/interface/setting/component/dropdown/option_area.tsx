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
import { commonSelectStyle, commonMenuProps } from "./selectStyle";


interface Area {
    co_area: string;
    nb_area: string;
}

interface OptionAreaProps {
    onAreaChange: (value: string) => void;
}

function OptionArea({ onAreaChange }: OptionAreaProps) {
    const [areas, setArea] = useState<Area[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedArea, setSelectedArea] = useState<string>('');

    const API_URL = "http://localhost:8081/area";

    useEffect(() => {
        const fetchArea = async () => {
            try {
                const response = await axios.get<Area[]>(API_URL);
                setArea(response.data);
                setError(null);
            } catch (error) {
                setError("Error al cargar las áreas");
            } finally {
                setLoading(false);
            }
        };
        fetchArea();
    }, []);

    // Corregido: Usar SelectChangeEvent de MUI
    const handleChange = (event: SelectChangeEvent) => {
        const newValue = event.target.value as string;
        setSelectedArea(newValue);
        onAreaChange(newValue);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', height: '45px', gap: 1.5, px: 1 }}>
                <CircularProgress size={18} sx={{ color: '#26427c' }} />
                <Typography sx={{ fontSize: '0.8rem', color: '#94a3b8' }}>Cargando...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Typography sx={{ fontSize: '0.75rem', color: '#d32f2f', p: 1 }}>
                ⚠️ {error}
            </Typography>
        );
    }

    return (
        <FormControl fullWidth sx={commonSelectStyle} size="small">
            <InputLabel id="area-select-label">Área</InputLabel>
            <Select
                labelId="area-select-label"
                id="area-select"
                value={selectedArea}
                label="Área"
                onChange={handleChange}
                MenuProps={commonMenuProps} // <-- Estilo de menú centralizado
            >
                <MenuItem value="" disabled>
                    <em>Seleccione un área</em>
                </MenuItem>

                {areas.map((area) => (
                    <MenuItem key={area.co_area} value={area.co_area}>
                        {area.nb_area}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default OptionArea;