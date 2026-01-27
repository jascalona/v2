import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';

interface TimeDateProps {
    label: string;
    value: string; // Recibe el valor del estado padre
    onChange: (newValue: string) => void; // Función para actualizar el padre
}

function TimeDate({ label, value, onChange }: TimeDateProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker 
                label={label} 
                // Convierte el string del estado a objeto dayjs para mostrarlo
                value={value ? dayjs(value) : null} 
                onChange={(newValue: Dayjs | null) => {
                    if (newValue) {
                        // Formato exacto requerido: 2026-01-05 06:09:35.514679-08:00
                        const formatted = newValue.format("YYYY-MM-DD HH:mm:ss.SSSSSSZ");
                        onChange(formatted);
                    } else {
                        onChange("");
                    }
                }}
                sx={{ 
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white',
                        '& fieldset': { borderColor: '#e2e8f0' },
                    }
                }}
            />
        </LocalizationProvider>
    );
}

export default TimeDate;