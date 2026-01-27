import { useState, useEffect } from "react";
import axios from "axios";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography,
    type SelectChangeEvent
} from '@mui/material';
// Importamos los estilos centralizados
import { commonSelectStyle, commonMenuProps } from "./selectStyle";

interface Cliente {
    co_cliente: number;
    co_rif: string;
    nb_cliente: string;
    co_rol: string;
    fe_registro: string;
}

interface OptionClienteProps {
    productoId: string;
    onSelect: (value: string) => void;
}

function OptionCliente({ productoId, onSelect }: OptionClienteProps) {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState("");

    useEffect(() => {
        const fetchClientes = async () => {
            if (!productoId) {
                setClientes([]);
                setSelectedCliente(""); // Limpiamos la selección si el producto cambia a vacío
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get<Cliente[]>(`http://localhost:8081/customers/${productoId}/product`);
                const data = response.data || [];
                setClientes(data);
            } catch (error) {
                console.error("Error al cargar clientes:", error);
                setClientes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchClientes();
    }, [productoId]);

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        setSelectedCliente(value);
        onSelect(value);
    };

    // Texto dinámico para el Label según el estado
    const getLabelText = () => {
        if (!productoId) return "Seleccione un producto";
        if (loading) return "Cargando clientes...";
        if (clientes.length === 0) return "No hay clientes asociados";
        return "Seleccione un Cliente";
    };

    const isInvalid = !productoId || loading || clientes.length === 0;

    return (
        <Box>
            <FormControl 
                fullWidth 
                sx={{
                    ...commonSelectStyle,
                    // Aplicamos el borde naranja si hay producto pero no hay clientes asociados
                    '& .MuiOutlinedInput-root fieldset': (clientes.length === 0 && productoId && !loading) 
                        ? { borderColor: '#ffa726 !important' } 
                        : {}
                }} 
                size="small"
                disabled={isInvalid}
            >
                <InputLabel id="cliente-select-label">{getLabelText()}</InputLabel>
                <Select
                    labelId="cliente-select-label"
                    id="cliente-select"
                    value={selectedCliente}
                    label={getLabelText()}
                    onChange={handleChange}
                    MenuProps={commonMenuProps}
                >
                    <MenuItem value="" disabled>
                        <em>{getLabelText()}</em>
                    </MenuItem>

                    {clientes?.map((cliente) => (
                        <MenuItem key={cliente.co_cliente} value={cliente.co_cliente}>
                            {cliente.nb_cliente}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Mensaje de aviso inferior */}
            {productoId && !loading && clientes.length === 0 && (
                <Typography 
                    sx={{ 
                        fontSize: '11px', 
                        color: '#ffa726', 
                        mt: 0.5, 
                        fontWeight: 500,
                        display: 'block'
                    }}
                >
                    * Este producto no posee clientes registrados.
                </Typography>
            )}
        </Box>
    );
}

export default OptionCliente;