import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TableCustomer from '../table/table_customer'; 

//ICON
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PersonIcon from '@mui/icons-material/Person';
import BeenhereIcon from '@mui/icons-material/Beenhere';


//COMPONENTES GRAFICOS
import AvatarI from '../Avatar';
import ChartPie from '../charts/chart_pie';
import LineCharts from '../charts/chart_line';
import '../../../../assets/css/indicators.css'



interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabsCustomers() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Clientes" {...a11yProps(0)} />
          <Tab label="Actividades" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="container-resumen-activities">
          <TableCustomer />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Asignado
      </CustomTabPanel>
    </Box>
  );
}


export default TabsCustomers