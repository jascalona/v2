// src/components/dropdown/interface.ts (o DropdownTypes.ts)

import React from 'react';

// Interfaz centralizada para los elementos de la lista
export interface MenuItem {
    id: string;
    label: string;
    // Definimos todos los tipos de 'type' que planeas usar en el sistema
    type: 'ambiente' | 'project' | 'producto' | 'prioridad'; 
}

// Opcional: Interfaz para la configuración del botón (title, icon)
export interface DropdownConfig {
    title: string;
    icon?: React.ReactNode;
}