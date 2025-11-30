// src/data/dropdown/DROPDOWN_AMBIENTE.ts

import React from 'react';
import ChecklistIcon from '@mui/icons-material/Checklist';
import type { MenuItem, DropdownConfig } from './interface'; 

export const DROPDOWN_AMBIENTE: MenuItem[] = [
    { id: 'p1', label: 'CERT: Frontend', type: 'project' },
    { id: 'p2', label: 'PROD: Backend', type: 'project' },
    { id: 'p3', label: 'PROD: Mobile', type: 'project' },
];

// Datos que usaremos para la prop 'title' e 'icon'
export const CONFIG_AMBIENTE: DropdownConfig = {
    title: 'Ambiente',
    icon: <ChecklistIcon sx={{ fontSize: 15 }} />,
};