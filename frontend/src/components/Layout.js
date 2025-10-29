import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  CssBaseline,
  Tooltip,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ParkIcon from '@mui/icons-material/Park';
import { ThemeContext } from '../contexts/ThemeContext';

const drawerWidth = 240;
const drawerWidthClosed = 72;

export default function Layout({ children }) {
  const location = useLocation();
  const { mode, toggleTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Proyectos', icon: <FolderIcon />, path: '/projects' },
    { text: 'Crear Proyecto', icon: <AddCircleIcon />, path: '/projects/create' },
    { text: 'Usuarios', icon: <PeopleIcon />, path: '/users' },
    { text: 'Crear Usuario', icon: <PersonAddIcon />, path: '/users/create' },
  ];

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {/* Drawer Lateral */}
        <Drawer
          variant="permanent"
          sx={{
            width: open ? drawerWidth : drawerWidthClosed,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            transition: (theme) => theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            '& .MuiDrawer-paper': {
              width: open ? drawerWidth : drawerWidthClosed,
              boxSizing: 'border-box',
              transition: (theme) => theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: 'hidden',
            },
          }}
        >
          {/* Logo/Header del Sidebar */}
          <Box
            onClick={toggleDrawer}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              px: 2.5,
              py: 2.5,
              borderBottom: 1,
              borderColor: 'divider',
              cursor: 'pointer',
              transition: (theme) => theme.transitions.create(['background-color'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.shortest,
              }),
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ParkIcon
              sx={{
                fontSize: 30,
                color: 'primary.main',
                mr: open ? 2 : 0,
                transition: (theme) => theme.transitions.create(['margin'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 600,
                color: 'primary.main',
                opacity: open ? 1 : 0,
                display: open ? 'block' : 'none',
                transition: (theme) => theme.transitions.create(['opacity'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.shortest,
                }),
              }}
            >
              Project Manager
            </Typography>
          </Box>

          <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                  <Tooltip title={!open ? item.text : ''} placement="right">
                    <ListItemButton
                      component={Link}
                      to={item.path}
                      selected={location.pathname === item.path}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text}
                        sx={{ 
                          opacity: open ? 1 : 0,
                          display: open ? 'block' : 'none',
                        }} 
                      />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
            
            {/* Theme Toggle en la parte inferior */}
            <Box sx={{ marginTop: 'auto', borderTop: 1, borderColor: 'divider' }}>
              <List>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <Tooltip title={!open ? (mode === 'dark' ? 'Modo Claro' : 'Modo Oscuro') : ''} placement="right">
                    <ListItemButton
                      onClick={toggleTheme}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                      </ListItemIcon>
                      <ListItemText 
                        primary={mode === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
                        sx={{ 
                          opacity: open ? 1 : 0,
                          display: open ? 'block' : 'none',
                        }} 
                      />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Drawer>

        {/* Contenido Principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: 3,
            transition: (theme) => theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Container maxWidth="lg">
            {children}
          </Container>
        </Box>
      </Box>
    </>
  );
}

