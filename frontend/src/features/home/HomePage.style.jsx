import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Paper } from '@mui/material';

export const VideoContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '350px',
  [theme.breakpoints.down('md')]: {
    height: '180px',
  },
  overflow: 'hidden',
}));

export const NavigationButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5, 4),
  background: 'linear-gradient(to right, #b0b0b0, #4f4f4f)',
  color: 'white',
  fontWeight: 'bold',
  borderRadius: '40px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  '&:hover': {
    background: 'linear-gradient(to right, #333333, #b0b0b0)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
  },
}));

export const GradientTitle = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(90deg, #ffffff, #dcdcdc, #a0a0a0)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  fontWeight: 'bold',
}));

export const DescriptionText = styled(Typography)(({ theme }) => ({
  color: '#e0e0e0',
  maxWidth: '700px',
  margin: '0 auto',
  textAlign: 'center',
  lineHeight: 1.7,
}));

export const ServiceCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'linear-gradient(to bottom, #2a2a2a, #1a1a1a)',
  borderRadius: '24px',
  border: '1px solid rgba(255,255,255,0.1)',
  textAlign: 'center',
  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  height: '150px',
  width: '250px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
  },
}));
