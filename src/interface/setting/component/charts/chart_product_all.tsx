import { PieChart } from '@mui/x-charts/PieChart';

// 1. Definición de los Datos Estáticos (Ejemplo)
// Los datos deben ser un array de objetos con las claves 'id', 'value', y 'label'.
const STATIC_DATA = [
  { id: 0, value: 10, label: 'Windows' },
  { id: 1, value: 15, label: 'macOS' },
  { id: 2, value: 20, label: 'Linux' },
  { id: 3, value: 5, label: 'Otros' },
];
const staticValueFormatter = (value, context) => {
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
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          valueFormatter: staticValueFormatter, 
        },
      ]}
      height={200}
      width={400}
    />
  );
}


export default PieActiveArc