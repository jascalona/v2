import { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem, Box, CircularProgress, type SelectChangeEvent, Typography } from '@mui/material';
import { commonSelectStyle, commonMenuProps } from "./selectStyle"; 

function OptionEstado({ onSelect }: { onSelect: (v: any) => void }) {
    const [estados, setEstados] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        axios.get("http://localhost:8081/status")
            .then(res => setEstados(res.data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <FormControl fullWidth sx={commonSelectStyle} size="small">
            <InputLabel>Estado</InputLabel>
            <Select
                value={selected}
                label="Estado"
                onChange={(e) => { setSelected(e.target.value); onSelect(e.target.value); }}
                MenuProps={commonMenuProps}
            >
                <MenuItem value="" disabled><em>Seleccione el Estado</em></MenuItem>
                {estados.map((est) => (
                    <MenuItem key={est.co_estado} value={est.co_estado.toString()}>
                        {est.nb_estado}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
export default OptionEstado