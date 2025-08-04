import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Snackbar, Alert } from '@mui/material';

// Context
import { AppProvider, useApp } from './context/AppContext';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import SSRGenerator from './pages/SSRGenerator';
import CriteriaInputs from './pages/CriteriaInputs';
import BestPractices from './pages/BestPractices';
import ChatInterface from './pages/ChatInterface';
import DocumentLibrary from './pages/DocumentLibrary';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
});

const AppContent = () => {
  const { state, actions } = useApp();

  const handleSidebarToggle = () => {
    actions.toggleSidebar();
  };

  const handleNotificationClose = (notificationId) => {
    actions.removeNotification(notificationId);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Navbar onMenuClick={handleSidebarToggle} />
        <Sidebar open={state.sidebarOpen} onToggle={handleSidebarToggle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            ml: state.sidebarOpen ? '240px' : '64px',
            transition: 'margin-left 0.3s',
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ssr-generator" element={<SSRGenerator />} />
            <Route path="/criteria-inputs" element={<CriteriaInputs />} />
            <Route path="/best-practices" element={<BestPractices />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/documents" element={<DocumentLibrary />} />
          </Routes>
        </Box>
      </Box>

      {/* Global Notifications */}
      {state.notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={6000}
          onClose={() => handleNotificationClose(notification.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => handleNotificationClose(notification.id)}
            severity={notification.severity || 'info'}
            variant="filled"
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </Router>
  );
};

function App() {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
