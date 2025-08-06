import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Chip,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ExpandMore,
  Lightbulb,
  CheckCircle,
  Warning,
  Info,
  Help,
  SaveAlt,
  Share,
  Refresh,
} from '@mui/icons-material';

const CriteriaInputs = () => {
  const [selectedCriterion, setSelectedCriterion] = useState('1');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSubCriterion, setSelectedSubCriterion] = useState(null);

  const criteriaData = {
    '1': {
      title: 'Curricular Aspects',
      description: 'Planning and implementation of curriculum, academic flexibility, and feedback systems',
      subCriteria: [
        {
          id: '1.1',
          title: 'Curricular Planning and Implementation',
          keyIndicators: [
            'Institution ensures effective curriculum planning and delivery through a well-planned development process',
            'The institution adheres to the academic calendar for the conduct of CIE',
          ],
          suggestions: [
            'Develop a comprehensive curriculum committee with industry experts',
            'Implement outcome-based education (OBE) framework',
            'Regular curriculum review and update mechanisms',
            'Integration of emerging technologies and industry requirements',
          ],
          evidenceRequired: [
            'Minutes of curriculum committee meetings',
            'Academic calendar with CIE schedule',
            'Course outcome mapping documents',
            'Industry expert feedback reports',
          ],
          status: 'good',
          completionPercentage: 85,
        },
        {
          id: '1.2',
          title: 'Academic Flexibility',
          keyIndicators: [
            'Institution offers programmes with multiple entry and exit options',
            'Institution offers interdisciplinary programmes',
          ],
          suggestions: [
            'Implement choice-based credit system (CBCS)',
            'Develop interdisciplinary courses and programs',
            'Create flexible academic pathways for students',
            'Establish credit transfer mechanisms',
          ],
          evidenceRequired: [
            'CBCS implementation documents',
            'List of interdisciplinary programs',
            'Student academic pathway records',
            'Credit transfer policy documents',
          ],
          status: 'moderate',
          completionPercentage: 65,
        },
        {
          id: '1.3',
          title: 'Curriculum Enrichment',
          keyIndicators: [
            'Institution integrates crosscutting issues relevant to Professional Ethics, Gender, Human Values, Environment and Sustainability in transacting the curriculum',
            'Value-added courses in relevant areas',
          ],
          suggestions: [
            'Integrate crosscutting issues in curriculum design',
            'Develop value-added courses for skill enhancement',
            'Include professional ethics and human values components',
            'Promote environmental sustainability awareness',
          ],
          evidenceRequired: [
            'Curriculum with crosscutting issues integration',
            'List of value-added courses offered',
            'Course materials on ethics and values',
            'Sustainability initiatives documentation',
          ],
          status: 'needs-attention',
          completionPercentage: 40,
        },
        {
          id: '1.4',
          title: 'Feedback System',
          keyIndicators: [
            'Institution obtains feedback on the curriculum from students, teachers, employers and alumni',
            'Feedback is analyzed and action taken',
          ],
          suggestions: [
            'Establish systematic feedback collection mechanism',
            'Implement online feedback systems for all stakeholders',
            'Create feedback analysis and action plan processes',
            'Regular stakeholder meetings for curriculum improvement',
          ],
          evidenceRequired: [
            'Feedback collection forms and online systems',
            'Feedback analysis reports',
            'Action taken reports based on feedback',
            'Stakeholder meeting minutes',
          ],
          status: 'good',
          completionPercentage: 80,
        },
      ],
    },
    '2': {
      title: 'Teaching-Learning and Evaluation',
      description: 'Student enrollment, teacher quality, teaching-learning process, and evaluation methods',
      subCriteria: [
        {
          id: '2.1',
          title: 'Student Enrollment and Profile',
          keyIndicators: [
            'Demand ratio for admissions',
            'Percentage of seats filled against reserved categories',
          ],
          suggestions: [
            'Implement transparent admission process',
            'Enhance institutional visibility and branding',
            'Create targeted outreach programs',
            'Develop merit-based scholarship programs',
          ],
          evidenceRequired: [
            'Admission statistics and demand ratio data',
            'Reserved category admission records',
            'Outreach program documentation',
            'Scholarship disbursement records',
          ],
          status: 'good',
          completionPercentage: 90,
        },
        // Add more sub-criteria as needed
      ],
    },
    // Add more criteria as needed
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return '#4caf50';
      case 'moderate':
        return '#ff9800';
      case 'needs-attention':
        return '#f44336';
      default:
        return '#2196f3';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good':
        return <CheckCircle sx={{ color: '#4caf50' }} />;
      case 'moderate':
        return <Warning sx={{ color: '#ff9800' }} />;
      case 'needs-attention':
        return <Warning sx={{ color: '#f44336' }} />;
      default:
        return <Info sx={{ color: '#2196f3' }} />;
    }
  };

  const handleSubCriterionDetails = (subCriterion) => {
    setSelectedSubCriterion(subCriterion);
    setDialogOpen(true);
  };

  const handleGenerateInputs = (subCriterionId) => {
    // Simulate AI-powered input generation
    alert(`Generating AI-powered inputs for ${subCriterionId}...`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Criteria-wise Inputs & Guidance
      </Typography>

      <Grid container spacing={3}>
        {/* Criteria Selection */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                NAAC Criteria
              </Typography>
              <List>
                {Object.entries(criteriaData).map(([key, criterion]) => (
                  <ListItem
                    key={key}
                    button
                    selected={selectedCriterion === key}
                    onClick={() => setSelectedCriterion(key)}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&.Mui-selected': {
                        backgroundColor: 'primary.light',
                        color: 'primary.contrastText',
                      },
                    }}
                  >
                    <ListItemText
                      primary={`Criterion ${key}`}
                      secondary={criterion.title}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Criteria Details */}
        <Grid item xs={12} md={9}>
          {criteriaData[selectedCriterion] && (
            <Box>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Criterion {selectedCriterion}: {criteriaData[selectedCriterion].title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {criteriaData[selectedCriterion].description}
                  </Typography>
                  <Alert severity="info" icon={<Lightbulb />}>
                    Click on any sub-criterion below to get AI-powered suggestions and detailed guidance
                  </Alert>
                </CardContent>
              </Card>

              {/* Sub-Criteria Accordions */}
              {criteriaData[selectedCriterion].subCriteria.map((subCriterion) => (
                <Accordion key={subCriterion.id} sx={{ mb: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">
                          {subCriterion.id} - {subCriterion.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          {getStatusIcon(subCriterion.status)}
                          <Chip
                            label={`${subCriterion.completionPercentage}% Complete`}
                            size="small"
                            sx={{
                              ml: 1,
                              backgroundColor: getStatusColor(subCriterion.status),
                              color: 'white',
                            }}
                          />
                        </Box>
                      </Box>
                      <Tooltip title="Get detailed guidance">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubCriterionDetails(subCriterion);
                          }}
                        >
                          <Help />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                          Key Indicators
                        </Typography>
                        <List dense>
                          {subCriterion.keyIndicators.map((indicator, index) => (
                            <ListItem key={index} sx={{ px: 0 }}>
                              <ListItemIcon>
                                <CheckCircle fontSize="small" color="primary" />
                              </ListItemIcon>
                              <ListItemText
                                primary={indicator}
                                primaryTypographyProps={{ fontSize: '0.9rem' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                          AI Suggestions
                        </Typography>
                        <List dense>
                          {subCriterion.suggestions.map((suggestion, index) => (
                            <ListItem key={index} sx={{ px: 0 }}>
                              <ListItemIcon>
                                <Lightbulb fontSize="small" color="warning" />
                              </ListItemIcon>
                              <ListItemText
                                primary={suggestion}
                                primaryTypographyProps={{ fontSize: '0.9rem' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleGenerateInputs(subCriterion.id)}
                          startIcon={<Refresh />}
                          sx={{ mt: 2 }}
                        >
                          Generate More Inputs
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Detailed Sub-Criterion Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedSubCriterion && `${selectedSubCriterion.id} - ${selectedSubCriterion.title}`}
        </DialogTitle>
        <DialogContent>
          {selectedSubCriterion && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Evidence Required
              </Typography>
              <List>
                {selectedSubCriterion.evidenceRequired.map((evidence, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={evidence} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Additional Notes
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Add your notes and specific institutional context here..."
                variant="outlined"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
          <Button variant="contained" startIcon={<SaveAlt />}>
            Save Notes
          </Button>
          <Button variant="outlined" startIcon={<Share />}>
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CriteriaInputs;
