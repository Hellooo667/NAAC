import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Rating,
  Paper,
  Tab,
  Tabs,
  Alert,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Star,
  Bookmark,
  Share,
  ThumbUp,
  Comment,
  School,
  EmojiEvents,
  Lightbulb,
  Download,
  MoreVert,
  Add,
} from '@mui/icons-material';

const BestPractices = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);

  const categories = [
    { value: 'all', label: 'All Practices' },
    { value: 'curriculum', label: 'Curriculum Innovation' },
    { value: 'teaching', label: 'Teaching Methods' },
    { value: 'research', label: 'Research Excellence' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'student-support', label: 'Student Support' },
    { value: 'governance', label: 'Governance' },
    { value: 'values', label: 'Institutional Values' },
  ];

  const bestPractices = [
    {
      id: 1,
      title: 'AI-Powered Personalized Learning System',
      description: 'Implementation of artificial intelligence to create personalized learning paths for each student based on their learning style, pace, and performance.',
      institution: 'ABC University',
      category: 'teaching',
      rating: 4.8,
      likes: 156,
      comments: 23,
      tags: ['AI', 'Personalized Learning', 'Technology Integration'],
      criterion: 'Criterion 2',
      impact: 'Improved student engagement by 85% and learning outcomes by 70%',
      implementation: 'Developed in-house AI platform with machine learning algorithms to analyze student performance patterns and suggest optimal learning resources.',
      resources: ['AI Platform Documentation', 'Implementation Guide', 'Case Study Report'],
      image: '/api/placeholder/300/200',
      dateAdded: '2024-01-15',
      author: 'Dr. Smith Johnson',
    },
    {
      id: 2,
      title: 'Green Campus Initiative with Zero Waste Policy',
      description: 'Comprehensive environmental sustainability program that achieved zero waste to landfill and carbon neutrality through innovative waste management and renewable energy systems.',
      institution: 'Green Valley College',
      category: 'values',
      rating: 4.9,
      likes: 203,
      comments: 34,
      tags: ['Sustainability', 'Zero Waste', 'Green Energy', 'Environmental'],
      criterion: 'Criterion 7',
      impact: 'Achieved 100% waste diversion from landfills and reduced carbon footprint by 60%',
      implementation: 'Multi-phase approach including waste segregation, composting facility, solar power installation, and rainwater harvesting systems.',
      resources: ['Sustainability Report', 'Implementation Timeline', 'Cost-Benefit Analysis'],
      image: '/api/placeholder/300/200',
      dateAdded: '2024-01-10',
      author: 'Prof. Maria Garcia',
    },
    {
      id: 3,
      title: 'Industry-Integrated Curriculum Design',
      description: 'Revolutionary approach to curriculum development where industry experts co-design courses, ensuring 100% industry relevance and employment readiness.',
      institution: 'Tech Institute',
      category: 'curriculum',
      rating: 4.7,
      likes: 189,
      comments: 45,
      tags: ['Industry Integration', 'Curriculum Design', 'Employment', 'Skills'],
      criterion: 'Criterion 1',
      impact: '95% placement rate with average salary increase of 40%',
      implementation: 'Established industry advisory boards for each department, implemented project-based learning with real industry problems.',
      resources: ['Curriculum Framework', 'Industry Partnership Agreements', 'Placement Statistics'],
      image: '/api/placeholder/300/200',
      dateAdded: '2024-01-08',
      author: 'Dr. Alex Chen',
    },
    {
      id: 4,
      title: 'Peer-to-Peer Learning Network',
      description: 'Student-driven learning platform where senior students mentor juniors, creating a collaborative learning ecosystem with measurable academic improvements.',
      institution: 'Community College',
      category: 'student-support',
      rating: 4.6,
      likes: 142,
      comments: 28,
      tags: ['Peer Learning', 'Mentorship', 'Collaboration', 'Student Support'],
      criterion: 'Criterion 5',
      impact: 'Reduced dropout rates by 35% and improved academic performance by 45%',
      implementation: 'Structured mentorship program with training modules, matching algorithms, and progress tracking systems.',
      resources: ['Mentorship Manual', 'Training Materials', 'Impact Assessment Report'],
      image: '/api/placeholder/300/200',
      dateAdded: '2024-01-05',
      author: 'Sarah Thompson',
    },
  ];

  const featuredPractices = bestPractices.slice(0, 3);
  const trendingPractices = bestPractices.slice(1, 4);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const filteredPractices = bestPractices.filter(practice => {
    const matchesSearch = practice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         practice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         practice.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || practice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const PracticeCard = ({ practice, featured = false }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant={featured ? "h5" : "h6"} component="h2" gutterBottom>
            {practice.title}
          </Typography>
          <IconButton size="small" onClick={handleMenuClick}>
            <MoreVert />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.8rem' }}>
            {practice.institution.charAt(0)}
          </Avatar>
          <Typography variant="body2" color="text.secondary">
            {practice.institution}
          </Typography>
          <Chip
            label={practice.criterion}
            size="small"
            sx={{ ml: 1, fontSize: '0.7rem' }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" paragraph>
          {practice.description}
        </Typography>

        <Alert severity="success" sx={{ mb: 2, fontSize: '0.8rem' }}>
          <strong>Impact:</strong> {practice.impact}
        </Alert>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {practice.tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" variant="outlined" />
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={practice.rating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" sx={{ ml: 1 }}>
            ({practice.rating})
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          <strong>Implementation:</strong> {practice.implementation}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          <strong>Resources Available:</strong>
        </Typography>
        <List dense>
          {practice.resources.map((resource, index) => (
            <ListItem key={index} sx={{ py: 0, px: 0 }}>
              <ListItemText 
                primary={resource} 
                primaryTypographyProps={{ fontSize: '0.8rem' }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size="small" startIcon={<ThumbUp />}>
              {practice.likes}
            </Button>
            <Button size="small" startIcon={<Comment />}>
              {practice.comments}
            </Button>
          </Box>
          <Box>
            <IconButton size="small">
              <Bookmark />
            </IconButton>
            <IconButton size="small">
              <Share />
            </IconButton>
            <IconButton size="small">
              <Download />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Best Practices Library
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          Submit Practice
        </Button>
      </Box>

      {/* Search and Filter */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search best practices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              size="small"
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All Practices" />
          <Tab label="Featured" />
          <Tab label="Trending" />
          <Tab label="My Bookmarks" />
        </Tabs>
      </Box>

      {/* Content based on selected tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {filteredPractices.map((practice) => (
            <Grid item xs={12} md={6} lg={4} key={practice.id}>
              <PracticeCard practice={practice} />
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          {featuredPractices.map((practice) => (
            <Grid item xs={12} md={6} lg={4} key={practice.id}>
              <PracticeCard practice={practice} featured />
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          {trendingPractices.map((practice) => (
            <Grid item xs={12} md={6} lg={4} key={practice.id}>
              <PracticeCard practice={practice} />
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 3 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Bookmark sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No bookmarked practices yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start bookmarking practices that interest you to view them here
          </Typography>
        </Paper>
      )}

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Bookmark sx={{ mr: 1 }} /> Bookmark
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Share sx={{ mr: 1 }} /> Share
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Download sx={{ mr: 1 }} /> Download Resources
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default BestPractices;
