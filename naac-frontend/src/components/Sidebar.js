import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  Assignment as AssignmentIcon,
  EmojiObjects as EmojiObjectsIcon,
  Chat as ChatIcon,
  Folder as FolderIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';

const drawerWidth = 240;
const collapsedWidth = 64;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'SSR Generator', icon: <DescriptionIcon />, path: '/ssr-generator' },
  { text: 'Criteria Inputs', icon: <AssignmentIcon />, path: '/criteria-inputs' },
  { text: 'Best Practices', icon: <EmojiObjectsIcon />, path: '/best-practices' },
  { text: 'AI Chat', icon: <ChatIcon />, path: '/chat' },
  { text: 'Document Library', icon: <FolderIcon />, path: '/documents' },
];

const Sidebar = ({ open, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        transition: 'width 0.3s',
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
    >
      <Box sx={{ mt: 8 }}>
        <List>
          {menuItems.map((item) => (
            <Tooltip 
              key={item.text} 
              title={open ? '' : item.text} 
              placement="right"
            >
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  selected={location.pathname === item.path}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: location.pathname === item.path ? 'inherit' : 'inherit',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    sx={{ opacity: open ? 1 : 0 }} 
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ p: 2, textAlign: 'center' }}>
          {open && (
            <Box>
              <AnalyticsIcon color="primary" sx={{ mb: 1 }} />
              <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                IBM Cloud Services
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
