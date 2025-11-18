import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

//ICON
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PersonIcon from '@mui/icons-material/Person';
import BeenhereIcon from '@mui/icons-material/Beenhere';


//COMPONENTES GRAFICOS
import AvatarI from './Avatar';
import ChartPie from './chart_pie';
import LineCharts from './chart_line';
import '../../../assets/css/indicators.css'



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

function TabsActivities() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Resumen" {...a11yProps(0)} />
          <Tab label="Asignado" {...a11yProps(1)} />
          <Tab label="Actividades" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="container-resumen-activities">
          <h3>Descripción general</h3>

          <div className="gallery-indicators-i">

            <div className="card-item-indicator">
              <span className='icon'><LibraryAddIcon sx={{ fontSize: 18 }} /></span>
              <div className="item-body">
                <small>Elementos Creados</small><br />
                <small>1</small>
              </div>
            </div>

            <div className="card-item-indicator">
              <span className='icon'><PersonIcon sx={{ fontSize: 18 }} /></span>
              <div className="item-body">
                <small>Elementos asignados</small><br />
                <small>2</small>
              </div>
            </div>

            <div className="card-item-indicator">
              <span className='icon'><BeenhereIcon sx={{ fontSize: 18 }} /></span>

              <div className="item-body">
                <small>Elementos suscritos</small><br />
                <small>2</small>
              </div>
            </div>
          </div>


          <div className="indicators">
            <h4>Carga de Trabajo</h4>
            <div className="gallery-indicators-ii">

              <div className="card-item-indicator">
                <div className="item-body">
                  <span className='color'></span>
                  <small>En espera</small><br />
                  <small>0</small>
                </div>

              </div>

              <div className="card-item-indicator">
                <span className='color' style={{ background: 'grey' }}></span>
                <div className="item-body">
                  <small>Sin comenzar</small><br />
                  <small>0</small>
                </div>

              </div>

              <div className="card-item-indicator">
                <span className='color' style={{ background: 'green' }}></span>
                <div className="item-body">
                  <small>Terminado</small><br />
                  <small>0</small>
                </div>
              </div>

              <div className="card-item-indicator">
                <span className='color' style={{ background: '#FFFF00' }}></span>
                <div className="item-body">
                  <small>En curso</small><br />
                  <small>0</small>
                </div>

              </div>

              <div className="card-item-indicator">
                <span className='color' style={{ background: 'red' }}></span>
                <div className="item-body">
                  <small>Cancelado</small><br />
                  <small>0</small>
                </div>
              </div>

            </div>
          </div>

          <div className="gallery-charts">

            <div className="card-charts">
              <p><strong>Elemento de trabajo por prioridad</strong></p>
              <ChartPie />
            </div>

            <div className="card-charts">
              <p><strong>Elemento de trabajo por Estado</strong></p>
              <LineCharts />
            </div>
          </div>

          <h3>Actividades Recientes</h3>
          <div className="container-table-activities">

            <div className="colum-i">
              <div className="row-activities">
                <div className='container-row'>
                  <AvatarI />
                  <div className="content-activities">
                    <span>Te han Asignado <strong>Certificacion Bancrecer</strong></span><br />
                    <span>Actividad: <strong>Desarrollo Test Case</strong></span>
                  </div>
                </div>
                <div className="date">
                  <small>Creado el: 18/11/2025</small>
                </div>
              </div>

              <div className="row-activities">
                <div className='container-row'>
                  <AvatarI />
                  <div className="content-activities">
                    <span>Te han Asignado <strong>Certificacion Bancrecer</strong></span><br />
                    <span>Actividad: <strong>Desarrollo Test Case</strong></span>
                  </div>
                </div>
                <div className="date">
                  <small>Creado el: 18/11/2025</small>
                </div>
              </div>

              <div className="row-activities">
                <div className='container-row'>
                  <AvatarI />
                  <div className="content-activities">
                    <span>Te han Asignado <strong>Certificacion Bancrecer</strong></span><br />
                    <span>Actividad: <strong>Desarrollo Test Case</strong></span>
                  </div>
                </div>
                <div className="date">
                  <small>Creado el: 18/11/2025</small>
                </div>
              </div>

            </div>

            <div className="colum-i">
              <div className="row-activities">
                <div className='container-row'>
                  <AvatarI />
                  <div className="content-activities">
                    <span>Te han Asignado <strong>Certificacion Bancrecer</strong></span><br />
                    <span>Actividad: <strong>Desarrollo Test Case</strong></span>
                  </div>
                </div>
                <div className="date">
                  <small>Creado el: 18/11/2025</small>
                </div>
              </div>

              <div className="row-activities">
                <div className='container-row'>
                  <AvatarI />
                  <div className="content-activities">
                    <span>Te han Asignado <strong>Certificacion Bancrecer</strong></span><br />
                    <span>Actividad: <strong>Desarrollo Test Case</strong></span>
                  </div>
                </div>
                <div className="date">
                  <small>Creado el: 18/11/2025</small>
                </div>
              </div>

              <div className="row-activities">
                <div className='container-row'>
                  <AvatarI />
                  <div className="content-activities">
                    <span>Te han Asignado <strong>Certificacion Bancrecer</strong></span><br />
                    <span>Actividad: <strong>Desarrollo Test Case</strong></span>
                  </div>
                </div>
                <div className="date">
                  <small>Creado el: 18/11/2025</small>
                </div>
              </div>

            </div>

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


export default TabsActivities