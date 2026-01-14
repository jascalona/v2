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

interface Usuarios {
    co_usuario: string;
    nb_nombre: string;
    nb_apellido: string;
    tx_email: string;
    nu_celular: string;
    co_subarea: number;
}

interface Props {
    areaId: string;
    onSelect: (value: any) => void;
}

function OptionUsuario({ onSelect, areaId }: Props) {
    const [usuarios, setUsuarios] = useState<Usuarios[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState("");

    useEffect(() => {
        const fetchClientes = async () => {
            if (!areaId) {
                setUsuarios([]);
                setSelectedUsuario(""); // Limpiamos selección si cambia el área
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get<Usuarios[]>(`http://localhost:8081/users/${areaId}/area`);
                const data = response.data || [];
                setUsuarios(data);
            } catch (error) {
                console.error("Error al cargar usuarios:", error);
                setUsuarios([]);
            } finally {
                setLoading(false);
            }
        };

        fetchClientes();
    }, [areaId]);

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        setSelectedUsuario(value);
        onSelect(value);
    };

    // Lógica para determinar el texto del Label dinámicamente
    const getLabelText = () => {
        if (!areaId) return "Seleccione el área primero";
        if (loading) return "Cargando usuarios...";
        if (usuarios.length === 0) return "Sin usuarios asociados";
        return "Seleccione un Usuario";
    };

    const isInvalid = !areaId || loading || usuarios.length === 0;

    return (
        <Box>
            <FormControl 
                fullWidth 
                sx={{
                    ...commonSelectStyle,
                    // Si no hay usuarios pero hay área, ponemos el borde naranja de advertencia
                    '& .MuiOutlinedInput-root fieldset': (usuarios.length === 0 && areaId && !loading) 
                        ? { borderColor: '#ffa726 !important' } 
                        : {}
                }} 
                size="small"
                disabled={isInvalid}
            >
                <InputLabel id="usuario-select-label">{getLabelText()}</InputLabel>
                <Select
                    labelId="usuario-select-label"
                    id="usuario-select"
                    value={selectedUsuario}
                    label={getLabelText()}
                    onChange={handleChange}
                    MenuProps={commonMenuProps}
                >
                    <MenuItem value="" disabled>
                        <em>{getLabelText()}</em>
                    </MenuItem>

                    {usuarios?.map((usuario) => (
                        <MenuItem key={usuario.co_usuario} value={usuario.co_usuario}>
                            {`${usuario.nb_nombre} ${usuario.nb_apellido}`}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Mensaje de advertencia inferior */}
            {areaId && !loading && usuarios.length === 0 && (
                <Typography 
                    sx={{ 
                        fontSize: '11px', 
                        color: '#ffa726', 
                        mt: 0.5, 
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                    }}
                >
                    * Esta área no posee usuarios registrados.
                </Typography>
            )}
        </Box>
    );
}

export default OptionUsuario;