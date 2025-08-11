import axios from 'axios';

// Base API configuration - automatically detect environment
const getApiBaseUrl = () => {
  const base = process.env.NODE_ENV === 'production'
    ? (process.env.REACT_APP_API_BASE_URL_PRODUCTION || 'https://naac-0dgf.onrender.com')
    : (process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000');
  // Normalize to avoid trailing slash or accidental '/api' suffix
  return base.replace(/\/+$/, '').replace(/\/api$/, '');
};

const API_BASE_URL = getApiBaseUrl();
console.log('🔗 API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// SSR Generation API
export const ssrAPI = {
  generateContent: async (data) => {
    const response = await api.post('/ssr/generate', data);
    return response.data;
  },
  
  saveSSR: async (ssrData) => {
    const response = await api.post('/ssr/save', ssrData);
    return response.data;
  },
  
  getSSRHistory: async () => {
    const response = await api.get('/ssr/history');
    return response.data;
  },
  
  downloadSSR: async (ssrId) => {
    const response = await api.get(`/ssr/download/${ssrId}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

// Criteria Analysis API
export const criteriaAPI = {
  getCriteriaData: async (criterionId) => {
    const response = await api.get(`/criteria/${criterionId}`);
    return response.data;
  },
  
  getAISuggestions: async (criterionId, context) => {
    const response = await api.post(`/criteria/${criterionId}/suggestions`, { context });
    return response.data;
  },
  
  saveCriteriaInput: async (criterionId, data) => {
    const response = await api.post(`/criteria/${criterionId}/input`, data);
    return response.data;
  },
  
  getCriteriaProgress: async () => {
    const response = await api.get('/criteria/progress');
    return response.data;
  },
};

// Chat API
export const chatAPI = {
  sendMessage: async (message, context = {}) => {
    const response = await api.post('/api/chat/message', {
      message,
      session_id: context.sessionId,
      context,
      timestamp: new Date().toISOString(),
    });
    return response.data;
  },
  
  getChatHistory: async (sessionId) => {
    const response = await api.get(`/chat/history/${sessionId}`);
    return response.data;
  },
  
  startNewSession: async () => {
    const response = await api.post('/chat/session/new');
    return response.data;
  },
};

// Document Management API
export const documentAPI = {
  uploadDocument: async (formData, onProgress) => {
    const response = await api.post('/documents/upload', formData, {
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
  
  getDocuments: async (filters) => {
    const response = await api.get('/documents', { params: filters });
    return response.data;
  },
  
  getDocument: async (documentId) => {
    const response = await api.get(`/documents/${documentId}`);
    return response.data;
  },
  
  deleteDocument: async (documentId) => {
    const response = await api.delete(`/documents/${documentId}`);
    return response.data;
  },
  
  downloadDocument: async (documentId) => {
    const response = await api.get(`/documents/${documentId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },
  
  analyzeDocument: async (documentId) => {
    const response = await api.post(`/documents/${documentId}/analyze`);
    return response.data;
  },
};

// Best Practices API
export const bestPracticesAPI = {
  getBestPractices: async (filters) => {
    const response = await api.get('/best-practices', { params: filters });
    return response.data;
  },
  
  getBestPractice: async (practiceId) => {
    const response = await api.get(`/best-practices/${practiceId}`);
    return response.data;
  },
  
  submitBestPractice: async (practiceData) => {
    const response = await api.post('/best-practices', practiceData);
    return response.data;
  },
  
  likeBestPractice: async (practiceId) => {
    const response = await api.post(`/best-practices/${practiceId}/like`);
    return response.data;
  },
  
  bookmarkBestPractice: async (practiceId) => {
    const response = await api.post(`/best-practices/${practiceId}/bookmark`);
    return response.data;
  },
  
  getBookmarkedPractices: async () => {
    const response = await api.get('/best-practices/bookmarked');
    return response.data;
  },
};

// Analytics API
export const analyticsAPI = {
  getDashboardStats: async () => {
  const response = await api.get('/api/analytics/dashboard');
    return response.data;
  },
  
  getCriteriaAnalysis: async () => {
    const response = await api.get('/analytics/criteria');
    return response.data;
  },
  
  getUsageStats: async (period) => {
    const response = await api.get(`/analytics/usage?period=${period}`);
    return response.data;
  },
};

// IBM Watson/Granite Integration API
export const ibmAPI = {
  // Pinecone search for RAG (replacing Watson Discovery)
  searchKnowledgeBase: async (query, filters) => {
    const response = await api.post('/pinecone/query-text', {
      query,
      filters,
      topK: 10,
      includeMetadata: true,
    });
    return response.data;
  },
  
  // Granite LLM for content generation with your project ID
  generateWithGranite: async (prompt, context) => {
    const response = await api.post('/ibm/granite/generate', {
      prompt,
      context,
      model_id: 'ibm/granite-13b-chat-v2',
      project_id: '075535e4-fd4e-4071-b4c4-ace54af879f0',
      model_parameters: {
        max_new_tokens: 2000,
        temperature: 0.7,
        repetition_penalty: 1.1,
      },
    });
    return response.data;
  },
  
  // Watson NLP for document analysis with your instance
  analyzeText: async (text, features) => {
    const response = await api.post('/ibm/watson/analyze', {
      text,
      features: features || ['sentiment', 'keywords', 'entities'],
      instance_url: 'https://api.au-syd.natural-language-understanding.watson.cloud.ibm.com/instances/28b71227-a25e-4b52-bbb6-abb6c785c088',
      version: '2022-08-10',
    });
    return response.data;
  },
};

export default api;
