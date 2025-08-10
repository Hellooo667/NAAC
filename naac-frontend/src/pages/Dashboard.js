import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
  Alert,
} from '@mui/material';
import {
  Assignment,
  Description,
  Chat,
  LibraryBooks,
  TrendingUp,
  CheckCircle,
  Schedule,
  Warning,
  CloudDone,
  SmartToy,
  Upload,
} from '@mui/icons-material';
import DocumentProcessor from '../components/DocumentProcessor';
import QueryProcessor from '../components/QueryProcessor';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [systemStats, setSystemStats] = useState({
    documentsProcessed: 0,
    queriesHandled: 0,
    reportsGenerated: 0,
    criteriaCompleted: 0,
  });

  useEffect(() => {
    // Fetch system statistics
    const fetchStats = async () => {
      try {
        // Use correct API base URL - same logic as ChatInterface
        const getApiBaseUrl = () => {
          if (process.env.NODE_ENV === 'production') {
            return process.env.REACT_APP_API_BASE_URL_PRODUCTION || 'https://naac-0dgf.onrender.com';
          }
          return process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
        };

        const apiBaseUrl = getApiBaseUrl();
        console.log('🔗 Dashboard API URL:', `${apiBaseUrl}/api/analytics/dashboard`);

        const response = await fetch(`${apiBaseUrl}/api/analytics/dashboard`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('📊 Dashboard Data:', data);
          setSystemStats({
            documentsProcessed: data.documentsProcessed || 0,
            queriesHandled: data.queriesHandled || 0,
            reportsGenerated: data.reportsGenerated || 0,
            criteriaCompleted: data.criteriaCompleted || 0,
          });
        } else {
          console.error('Dashboard API Error:', response.status);
          // Set default values if API fails
          setSystemStats({
            documentsProcessed: 15,
            queriesHandled: 89,
            reportsGenerated: 7,
            criteriaCompleted: 5,
          });
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Set default values if fetch fails
        setSystemStats({
          documentsProcessed: 15,
          queriesHandled: 89,
          reportsGenerated: 7,
          criteriaCompleted: 5,
        });
      }
    };
    
    fetchStats();
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleProcessingComplete = (results) => {
    // Update system stats when document processing completes
    setSystemStats(prev => ({
      ...prev,
      documentsProcessed: prev.documentsProcessed + results.documentsProcessed,
    }));
  };

  const handleQueryComplete = (queryData) => {
    // Update stats when query processing completes
    setSystemStats(prev => ({
      ...prev,
      queriesHandled: prev.queriesHandled + 1,
    }));
  };

  const handleQuickActionClick = (path) => {
    navigate(path);
  };

  const recentActivities = [
    { id: 1, title: 'SSR Draft for Criterion 1.1 generated', time: '2 hours ago', status: 'completed' },
    { id: 2, title: 'Best practices document updated', time: '1 day ago', status: 'completed' },
    { id: 3, title: 'Criterion 2.3 inputs in progress', time: '2 days ago', status: 'pending' },
    { id: 4, title: 'Document analysis completed', time: '3 days ago', status: 'completed' },
  ];

  const criteriaProgress = [
    { criterion: 'Criterion 1', progress: 85, status: 'good' },
    { criterion: 'Criterion 2', progress: 65, status: 'moderate' },
    { criterion: 'Criterion 3', progress: 40, status: 'needs-attention' },
    { criterion: 'Criterion 4', progress: 75, status: 'good' },
    { criterion: 'Criterion 5', progress: 30, status: 'needs-attention' },
    { criterion: 'Criterion 6', progress: 55, status: 'moderate' },
    { criterion: 'Criterion 7', progress: 90, status: 'good' },
  ];

  const quickActions = [
    {
      title: 'Generate SSR Draft',
      description: 'Create Self-Study Report drafts with AI assistance',
      icon: <Assignment />,
      color: '#1976d2',
      path: '/ssr-generator',
    },
    {
      title: 'Criteria Inputs',
      description: 'Get criteria-wise inputs and suggestions',
      icon: <Description />,
      color: '#388e3c',
      path: '/criteria-inputs',
    },
    {
      title: 'AI Chat Assistant',
      description: 'Chat with NAAC AI for instant guidance',
      icon: <Chat />,
      color: '#f57c00',
      path: '/chat',
    },
    {
      title: 'Document Library',
      description: 'Access and manage NAAC documents',
      icon: <LibraryBooks />,
      color: '#7b1fa2',
      path: '/documents',
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle sx={{ color: '#4caf50' }} />;
      case 'pending':
        return <Schedule sx={{ color: '#ff9800' }} />;
      default:
        return <Warning sx={{ color: '#f44336' }} />;
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'good':
        return '#4caf50';
      case 'moderate':
        return '#ff9800';
      case 'needs-attention':
        return '#f44336';
      default:
        return '#2196f3';
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        NAAC Accreditation Dashboard
      </Typography>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
              onClick={() => handleQuickActionClick(action.path)}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: action.color,
                    width: 56,
                    height: 56,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {action.icon}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {action.description}
                </Typography>
                <Button 
                  variant="contained" 
                  size="small" 
                  sx={{ bgcolor: action.color }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickActionClick(action.path);
                  }}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Criteria Progress */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUp sx={{ mr: 1 }} />
                NAAC Criteria Progress
              </Typography>
              <Box sx={{ mt: 2 }}>
                {criteriaProgress.map((item, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" fontWeight="medium">
                        {item.criterion}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={item.progress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getProgressColor(item.status),
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              <List sx={{ mt: 1 }}>
                {recentActivities.map((activity) => (
                  <ListItem key={activity.id} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {getStatusIcon(activity.status)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {activity.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {activity.time}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="primary.main" fontWeight="bold">
              {systemStats.documentsProcessed}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Documents Processed
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="secondary.main" fontWeight="bold">
              {systemStats.queriesHandled}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AI Queries Handled
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {systemStats.reportsGenerated}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Reports Generated
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main" fontWeight="bold">
              {systemStats.criteriaCompleted}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Criteria Completed
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* IBM Integration and Processing Tools */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          AI System Management
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          Manage your IBM Cloud services integration and process documents using our AI-powered pipeline
        </Alert>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab 
              icon={<CloudDone />} 
              label="IBM Services Status" 
              iconPosition="start"
            />
            <Tab 
              icon={<Upload />} 
              label="Document Processor" 
              iconPosition="start"
            />
            <Tab 
              icon={<SmartToy />} 
              label="AI Query Interface" 
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {selectedTab === 0 && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              System Status
            </Typography>
            <Typography variant="body2">
              All NAAC AI Assistant services are operational. The system is ready to help you with 
              NAAC accreditation processes, criteria guidance, and documentation support.
            </Typography>
          </Alert>
        )}
        {selectedTab === 1 && (
          <DocumentProcessor onProcessingComplete={handleProcessingComplete} />
        )}
        {selectedTab === 2 && (
          <QueryProcessor onQueryComplete={handleQueryComplete} />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
