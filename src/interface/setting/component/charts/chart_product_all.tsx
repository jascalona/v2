import { PieChart } from '@mui/x-charts/PieChart';

// 1. Definición de los Datos con colores integrados
const STATIC_DATA = [
  { id: 0, value: 10, label: 'SyPago', color: '#2196f3' },      // Azul
  { id: 1, value: 15, label: 'SIMF/SGLPAR', color: '#8c2fd3' }, // Púrpura
  { id: 2, value: 20, label: 'SIMF', color: '#e210d7' },       // Rosa
  { id: 3, value: 5, label: 'Otros', color: '#00bcd4' },        // Cian
];

const staticValueFormatter = (value) => {
  if (value !== undefined) {
    return `${value}k`;
  }
  return '';
};

function PieActiveArc() {
  return (
    <PieChart
      series={[
        {
          data: STATIC_DATA,
          // Mantiene el efecto de resaltado al pasar el mouse
          highlightScope: { fade: 'global', highlight: 'item' },
          // Personalización del estado "faded" (cuando otro item está seleccionado)
          faded: { 
            innerRadius: 30, 
            additionalRadius: -30, 
            color: 'gray' 
          },
          valueFormatter: staticValueFormatter,
          // Ajustes visuales opcionales para que coincida con tus otros charts
          innerRadius: '50%',
          outerRadius: '100%',
          paddingAngle: 2,
          cornerRadius: 4,
        },
      ]}
      height={200}
      width={400}
      // Configuración de la leyenda para que no use el espacio por defecto si es muy pequeño
      slotProps={{
        legend: {
          labelStyle: {
            fontSize: 12,
          },
        },
      }}
      // SX para asegurar que los bordes se vean limpios
      sx={{
        '& .MuiPieArc-root': {
          stroke: '#fff',
          strokeWidth: 2,
        },
      }}
    />
  );
}

export default PieActiveArc;