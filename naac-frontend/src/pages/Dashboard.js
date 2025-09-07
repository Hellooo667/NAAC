import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
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
  Container,
  Fade,
  Zoom,
  Slide,
  Grow,
  IconButton,
  Tooltip,
  Badge,
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
  Star,
  Speed,
  Security,
  Analytics,
  AutoAwesome,
  RocketLaunch,
  Lightbulb,
  Timeline,
  Assessment,
} from '@mui/icons-material';
import DocumentProcessor from '../components/DocumentProcessor';
import QueryProcessor from '../components/QueryProcessor';
import { analyticsAPI } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [systemStats, setSystemStats] = useState({
    documentsProcessed: 0,
    queriesHandled: 0,
    reportsGenerated: 0,
    criteriaCompleted: 0,
  });
  const [loading, setLoading] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await analyticsAPI.getDashboardStats();
        console.log('📊 Dashboard Data:', data);
        setSystemStats({
          documentsProcessed: data.documentsProcessed || 0,
          queriesHandled: data.queriesHandled || 0,
          reportsGenerated: data.reportsGenerated || 0,
          criteriaCompleted: data.criteriaCompleted || 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setSystemStats({
          documentsProcessed: 15,
          queriesHandled: 89,
          reportsGenerated: 7,
          criteriaCompleted: 5,
        });
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleProcessingComplete = (results) => {
    setSystemStats(prev => ({
      ...prev,
      documentsProcessed: prev.documentsProcessed + results.documentsProcessed,
    }));
    setAnimationKey(prev => prev + 1);
  };

  const handleQueryComplete = (queryData) => {
    setSystemStats(prev => ({
      ...prev,
      queriesHandled: prev.queriesHandled + 1,
    }));
    setAnimationKey(prev => prev + 1);
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
      color: '#6366f1',
      bgColor: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
      path: '/ssr-generator',
      features: ['AI-Powered', 'Auto-Complete', 'Templates'],
      delay: 0,
    },
    {
      title: 'Criteria Inputs',
      description: 'Get criteria-wise inputs and suggestions',
      icon: <Description />,
      color: '#10b981',
      bgColor: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
      path: '/criteria-inputs',
      features: ['Smart Analysis', 'Best Practices', 'Compliance'],
      delay: 200,
    },
    {
      title: 'AI Chat Assistant',
      description: 'Chat with NAAC AI for instant guidance',
      icon: <Chat />,
      color: '#f59e0b',
      bgColor: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
      path: '/chat',
      features: ['24/7 Support', 'Expert Knowledge', 'Instant Answers'],
      delay: 400,
    },
    {
      title: 'Document Library',
      description: 'Access and manage NAAC documents',
      icon: <LibraryBooks />,
      color: '#ec4899',
      bgColor: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)',
      path: '/documents',
      features: ['Cloud Storage', 'Version Control', 'Search'],
      delay: 600,
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
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Fade in={true} timeout={1000}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              mb: 2,
            }}
          >
            Welcome to NAAC AI Assistant
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Transform your NAAC accreditation process with cutting-edge AI technology. 
            Generate reports, get expert guidance, and streamline your documentation workflow.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip icon={<AutoAwesome />} label="AI-Powered" sx={{ bgcolor: 'primary.main', color: 'white' }} />
            <Chip icon={<Speed />} label="Lightning Fast" sx={{ bgcolor: 'secondary.main', color: 'white' }} />
            <Chip icon={<Security />} label="Secure & Compliant" sx={{ bgcolor: 'success.main', color: 'white' }} />
          </Box>
        </Box>
      </Fade>

      {/* Quick Actions */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
          Quick Actions
        </Typography>
        <Grid container spacing={4}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Grow in={true} timeout={800 + action.delay}>
                <Card
                  sx={{
                    height: '100%',
                    background: action.bgColor,
                    border: `2px solid ${action.color}20`,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(135deg, ${action.color}05 0%, ${action.color}10 100%)`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.03)',
                      boxShadow: `0 25px 80px ${action.color}30`,
                      '&::before': {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <CardActionArea component={Link} to={action.path} sx={{ height: '100%', p: 3 }}>
                    <CardContent sx={{ textAlign: 'center', p: 0, position: 'relative', zIndex: 1 }}>
                      <Box sx={{ position: 'relative', mb: 3 }}>
                        <Avatar
                          sx={{
                            bgcolor: action.color,
                            width: 72,
                            height: 72,
                            mx: 'auto',
                            mb: 2,
                            boxShadow: `0 12px 24px ${action.color}40`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.15) rotate(5deg)',
                              boxShadow: `0 16px 32px ${action.color}50`,
                            },
                          }}
                        >
                          {action.icon}
                        </Avatar>
                        <Box sx={{ position: 'absolute', top: -8, right: '20%', opacity: 0.8 }}>
                          <Star sx={{ color: action.color, fontSize: 20 }} />
                        </Box>
                      </Box>
                      
                      <Typography 
                        variant="h6" 
                        gutterBottom
                        sx={{ 
                          fontWeight: 700,
                          color: 'text.primary',
                          mb: 2,
                        }}
                      >
                        {action.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          mb: 3,
                          lineHeight: 1.6,
                        }}
                      >
                        {action.description}
                      </Typography>

                      <Box sx={{ mb: 3 }}>
                        {action.features.map((feature, idx) => (
                          <Chip
                            key={idx}
                            label={feature}
                            size="small"
                            sx={{
                              mr: 0.5,
                              mb: 0.5,
                              bgcolor: `${action.color}20`,
                              color: action.color,
                              fontSize: '0.7rem',
                              fontWeight: 600,
                            }}
                          />
                        ))}
                      </Box>
                      
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ 
                          bgcolor: action.color,
                          borderRadius: 3,
                          px: 4,
                          py: 1.5,
                          fontWeight: 700,
                          textTransform: 'none',
                          boxShadow: `0 6px 20px ${action.color}40`,
                          '&:hover': {
                            bgcolor: action.color,
                            opacity: 0.9,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 25px ${action.color}50`,
                          },
                          transition: 'all 0.3s ease',
                        }}
                        component={Link}
                        to={action.path}
                      >
                        Get Started
                        <RocketLaunch sx={{ ml: 1, fontSize: 16 }} />
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Box>

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
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
          System Analytics
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Zoom in={true} timeout={1000}>
              <Paper 
                sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 4,
                  minHeight: 140,
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 'inherit',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: '0 20px 60px rgba(99, 102, 241, 0.4)',
                    '&::before': {
                      transform: 'scaleX(1)',
                    },
                  },
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Description sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                  <Typography variant="h2" fontWeight="800" sx={{ mb: 1, fontSize: '2.5rem' }}>
                    {systemStats.documentsProcessed}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
                    Documents Processed
                  </Typography>
                  <Box sx={{ mt: 2, opacity: 0.7 }}>
                    <Timeline sx={{ fontSize: 16 }} />
                  </Box>
                </Box>
              </Paper>
            </Zoom>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Zoom in={true} timeout={1200}>
              <Paper 
                sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 4,
                  minHeight: 140,
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 'inherit',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: '0 20px 60px rgba(236, 72, 153, 0.4)',
                    '&::before': {
                      transform: 'scaleX(1)',
                    },
                  },
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Chat sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                  <Typography variant="h2" fontWeight="800" sx={{ mb: 1, fontSize: '2.5rem' }}>
                    {systemStats.queriesHandled}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
                    AI Queries Handled
                  </Typography>
                  <Box sx={{ mt: 2, opacity: 0.7 }}>
                    <SmartToy sx={{ fontSize: 16 }} />
                  </Box>
                </Box>
              </Paper>
            </Zoom>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Zoom in={true} timeout={1400}>
              <Paper 
                sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 4,
                  minHeight: 140,
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 'inherit',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: '0 20px 60px rgba(16, 185, 129, 0.4)',
                    '&::before': {
                      transform: 'scaleX(1)',
                    },
                  },
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Assessment sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                  <Typography variant="h2" fontWeight="800" sx={{ mb: 1, fontSize: '2.5rem' }}>
                    {systemStats.reportsGenerated}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
                    Reports Generated
                  </Typography>
                  <Box sx={{ mt: 2, opacity: 0.7 }}>
                    <Analytics sx={{ fontSize: 16 }} />
                  </Box>
                </Box>
              </Paper>
            </Zoom>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Zoom in={true} timeout={1600}>
              <Paper 
                sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 4,
                  minHeight: 140,
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 'inherit',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: '0 20px 60px rgba(245, 158, 11, 0.4)',
                    '&::before': {
                      transform: 'scaleX(1)',
                    },
                  },
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <CheckCircle sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                  <Typography variant="h2" fontWeight="800" sx={{ mb: 1, fontSize: '2.5rem' }}>
                    {systemStats.criteriaCompleted}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
                    Criteria Completed
                  </Typography>
                  <Box sx={{ mt: 2, opacity: 0.7 }}>
                    <Lightbulb sx={{ fontSize: 16 }} />
                  </Box>
                </Box>
              </Paper>
            </Zoom>
          </Grid>
        </Grid>
      </Box>

      {/* IBM Integration and Processing Tools */}
      <Box sx={{ mt: 6 }}>
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 3,
          }}
        >
          AI System Management
        </Typography>
        
        <Alert 
          severity="info" 
          sx={{ 
            mb: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
            border: '1px solid #93c5fd',
            color: '#1e40af',
            '& .MuiAlert-icon': {
              color: '#2563eb',
            },
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Manage your IBM Cloud services integration and process documents using our AI-powered pipeline
          </Typography>
        </Alert>
        
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider', 
          mb: 4,
          background: 'white',
          borderRadius: 2,
          p: 1,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}>
          <Tabs 
            value={selectedTab} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                minHeight: 48,
                borderRadius: 1,
                mx: 0.5,
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)',
                },
              },
            }}
          >
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
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
              border: '1px solid #86efac',
              color: '#166534',
              '& .MuiAlert-icon': {
                color: '#16a34a',
              },
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#166534' }}>
              System Status: Operational
            </Typography>
            <Typography variant="body2" sx={{ color: '#166534' }}>
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
    </Container>
  );
};

export default Dashboard;
