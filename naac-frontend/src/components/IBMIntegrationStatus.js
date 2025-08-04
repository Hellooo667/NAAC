import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Alert,
  Chip,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from '@mui/material';
import {
  Security,
  Verified,
  Key,
  Cloud,
  Storage,
  Search,
  Psychology,
  ExpandMore,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  Refresh,
  Settings,
} from '@mui/icons-material';

const IBMIntegrationStatus = () => {
  const [services, setServices] = useState({
    appId: { status: 'checking', endpoint: '', lastCheck: null },
    granite: { status: 'checking', endpoint: '', lastCheck: null },
    pinecone: { status: 'checking', endpoint: '', lastCheck: null },
    cloudStorage: { status: 'checking', endpoint: '', lastCheck: null },
    watsonNLP: { status: 'checking', endpoint: '', lastCheck: null },
  });
  
  const [configDialog, setConfigDialog] = useState(false);
  const [testingService, setTestingService] = useState(null);
  const [config, setConfig] = useState({
    ibmApiKey: '',
    graniteProjectId: '',
    pineconeApiKey: '',
    pineconeEnvironment: '',
    cosInstanceId: '',
    watsonNlpUrl: '',
  });

  const serviceDetails = {
    appId: {
      name: 'IBM App ID',
      description: 'Authentication and user management',
      icon: <Security />,
      docs: 'https://cloud.ibm.com/docs/appid',
    },
    granite: {
      name: 'IBM Granite LLM',
      description: 'Large Language Model for text generation',
      icon: <Psychology />,
      docs: 'https://cloud.ibm.com/docs/watsonx-ai',
    },
    pinecone: {
      name: 'Pinecone Vector DB',
      description: 'Vector database for semantic search and embeddings',
      icon: <Search />,
      docs: 'https://docs.pinecone.io',
    },
    cloudStorage: {
      name: 'Cloud Object Storage',
      description: 'Document and output file storage',
      icon: <Storage />,
      docs: 'https://cloud.ibm.com/docs/cloud-object-storage',
    },
    watsonNLP: {
      name: 'Watson NLP',
      description: 'Natural language processing and analysis',
      icon: <Psychology />,
      docs: 'https://cloud.ibm.com/docs/watson-natural-language-processing',
    },
  };

  const checkServiceStatus = async (serviceName) => {
    setTestingService(serviceName);
    
    try {
      // Use the API base URL from environment
      const apiBaseUrl = process.env.NODE_ENV === 'production' 
        ? process.env.REACT_APP_API_BASE_URL_PRODUCTION 
        : process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';
      
      const response = await fetch(`${apiBaseUrl}/health/check/${serviceName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });
      
      // Check if response is ok first
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }
      
      const data = await response.json();
      
      setServices(prev => ({
        ...prev,
        [serviceName]: {
          status: data.status === 'connected' ? 'connected' : 'error',
          endpoint: data.endpoint || '',
          lastCheck: new Date(),
          error: data.error || null,
          details: data.details || {},
        }
      }));
      
    } catch (error) {
      console.error(`Error checking ${serviceName}:`, error);
      setServices(prev => ({
        ...prev,
        [serviceName]: {
          status: 'error',
          endpoint: '',
          lastCheck: new Date(),
          error: error.message,
        }
      }));
    } finally {
      setTestingService(null);
    }
  };

  const testServiceFunctionality = async (serviceName) => {
    setTestingService(serviceName);
    
    try {
      // Use the API base URL from environment
      const apiBaseUrl = process.env.NODE_ENV === 'production' 
        ? process.env.REACT_APP_API_BASE_URL_PRODUCTION 
        : process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';
      
      const response = await fetch(`${apiBaseUrl}/services/test/${serviceName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }
      
      const data = await response.json();
      
      // Update service status with test results
      setServices(prev => ({
        ...prev,
        [serviceName]: {
          ...prev[serviceName],
          status: data.success ? 'connected' : 'error',
          lastCheck: new Date(),
          error: data.success ? null : 'Test failed',
          testResult: data,
        }
      }));
      
      // Show success message
      if (data.success) {
        console.log(`${serviceName} test successful:`, data.message);
      }
      
    } catch (error) {
      console.error(`Error testing ${serviceName}:`, error);
      setServices(prev => ({
        ...prev,
        [serviceName]: {
          ...prev[serviceName],
          status: 'error',
          lastCheck: new Date(),
          error: `Test failed: ${error.message}`,
        }
      }));
    } finally {
      setTestingService(null);
    }
  };

  const checkAllServices = async () => {
    const serviceNames = Object.keys(services);
    for (const serviceName of serviceNames) {
      await checkServiceStatus(serviceName);
      // Small delay between checks to avoid overwhelming the backend
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  useEffect(() => {
    // Initial check when component mounts
    checkAllServices();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'success';
      case 'error': return 'error';
      case 'checking': return 'warning';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return <CheckCircle />;
      case 'error': return <ErrorIcon />;
      case 'checking': return <Warning />;
      default: return <Warning />;
    }
  };

  const saveConfiguration = async () => {
    try {
      const response = await fetch('/api/config/ibm-services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(config),
      });
      
      if (response.ok) {
        setConfigDialog(false);
        // Recheck all services after configuration update
        await checkAllServices();
        alert('Configuration saved successfully!');
      } else {
        throw new Error('Failed to save configuration');
      }
    } catch (error) {
      alert(`Configuration error: ${error.message}`);
    }
  };

  const totalServices = Object.keys(services).length;
  const connectedServices = Object.values(services).filter(s => s.status === 'connected').length;
  const healthPercentage = (connectedServices / totalServices) * 100;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            IBM Cloud Services Integration
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Settings />}
              onClick={() => setConfigDialog(true)}
            >
              Configure
            </Button>
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={checkAllServices}
              disabled={testingService !== null}
            >
              Check All
            </Button>
          </Box>
        </Box>

        {/* Overall Health Status */}
        <Alert 
          severity={healthPercentage === 100 ? 'success' : healthPercentage > 50 ? 'warning' : 'error'}
          sx={{ mb: 3 }}
        >
          <Typography variant="subtitle2">
            System Health: {connectedServices}/{totalServices} services connected ({Math.round(healthPercentage)}%)
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={healthPercentage} 
            sx={{ mt: 1 }}
            color={healthPercentage === 100 ? 'success' : healthPercentage > 50 ? 'warning' : 'error'}
          />
        </Alert>

        {/* Service Status Grid */}
        <Grid container spacing={3}>
          {Object.entries(services).map(([serviceKey, serviceStatus]) => {
            const details = serviceDetails[serviceKey];
            return (
              <Grid item xs={12} md={6} key={serviceKey}>
                <Paper 
                  elevation={2}
                  sx={{ 
                    p: 2,
                    border: 2,
                    borderColor: `${getStatusColor(serviceStatus.status)}.main`,
                    borderStyle: serviceStatus.status === 'checking' ? 'dashed' : 'solid',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {React.cloneElement(details.icon, { 
                      sx: { mr: 1, color: `${getStatusColor(serviceStatus.status)}.main` } 
                    })}
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {details.name}
                    </Typography>
                    <Chip
                      icon={getStatusIcon(serviceStatus.status)}
                      label={serviceStatus.status.toUpperCase()}
                      color={getStatusColor(serviceStatus.status)}
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {details.description}
                  </Typography>
                  
                  {serviceStatus.endpoint && (
                    <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                      Endpoint: {serviceStatus.endpoint}
                    </Typography>
                  )}
                  
                  {serviceStatus.lastCheck && (
                    <Typography variant="caption" color="text.secondary">
                      Last checked: {serviceStatus.lastCheck.toLocaleString()}
                    </Typography>
                  )}
                  
                  {serviceStatus.error && (
                    <Alert severity="error" sx={{ mt: 1 }}>
                      <Typography variant="caption">
                        {serviceStatus.error}
                      </Typography>
                    </Alert>
                  )}
                  
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => checkServiceStatus(serviceKey)}
                      disabled={testingService === serviceKey}
                      startIcon={testingService === serviceKey ? <Warning /> : <Refresh />}
                    >
                      {testingService === serviceKey ? 'Checking...' : 'Check'}
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => testServiceFunctionality(serviceKey)}
                      disabled={testingService === serviceKey}
                      startIcon={testingService === serviceKey ? <Warning /> : <Settings />}
                    >
                      {testingService === serviceKey ? 'Testing...' : 'Test'}
                    </Button>
                    <Button
                      size="small"
                      variant="text"
                      href={details.docs}
                      target="_blank"
                    >
                      Docs
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* Detailed Service Information */}
        {Object.entries(services).some(([_, status]) => status.details && Object.keys(status.details).length > 0) && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Service Details
            </Typography>
            
            {Object.entries(services).map(([serviceKey, serviceStatus]) => {
              if (!serviceStatus.details || Object.keys(serviceStatus.details).length === 0) return null;
              
              return (
                <Accordion key={serviceKey}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="subtitle1">
                      {serviceDetails[serviceKey].name} Configuration
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Property</TableCell>
                            <TableCell>Value</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(serviceStatus.details).map(([key, value]) => (
                            <TableRow key={key}>
                              <TableCell>{key}</TableCell>
                              <TableCell>
                                {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        )}

        {/* Configuration Dialog */}
        <Dialog 
          open={configDialog} 
          onClose={() => setConfigDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Key sx={{ mr: 1 }} />
              Configure IBM Cloud Services
            </Box>
          </DialogTitle>
          <DialogContent>
            <Alert severity="info" sx={{ mb: 3 }}>
              Enter your IBM Cloud service credentials. These will be securely stored and used for API calls.
            </Alert>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="IBM API Key"
                  type="password"
                  value={config.ibmApiKey}
                  onChange={(e) => setConfig(prev => ({ ...prev, ibmApiKey: e.target.value }))}
                  helperText="Your IBM Cloud API key for authentication"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Granite Project ID"
                  value={config.graniteProjectId}
                  onChange={(e) => setConfig(prev => ({ ...prev, graniteProjectId: e.target.value }))}
                  helperText="WatsonX.ai project ID for Granite LLM"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Pinecone API Key"
                  type="password"
                  value={config.pineconeApiKey}
                  onChange={(e) => setConfig(prev => ({ ...prev, pineconeApiKey: e.target.value }))}
                  helperText="Your Pinecone API key for vector operations"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Pinecone Environment"
                  value={config.pineconeEnvironment}
                  onChange={(e) => setConfig(prev => ({ ...prev, pineconeEnvironment: e.target.value }))}
                  helperText="Pinecone environment (e.g., us-east-1-aws)"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Cloud Object Storage Instance ID"
                  value={config.cosInstanceId}
                  onChange={(e) => setConfig(prev => ({ ...prev, cosInstanceId: e.target.value }))}
                  helperText="COS instance for document storage"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Watson NLP URL"
                  value={config.watsonNlpUrl}
                  onChange={(e) => setConfig(prev => ({ ...prev, watsonNlpUrl: e.target.value }))}
                  helperText="Watson NLP service endpoint URL"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfigDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={saveConfiguration}
              disabled={!config.ibmApiKey}
            >
              Save Configuration
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default IBMIntegrationStatus;
