import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../../../../assets/css/task.css';

//ICON
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import BeenhereIcon from '@mui/icons-material/Beenhere';


//COMPONENTES GRAFICOS
import TaskList from '../table/table_soli';
import CreateTask from '../modal/modal_task';

import AvatarI from '../Avatar';
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

function TabsTaskMnagaer() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Tareas" {...a11yProps(0)} />
          <Tab label="Escalamientos" {...a11yProps(1)} />
          <Tab label="Otros" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="container-resumen-activities">
          <h3>Gestion de Tareas</h3>

          <div className='bt-task' >
            <div className="btn-tarea">
              <CreateTask />
            </div>
          </div>

          <div className="request-generate">
            <TaskList />
          </div>

        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Asignado
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Actividades
      </CustomTabPanel>
    </Box>
  );
}


export default TabsTaskMnagaer