import React, { useState, useCallback } from 'react';
import { enhancedDocumentAPI } from '../services/apiExtensions';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Divider,
} from '@mui/material';
import {
  CloudUpload,
  AutoAwesome,
  Description,
  CheckCircle,
  Warning,
  Info,
  Refresh,
} from '@mui/icons-material';
import { AILoadingIndicator } from './LoadingComponents';

const DocumentProcessor = ({ onProcessingComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [processingStage, setProcessingStage] = useState('');
  const [progress, setProgress] = useState(0);
  const [processingResults, setProcessingResults] = useState(null);

  const processingSteps = [
    {
      label: 'Document Upload',
      description: 'Upload PDF/DOCX files for processing',
      stage: 'upload',
    },
    {
      label: 'AI Processing',
      description: 'Process documents using IBM Watson NLP and AI models',
      stage: 'processing',
    },
    {
      label: 'Vector Generation',
      description: 'Generate embeddings and store in vector database',
      stage: 'vectorization',
    },
    {
      label: 'Complete',
      description: 'Documents processed and ready for queries',
      stage: 'complete',
    },
  ];

  const handleFileUpload = useCallback(async (files) => {
    const fileList = Array.from(files);
    setUploadedFiles(fileList);
    
    // Validate files
    const validFiles = fileList.filter(file => {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      return validTypes.includes(file.type) && file.size <= 50 * 1024 * 1024; // 50MB limit
    });
    
    if (validFiles.length !== fileList.length) {
      alert('Some files were rejected. Please upload only PDF or DOCX files under 50MB.');
    }
    
    setUploadedFiles(validFiles);
    if (validFiles.length > 0) {
      setActiveStep(1);
    }
  }, []);

  const processDocuments = async () => {
    setProcessing(true);
    setProgress(0);
    
    try {
      const formData = new FormData();
      uploadedFiles.forEach((file, index) => {
        formData.append(`documents`, file);
      });
      
      // Use the enhanced document API
      setProcessingStage('Processing documents with AI pipeline...');
      setProgress(25);
      
      const result = await enhancedDocumentAPI.processDocument(formData, (progress) => {
        setProgress(25 + (progress * 0.75)); // Scale progress from 25% to 100%
      });
      
      setProcessingResults(result);
      setActiveStep(4);
      setProgress(100);
      
      if (onProcessingComplete) {
        onProcessingComplete(result);
      }
      
    } catch (error) {
      console.error('Document processing failed:', error);
      alert('Document processing failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const resetProcessor = () => {
    setActiveStep(0);
    setProcessing(false);
    setUploadedFiles([]);
    setProcessingStage('');
    setProgress(0);
    setProcessingResults(null);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Document Preprocessor Pipeline
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          Upload your institutional documents (policies, reports, curricula) to build your NAAC knowledge base
        </Alert>

        <Stepper activeStep={activeStep} orientation="vertical">
          {processingSteps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <Typography variant="subtitle1">{step.label}</Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {step.description}
                </Typography>
                
                {index === 0 && activeStep === 0 && (
                  <Box>
                    <input
                      accept=".pdf,.docx"
                      style={{ display: 'none' }}
                      id="document-upload"
                      multiple
                      type="file"
                      onChange={(e) => handleFileUpload(e.target.files)}
                    />
                    <label htmlFor="document-upload">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<CloudUpload />}
                        sx={{ mb: 2 }}
                      >
                        Upload Documents
                      </Button>
                    </label>
                    
                    {uploadedFiles.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Selected Files ({uploadedFiles.length}):
                        </Typography>
                        <List dense>
                          {uploadedFiles.map((file, idx) => (
                            <ListItem key={idx}>
                              <ListItemIcon>
                                <Description />
                              </ListItemIcon>
                              <ListItemText
                                primary={file.name}
                                secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                              />
                            </ListItem>
                          ))}
                        </List>
                        <Button
                          variant="contained"
                          onClick={processDocuments}
                          disabled={processing}
                          startIcon={<AutoAwesome />}
                          sx={{ mt: 2 }}
                        >
                          Start Processing Pipeline
                        </Button>
                      </Box>
                    )}
                  </Box>
                )}
                
                {index > 0 && activeStep === index && processing && (
                  <AILoadingIndicator stage={processingStage} progress={progress} />
                )}
                
                {index > 0 && activeStep > index && (
                  <Alert severity="success" icon={<CheckCircle />}>
                    Step completed successfully
                  </Alert>
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {processingResults && (
          <Paper sx={{ p: 3, mt: 3, bgcolor: 'success.light', color: 'success.contrastText' }}>
            <Typography variant="h6" gutterBottom>
              Processing Complete! 🎉
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Typography variant="h4" fontWeight="bold">
                    {processingResults.documentsProcessed}
                  </Typography>
                  <Typography variant="body2">Documents Processed</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Typography variant="h4" fontWeight="bold">
                    {processingResults.chunksCreated}
                  </Typography>
                  <Typography variant="body2">Content Chunks</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Typography variant="h4" fontWeight="bold">
                    {processingResults.embeddingsGenerated}
                  </Typography>
                  <Typography variant="body2">Vector Embeddings</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Typography variant="h4" fontWeight="bold">
                    {processingResults.indexedVectors}
                  </Typography>
                  <Typography variant="body2">Indexed Vectors</Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Content Distribution by NAAC Criteria:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {Object.entries(processingResults.criteria || {}).map(([criterion, count]) => (
                <Chip
                  key={criterion}
                  label={`${criterion}: ${count} chunks`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
            
            <Typography variant="body2">
              Processing completed in {processingResults.processingTime}ms
              • Your documents are now searchable and ready for AI-powered query processing
            </Typography>
            
            <Button
              variant="outlined"
              onClick={resetProcessor}
              startIcon={<Refresh />}
              sx={{ mt: 2 }}
            >
              Process More Documents
            </Button>
          </Paper>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentProcessor;
