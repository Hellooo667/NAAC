import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Snackbar, Alert } from '@mui/material';

// Context
import { AppProvider, useApp } from './context/AppContext';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ParticleBackground from './components/ParticleBackground';

// Pages
import Dashboard from './pages/Dashboard';
import SSRGenerator from './pages/SSRGenerator';
import CriteriaInputs from './pages/CriteriaInputs';
import BestPractices from './pages/BestPractices';
import ChatInterface from './pages/ChatInterface';
import DocumentLibrary from './pages/DocumentLibrary';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1',
      light: '#a5b4fc',
      dark: '#4338ca',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ec4899',
      light: '#f9a8d4',
      dark: '#be185d',
      contrastText: '#ffffff',
    },
    background: {
      default: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      paper: 'rgba(255, 255, 255, 0.95)',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
            borderRadius: '4px',
            '&:hover': {
              background: 'linear-gradient(135deg, #4338ca, #be185d)',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontWeight: 600,
          fontSize: '0.95rem',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4338ca 0%, #be185d 100%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.95) 0%, rgba(236, 72, 153, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
          borderRight: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(20px)',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        bar: {
          borderRadius: 8,
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        },
      },
    },
  },
});

const AppContent = ({ darkMode, onToggleDarkMode }) => {
  const { state, actions } = useApp();

  const handleSidebarToggle = () => {
    actions.toggleSidebar();
  };

  const handleNotificationClose = (notificationId) => {
    actions.removeNotification(notificationId);
  };

  return (
    <Router>
      <ParticleBackground darkMode={darkMode} />
      <Box sx={{ display: 'flex' }}>
        <Navbar 
          onMenuClick={handleSidebarToggle} 
          darkMode={darkMode} 
          onToggleDarkMode={onToggleDarkMode} 
        />
        <Sidebar open={state.sidebarOpen} onToggle={handleSidebarToggle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 0,
            mt: 8,
            ml: state.sidebarOpen ? '240px' : '64px',
            transition: 'margin-left 0.3s ease-in-out',
            minHeight: '100vh',
            background: 'transparent',
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
  const [darkMode, setDarkMode] = useState(false);

  const getTheme = (isDark) => createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: isDark ? '#818cf8' : '#6366f1',
        light: isDark ? '#a5b4fc' : '#a5b4fc',
        dark: isDark ? '#6366f1' : '#4338ca',
        contrastText: '#ffffff',
      },
      secondary: {
        main: isDark ? '#f472b6' : '#ec4899',
        light: isDark ? '#f9a8d4' : '#f9a8d4',
        dark: isDark ? '#ec4899' : '#be185d',
        contrastText: '#ffffff',
      },
      background: {
        default: isDark 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
        paper: isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      },
      success: {
        main: isDark ? '#34d399' : '#10b981',
        light: isDark ? '#6ee7b7' : '#34d399',
        dark: isDark ? '#10b981' : '#059669',
      },
      warning: {
        main: isDark ? '#fbbf24' : '#f59e0b',
        light: isDark ? '#fcd34d' : '#fbbf24',
        dark: isDark ? '#f59e0b' : '#d97706',
      },
      error: {
        main: isDark ? '#f87171' : '#ef4444',
        light: isDark ? '#fca5a5' : '#f87171',
        dark: isDark ? '#ef4444' : '#dc2626',
      },
      text: {
        primary: isDark ? '#f1f5f9' : '#1e293b',
        secondary: isDark ? '#94a3b8' : '#64748b',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
        fontSize: '3.5rem',
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontWeight: 600,
        fontSize: '2rem',
        lineHeight: 1.3,
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.75rem',
        lineHeight: 1.3,
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.4,
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.4,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
        fontWeight: 400,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        fontWeight: 400,
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
        letterSpacing: '0.02em',
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: isDark 
                ? 'linear-gradient(135deg, #818cf8, #f472b6)'
                : 'linear-gradient(135deg, #6366f1, #ec4899)',
              borderRadius: '4px',
              '&:hover': {
                background: isDark 
                  ? 'linear-gradient(135deg, #6366f1, #ec4899)'
                  : 'linear-gradient(135deg, #4338ca, #be185d)',
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: isDark 
              ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)'
              : '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(10px)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-8px) scale(1.02)',
              boxShadow: isDark 
                ? '0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.3)'
                : '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: '12px 24px',
            fontWeight: 600,
            fontSize: '0.95rem',
            boxShadow: 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
              transition: 'left 0.5s',
            },
            '&:hover::before': {
              left: '100%',
            },
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
            },
          },
          contained: {
            background: isDark 
              ? 'linear-gradient(135deg, #818cf8 0%, #f472b6 100%)'
              : 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            '&:hover': {
              background: isDark 
                ? 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'
                : 'linear-gradient(135deg, #4338ca 0%, #be185d 100%)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: isDark 
              ? '0 4px 20px rgba(0, 0, 0, 0.2)'
              : '0 4px 20px rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(10px)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(255, 255, 255, 0.1)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: isDark 
              ? 'linear-gradient(135deg, rgba(129, 140, 248, 0.95) 0%, rgba(244, 114, 182, 0.95) 100%)'
              : 'linear-gradient(135deg, rgba(99, 102, 241, 0.95) 0%, rgba(236, 72, 153, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: isDark 
              ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)'
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
            borderRight: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(20px)',
            boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            height: 10,
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          },
          bar: {
            borderRadius: 8,
            background: isDark 
              ? 'linear-gradient(135deg, #34d399 0%, #6ee7b7 100%)'
              : 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
          },
        },
      },
    },
  });

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppProvider>
      <ThemeProvider theme={getTheme(darkMode)}>
        <CssBaseline />
        <AppContent darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
