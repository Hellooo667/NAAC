import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Skeleton,
  Grid,
} from '@mui/material';
import { SmartToy } from '@mui/icons-material';

// Generic loading spinner
export const LoadingSpinner = ({ size = 40, message = 'Loading...' }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      p: 4,
    }}
  >
    <CircularProgress size={size} sx={{ mb: 2 }} />
    <Typography variant="body2" color="text.secondary">
      {message}
    </Typography>
  </Box>
);

// AI content generation loading
export const AILoadingIndicator = ({ stage = 'Processing...', progress = 0 }) => (
  <Card sx={{ mt: 2 }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <SmartToy sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h6">
          IBM Granite AI is working...
        </Typography>
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <Box
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'grey.300',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  backgroundColor: 'primary.main',
                  borderRadius: 4,
                  width: `${progress}%`,
                  transition: 'width 0.3s ease',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  animation: 'shimmer 1.5s infinite',
                  '@keyframes shimmer': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                  },
                }}
              />
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ minWidth: 35 }}>
            {Math.round(progress)}%
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {stage}
        </Typography>
      </Box>
      
      <Typography variant="caption" color="text.secondary">
        Powered by IBM Granite • Using Pinecone Vector Database
      </Typography>
    </CardContent>
  </Card>
);

// Page loading skeleton
export const PageSkeleton = () => (
  <Box sx={{ p: 3 }}>
    <Skeleton variant="text" width="60%" height={40} sx={{ mb: 3 }} />
    
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Skeleton variant="text" width="40%" height={30} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Skeleton variant="text" width="50%" height={30} sx={{ mb: 2 }} />
            {[...Array(4)].map((_, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

// Document list skeleton
export const DocumentListSkeleton = () => (
  <Box>
    {[...Array(5)].map((_, index) => (
      <Card key={index} sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Skeleton variant="rectangular" width={48} height={48} sx={{ mr: 2 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Skeleton variant="text" width="70%" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="50%" height={20} sx={{ mb: 1 }} />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Skeleton variant="rectangular" width={60} height={20} />
                <Skeleton variant="rectangular" width={80} height={20} />
                <Skeleton variant="rectangular" width={70} height={20} />
              </Box>
            </Box>
            <Skeleton variant="circular" width={32} height={32} />
          </Box>
        </CardContent>
      </Card>
    ))}
  </Box>
);

// Chat message skeleton
export const ChatMessageSkeleton = () => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
      <Skeleton variant="circular" width={40} height={40} sx={{ mr: 1, mt: 0.5 }} />
      <Box sx={{ flexGrow: 1, maxWidth: '80%' }}>
        <Card>
          <CardContent>
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="75%" />
            <Skeleton variant="text" width="60%" />
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <Skeleton variant="rectangular" width={60} height={20} />
              <Skeleton variant="rectangular" width={80} height={20} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  </Box>
);

// Dashboard stats skeleton
export const DashboardStatsSkeleton = () => (
  <Grid container spacing={3}>
    {[...Array(4)].map((_, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <Skeleton variant="text" width="80%" height={48} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="60%" height={24} />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

// Criteria progress skeleton
export const CriteriaProgressSkeleton = () => (
  <Card>
    <CardContent>
      <Skeleton variant="text" width="40%" height={32} sx={{ mb: 3 }} />
      {[...Array(7)].map((_, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="20%" />
          </Box>
          <Skeleton variant="rectangular" height={8} sx={{ borderRadius: 4 }} />
        </Box>
      ))}
    </CardContent>
  </Card>
);

// Generic table skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <Card>
    <CardContent>
      <Skeleton variant="text" width="30%" height={32} sx={{ mb: 2 }} />
      {[...Array(rows)].map((_, rowIndex) => (
        <Box key={rowIndex} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {[...Array(columns)].map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              variant="text"
              width={colIndex === 0 ? '40%' : '20%'}
              sx={{ mr: 2 }}
            />
          ))}
        </Box>
      ))}
    </CardContent>
  </Card>
);

export default {
  LoadingSpinner,
  AILoadingIndicator,
  PageSkeleton,
  DocumentListSkeleton,
  ChatMessageSkeleton,
  DashboardStatsSkeleton,
  CriteriaProgressSkeleton,
  TableSkeleton,
};
