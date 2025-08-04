import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { storage } from '../utils/helpers';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  
  // Application state
  selectedCriterion: '1',
  criteriaProgress: {},
  dashboardStats: {},
  recentActivities: [],
  
  // UI state
  sidebarOpen: true,
  theme: 'light',
  notifications: [],
  
  // Chat state
  chatHistory: [],
  currentChatSession: null,
  
  // Document state
  documents: [],
  documentFilters: {
    category: 'all',
    criterion: 'all',
    status: 'all',
  },
  
  // Best practices state
  bestPractices: [],
  bookmarkedPractices: [],
  
  // SSR Generation state
  ssrGenerations: [],
  currentSSR: null,
};

// Action types
const actionTypes = {
  // Loading and error states
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  
  // Authentication
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  
  // Application data
  SET_SELECTED_CRITERION: 'SET_SELECTED_CRITERION',
  UPDATE_CRITERIA_PROGRESS: 'UPDATE_CRITERIA_PROGRESS',
  UPDATE_DASHBOARD_STATS: 'UPDATE_DASHBOARD_STATS',
  ADD_RECENT_ACTIVITY: 'ADD_RECENT_ACTIVITY',
  SET_RECENT_ACTIVITIES: 'SET_RECENT_ACTIVITIES',
  
  // UI state
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_SIDEBAR_OPEN: 'SET_SIDEBAR_OPEN',
  SET_THEME: 'SET_THEME',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  CLEAR_NOTIFICATIONS: 'CLEAR_NOTIFICATIONS',
  
  // Chat
  SET_CHAT_HISTORY: 'SET_CHAT_HISTORY',
  ADD_CHAT_MESSAGE: 'ADD_CHAT_MESSAGE',
  SET_CURRENT_CHAT_SESSION: 'SET_CURRENT_CHAT_SESSION',
  CLEAR_CHAT_HISTORY: 'CLEAR_CHAT_HISTORY',
  
  // Documents
  SET_DOCUMENTS: 'SET_DOCUMENTS',
  ADD_DOCUMENT: 'ADD_DOCUMENT',
  UPDATE_DOCUMENT: 'UPDATE_DOCUMENT',
  DELETE_DOCUMENT: 'DELETE_DOCUMENT',
  SET_DOCUMENT_FILTERS: 'SET_DOCUMENT_FILTERS',
  
  // Best Practices
  SET_BEST_PRACTICES: 'SET_BEST_PRACTICES',
  ADD_BEST_PRACTICE: 'ADD_BEST_PRACTICE',
  UPDATE_BEST_PRACTICE: 'UPDATE_BEST_PRACTICE',
  TOGGLE_BOOKMARK: 'TOGGLE_BOOKMARK',
  SET_BOOKMARKED_PRACTICES: 'SET_BOOKMARKED_PRACTICES',
  
  // SSR Generation
  SET_SSR_GENERATIONS: 'SET_SSR_GENERATIONS',
  ADD_SSR_GENERATION: 'ADD_SSR_GENERATION',
  SET_CURRENT_SSR: 'SET_CURRENT_SSR',
  UPDATE_SSR_GENERATION: 'UPDATE_SSR_GENERATION',
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
      
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
      
    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null };
      
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        error: null,
      };
      
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        chatHistory: [],
        currentChatSession: null,
      };
      
    case actionTypes.UPDATE_USER:
      return { ...state, user: { ...state.user, ...action.payload } };
      
    case actionTypes.SET_SELECTED_CRITERION:
      return { ...state, selectedCriterion: action.payload };
      
    case actionTypes.UPDATE_CRITERIA_PROGRESS:
      return {
        ...state,
        criteriaProgress: { ...state.criteriaProgress, ...action.payload },
      };
      
    case actionTypes.UPDATE_DASHBOARD_STATS:
      return { ...state, dashboardStats: { ...state.dashboardStats, ...action.payload } };
      
    case actionTypes.ADD_RECENT_ACTIVITY:
      return {
        ...state,
        recentActivities: [action.payload, ...state.recentActivities.slice(0, 9)],
      };
      
    case actionTypes.SET_RECENT_ACTIVITIES:
      return { ...state, recentActivities: action.payload };
      
    case actionTypes.TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen };
      
    case actionTypes.SET_SIDEBAR_OPEN:
      return { ...state, sidebarOpen: action.payload };
      
    case actionTypes.SET_THEME:
      return { ...state, theme: action.payload };
      
    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, { ...action.payload, id: Date.now() }],
      };
      
    case actionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };
      
    case actionTypes.CLEAR_NOTIFICATIONS:
      return { ...state, notifications: [] };
      
    case actionTypes.SET_CHAT_HISTORY:
      return { ...state, chatHistory: action.payload };
      
    case actionTypes.ADD_CHAT_MESSAGE:
      return {
        ...state,
        chatHistory: [...state.chatHistory, action.payload],
      };
      
    case actionTypes.SET_CURRENT_CHAT_SESSION:
      return { ...state, currentChatSession: action.payload };
      
    case actionTypes.CLEAR_CHAT_HISTORY:
      return { ...state, chatHistory: [], currentChatSession: null };
      
    case actionTypes.SET_DOCUMENTS:
      return { ...state, documents: action.payload };
      
    case actionTypes.ADD_DOCUMENT:
      return { ...state, documents: [action.payload, ...state.documents] };
      
    case actionTypes.UPDATE_DOCUMENT:
      return {
        ...state,
        documents: state.documents.map(doc =>
          doc.id === action.payload.id ? { ...doc, ...action.payload } : doc
        ),
      };
      
    case actionTypes.DELETE_DOCUMENT:
      return {
        ...state,
        documents: state.documents.filter(doc => doc.id !== action.payload),
      };
      
    case actionTypes.SET_DOCUMENT_FILTERS:
      return {
        ...state,
        documentFilters: { ...state.documentFilters, ...action.payload },
      };
      
    case actionTypes.SET_BEST_PRACTICES:
      return { ...state, bestPractices: action.payload };
      
    case actionTypes.ADD_BEST_PRACTICE:
      return { ...state, bestPractices: [action.payload, ...state.bestPractices] };
      
    case actionTypes.UPDATE_BEST_PRACTICE:
      return {
        ...state,
        bestPractices: state.bestPractices.map(practice =>
          practice.id === action.payload.id ? { ...practice, ...action.payload } : practice
        ),
      };
      
    case actionTypes.TOGGLE_BOOKMARK:
      const practiceId = action.payload;
      const isBookmarked = state.bookmarkedPractices.includes(practiceId);
      return {
        ...state,
        bookmarkedPractices: isBookmarked
          ? state.bookmarkedPractices.filter(id => id !== practiceId)
          : [...state.bookmarkedPractices, practiceId],
      };
      
    case actionTypes.SET_BOOKMARKED_PRACTICES:
      return { ...state, bookmarkedPractices: action.payload };
      
    case actionTypes.SET_SSR_GENERATIONS:
      return { ...state, ssrGenerations: action.payload };
      
    case actionTypes.ADD_SSR_GENERATION:
      return { ...state, ssrGenerations: [action.payload, ...state.ssrGenerations] };
      
    case actionTypes.SET_CURRENT_SSR:
      return { ...state, currentSSR: action.payload };
      
    case actionTypes.UPDATE_SSR_GENERATION:
      return {
        ...state,
        ssrGenerations: state.ssrGenerations.map(ssr =>
          ssr.id === action.payload.id ? { ...ssr, ...action.payload } : ssr
        ),
      };
      
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load persisted state on mount
  useEffect(() => {
    const persistedState = storage.get('appState', {});
    
    if (persistedState.sidebarOpen !== undefined) {
      dispatch({ type: actionTypes.SET_SIDEBAR_OPEN, payload: persistedState.sidebarOpen });
    }
    
    if (persistedState.theme) {
      dispatch({ type: actionTypes.SET_THEME, payload: persistedState.theme });
    }
    
    if (persistedState.selectedCriterion) {
      dispatch({ type: actionTypes.SET_SELECTED_CRITERION, payload: persistedState.selectedCriterion });
    }
    
    if (persistedState.bookmarkedPractices) {
      dispatch({ type: actionTypes.SET_BOOKMARKED_PRACTICES, payload: persistedState.bookmarkedPractices });
    }
    
    // Check for authentication token
    const token = storage.get('auth_token');
    const user = storage.get('user');
    if (token && user) {
      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: { user } });
    }
  }, []);

  // Persist certain state changes to localStorage
  useEffect(() => {
    const stateToPersist = {
      sidebarOpen: state.sidebarOpen,
      theme: state.theme,
      selectedCriterion: state.selectedCriterion,
      bookmarkedPractices: state.bookmarkedPractices,
    };
    storage.set('appState', stateToPersist);
  }, [state.sidebarOpen, state.theme, state.selectedCriterion, state.bookmarkedPractices]);

  // Action creators
  const actions = {
    // Loading and error
    setLoading: (loading) => dispatch({ type: actionTypes.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: actionTypes.SET_ERROR, payload: error }),
    clearError: () => dispatch({ type: actionTypes.CLEAR_ERROR }),
    
    // Authentication
    loginSuccess: (user) => {
      storage.set('user', user);
      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: { user } });
    },
    logout: () => {
      storage.remove('auth_token');
      storage.remove('user');
      dispatch({ type: actionTypes.LOGOUT });
    },
    updateUser: (userData) => {
      const updatedUser = { ...state.user, ...userData };
      storage.set('user', updatedUser);
      dispatch({ type: actionTypes.UPDATE_USER, payload: userData });
    },
    
    // Application data
    setSelectedCriterion: (criterion) => 
      dispatch({ type: actionTypes.SET_SELECTED_CRITERION, payload: criterion }),
    updateCriteriaProgress: (progress) => 
      dispatch({ type: actionTypes.UPDATE_CRITERIA_PROGRESS, payload: progress }),
    updateDashboardStats: (stats) => 
      dispatch({ type: actionTypes.UPDATE_DASHBOARD_STATS, payload: stats }),
    addRecentActivity: (activity) => 
      dispatch({ type: actionTypes.ADD_RECENT_ACTIVITY, payload: activity }),
    setRecentActivities: (activities) => 
      dispatch({ type: actionTypes.SET_RECENT_ACTIVITIES, payload: activities }),
    
    // UI state
    toggleSidebar: () => dispatch({ type: actionTypes.TOGGLE_SIDEBAR }),
    setSidebarOpen: (open) => dispatch({ type: actionTypes.SET_SIDEBAR_OPEN, payload: open }),
    setTheme: (theme) => dispatch({ type: actionTypes.SET_THEME, payload: theme }),
    addNotification: (notification) => 
      dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: notification }),
    removeNotification: (id) => 
      dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: id }),
    clearNotifications: () => dispatch({ type: actionTypes.CLEAR_NOTIFICATIONS }),
    
    // Chat
    setChatHistory: (history) => dispatch({ type: actionTypes.SET_CHAT_HISTORY, payload: history }),
    addChatMessage: (message) => dispatch({ type: actionTypes.ADD_CHAT_MESSAGE, payload: message }),
    setCurrentChatSession: (session) => 
      dispatch({ type: actionTypes.SET_CURRENT_CHAT_SESSION, payload: session }),
    clearChatHistory: () => dispatch({ type: actionTypes.CLEAR_CHAT_HISTORY }),
    
    // Documents
    setDocuments: (documents) => dispatch({ type: actionTypes.SET_DOCUMENTS, payload: documents }),
    addDocument: (document) => dispatch({ type: actionTypes.ADD_DOCUMENT, payload: document }),
    updateDocument: (document) => dispatch({ type: actionTypes.UPDATE_DOCUMENT, payload: document }),
    deleteDocument: (id) => dispatch({ type: actionTypes.DELETE_DOCUMENT, payload: id }),
    setDocumentFilters: (filters) => 
      dispatch({ type: actionTypes.SET_DOCUMENT_FILTERS, payload: filters }),
    
    // Best Practices
    setBestPractices: (practices) => 
      dispatch({ type: actionTypes.SET_BEST_PRACTICES, payload: practices }),
    addBestPractice: (practice) => 
      dispatch({ type: actionTypes.ADD_BEST_PRACTICE, payload: practice }),
    updateBestPractice: (practice) => 
      dispatch({ type: actionTypes.UPDATE_BEST_PRACTICE, payload: practice }),
    toggleBookmark: (practiceId) => 
      dispatch({ type: actionTypes.TOGGLE_BOOKMARK, payload: practiceId }),
    setBookmarkedPractices: (practices) => 
      dispatch({ type: actionTypes.SET_BOOKMARKED_PRACTICES, payload: practices }),
    
    // SSR Generation
    setSSRGenerations: (generations) => 
      dispatch({ type: actionTypes.SET_SSR_GENERATIONS, payload: generations }),
    addSSRGeneration: (generation) => 
      dispatch({ type: actionTypes.ADD_SSR_GENERATION, payload: generation }),
    setCurrentSSR: (ssr) => dispatch({ type: actionTypes.SET_CURRENT_SSR, payload: ssr }),
    updateSSRGeneration: (generation) => 
      dispatch({ type: actionTypes.UPDATE_SSR_GENERATION, payload: generation }),
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Export action types for testing
export { actionTypes };

export default AppContext;
