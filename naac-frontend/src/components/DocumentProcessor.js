import React, { useState, useCallback } from 'react';
import api from '../services/api';
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
      label: 'Document Parsing',
      description: 'Extract text and metadata using IBM Watson NLP',
      stage: 'parsing',
    },
    {
      label: 'Content Chunking',
      description: 'Segment content by NAAC criteria and academic years',
      stage: 'chunking',
    },
    {
      label: 'Vector Embedding',
      description: 'Generate embeddings using OpenAI/Cohere models',
      stage: 'embedding',
    },
    {
      label: 'Pinecone Storage',
      description: 'Store vectors in Pinecone database for retrieval',
      stage: 'indexing',
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
      
      // Step 1: Document Parsing
      setActiveStep(1);
      setProcessingStage('Parsing documents using IBM Watson NLP...');
      setProgress(20);
      
      const parseRes = await api.post('/api/documents/parse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const parseResults = parseRes.data;
      
      // Step 2: Content Chunking
      setActiveStep(2);
      setProcessingStage('Chunking content by NAAC criteria...');
      setProgress(40);
      
      const chunkRes = await api.post('/api/documents/chunk', {
        documentIds: parseResults.documentIds,
        chunkingStrategy: 'naac_criteria',
      });
      const chunkResults = chunkRes.data;
      
      // Step 3: Vector Embedding
      setActiveStep(3);
      setProcessingStage('Generating vector embeddings with OpenAI/Cohere...');
      setProgress(60);
      
      const embedRes = await api.post('/api/embeddings/generate', {
        chunks: chunkResults.chunks,
        modelType: 'text-embedding-ada-002', // OpenAI embeddings
      });
      const embedResults = embedRes.data;
      
      // Step 4: Pinecone Index Storage
      setActiveStep(4);
      setProcessingStage('Storing vectors in Pinecone database...');
      setProgress(80);
      
      const indexRes = await api.post('/api/pinecone/upsert', {
        vectors: embedResults.embeddings.map((embedding, idx) => ({
          id: `doc_${Date.now()}_${idx}`,
          values: embedding.vector,
          metadata: {
            ...chunkResults.metadata[idx],
            text: chunkResults.chunks[idx],
            source: uploadedFiles[Math.floor(idx / (chunkResults.chunks.length / uploadedFiles.length))].name,
            timestamp: new Date().toISOString(),
          },
        })),
        namespace: 'naac_documents',
      });
      const indexResults = indexRes.data;
      
      // Complete processing
      setActiveStep(5);
      setProcessingStage('Processing complete!');
      setProgress(100);
      
      const results = {
        documentsProcessed: uploadedFiles.length,
        chunksCreated: chunkResults.chunks.length,
        embeddingsGenerated: embedResults.embeddings.length,
        indexedVectors: indexResults.vectorCount,
        criteria: chunkResults.criteriaDistribution,
        processingTime: indexResults.processingTime,
      };
      
      setProcessingResults(results);
      
      if (onProcessingComplete) {
        onProcessingComplete(results);
      }
      
    } catch (error) {
      console.error('Document processing error:', error);
      alert(`Processing failed: ${error.message}`);
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
