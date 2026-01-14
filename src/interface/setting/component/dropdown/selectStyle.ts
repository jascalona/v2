// selectStyles.ts
import { type SxProps, type Theme } from '@mui/material';

export const commonSelectStyle: SxProps<Theme> = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        backgroundColor: 'white',
        height: '45px',
        transition: 'all 0.2s ease-in-out',
        '& fieldset': { borderColor: '#e2e8f0' },
        '&:hover fieldset': { borderColor: '#cbd5e0' },
        '&.Mui-focused fieldset': {
            borderColor: '#26427c',
            borderWidth: '2px'
        },
    },
    '& .MuiInputLabel-root': {
        color: '#718096',
        fontSize: '0.85rem',
        '&.Mui-focused': { color: '#26427c' }
    },
};

export const commonMenuProps = {
    PaperProps: {
        sx: {
            borderRadius: '12px',
            mt: 0.5,
            maxHeight: 250,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            '&::-webkit-scrollbar': { width: '5px' },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#cbd5e0',
                borderRadius: '10px',
            },
            '& .MuiMenuItem-root': {
                fontSize: '0.875rem',
                py: 1,
                '&:hover': { backgroundColor: '#f0f4ff' },
                '&.Mui-selected': {
                    backgroundColor: '#e0e7ff',
                    fontWeight: 600
                }
            }
        }
    }
};