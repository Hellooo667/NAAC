import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  LinearProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  AutoAwesome,
  Download,
  Preview,
  CheckCircle,
  Schedule,
  Description,
} from '@mui/icons-material';

const SSRGenerator = () => {
  const [formData, setFormData] = useState({
    criterion: '',
    subCriterion: '',
    institutionType: '',
    additionalContext: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [progress, setProgress] = useState(0);

  const criteria = [
    { value: '1', label: 'Criterion 1: Curricular Aspects' },
    { value: '2', label: 'Criterion 2: Teaching-Learning and Evaluation' },
    { value: '3', label: 'Criterion 3: Research, Innovations and Extension' },
    { value: '4', label: 'Criterion 4: Infrastructure and Learning Resources' },
    { value: '5', label: 'Criterion 5: Student Support and Progression' },
    { value: '6', label: 'Criterion 6: Governance, Leadership and Management' },
    { value: '7', label: 'Criterion 7: Institutional Values and Best Practices' },
  ];

  const subCriteria = {
    '1': ['1.1 Curricular Planning and Implementation', '1.2 Academic Flexibility', '1.3 Curriculum Enrichment', '1.4 Feedback System'],
    '2': ['2.1 Student Enrollment and Profile', '2.2 Student Teacher Ratio', '2.3 Teaching- Learning Process', '2.4 Teacher Profile and Quality', '2.5 Evaluation Process and Reforms', '2.6 Student Performance and Learning Outcomes'],
    '3': ['3.1 Resource Mobilization for Research', '3.2 Innovation Ecosystem', '3.3 Research Publications and Awards', '3.4 Extension Activities', '3.5 Collaboration'],
    '4': ['4.1 Physical Facilities', '4.2 Library as a Learning Resource', '4.3 IT Infrastructure', '4.4 Maintenance of Campus Infrastructure'],
    '5': ['5.1 Student Support', '5.2 Student Progression', '5.3 Student Participation and Activities', '5.4 Alumni Engagement'],
    '6': ['6.1 Institutional Vision and Leadership', '6.2 Strategy Development and Deployment', '6.3 Faculty Empowerment Strategies', '6.4 Financial Management and Resource Mobilization', '6.5 Internal Quality Assurance System'],
    '7': ['7.1 Institutional Values and Social Responsibilities', '7.2 Best Practices', '7.3 Institutional Distinctiveness'],
  };

  const institutionTypes = [
    'Autonomous College',
    'Affiliated College',
    'University',
    'Deemed University',
    'Central University',
    'State University',
    'Private University',
  ];

  const recentGenerations = [
    { id: 1, title: 'Criterion 1.1 - Curricular Planning', date: '2024-01-15', status: 'completed' },
    { id: 2, title: 'Criterion 2.3 - Teaching Process', date: '2024-01-14', status: 'completed' },
    { id: 3, title: 'Criterion 3.1 - Research Resources', date: '2024-01-13', status: 'draft' },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerate = async () => {
    if (!formData.criterion || !formData.subCriterion) {
      alert('Please select criterion and sub-criterion');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setGeneratedContent('');

    // Simulate AI generation process
    const stages = [
      'Analyzing institutional data...',
      'Retrieving NAAC guidelines...',
      'Processing past reports...',
      'Generating content with IBM Granite...',
      'Formatting and structuring...',
      'Finalizing SSR draft...',
    ];

    for (let i = 0; i < stages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress((i + 1) * (100 / stages.length));
    }

    // Simulate generated content
    const mockContent = `
# ${formData.criterion} - ${formData.subCriterion}

## Overview
This section provides a comprehensive analysis of ${formData.subCriterion} based on institutional data and NAAC guidelines.

## Key Highlights
- Implementation of innovative teaching methodologies
- Integration of technology in curriculum delivery
- Regular curriculum updates based on industry requirements
- Comprehensive feedback mechanism from stakeholders

## Detailed Analysis
The institution has demonstrated excellence in ${formData.subCriterion} through various initiatives and programs. The analysis is based on:

1. **Data Collection**: Comprehensive data from institutional records
2. **Stakeholder Feedback**: Input from students, faculty, and employers
3. **Best Practice Integration**: Implementation of proven methodologies
4. **Continuous Improvement**: Regular monitoring and enhancement

## Supporting Documents
- Curriculum committee meeting minutes
- Course outcome assessment reports
- Student feedback analysis
- Industry interaction records

## Recommendations
Based on the analysis, the following recommendations are proposed for further improvement:
1. Enhanced industry collaboration
2. Digital resource integration
3. Faculty development programs
4. Student-centric learning approaches

*This content has been generated using IBM Granite AI with RAG-based retrieval from institutional data and NAAC guidelines.*
    `;

    setGeneratedContent(mockContent);
    setIsGenerating(false);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedContent], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `SSR_${formData.criterion}_${Date.now()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        SSR Generator
      </Typography>

      <Grid container spacing={3}>
        {/* Generation Form */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <AutoAwesome sx={{ mr: 1 }} />
                Generate SSR Content
              </Typography>

              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Criterion</InputLabel>
                    <Select
                      name="criterion"
                      value={formData.criterion}
                      onChange={handleInputChange}
                      label="Criterion"
                    >
                      {criteria.map((criterion) => (
                        <MenuItem key={criterion.value} value={criterion.value}>
                          {criterion.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth disabled={!formData.criterion}>
                    <InputLabel>Sub-Criterion</InputLabel>
                    <Select
                      name="subCriterion"
                      value={formData.subCriterion}
                      onChange={handleInputChange}
                      label="Sub-Criterion"
                    >
                      {formData.criterion && subCriteria[formData.criterion]?.map((sub, index) => (
                        <MenuItem key={index} value={sub}>
                          {sub}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Institution Type</InputLabel>
                    <Select
                      name="institutionType"
                      value={formData.institutionType}
                      onChange={handleInputChange}
                      label="Institution Type"
                    >
                      {institutionTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="additionalContext"
                    label="Additional Context (Optional)"
                    placeholder="Provide any specific context or requirements for the SSR generation..."
                    value={formData.additionalContext}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleGenerate}
                    disabled={isGenerating || !formData.criterion || !formData.subCriterion}
                    startIcon={<AutoAwesome />}
                    sx={{ mr: 2 }}
                  >
                    {isGenerating ? 'Generating...' : 'Generate SSR Content'}
                  </Button>
                  
                  {generatedContent && (
                    <>
                      <Button
                        variant="outlined"
                        onClick={handleDownload}
                        startIcon={<Download />}
                        sx={{ mr: 1 }}
                      >
                        Download
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Preview />}
                      >
                        Preview
                      </Button>
                    </>
                  )}
                </Grid>

                {isGenerating && (
                  <Grid item xs={12}>
                    <Box sx={{ mt: 2 }}>
                      <LinearProgress variant="determinate" value={progress} />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Generating content... {Math.round(progress)}%
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>

          {/* Generated Content */}
          {generatedContent && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Generated Content
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Content generated using IBM Granite AI with institutional data retrieval
                </Alert>
                <Paper
                  sx={{
                    p: 2,
                    maxHeight: '500px',
                    overflow: 'auto',
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>
                    {generatedContent}
                  </pre>
                </Paper>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Recent Generations */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Generations
              </Typography>
              <List>
                {recentGenerations.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        {item.status === 'completed' ? (
                          <CheckCircle sx={{ color: '#4caf50' }} />
                        ) : (
                          <Schedule sx={{ color: '#ff9800' }} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        secondary={item.date}
                      />
                    </ListItem>
                    {index < recentGenerations.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tips for Better Results
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Description fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Provide specific context"
                    secondary="Add institutional details for personalized content"
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Description fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Review and edit"
                    secondary="Always review generated content before submission"
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Description fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Use supporting documents"
                    secondary="Reference institutional data and evidence"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SSRGenerator;
