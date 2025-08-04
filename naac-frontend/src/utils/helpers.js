// Date formatting utilities
export const formatDate = (date, format = 'short') => {
  const dateObj = new Date(date);
  
  const options = {
    short: { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    },
    long: { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    },
    time: {
      hour: '2-digit',
      minute: '2-digit'
    }
  };
  
  return dateObj.toLocaleDateString('en-US', options[format]);
};

// File size formatting
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Progress percentage calculation
export const calculateProgress = (completed, total) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

// Color utilities for status indicators
export const getStatusColor = (status) => {
  const statusColors = {
    completed: '#4caf50',
    'in-progress': '#ff9800',
    pending: '#2196f3',
    'needs-attention': '#f44336',
    approved: '#4caf50',
    rejected: '#f44336',
    draft: '#9e9e9e',
    published: '#4caf50',
  };
  
  return statusColors[status] || '#757575';
};

// Criterion mapping utilities
export const getCriterionTitle = (criterionNumber) => {
  const criterionTitles = {
    1: 'Curricular Aspects',
    2: 'Teaching-Learning and Evaluation',
    3: 'Research, Innovations and Extension',
    4: 'Infrastructure and Learning Resources',
    5: 'Student Support and Progression',
    6: 'Governance, Leadership and Management',
    7: 'Institutional Values and Best Practices',
  };
  
  return criterionTitles[criterionNumber] || 'Unknown Criterion';
};

export const getCriterionDescription = (criterionNumber) => {
  const descriptions = {
    1: 'Planning and implementation of curriculum, academic flexibility, and feedback systems',
    2: 'Student enrollment, teacher quality, teaching-learning process, and evaluation methods',
    3: 'Resource mobilization, innovation ecosystem, research publications, and extension activities',
    4: 'Physical facilities, library resources, IT infrastructure, and maintenance',
    5: 'Student support services, progression tracking, activities, and alumni engagement',
    6: 'Institutional vision, strategy development, faculty empowerment, and quality assurance',
    7: 'Institutional values, social responsibilities, best practices, and distinctiveness',
  };
  
  return descriptions[criterionNumber] || 'Criterion description not available';
};

// Text processing utilities
export const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const highlightSearchTerms = (text, searchTerm) => {
  if (!searchTerm || !text) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

// Array utilities
export const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
    return result;
  }, {});
};

export const sortBy = (array, key, direction = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (direction === 'desc') {
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
    }
    return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
  });
};

// Validation utilities
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file, maxSizeInMB) => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

// Local storage utilities
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

// URL utilities
export const generateShareableLink = (type, id) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/share/${type}/${id}`;
};

export const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// NAAC specific utilities
export const calculateNAACGrade = (score) => {
  if (score >= 3.51) return { grade: 'A++', description: 'Outstanding' };
  if (score >= 3.26) return { grade: 'A+', description: 'Excellent' };
  if (score >= 3.01) return { grade: 'A', description: 'Very Good' };
  if (score >= 2.76) return { grade: 'B++', description: 'Good' };
  if (score >= 2.51) return { grade: 'B+', description: 'Above Average' };
  if (score >= 2.01) return { grade: 'B', description: 'Average' };
  if (score >= 1.51) return { grade: 'C', description: 'Below Average' };
  return { grade: 'D', description: 'Poor' };
};

export const getAccreditationStatus = (grade) => {
  const validGrades = ['A++', 'A+', 'A', 'B++', 'B+', 'B'];
  return validGrades.includes(grade) ? 'Accredited' : 'Not Accredited';
};

// Error handling utilities
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    return {
      message: data.message || `Server error: ${status}`,
      status,
      type: 'server_error',
    };
  } else if (error.request) {
    // Network error
    return {
      message: 'Network error. Please check your connection.',
      type: 'network_error',
    };
  } else {
    // Other error
    return {
      message: error.message || 'An unexpected error occurred',
      type: 'unknown_error',
    };
  }
};

// Analytics utilities
export const trackEvent = (eventName, properties = {}) => {
  // This would integrate with analytics service like Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
  
  // Log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, properties);
  }
};

export const generateReportId = () => {
  return `NAAC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Export all utilities as default
const utils = {
  formatDate,
  formatFileSize,
  calculateProgress,
  getStatusColor,
  getCriterionTitle,
  getCriterionDescription,
  truncateText,
  highlightSearchTerms,
  groupBy,
  sortBy,
  validateEmail,
  validateRequired,
  validateFileType,
  validateFileSize,
  storage,
  generateShareableLink,
  downloadBlob,
  calculateNAACGrade,
  getAccreditationStatus,
  handleApiError,
  trackEvent,
  generateReportId,
};

export default utils;
