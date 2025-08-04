// NAAC Criteria Constants
export const NAAC_CRITERIA = {
  1: {
    title: 'Curricular Aspects',
    weightage: 150,
    subCriteria: [
      { id: '1.1', title: 'Curricular Planning and Implementation', weightage: 40 },
      { id: '1.2', title: 'Academic Flexibility', weightage: 30 },
      { id: '1.3', title: 'Curriculum Enrichment', weightage: 40 },
      { id: '1.4', title: 'Feedback System', weightage: 40 },
    ],
  },
  2: {
    title: 'Teaching-Learning and Evaluation',
    weightage: 350,
    subCriteria: [
      { id: '2.1', title: 'Student Enrollment and Profile', weightage: 50 },
      { id: '2.2', title: 'Student Teacher Ratio', weightage: 50 },
      { id: '2.3', title: 'Teaching- Learning Process', weightage: 50 },
      { id: '2.4', title: 'Teacher Profile and Quality', weightage: 100 },
      { id: '2.5', title: 'Evaluation Process and Reforms', weightage: 50 },
      { id: '2.6', title: 'Student Performance and Learning Outcomes', weightage: 50 },
    ],
  },
  3: {
    title: 'Research, Innovations and Extension',
    weightage: 200,
    subCriteria: [
      { id: '3.1', title: 'Resource Mobilization for Research', weightage: 50 },
      { id: '3.2', title: 'Innovation Ecosystem', weightage: 30 },
      { id: '3.3', title: 'Research Publications and Awards', weightage: 70 },
      { id: '3.4', title: 'Extension Activities', weightage: 30 },
      { id: '3.5', title: 'Collaboration', weightage: 20 },
    ],
  },
  4: {
    title: 'Infrastructure and Learning Resources',
    weightage: 100,
    subCriteria: [
      { id: '4.1', title: 'Physical Facilities', weightage: 30 },
      { id: '4.2', title: 'Library as a Learning Resource', weightage: 20 },
      { id: '4.3', title: 'IT Infrastructure', weightage: 30 },
      { id: '4.4', title: 'Maintenance of Campus Infrastructure', weightage: 20 },
    ],
  },
  5: {
    title: 'Student Support and Progression',
    weightage: 100,
    subCriteria: [
      { id: '5.1', title: 'Student Support', weightage: 30 },
      { id: '5.2', title: 'Student Progression', weightage: 30 },
      { id: '5.3', title: 'Student Participation and Activities', weightage: 20 },
      { id: '5.4', title: 'Alumni Engagement', weightage: 20 },
    ],
  },
  6: {
    title: 'Governance, Leadership and Management',
    weightage: 50,
    subCriteria: [
      { id: '6.1', title: 'Institutional Vision and Leadership', weightage: 10 },
      { id: '6.2', title: 'Strategy Development and Deployment', weightage: 10 },
      { id: '6.3', title: 'Faculty Empowerment Strategies', weightage: 10 },
      { id: '6.4', title: 'Financial Management and Resource Mobilization', weightage: 10 },
      { id: '6.5', title: 'Internal Quality Assurance System', weightage: 10 },
    ],
  },
  7: {
    title: 'Institutional Values and Best Practices',
    weightage: 50,
    subCriteria: [
      { id: '7.1', title: 'Institutional Values and Social Responsibilities', weightage: 25 },
      { id: '7.2', title: 'Best Practices', weightage: 15 },
      { id: '7.3', title: 'Institutional Distinctiveness', weightage: 10 },
    ],
  },
};

// Institution Types
export const INSTITUTION_TYPES = [
  'Autonomous College',
  'Affiliated College',
  'University',
  'Deemed University',
  'Central University',
  'State University',
  'Private University',
  'Community College',
  'Technical Institute',
  'Professional College',
];

// Document Categories
export const DOCUMENT_CATEGORIES = {
  policies: {
    label: 'Policies & Procedures',
    description: 'Institutional policies, procedures, and governance documents',
    color: '#1976d2',
  },
  curricula: {
    label: 'Curricula Documents',
    description: 'Curriculum design, syllabi, and academic program documents',
    color: '#388e3c',
  },
  research: {
    label: 'Research Papers',
    description: 'Research publications, patents, and innovation documents',
    color: '#f57c00',
  },
  reports: {
    label: 'Reports & Analytics',
    description: 'Assessment reports, analytics, and performance documents',
    color: '#7b1fa2',
  },
  evidence: {
    label: 'Evidence Files',
    description: 'Supporting evidence, photos, videos, and proof documents',
    color: '#d32f2f',
  },
  templates: {
    label: 'Templates',
    description: 'Standard templates and formats for documentation',
    color: '#455a64',
  },
};

