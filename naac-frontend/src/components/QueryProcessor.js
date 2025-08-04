import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Chip,
  Alert,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  CircularProgress,
  Fade,
} from '@mui/material';
import {
  Send,
  SmartToy,
  Person,
  ThumbUp,
  ThumbDown,
  ContentCopy,
  Download,
  Share,
  MoreVert,
  AutoAwesome,
  Search,
  Quiz,
  Description,
} from '@mui/icons-material';
import { AILoadingIndicator, ChatMessageSkeleton } from './LoadingComponents';

const QueryProcessor = ({ onQueryComplete }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [queryType, setQueryType] = useState('general');
  const [contextMetadata, setContextMetadata] = useState(null);
  const [processingStage, setProcessingStage] = useState('');
  const [progress, setProgress] = useState(0);
  const messagesEndRef = useRef(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const queryTypes = [
    { value: 'general', label: 'General Query', icon: <Search />, color: 'primary' },
    { value: 'qlm', label: 'QlM Format', icon: <Quiz />, color: 'secondary' },
    { value: 'qnm', label: 'QnM Format', icon: <AutoAwesome />, color: 'success' },
    { value: 'ssr', label: 'SSR Draft', icon: <Description />, color: 'warning' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processQuery = async () => {
    if (!query.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: query,
      timestamp: new Date(),
      queryType,
    };

    setMessages(prev => [...prev, userMessage]);
    setProcessing(true);
    setProgress(0);
    
    try {
      // Step 1: Pinecone Semantic Search
      setProcessingStage('Performing semantic search in Pinecone vector database...');
      setProgress(20);
      
      const searchResponse = await fetch('/api/pinecone/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          query: query,
          queryType: queryType,
          topK: 10,
          includeMetadata: true,
          namespace: 'naac_documents',
        }),
      });
      
      if (!searchResponse.ok) throw new Error('Pinecone search failed');
      const searchResults = await searchResponse.json();
      
      // Step 2: Context Preparation
      setProcessingStage('Preparing context from retrieved vectors...');
      setProgress(40);
      
      const contextResponse = await fetch('/api/context/prepare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          searchResults: searchResults.matches, // Pinecone returns matches array
          queryType: queryType,
          maxTokens: 4000,
        }),
      });
      
      if (!contextResponse.ok) throw new Error('Context preparation failed');
      const contextData = await contextResponse.json();
      
      // Step 3: Prompt Building
      setProcessingStage('Building specialized prompt for IBM Granite LLM...');
      setProgress(60);
      
      const promptResponse = await fetch('/api/prompts/build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          query: query,
          context: contextData.processedContext,
          queryType: queryType,
          format: queryType === 'ssr' ? 'structured_report' : 'conversational',
        }),
      });
      
      if (!promptResponse.ok) throw new Error('Prompt building failed');
      const promptData = await promptResponse.json();
      
      // Step 4: IBM Granite LLM Generation
      setProcessingStage('Generating response using IBM Granite LLM...');
      setProgress(80);
      
      const generateResponse = await fetch('/api/llm/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          prompt: promptData.finalPrompt,
          model: 'ibm/granite-13b-chat-v2',
          parameters: {
            max_new_tokens: queryType === 'ssr' ? 2048 : 1024,
            temperature: 0.1,
            top_p: 0.9,
            repetition_penalty: 1.1,
          },
        }),
      });
      
      if (!generateResponse.ok) throw new Error('LLM generation failed');
      const generationData = await generateResponse.json();
      
      // Complete processing
      setProcessingStage('Finalizing response...');
      setProgress(100);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: generationData.generatedText,
        timestamp: new Date(),
        queryType,
        metadata: {
          sources: contextData.sources,
          confidence: generationData.confidence,
          processingTime: generationData.processingTime,
          tokenCount: generationData.tokenCount,
          criteria: contextData.criteriaRelevance,
        },
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setContextMetadata(aiMessage.metadata);
      
      if (onQueryComplete) {
        onQueryComplete({
          query: userMessage,
          response: aiMessage,
          metadata: aiMessage.metadata,
        });
      }
      
    } catch (error) {
      console.error('Query processing error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'error',
        content: `Sorry, I encountered an error: ${error.message}. Please try again or contact support if the issue persists.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setProcessing(false);
      setQuery('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      processQuery();
    }
  };

  const handleMessageAction = (action, message) => {
    switch (action) {
      case 'copy':
        navigator.clipboard.writeText(message.content);
        break;
      case 'like':
        // Track positive feedback
        fetch('/api/feedback/positive', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          },
          body: JSON.stringify({ messageId: message.id }),
        });
        break;
      case 'dislike':
        // Track negative feedback
        fetch('/api/feedback/negative', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          },
          body: JSON.stringify({ messageId: message.id }),
        });
        break;
      case 'export':
        const blob = new Blob([message.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `naac-response-${message.id}.txt`;
        a.click();
        break;
      default:
        break;
    }
    setMenuAnchor(null);
    setSelectedMessage(null);
  };

  const renderMessage = (message) => {
    const isUser = message.type === 'user';
    const isError = message.type === 'error';
    
    return (
      <Box
        key={message.id}
        sx={{
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            maxWidth: '80%',
            flexDirection: isUser ? 'row-reverse' : 'row',
          }}
        >
          <Avatar
            sx={{
              bgcolor: isUser ? 'primary.main' : isError ? 'error.main' : 'secondary.main',
              mx: 1,
              mt: 0.5,
            }}
          >
            {isUser ? <Person /> : <SmartToy />}
          </Avatar>
          
          <Paper
            elevation={2}
            sx={{
              p: 2,
              bgcolor: isUser
                ? 'primary.light'
                : isError
                ? 'error.light'
                : 'background.paper',
              color: isUser
                ? 'primary.contrastText'
                : isError
                ? 'error.contrastText'
                : 'text.primary',
            }}
          >
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {message.content}
            </Typography>
            
            {message.queryType && (
              <Chip
                label={queryTypes.find(t => t.value === message.queryType)?.label}
                size="small"
                sx={{ mt: 1, mr: 1 }}
                color={queryTypes.find(t => t.value === message.queryType)?.color}
              />
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {message.timestamp.toLocaleTimeString()}
              </Typography>
              
              {!isUser && message.type !== 'error' && (
                <Box>
                  <Tooltip title="Like response">
                    <IconButton
                      size="small"
                      onClick={() => handleMessageAction('like', message)}
                    >
                      <ThumbUp fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Dislike response">
                    <IconButton
                      size="small"
                      onClick={() => handleMessageAction('dislike', message)}
                    >
                      <ThumbDown fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Copy text">
                    <IconButton
                      size="small"
                      onClick={() => handleMessageAction('copy', message)}
                    >
                      <ContentCopy fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      setMenuAnchor(e.currentTarget);
                      setSelectedMessage(message);
                    }}
                  >
                    <MoreVert fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
            
            {message.metadata && (
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="caption">
                  Sources: {message.metadata.sources?.length || 0} documents • 
                  Confidence: {Math.round((message.metadata.confidence || 0) * 100)}% • 
                  Processing: {message.metadata.processingTime}ms
                </Typography>
                
                {message.metadata.criteria && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" display="block">
                      Relevant NAAC Criteria:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                      {Object.entries(message.metadata.criteria).map(([criterion, relevance]) => (
                        <Chip
                          key={criterion}
                          label={`${criterion} (${Math.round(relevance * 100)}%)`}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Alert>
            )}
          </Paper>
        </Box>
      </Box>
    );
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          AI Query Processor
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          Ask questions about your institutional data or request specific NAAC format outputs (QlM, QnM, SSR)
        </Alert>

        {/* Query Type Selection */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Query Type:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {queryTypes.map((type) => (
              <Chip
                key={type.value}
                icon={type.icon}
                label={type.label}
                clickable
                color={queryType === type.value ? type.color : 'default'}
                variant={queryType === type.value ? 'filled' : 'outlined'}
                onClick={() => setQueryType(type.value)}
              />
            ))}
          </Box>
        </Box>

        {/* Chat Messages */}
        <Box
          sx={{
            height: 400,
            overflowY: 'auto',
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            p: 2,
            mb: 2,
          }}
        >
          {messages.length === 0 && (
            <Box sx={{ textAlign: 'center', color: 'text.secondary', mt: 8 }}>
              <SmartToy sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6">Ready to help with NAAC queries</Typography>
              <Typography variant="body2">
                Ask me anything about your institutional data or request formatted outputs
              </Typography>
            </Box>
          )}
          
          {messages.map(renderMessage)}
          
          {processing && (
            <Fade in={processing}>
              <Box>
                <ChatMessageSkeleton />
                <AILoadingIndicator stage={processingStage} progress={progress} />
              </Box>
            </Fade>
          )}
          
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder={`Enter your ${queryTypes.find(t => t.value === queryType)?.label.toLowerCase()} here...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={processing}
          />
          <Button
            variant="contained"
            onClick={processQuery}
            disabled={processing || !query.trim()}
            startIcon={processing ? <CircularProgress size={20} /> : <Send />}
            sx={{ minWidth: 120 }}
          >
            {processing ? 'Processing' : 'Send'}
          </Button>
        </Box>

        {/* Action Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => setMenuAnchor(null)}
        >
          <MenuItem onClick={() => handleMessageAction('export', selectedMessage)}>
            <Download sx={{ mr: 1 }} />
            Export Response
          </MenuItem>
          <MenuItem onClick={() => handleMessageAction('share', selectedMessage)}>
            <Share sx={{ mr: 1 }} />
            Share Response
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default QueryProcessor;
