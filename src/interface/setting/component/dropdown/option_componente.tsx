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

interface OptionComponenteProps {
    productoId: string;
    onComponenteChange: (value: string) => void;
}

interface Componente {
    co_componente: number;
    nb_componente: string;
}

function OptionComponente({ productoId, onComponenteChange }: OptionComponenteProps) {
    const [componentes, setComponentes] = useState<Componente[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedComponente, setSelectedComponente] = useState("");

    useEffect(() => {
        const fetchComponente = async () => {
            if (!productoId) {
                setComponentes([]);
                setSelectedComponente("");
                onComponenteChange("");
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get<Componente[]>(`http://localhost:8081/components/${productoId}/product`);
                setComponentes(response.data || []);
            } catch (error) {
                console.error("Error al cargar componentes:", error);
                setComponentes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchComponente();
    }, [productoId, onComponenteChange]);

    const handleChange = (event: SelectChangeEvent) => {
        const id = event.target.value as string;
        setSelectedComponente(id);
        onComponenteChange(id);
    };

    // Etiqueta dinámica según el estado de la dependencia
    const getLabelText = () => {
        if (!productoId) return "Seleccione un producto";
        if (loading) return "Cargando componentes...";
        if (componentes.length === 0) return "Sin componentes asociados";
        return "Seleccione un Componente";
    };

    const isInvalid = !productoId || loading || componentes.length === 0;

    return (
        <Box>
            <FormControl 
                fullWidth 
                sx={{
                    ...commonSelectStyle,
                    // Borde naranja preventivo si el producto no tiene componentes
                    '& .MuiOutlinedInput-root fieldset': (componentes.length === 0 && productoId && !loading) 
                        ? { borderColor: '#ffa726 !important' } 
                        : {}
                }} 
                size="small"
                disabled={isInvalid}
            >
                <InputLabel id="componente-select-label">{getLabelText()}</InputLabel>
                <Select
                    labelId="componente-select-label"
                    id="componente-select"
                    value={selectedComponente}
                    label={getLabelText()}
                    onChange={handleChange}
                    MenuProps={commonMenuProps}
                >
                    <MenuItem value="" disabled>
                        <em>{getLabelText()}</em>
                    </MenuItem>

                    {componentes.map((item) => (
                        <MenuItem key={item.co_componente} value={item.co_componente.toString()}>
                            {item.nb_componente}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Aviso visual para componentes vacíos */}
            {productoId && !loading && componentes.length === 0 && (
                <Typography 
                    sx={{ 
                        fontSize: '11px', 
                        color: '#ffa726', 
                        mt: 0.5, 
                        fontWeight: 500 
                    }}
                >
                    * Este producto no posee componentes registrados.
                </Typography>
            )}
        </Box>
    );
}

export default OptionComponente;