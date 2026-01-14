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

// Definimos la interfaz para las props
interface OptionProductoProps {
    onProductoChange: (value: string) => void;
}

interface Producto {
    co_producto: number;
    nb_producto: string;
    tx_descripcion: string;
    st_producto: string;
    fe_registro: string;
}

function OptionProducto({ onProductoChange }: OptionProductoProps) {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProducto, setSelectedProducto] = useState<string>("");

    const API_URL = "http://localhost:8081/products";

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get<Producto[]>(API_URL);
                setProductos(response.data);
                setError(null);
            } catch (error) {
                console.error("Error al cargar productos:", error);
                setError("Error al cargar los productos");
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        const newValue = event.target.value as string;
        setSelectedProducto(newValue);
        onProductoChange(newValue);
    };

    if (loading) return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '45px', gap: 1.5, px: 1 }}>
            <CircularProgress size={16} sx={{ color: '#26427c' }} />
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Cargando productos...</Typography>
        </Box>
    );

    if (error) return (
        <Typography sx={{ color: '#d32f2f', fontSize: '0.75rem', p: 1 }}>
            ⚠️ {error}
        </Typography>
    );

    return (
        <FormControl fullWidth sx={commonSelectStyle} size="small">
            <InputLabel id="producto-select-label">Producto</InputLabel>
            <Select
                labelId="producto-select-label"
                id="producto-select"
                value={selectedProducto}
                label="Producto"
                onChange={handleChange}
                MenuProps={commonMenuProps}
            >
                <MenuItem value="" disabled>
                    <em>Seleccione un Producto</em>
                </MenuItem>

                {productos.map((producto) => (
                    <MenuItem key={producto.co_producto} value={producto.co_producto.toString()}>
                        {producto.nb_producto}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default OptionProducto;