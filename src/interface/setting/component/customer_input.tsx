import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


interface Props{
    label: string,
    placeholder: string,
}

function TextFieldvi({label, placeholder}: Props) {
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    label={label}
                    placeholder={placeholder}
                />
            </div>

        </Box>
    );
}

export default TextFieldvi