import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Master from './Master';
import Dashboard from './Dashboard';
import Billing from './Billing';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

const drawerWidth = 240;

export default function Layout1() {
    const [activeComponent, setActiveComponent] = useState('Master');

    const handleButtonClick = (componentName) => {
        // Set the active component based on button click
        setActiveComponent(componentName);
    };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* topnav */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
          </Typography>
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['DashBoard', 'Master', 'Billing'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton  onClick={() => handleButtonClick(text)}>
                  <ListItemIcon>
                    {index === 0 ? <SpaceDashboardOutlinedIcon/> : index === 1 ? <AdminPanelSettingsIcon/> : <ReceiptLongOutlinedIcon/>}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar/>
        {activeComponent === 'Master' && <Master />}
        {activeComponent === 'DashBoard' && <Dashboard />}
        {activeComponent === 'Billing' && <Billing />}

      </Box>
    </Box>
  );
}
