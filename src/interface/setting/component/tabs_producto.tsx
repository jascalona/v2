import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


import TextFieldvi from './customer_input';


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

function TabsProduct() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Nuevo Producto" {...a11yProps(0)} />
                    <Tab label="Administrar" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>

                <div className="dashboard-content">

                    {/* Encabezado */}
                    <div className="content-header">
                        <h2>Gestion de Productos</h2>
                        <p>
                            <span className="header-emoji">⚡</span> Jueves, 13 de noviembre, 22:19
                        </p>
                    </div>


                    <div className="fondo-image" style={{ lineHeight: 0 }}>
                        <div className="card-icon-container"><span className="card-icon">📄</span></div>
                        <h2>Crea un proyecto</h2>
                        <p style={{ fontSize: 13 }}>La mayoría de las cosas comienzan con un proyecto en Plane.</p>
                    </div>

                    {/* Guía de inicio rápido */}
                    <div className="section quick-start-section">



                        <div className='quick-start-cards' style={{ padding: '25px', marginLeft: '-15px' }}>
                            <TextFieldvi label="Nombre del producto" placeholder="Por ejemplo, SyPago" />
                            <TextFieldvi label="Status" placeholder="Por ejemplo, Activo" />
                        </div>

                        <div className="des" style={{ padding: '0 25px 20px', marginLeft: '-15px' }}>
                            <TextFieldvi label="Descripción" placeholder="Por ejemplo, Una breve Descripción sobre el producto que decea implementar..." />
                        </div>

                        <Button
                            style={{
                                marginLeft: '20px',
                                padding: '10px 20px',
                                color: '#fff',
                                border: 'solid 1px rgba(128, 128, 128, 0.333)',
                                fontSize: '13px',
                                borderRadius: 5,
                                textTransform: 'capitalize',
                                fontFamily: 'sans-serif',
                                background: 'rgb(38, 66, 124)'
                            }}
                        >
                            Nuevo Proyecto
                        </Button>


                    </div>


                </div>


            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Item Two
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Item Three
            </CustomTabPanel>
        </Box>
    );
}
export default TabsProduct