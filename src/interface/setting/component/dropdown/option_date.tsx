import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface LabelProps {
    label: string;
}

function TimeDate({ label }: LabelProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
                label={label} 
                sx={{ width: '100%' }} 
                slotProps={{
                    textField: {
                        fullWidth: true,
                        size: 'small',
                        sx: {
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px', // Consistencia con tus otros inputs
                                backgroundColor: 'white',
                                '& fieldset': { borderColor: '#e2e8f0' },
                                '&:hover fieldset': { borderColor: '#cbd5e0' },
                                '&.Mui-focused fieldset': { borderColor: '#26427c' },
                            },
                            '& .MuiInputLabel-root': { color: '#718096', fontSize: '0.9rem' },
                        }
                    }
                }}
            />
        </LocalizationProvider>
    );
}

export default TimeDate;