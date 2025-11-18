import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';

function AvatarI() {
    return (
        <Stack direction="row" spacing={2}>
            <Avatar
                sx={{ bgcolor: deepOrange[500] }}
                alt="Remy Sharp"
            >
                J
            </Avatar>

        </Stack>
    );
}

export default AvatarI