import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress,
  Paper,
  Divider,
} from '@mui/material';
import {
  CloudUpload,
  Description,
  PictureAsPdf,
  TableChart,
  Image,
  VideoLibrary,
  Folder,
  Download,
  Share,
  Delete,
  Edit,
  Search,
  FilterList,
  MoreVert,
  Visibility,
  Star,
  StarBorder,
} from '@mui/icons-material';

const DocumentLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const categories = [
    { value: 'all', label: 'All Documents', count: 45 },
    { value: 'policies', label: 'Policies & Procedures', count: 12 },
    { value: 'curricula', label: 'Curricula Documents', count: 8 },
    { value: 'research', label: 'Research Papers', count: 15 },
    { value: 'reports', label: 'Reports & Analytics', count: 6 },
    { value: 'evidence', label: 'Evidence Files', count: 18 },
    { value: 'templates', label: 'Templates', count: 5 },
  ];

  const documents = [
    {
      id: 1,
      name: 'NAAC Self Study Report Template 2024',
      type: 'pdf',
      size: '2.4 MB',
      category: 'templates',
      uploadDate: '2024-01-15',
      description: 'Official NAAC SSR template with all criterion sections',
      tags: ['SSR', 'Template', 'Official'],
      starred: true,
      criterion: 'All Criteria',
      status: 'approved',
    },
    {
      id: 2,
      name: 'Curriculum Committee Meeting Minutes - Jan 2024',
      type: 'doc',
      size: '856 KB',
      category: 'policies',
      uploadDate: '2024-01-12',
      description: 'Minutes from curriculum planning and review meeting',
      tags: ['Curriculum', 'Committee', 'Minutes'],
      starred: false,
      criterion: 'Criterion 1',
      status: 'approved',
    },
    {
      id: 3,
      name: 'Research Publication Analysis Report',
      type: 'excel',
      size: '1.2 MB',
      category: 'research',
      uploadDate: '2024-01-10',
      description: 'Analysis of faculty research publications for last 5 years',
      tags: ['Research', 'Publications', 'Analysis'],
      starred: true,
      criterion: 'Criterion 3',
      status: 'pending',
    },
    {
      id: 4,
      name: 'Student Feedback Analysis Dashboard',
      type: 'pdf',
      size: '3.1 MB',
      category: 'reports',
      uploadDate: '2024-01-08',
      description: 'Comprehensive analysis of student feedback across all programs',
      tags: ['Feedback', 'Students', 'Analysis'],
      starred: false,
      criterion: 'Criterion 1',
      status: 'approved',
    },
    {
      id: 5,
      name: 'Infrastructure Development Photos',
      type: 'image',
      size: '15.2 MB',
      category: 'evidence',
      uploadDate: '2024-01-05',
      description: 'Photo documentation of campus infrastructure improvements',
      tags: ['Infrastructure', 'Photos', 'Evidence'],
      starred: false,
      criterion: 'Criterion 4',
      status: 'approved',
    },
    {
      id: 6,
      name: 'Best Practices Implementation Video',
      type: 'video',
      size: '45.3 MB',
      category: 'evidence',
      uploadDate: '2024-01-03',
      description: 'Video documentation of innovative teaching practices',
      tags: ['Best Practices', 'Teaching', 'Video'],
      starred: true,
      criterion: 'Criterion 7',
      status: 'approved',
    },
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <PictureAsPdf color="error" />;
      case 'doc':
        return <Description color="primary" />;
      case 'excel':
        return <TableChart color="success" />;
      case 'image':
        return <Image color="info" />;
      case 'video':
        return <VideoLibrary color="secondary" />;
      default:
        return <Description />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleMenuClick = (event, document) => {
    setAnchorEl(event.currentTarget);
    setSelectedDocument(document);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDocument(null);
  };

  const handleStarToggle = (documentId) => {
    // Toggle star status
    console.log(`Toggle star for document ${documentId}`);
  };

  const handleUpload = () => {
    setUploadDialogOpen(true);
  };

  const handleFileUpload = () => {
    // Simulate file upload
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadDialogOpen(false);
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handlePreview = (document) => {
    setSelectedDocument(document);
    setPreviewDialogOpen(true);
    handleMenuClose();
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Document Library
        </Typography>
        <Button variant="contained" startIcon={<CloudUpload />} onClick={handleUpload}>
          Upload Document
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Sidebar - Categories */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Categories
              </Typography>
              <List>
                {categories.map((category) => (
                  <ListItem
                    key={category.value}
                    button
                    selected={selectedCategory === category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    sx={{ borderRadius: 1, mb: 0.5 }}
                  >
                    <ListItemIcon>
                      <Folder />
                    </ListItemIcon>
                    <ListItemText
                      primary={category.label}
                      secondary={`${category.count} files`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Upload Guidelines */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upload Guidelines
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  Ensure documents are properly categorized and tagged for easy retrieval.
                </Typography>
              </Alert>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Supported formats"
                    secondary="PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, MP4"
                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                    secondaryTypographyProps={{ fontSize: '0.8rem' }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Maximum file size"
                    secondary="50 MB per file"
                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                    secondaryTypographyProps={{ fontSize: '0.8rem' }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Naming convention"
                    secondary="Use descriptive names with dates"
                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                    secondaryTypographyProps={{ fontSize: '0.8rem' }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          {/* Search and Filter */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  fullWidth
                >
                  Advanced Filters
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Documents List */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Documents ({filteredDocuments.length})
              </Typography>
              <List>
                {filteredDocuments.map((document, index) => (
                  <React.Fragment key={document.id}>
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon>
                        {getFileIcon(document.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1" component="span">
                              {document.name}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => handleStarToggle(document.id)}
                            >
                              {document.starred ? <Star color="warning" /> : <StarBorder />}
                            </IconButton>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {document.description}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                              {document.tags.map((tag, tagIndex) => (
                                <Chip key={tagIndex} label={tag} size="small" variant="outlined" />
                              ))}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Typography variant="caption" color="text.secondary">
                                {document.size} • {document.uploadDate}
                              </Typography>
                              <Chip
                                label={document.criterion}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                              <Chip
                                label={document.status}
                                size="small"
                                color={getStatusColor(document.status)}
                              />
                            </Box>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          onClick={(e) => handleMenuClick(e, document)}
                        >
                          <MoreVert />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < filteredDocuments.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handlePreview(selectedDocument)}>
          <Visibility sx={{ mr: 1 }} /> Preview
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Download sx={{ mr: 1 }} /> Download
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Share sx={{ mr: 1 }} /> Share
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Edit sx={{ mr: 1 }} /> Edit Details
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              Upload documents related to NAAC criteria for easy access and organization.
            </Alert>
            
            <TextField
              fullWidth
              label="Document Title"
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              margin="normal"
            />
            
            <TextField
              select
              fullWidth
              label="Category"
              margin="normal"
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Select Category</option>
              {categories.slice(1).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            
            <TextField
              select
              fullWidth
              label="NAAC Criterion"
              margin="normal"
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Select Criterion</option>
              <option value="criterion1">Criterion 1: Curricular Aspects</option>
              <option value="criterion2">Criterion 2: Teaching-Learning and Evaluation</option>
              <option value="criterion3">Criterion 3: Research, Innovations and Extension</option>
              <option value="criterion4">Criterion 4: Infrastructure and Learning Resources</option>
              <option value="criterion5">Criterion 5: Student Support and Progression</option>
              <option value="criterion6">Criterion 6: Governance, Leadership and Management</option>
              <option value="criterion7">Criterion 7: Institutional Values and Best Practices</option>
            </TextField>
            
            <TextField
              fullWidth
              label="Tags (comma separated)"
              margin="normal"
              placeholder="e.g., curriculum, policy, evidence"
            />
            
            <Box sx={{ mt: 3, p: 3, border: '2px dashed #ccc', borderRadius: 1, textAlign: 'center' }}>
              <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
              <Typography variant="body1" gutterBottom>
                Drop files here or click to browse
              </Typography>
              <Button variant="outlined" component="label">
                Choose Files
                <input type="file" hidden multiple />
              </Button>
            </Box>
            
            {uploadProgress > 0 && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress variant="determinate" value={uploadProgress} />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Uploading... {uploadProgress}%
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleFileUpload}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onClose={() => setPreviewDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedDocument?.name}
        </DialogTitle>
        <DialogContent>
          {selectedDocument && (
            <Box>
              <Alert severity="info" sx={{ mb: 2 }}>
                Document preview functionality would be implemented here with appropriate viewers for different file types.
              </Alert>
              <Typography variant="body1" paragraph>
                <strong>Description:</strong> {selectedDocument.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Category:</strong> {selectedDocument.category} • 
                <strong> Size:</strong> {selectedDocument.size} • 
                <strong> Uploaded:</strong> {selectedDocument.uploadDate}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialogOpen(false)}>Close</Button>
          <Button variant="contained">Download</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DocumentLibrary;
