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

interface SubComponente {
    co_subcomponente: number;
    nb_subcomponente: string;
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
                setSelectedSubcomponente(""); // Limpiar selección local
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get<SubComponente[]>(
                    `http://localhost:8081/subcomponents/${componenteId}/components`
                );
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

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        setSelectedSubcomponente(value);
        onSelect(value);
    };

    // Texto dinámico para el Label
    const getLabelText = () => {
        if (!componenteId) return "Seleccione un componente primero";
        if (loading) return "Cargando sub-componentes...";
        if (subComponentes.length === 0) return "Sin sub-componentes asociados";
        return "Seleccione un Sub-Componente";
    };

    const isInvalid = !componenteId || loading || subComponentes.length === 0;

    return (
        <Box>
            <FormControl 
                fullWidth 
                sx={{
                    ...commonSelectStyle,
                    // Borde naranja si el componente padre no tiene sub-componentes
                    '& .MuiOutlinedInput-root fieldset': (subComponentes.length === 0 && componenteId && !loading) 
                        ? { borderColor: '#ffa726 !important' } 
                        : {}
                }} 
                size="small"
                disabled={isInvalid}
            >
                <InputLabel id="subcomponente-select-label">{getLabelText()}</InputLabel>
                <Select
                    labelId="subcomponente-select-label"
                    id="subcomponente-select"
                    value={selectedSubcomponente}
                    label={getLabelText()}
                    onChange={handleChange}
                    MenuProps={commonMenuProps}
                >
                    <MenuItem value="" disabled>
                        <em>{getLabelText()}</em>
                    </MenuItem>

                    {subComponentes?.map((sub) => (
                        <MenuItem key={sub.co_subcomponente} value={sub.co_subcomponente.toString()}>
                            {sub.nb_subcomponente}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Aviso inferior condicional */}
            {componenteId && !loading && subComponentes.length === 0 && (
                <Typography 
                    sx={{ 
                        fontSize: '11px', 
                        color: '#ffa726', 
                        mt: 0.5, 
                        fontWeight: 500 
                    }}
                >
                    * Este componente no posee sub-componentes registrados.
                </Typography>
            )}
        </Box>
    );
}

export default OptionSubComponente;