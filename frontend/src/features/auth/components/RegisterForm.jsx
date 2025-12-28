import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, clearError } from '../authSlice';
import {
  Box, TextField, Button, Typography, createTheme, ThemeProvider, Paper, Grid
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

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
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
    
    if (!formData.userName.trim()) {
      errors.userName = 'שם משתמש נדרש';
    } else if (formData.userName.length < 3) {
      errors.userName = 'שם משתמש חייב להכיל לפחות 3 תווים';
    }
    
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
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'הסיסמאות אינן תואמות';
    }
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'שם פרטי נדרש';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'שם משפחה נדרש';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'מספר טלפון נדרש';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      errors.phone = 'מספר טלפון לא תקין';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const { confirmPassword, ...registerData } = formData;

    try {
      await dispatch(registerUser(registerData)).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
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
            maxWidth: 700,
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
            הרשמה
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  label="שם פרטי"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  fullWidth
                  error={!!validationErrors.firstName}
                  helperText={validationErrors.firstName}
                  sx={silverBorder}
                  {...inputAlignRight}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  label="שם משפחה"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  fullWidth
                  error={!!validationErrors.lastName}
                  helperText={validationErrors.lastName}
                  sx={silverBorder}
                  {...inputAlignRight}
                />
              </Grid>
            </Grid>

            <TextField
              name="userName"
              label="שם משתמש"
              value={formData.userName}
              onChange={handleChange}
              required
              fullWidth
              error={!!validationErrors.userName}
              helperText={validationErrors.userName}
              sx={silverBorder}
              {...inputAlignRight}
            />

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
              name="phone"
              label="מספר טלפון"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              fullWidth
              error={!!validationErrors.phone}
              helperText={validationErrors.phone}
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

            <TextField
              name="confirmPassword"
              label="אישור סיסמה"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              fullWidth
              error={!!validationErrors.confirmPassword}
              helperText={validationErrors.confirmPassword}
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
              {isLoading ? 'נרשם...' : 'הרשם'}
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2">
              כבר יש לך חשבון?{' '}
              <Link to="/login" style={{ color: '#C0C0C0', textDecoration: 'underline' }}>
                התחבר כאן
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default RegisterForm;