// File Types and Extensions
export const SUPPORTED_FILE_TYPES = {
  documents: {
    extensions: ['.pdf', '.doc', '.docx', '.txt', '.rtf'],
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/rtf',
    ],
    maxSize: 50, // MB
  },
  spreadsheets: {
    extensions: ['.xls', '.xlsx', '.csv'],
    mimeTypes: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ],
    maxSize: 25, // MB
  },
  presentations: {
    extensions: ['.ppt', '.pptx'],
    mimeTypes: [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ],
    maxSize: 100, // MB
  },
  images: {
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/webp',
    ],
    maxSize: 10, // MB
  },
  videos: {
    extensions: ['.mp4', '.avi', '.mov', '.wmv', '.flv'],
    mimeTypes: [
      'video/mp4',
      'video/x-msvideo',
      'video/quicktime',
      'video/x-ms-wmv',
      'video/x-flv',
    ],
    maxSize: 500, // MB
  },
};

// NAAC Grading Scale
export const NAAC_GRADING = {
  'A++': { range: [3.51, 4.0], description: 'Outstanding', color: '#2e7d32' },
  'A+': { range: [3.26, 3.50], description: 'Excellent', color: '#388e3c' },
  'A': { range: [3.01, 3.25], description: 'Very Good', color: '#43a047' },
  'B++': { range: [2.76, 3.00], description: 'Good', color: '#689f38' },
  'B+': { range: [2.51, 2.75], description: 'Above Average', color: '#827717' },
  'B': { range: [2.01, 2.50], description: 'Average', color: '#f57c00' },
  'C': { range: [1.51, 2.00], description: 'Below Average', color: '#ff9800' },
  'D': { range: [0.0, 1.50], description: 'Poor', color: '#f44336' },
};

// Status Types
export const STATUS_TYPES = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in-progress',
  PENDING: 'pending',
  NEEDS_ATTENTION: 'needs-attention',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  DRAFT: 'draft',
  PUBLISHED: 'published',
};

// Priority Levels
export const PRIORITY_LEVELS = {
  HIGH: { value: 'high', label: 'High Priority', color: '#f44336' },
  MEDIUM: { value: 'medium', label: 'Medium Priority', color: '#ff9800' },
  LOW: { value: 'low', label: 'Low Priority', color: '#4caf50' },
};

// API Endpoints
export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  SSR: '/ssr',
  CRITERIA: '/criteria',
  CHAT: '/chat',
  DOCUMENTS: '/documents',
  BEST_PRACTICES: '/best-practices',
  ANALYTICS: '/analytics',
  IBM: '/ibm',
  AUTH: '/auth',
  USERS: '/users',
};

// IBM Watson/Granite Configuration
export const IBM_CONFIG = {
  WATSON_DISCOVERY: {
    ENVIRONMENT_ID: process.env.REACT_APP_WATSON_ENVIRONMENT_ID,
    COLLECTION_ID: process.env.REACT_APP_WATSON_COLLECTION_ID,
  },
  GRANITE: {
    MODEL_ID: 'ibm/granite-13b-instruct-v2',
    MAX_TOKENS: 2000,
    TEMPERATURE: 0.7,
    TOP_P: 0.9,
    REPETITION_PENALTY: 1.1,
  },
  WATSON_NLP: {
    FEATURES: [
      'sentiment',
      'keywords',
      'entities',
      'concepts',
      'categories',
      'emotion',
    ],
  },
};

// Theme Constants
export const THEME_COLORS = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#dc004e',
    light: '#ff5983',
    dark: '#9a0036',
    contrastText: '#ffffff',
  },
  success: {
    main: '#4caf50',
    light: '#81c784',
    dark: '#388e3c',
  },
  warning: {
    main: '#ff9800',
    light: '#ffb74d',
    dark: '#f57c00',
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
  },
  info: {
    main: '#2196f3',
    light: '#64b5f6',
    dark: '#1976d2',
  },
};

// Animation Durations
export const ANIMATION_DURATIONS = {
  SHORT: 150,
  MEDIUM: 300,
  LONG: 500,
  EXTRA_LONG: 1000,
};

// Breakpoints
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

// Z-Index Layers
export const Z_INDEX = {
  DRAWER: 1200,
  APP_BAR: 1100,
  MODAL: 1300,
  SNACKBAR: 1400,
  TOOLTIP: 1500,
};

// Default Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100],
  MAX_VISIBLE_PAGES: 5,
};

// Regular Expressions
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  URL: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  NUMBERS_ONLY: /^\d+$/,
};

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM DD, YYYY',
  ISO: 'YYYY-MM-DD',
  DATETIME: 'MM/DD/YYYY HH:mm:ss',
  TIME: 'HH:mm:ss',
};

// Export all constants
export default {
  NAAC_CRITERIA,
  INSTITUTION_TYPES,
  DOCUMENT_CATEGORIES,
  SUPPORTED_FILE_TYPES,
  NAAC_GRADING,
  STATUS_TYPES,
  PRIORITY_LEVELS,
  API_ENDPOINTS,
  IBM_CONFIG,
  THEME_COLORS,
  ANIMATION_DURATIONS,
  BREAKPOINTS,
  Z_INDEX,
  PAGINATION,
  REGEX_PATTERNS,
  DATE_FORMATS,
};
