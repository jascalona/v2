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

interface Ambiente {
    co_ambiente: string;
    nb_ambiente: string;
    fe_registro: string;
}

interface Props {
    onSelect: (value: any) => void;
}

function OptionAmbiente({ onSelect }: Props) {
    const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAmbiente, setSelectedAmbiente] = useState<string>(''); 

    const API_URL = "http://localhost:8081/ambiente";

    useEffect(() => {
        const fetchAmbientes = async () => {
            try {
                const response = await axios.get<Ambiente[]>(API_URL);
                setAmbientes(response.data);
                setError(null);
            } catch (error) {
                setError("No se pudieron cargar los ambientes");
            } finally {
                setLoading(false);
            }
        };
        fetchAmbientes();
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        setSelectedAmbiente(value);
        onSelect(value);
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
            <InputLabel id="ambiente-select-label">Ambiente</InputLabel>
            <Select
                labelId="ambiente-select-label"
                id="ambiente-select"
                value={selectedAmbiente}
                label="Ambiente"
                onChange={handleChange}
                MenuProps={commonMenuProps} // <-- Estilo de menú centralizado
            >
                <MenuItem value="" disabled>
                    <em>Seleccione un ambiente</em>
                </MenuItem>
                
                {ambientes.map((ambiente) => (
                    <MenuItem key={ambiente.co_ambiente} value={ambiente.co_ambiente}>
                        {ambiente.nb_ambiente}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default OptionAmbiente;