import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';

const cData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const vData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

function BarsProduct() {
  return (
    <>
      <small>Nombre Producto</small>
      <Box sx={{ width: '100%', height: 300 }}>
        <BarChart
          series={[
            { data: cData, label: 'Cerradas', },
            { data: pData, label: 'Pendientes', id: 'pvId' },
            { data: vData, label: 'Vencidas', id: 'uvId' },
          ]}
          xAxis={[{ data: xLabels }]}
          yAxis={[{ width: 50 }]}
        />
      </Box>
    </>
  );
}
export default BarsProduct