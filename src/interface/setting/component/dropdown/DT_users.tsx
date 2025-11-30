import GroupIcon from '@mui/icons-material/Group';
import type { MenuItem, DropdownConfig } from './interface';

export const DROPDOWN_AMBIENTE: MenuItem[] = [
    { id: 'p1', label: 'CERT: Frontend', type: 'project' },
    { id: 'p2', label: 'PROD: Backend', type: 'project' },
    { id: 'p3', label: 'PROD: Mobile', type: 'project' },
];

// Datos que usaremos para la prop 'title' e 'icon'
export const CONFIG_AMBIENTE: DropdownConfig = {
    title: 'Asignar',
    icon: <GroupIcon sx={{ fontSize: 15 }} />,
};