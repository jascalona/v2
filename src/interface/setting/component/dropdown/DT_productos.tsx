// ProductData.ts

import React from 'react';
import type { MenuItem, DropdownConfig } from '../dropdown/interface'; // Importamos las interfaces
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';


// Datos para el dropdown de PRODUCTO
export const DROPDOWN_PRODUCTO: MenuItem[] = [
    { id: 'p1', label: 'Sistema de Ventas', type: 'producto' },
    { id: 'p2', label: 'Plataforma Administrativa', type: 'producto' },
    { id: 'p3', label: 'Infraestructura de Red', type: 'project' },
];

export const CONFIG_PRODUCTO: DropdownConfig = {
    title: 'Producto',
    icon: <PrecisionManufacturingIcon sx={{ fontSize: 15 }} />,
};

