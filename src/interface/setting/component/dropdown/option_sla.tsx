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
// Importamos los estilos centralizados
import { commonSelectStyle, commonMenuProps } from "./selectStyle";

interface SLA {
    co_sla: number;
    nb_sla: string;
    co_unidad_tiempo: string;
    nu_cantidad: number;
}

interface Props {
    onSelect: (value: any) => void;
}

function OptionSLA({ onSelect }: Props) {
    const [slaList, setSLA] = useState<SLA[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSLA, setSelectedSLA] = useState<string>('');

    const API_URL = "http://localhost:8081/sla";

    useEffect(() => {
        const fetchSLAs = async () => {
            try {
                const response = await axios.get<SLA[]>(API_URL);
                setSLA(response.data);
                setError(null);
            } catch (error) {
                console.error("Error al obtener los registros de SLA: ", error);
                setError("No se pudieron cargar los datos de SLA");
            } finally {
                setLoading(false);
            }
        };
        fetchSLAs();
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        setSelectedSLA(value);
        onSelect(value);
    };

    if (loading) return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '45px', gap: 1, px: 1 }}>
            <CircularProgress size={16} sx={{ color: '#26427c' }} />
            <Typography variant="caption" color="textSecondary">Cargando SLA...</Typography>
        </Box>
    );

    if (error) return (
        <Typography sx={{ color: '#d32f2f', fontSize: '0.75rem', p: 1 }}>
            ⚠️ {error}
        </Typography>
    );

    return (
        <FormControl fullWidth sx={commonSelectStyle} size="small">
            <InputLabel id="sla-select-label">SLA</InputLabel>
            <Select
                labelId="sla-select-label"
                id="sla-select"
                value={selectedSLA}
                label="SLA"
                onChange={handleChange}
                // Usamos la configuración centralizada para el menú
                MenuProps={commonMenuProps}
            >
                <MenuItem value="" disabled>
                    <em>Seleccione SLA</em>
                </MenuItem>
                
                {slaList.map((item) => (
                    <MenuItem key={item.co_sla} value={item.co_sla.toString()}>
                        {item.nb_sla} ({item.nu_cantidad} {item.co_unidad_tiempo})
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default OptionSLA;