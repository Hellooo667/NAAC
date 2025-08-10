import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Send,
  SmartToy,
  Person,
  ContentCopy,
  ThumbUp,
  ThumbDown,
  Refresh,
  Clear,
  Help,
  Lightbulb,
  Description,
  School,
} from '@mui/icons-material';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your NAAC AI Assistant powered by IBM Granite. I can help you with NAAC accreditation processes, criteria guidance, SSR preparation, and best practices. How can I assist you today?",
      timestamp: new Date(),
      sources: [],
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "Help me understand Criterion 1 requirements",
    "What documents are needed for SSR?",
    "How to improve research publication metrics?",
    "Best practices for student support services",
    "NAAC grading system explanation",
    "How to prepare for peer team visit?",
  ];

  const suggestedTopics = [
    { icon: <School />, title: "Curriculum Planning", description: "Get guidance on curriculum design and implementation" },
    { icon: <Description />, title: "SSR Preparation", description: "Step-by-step help for Self-Study Report" },
    { icon: <Lightbulb />, title: "Best Practices", description: "Discover innovative institutional practices" },
    { icon: <Help />, title: "Criteria Clarification", description: "Understand specific NAAC criteria requirements" },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Use correct API base URL - same logic as api.js
      const getApiBaseUrl = () => {
        if (process.env.NODE_ENV === 'production') {
          return process.env.REACT_APP_API_BASE_URL_PRODUCTION || 'https://naac-0dgf.onrender.com';
        }
        return process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
      };

      const apiBaseUrl = getApiBaseUrl();
      console.log('🔗 Chat API URL:', `${apiBaseUrl}/api/chat/message`);

      // Generate session ID
      let sessionId = localStorage.getItem('naac-session-id');
      if (!sessionId) {
        sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('naac-session-id', sessionId);
      }

      const response = await fetch(`${apiBaseUrl}/api/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          message: currentInput,
        }),
      });

      console.log('📡 Chat API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('📡 Chat API Error Response:', errorText);
        throw new Error(`API call failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('📡 Chat API Response Data:', data);
      
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: data.response || 'I received your message but encountered an issue generating a response.',
        timestamp: new Date(),
        sources: data.sources || [],
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('❌ Chat API Error:', error);
      
      // Show explicit error instead of fallback
      const errorResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: `❌ I'm having trouble connecting to my knowledge base right now. Error: ${error.message}. Please try again in a moment.`,
        timestamp: new Date(),
        sources: [],
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  const handleClearChat = () => {
    setMessages([messages[0]]); // Keep the initial greeting
  };

  const MessageBubble = ({ message }) => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      <Box sx={{ display: 'flex', maxWidth: '80%', alignItems: 'flex-start' }}>
        {message.type === 'bot' && (
          <Avatar sx={{ bgcolor: 'primary.main', mr: 1, mt: 0.5 }}>
            <SmartToy />
          </Avatar>
        )}
        
        <Paper
          sx={{
            p: 2,
            bgcolor: message.type === 'user' ? 'primary.main' : 'grey.100',
            color: message.type === 'user' ? 'white' : 'text.primary',
            borderRadius: 2,
            maxWidth: '100%',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-wrap',
              '& strong': { fontWeight: 'bold' },
              '& **': { fontWeight: 'bold' },
            }}
          >
            {message.content}
          </Typography>
          
          {message.sources && message.sources.length > 0 && (
            <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                Sources:
              </Typography>
              {message.sources.map((source, index) => (
                <Chip
                  key={index}
                  label={source}
                  size="small"
                  variant="outlined"
                  sx={{ mr: 0.5, mb: 0.5, fontSize: '0.7rem' }}
                />
              ))}
            </Box>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {message.timestamp.toLocaleTimeString()}
            </Typography>
            {message.type === 'bot' && (
              <Box>
                <Tooltip title="Copy message">
                  <IconButton size="small" onClick={() => handleCopyMessage(message.content)}>
                    <ContentCopy fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Helpful">
                  <IconButton size="small">
                    <ThumbUp fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Not helpful">
                  <IconButton size="small">
                    <ThumbDown fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
        </Paper>
        
        {message.type === 'user' && (
          <Avatar sx={{ bgcolor: 'secondary.main', ml: 1, mt: 0.5 }}>
            <Person />
          </Avatar>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        NAAC AI Assistant
      </Typography>

      <Grid container spacing={3}>
        {/* Chat Area */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
            {/* Chat Header */}
            <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.12)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    <SmartToy />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">NAAC AI Assistant</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Powered by IBM Granite • Always learning
                    </Typography>
                  </Box>
                </Box>
                <Tooltip title="Clear chat">
                  <IconButton onClick={handleClearChat}>
                    <Clear />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Messages Area */}
            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              
              {isTyping && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                    <SmartToy />
                  </Avatar>
                  <Paper sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CircularProgress size={16} sx={{ mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        AI is thinking...
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              )}
              <div ref={messagesEndRef} />
            </Box>

            {/* Input Area */}
            <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.12)' }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  placeholder="Ask me anything about NAAC accreditation..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  sx={{ minWidth: '64px' }}
                >
                  <Send />
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Quick Questions */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Questions
              </Typography>
              <List dense>
                {quickQuestions.map((question, index) => (
                  <ListItem
                    key={index}
                    button
                    onClick={() => handleQuickQuestion(question)}
                    sx={{ borderRadius: 1, mb: 0.5 }}
                  >
                    <ListItemText
                      primary={question}
                      primaryTypographyProps={{ fontSize: '0.9rem' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Suggested Topics */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Suggested Topics
              </Typography>
              {suggestedTopics.map((topic, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 2,
                    mb: 1,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                  onClick={() => handleQuickQuestion(`Tell me about ${topic.title.toLowerCase()}`)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {topic.icon}
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                      {topic.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {topic.description}
                  </Typography>
                </Paper>
              ))}
            </CardContent>
          </Card>

          {/* AI Info */}
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Powered by IBM Granite</strong><br />
              This AI assistant uses retrieval-augmented generation (RAG) to provide accurate, 
              context-aware responses based on NAAC guidelines and institutional best practices.
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatInterface;
