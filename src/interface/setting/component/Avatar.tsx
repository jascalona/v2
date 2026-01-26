import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';



interface IdUser{
    idUser?: string
}

function AvatarI({idUser}: IdUser) {

    return (
        <Stack direction="row" spacing={2}>
            <Avatar
                sx={{ bgcolor: deepOrange[500] }}
                alt="Remy Sharp"
            >
                {idUser}
            </Avatar>

        </Stack>
    );
}

export default AvatarI