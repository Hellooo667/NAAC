import api from './api';

// Pinecone API Integration
export const pineconeAPI = {
  // Upsert vectors to Pinecone
  upsertVectors: async (vectors, namespace = 'naac-documents') => {
    const response = await api.post('/pinecone/upsert', {
      vectors,
      namespace,
    });
    return response.data;
  },

  // Query similar vectors
  queryVectors: async (queryVector, topK = 10, namespace = 'naac-documents', filter = {}) => {
    const response = await api.post('/pinecone/query', {
      vector: queryVector,
      topK,
      namespace,
      filter,
      includeMetadata: true,
      includeValues: false,
    });
    return response.data;
  },

  // Query with text (backend will generate embedding)
  queryWithText: async (queryText, topK = 10, namespace = 'naac-documents', filter = {}) => {
    const response = await api.post('/pinecone/query-text', {
      query: queryText,
      topK,
      namespace,
      filter,
      includeMetadata: true,
    });
    return response.data;
  },

  // Delete vectors
  deleteVectors: async (vectorIds, namespace = 'naac-documents') => {
    const response = await api.delete('/pinecone/delete', {
      data: {
        ids: vectorIds,
        namespace,
      },
    });
    return response.data;
  },

  // Get index stats
  getIndexStats: async () => {
    const response = await api.get('/pinecone/stats');
    return response.data;
  },
};

// Enhanced document processing API with Pinecone integration
export const enhancedDocumentAPI = {
  // Process and index document
  processDocument: async (formData, onProgress) => {
    const response = await api.post('/documents/process-pipeline', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
    return response.data;
  },

  // Get processing status
  getProcessingStatus: async (jobId) => {
    const response = await api.get(`/documents/processing-status/${jobId}`);
    return response.data;
  },

  // Search documents semantically
  semanticSearch: async (query, filters = {}) => {
    const response = await api.post('/documents/semantic-search', {
      query,
      filters,
      topK: 20,
    });
    return response.data;
  },
};

// Service health monitoring API
export const healthAPI = {
  // Check all services health
  checkAllServices: async () => {
    const response = await api.get('/health/services');
    return response.data;
  },

  // Check specific service
  checkService: async (serviceName) => {
    const response = await api.get(`/health/services/${serviceName}`);
    return response.data;
  },

  // Test IBM Granite connection
  testGranite: async () => {
    const response = await api.post('/health/test/granite', {
      prompt: "Hello, this is a test.",
    });
    return response.data;
  },

  // Test Pinecone connection
  testPinecone: async () => {
    const response = await api.get('/health/test/pinecone');
    return response.data;
  },

  // Test Watson NLP
  testWatsonNLP: async () => {
    const response = await api.post('/health/test/watson-nlp', {
      text: "This is a test document for IBM Watson NLP analysis.",
    });
    return response.data;
  },
};

// Enhanced IBM API with your specific credentials
export const enhancedIBMAPI = {
  // Granite LLM with your project configuration
  generateContent: async (prompt, context = '', options = {}) => {
    const response = await api.post('/ibm/granite/generate', {
      prompt,
      context,
      model_id: 'ibm/granite-13b-chat-v2',
      project_id: process.env.REACT_APP_IBM_PROJECT_ID,
      parameters: {
        max_new_tokens: options.maxTokens || 1000,
        temperature: options.temperature || 0.1,
        top_p: options.topP || 0.9,
        repetition_penalty: options.repetitionPenalty || 1.1,
        ...options.parameters,
      },
    });
    return response.data;
  },

  // Watson NLP with your instance
  analyzeDocument: async (text, features = ['sentiment', 'keywords', 'entities', 'concepts']) => {
    const response = await api.post('/ibm/watson-nlp/analyze', {
      text,
      features,
      instance_url: process.env.REACT_APP_WATSON_NLP_URL,
      version: process.env.REACT_APP_WATSON_NLP_VERSION,
    });
    return response.data;
  },

  // Cloud Object Storage operations
  uploadToStorage: async (file, bucketName = 'NAAC_fr') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', bucketName);
    
    const response = await api.post('/ibm/cos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Download from storage
  downloadFromStorage: async (fileName, bucketName = 'NAAC_fr') => {
    const response = await api.get('/ibm/cos/download', {
      params: { fileName, bucket: bucketName },
      responseType: 'blob',
    });
    return response.data;
  },
};

// Configuration API for service setup
export const configAPI = {
  // Save IBM service configuration
  saveIBMConfig: async (config) => {
    const response = await api.post('/config/ibm-services', config);
    return response.data;
  },

  // Get current configuration
  getConfig: async () => {
    const response = await api.get('/config');
    return response.data;
  },

  // Test configuration
  testConfig: async (config) => {
    const response = await api.post('/config/test', config);
    return response.data;
  },
};
