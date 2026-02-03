import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ICONS
import InboxIcon from '@mui/icons-material/Inbox';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import TimelineIcon from '@mui/icons-material/Timeline';

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

const TabLabel = ({ primary, secondary }: { primary: string, secondary: string }) => (
    <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', ml: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.2 }}>
            {primary}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'none' }}>
            {secondary}
        </Typography>
    </Box>
);

function Inbox() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab
                        icon={<InboxIcon sx={{ fontSize: 20 }} />}
                        iconPosition="start"
                        label={<TabLabel primary="Principal" secondary="10 sin leer" />}
                        {...a11yProps(0)}
                        sx={{ textTransform: 'none', minHeight: 64, width: '200px' }}
                    />

                    <Tab
                        icon={<RunningWithErrorsIcon sx={{ fontSize: 20 }} />}
                        iconPosition="start"
                        label={<TabLabel primary="Vencidos" secondary="3 pendientes" />}
                        {...a11yProps(1)}
                        sx={{ textTransform: 'none', minHeight: 64, width: '200px' }}
                    />

                    <Tab
                        icon={<TimelineIcon sx={{ fontSize: 20 }} />}
                        iconPosition="start"
                        label={<TabLabel primary="Otros" secondary="1 sin leer" />}
                        {...a11yProps(2)}
                        sx={{ textTransform: 'none', minHeight: 64, width: '200px' }}
                    />
                </Tabs>
            </Box>
            
            <CustomTabPanel value={value} index={0}>
                data table rows all
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                data table condition for status = 'vencidas'
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                others
            </CustomTabPanel>
        </Box>
    );
}

export default Inbox;