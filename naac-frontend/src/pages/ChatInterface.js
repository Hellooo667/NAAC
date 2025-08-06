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
      content: "Hello! I'm your NAAC AI Assistant with comprehensive knowledge of NAAC accreditation processes. I can help you with criteria guidance, SSR preparation, best practices, and quality enhancement strategies. How can I assist you today?",
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
      // Use local response generation (removing problematic API calls)
      const botResponse = generateBotResponse(currentInput);
      
      // Simulate realistic AI response time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Response generation error:', error);
      
      // Fallback response
      const errorResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: `I apologize, but I encountered an issue while processing your question "${currentInput}". Please try rephrasing your question or ask about a specific NAAC criterion.`,
        timestamp: new Date(),
        sources: ['Error Handling System'],
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    // Enhanced keyword detection with more specific responses
    const keywordResponses = {
      // Criteria-specific responses
      'criterion 1': () => `**Criterion 1: Curricular Aspects**

Your query about "${userInput}" relates to curriculum planning and implementation. Here's what you need to know:

**Key Sub-criteria:**
1.1 Curricular Planning and Implementation
1.2 Academic Flexibility  
1.3 Curriculum Enrichment
1.4 Feedback System

**Documents Required:**
- Academic calendar with CIE schedule
- Curriculum committee meeting minutes
- Feedback analysis reports
- Course outcome mapping

Need specific guidance on any sub-criterion?`,

      'criterion 2': () => `**Criterion 2: Teaching-Learning and Evaluation**

Based on your question "${userInput}", here's guidance on teaching-learning processes:

**Key Areas:**
2.1 Student Enrollment and Profile
2.2 Catering to Student Diversity
2.3 Teaching-Learning Process
2.4 Teacher Profile and Quality
2.5 Evaluation Process and Reforms
2.6 Student Performance and Learning Outcomes

**Focus Points:**
- Student-centric methods
- ICT-enabled learning
- Continuous assessment
- Learning outcome measurement`,

      'criterion 3': () => `**Criterion 3: Research, Innovations and Extension**

Your inquiry about "${userInput}" involves research and innovation aspects:

**Sub-criteria Coverage:**
3.1 Resource Mobilization for Research
3.2 Innovation Ecosystem
3.3 Research Publications and Awards
3.4 Extension Activities
3.5 Collaboration

**Key Metrics:**
- Research projects and funding
- Publications in peer-reviewed journals
- Patents and innovations
- Community engagement programs`,

      'criterion 4': () => `**Criterion 4: Infrastructure and Learning Resources**

Regarding "${userInput}" and infrastructure requirements:

**Essential Components:**
4.1 Physical Facilities
4.2 Library as a Learning Resource
4.3 IT Infrastructure
4.4 Maintenance of Campus Facilities

**Documentation Needed:**
- Infrastructure utilization reports
- Library resource analysis
- IT infrastructure audit
- Maintenance schedules and records`,

      'criterion 5': () => `**Criterion 5: Student Support and Progression**

Your question "${userInput}" relates to student welfare and progression:

**Key Focus Areas:**
5.1 Student Support
5.2 Student Progression
5.3 Student Participation and Activities
5.4 Alumni Engagement

**Support Systems:**
- Scholarships and financial aid
- Mentoring and counseling
- Career guidance and placement
- Alumni network engagement`,

      'criterion 6': () => `**Criterion 6: Governance, Leadership and Management**

Addressing "${userInput}" in context of institutional governance:

**Core Elements:**
6.1 Institutional Vision and Leadership
6.2 Strategy Development and Deployment
6.3 Faculty Empowerment Strategies
6.4 Financial Management and Resource Mobilization
6.5 Internal Quality Assurance System

**Key Documents:**
- Strategic plans and policies
- Financial audits and budgets
- IQAC meeting minutes
- Quality enhancement initiatives`,

      'criterion 7': () => `**Criterion 7: Institutional Values and Best Practices**

Your query "${userInput}" concerns institutional values:

**Sub-criteria:**
7.1 Institutional Values and Social Responsibilities
7.2 Best Practices
7.3 Institutional Distinctiveness

**Focus Areas:**
- Environmental consciousness
- Social responsibility initiatives
- Innovative practices
- Unique institutional features`,

      // SSR and Documentation
      'ssr': () => `**SSR Preparation for: "${userInput}"**

**Timeline Recommendations:**
- Start 12 months before submission
- Data collection: 6 months
- Writing phase: 4 months
- Review and finalization: 2 months

**Essential Components:**
📋 Executive Summary
📊 Profile of the Institution
📈 Criterion-wise Analysis (1-7)
📎 Supporting Documents
📸 Photographs and Evidence

**Quality Tips:**
- Use quantitative data with trends
- Include stakeholder feedback
- Highlight innovations and best practices
- Ensure document authenticity`,

      // Grading and Assessment
      'grade': () => `**NAAC Grading System for "${userInput}"**

**Grade Classifications:**
- A++ (CGPA 3.51-4.00): Accredited
- A+ (CGPA 3.26-3.50): Accredited  
- A (CGPA 3.01-3.25): Accredited
- B++ (CGPA 2.76-3.00): Accredited
- B+ (CGPA 2.51-2.75): Accredited
- B (CGPA 2.01-2.50): Accredited
- C (CGPA 1.51-2.00): Accredited

**CGPA Calculation:**
Based on 7 criteria with specific weightages
Quality Indicator (QI) wise assessment
Peer team evaluation and institutional presentation`,

      // Research and Publications
      'research': () => `**Research Guidance for "${userInput}"**

**Key Research Metrics:**
📊 Faculty publications in peer-reviewed journals
🏆 Research awards and recognitions
💰 Research funding and grants
🔬 Research facilities and infrastructure
🤝 Industry collaborations

**Enhancement Strategies:**
- Establish research committees
- Create seed money for research
- Encourage interdisciplinary research
- Develop industry partnerships
- Support faculty for research degrees`,

      // Teaching and Learning
      'teaching': () => `**Teaching-Learning Enhancement for "${userInput}"**

**Modern Approaches:**
👨‍🏫 Student-centric pedagogy
💻 ICT-enabled learning
🎯 Outcome-based education
📝 Continuous assessment
🔄 Feedback implementation

**Quality Indicators:**
- Student-teacher ratio
- Use of technology in teaching
- Learning outcome measurement
- Student progression rates
- Employer feedback on graduates`,

      // Infrastructure
      'infrastructure': () => `**Infrastructure Analysis for "${userInput}"**

**Assessment Areas:**
🏢 Classroom and laboratory facilities
📚 Library resources and services
💻 IT infrastructure and connectivity
🏃‍♂️ Sports and recreational facilities
♿ Accessibility features

**Quality Parameters:**
- Space utilization efficiency
- Equipment and resource adequacy
- Maintenance and upkeep standards
- Safety and security measures
- Environmental sustainability`,

      // Best Practices
      'best practice': () => `**Best Practices Related to "${userInput}"**

**Identification Criteria:**
✨ Innovation and uniqueness
📈 Measurable outcomes
🔄 Sustainability and continuity
📊 Evidence-based impact
🌟 Replicability potential

**Documentation Requirements:**
- Clear objectives and context
- Implementation methodology
- Resource requirements
- Impact assessment data
- Lessons learned and challenges`,

      // Default enhanced response
      'default': () => {
        const responses = [
          `I understand you're asking about "${userInput}". Let me provide specific guidance on this NAAC-related topic.

**Relevant Areas:**
- Institutional quality enhancement
- Accreditation process guidance
- Best practice implementation
- Documentation requirements

**How I Can Help:**
- Criterion-specific guidance (1-7)
- SSR preparation assistance
- Quality indicator improvement
- Peer team visit preparation

Please specify which criterion or aspect you'd like me to focus on for a more detailed response.`,

          `Thank you for your question about "${userInput}". This relates to important aspects of NAAC accreditation.

**Key Considerations:**
- Quality assurance mechanisms
- Stakeholder satisfaction
- Continuous improvement processes
- Evidence-based documentation

**Available Support:**
- Detailed criterion analysis
- Document preparation guidance
- Best practice identification
- Quality enhancement strategies

Would you like me to elaborate on any specific criterion or process?`,

          `Your inquiry "${userInput}" touches on crucial NAAC accreditation elements.

**Focus Areas:**
- Institutional effectiveness
- Quality culture development
- Systematic improvements
- Outcome measurement

**Guidance Available:**
- Step-by-step processes
- Template and format assistance
- Quality indicator explanations
- Assessment preparation tips

Please let me know which specific area you'd like detailed information about.`
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
      }
    };

    // Enhanced keyword matching
    let responseGenerator = keywordResponses['default'];
    
    if (lowerInput.includes('criterion 1') || lowerInput.includes('curricular')) {
      responseGenerator = keywordResponses['criterion 1'];
    } else if (lowerInput.includes('criterion 2') || lowerInput.includes('teaching') || lowerInput.includes('learning')) {
      responseGenerator = keywordResponses['criterion 2'];
    } else if (lowerInput.includes('criterion 3') || lowerInput.includes('research')) {
      responseGenerator = keywordResponses['criterion 3'];
    } else if (lowerInput.includes('criterion 4') || lowerInput.includes('infrastructure')) {
      responseGenerator = keywordResponses['criterion 4'];
    } else if (lowerInput.includes('criterion 5') || lowerInput.includes('student support')) {
      responseGenerator = keywordResponses['criterion 5'];
    } else if (lowerInput.includes('criterion 6') || lowerInput.includes('governance')) {
      responseGenerator = keywordResponses['criterion 6'];
    } else if (lowerInput.includes('criterion 7') || lowerInput.includes('best practice')) {
      responseGenerator = keywordResponses['criterion 7'];
    } else if (lowerInput.includes('ssr') || lowerInput.includes('self-study') || lowerInput.includes('document')) {
      responseGenerator = keywordResponses['ssr'];
    } else if (lowerInput.includes('grade') || lowerInput.includes('cgpa') || lowerInput.includes('score')) {
      responseGenerator = keywordResponses['grade'];
    } else if (lowerInput.includes('research') || lowerInput.includes('publication')) {
      responseGenerator = keywordResponses['research'];
    } else if (lowerInput.includes('teaching') || lowerInput.includes('pedagogy')) {
      responseGenerator = keywordResponses['teaching'];
    } else if (lowerInput.includes('infrastructure') || lowerInput.includes('facility')) {
      responseGenerator = keywordResponses['infrastructure'];
    } else if (lowerInput.includes('best practice') || lowerInput.includes('innovation')) {
      responseGenerator = keywordResponses['best practice'];
    }

    // Generate contextual sources based on the response type
    let sources = ['NAAC Assessment Framework', 'Quality Guidelines'];
    
    if (lowerInput.includes('criterion')) {
      sources = ['NAAC Manual for Universities (2020)', 'Assessment Guidelines', 'Quality Indicators'];
    } else if (lowerInput.includes('ssr')) {
      sources = ['NAAC SSR Guidelines 2020', 'Data Template Documentation', 'Best Practices Database'];
    } else if (lowerInput.includes('research')) {
      sources = ['Research Assessment Framework', 'Publication Guidelines', 'Innovation Database'];
    }

    return {
      id: Date.now() + 1,
      type: 'bot',
      content: responseGenerator(),
      timestamp: new Date(),
      sources: sources,
    };
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
                      Comprehensive NAAC Guidance • Knowledge-Based
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
          <Alert severity="success">
            <Typography variant="body2">
              <strong>Local NAAC Knowledge Base</strong><br />
              This AI assistant provides comprehensive guidance based on NAAC guidelines, 
              assessment frameworks, and institutional best practices. All responses are 
              generated from curated NAAC documentation.
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatInterface;
