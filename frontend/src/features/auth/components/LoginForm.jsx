import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, clearError } from '../authSlice';
import {
  Box, TextField, Button, Typography, createTheme, ThemeProvider, Paper
} from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif", 
    allVariants: {
      color: '#E5E4E2', 
    }
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#111',
      paper: '#1c1c1c'
    },
    text: {
      primary: '#E5E4E2', 
    }
  }
});

const silverBorder = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#C0C0C0', 
    },
    '&:hover fieldset': {
      borderColor: '#DCDCDC',  
    },
    '&.Mui-focused fieldset': {
      borderColor: '#F5F5F5', 
    },
    input: {
      color: '#E5E4E2',
    }
  },
  '& .MuiInputLabel-root': {
    color: '#E5E4E2', 
  }
};

const inputAlignRight = {
  InputProps: { style: { direction: 'rtl' } },
  inputProps: { style: { textAlign: 'right', direction: 'rtl' } }
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'כתובת אימייל נדרשת';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'כתובת אימייל לא תקינה';
    }
    
    if (!formData.password) {
      errors.password = 'סיסמה נדרשת';
    } else if (formData.password.length < 6) {
      errors.password = 'סיסמה חייבת להכיל לפחות 6 תווים';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(loginUser(formData)).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: '100vh',
        backgroundImage: 'url(https://www.transparenttextures.com/patterns/carbon-fibre.png)', 
        backgroundColor: '#0a0a0a',
        backgroundRepeat: 'repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}>
        <Paper
          elevation={10}
          sx={{
            maxWidth: 500,
            width: '100%',
            padding: 4,
            bgcolor: '#111',
            color: '#C0C0C0', 
            border: '2px solid #C0C0C0',
            fontFamily: 'Orbitron, sans-serif',
            direction: 'rtl',
          }}
        >
          <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 4 }}>
            התחברות
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <TextField
              name="email"
              label="כתובת אימייל"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              error={!!validationErrors.email}
              helperText={validationErrors.email}
              sx={silverBorder}
              {...inputAlignRight}
            />

            <TextField
              name="password"
              label="סיסמה"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              error={!!validationErrors.password}
              helperText={validationErrors.password}
              sx={silverBorder}
              {...inputAlignRight}
            />

            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              fullWidth
              sx={{
                backgroundColor: '#C0C0C0',
                color: '#111',
                fontWeight: 600,
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: '#d8d8d8',
                }
              }}
            >
              {isLoading ? 'מתחבר...' : 'התחבר'}
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2">
              אין לך חשבון?{' '}
              <Link to="/register" style={{ color: '#C0C0C0', textDecoration: 'underline' }}>
                הרשם כאן
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default LoginForm;
