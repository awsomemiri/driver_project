import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, clearError } from '../authSlice';
import {
  Box, TextField, Button, Typography, createTheme, ThemeProvider, Paper
} from '@mui/material';
import './Profile.css';

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

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    userName: '',
    email: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName || '',
        email: user.email || ''
      });
    }
  }, [user]);

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
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(updateUserProfile(formData)).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        userName: user.userName || '',
        email: user.email || ''
      });
    }
    setIsEditing(false);
    setValidationErrors({});
    dispatch(clearError());
  };

  if (!user) {
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
              maxWidth: 600,
              width: '100%',
              padding: 4,
              bgcolor: '#111',
              color: '#C0C0C0', 
              border: '2px solid #C0C0C0',
              fontFamily: 'Orbitron, sans-serif',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" color="error">
              לא ניתן לטעון פרטי משתמש
            </Typography>
          </Paper>
        </Box>
      </ThemeProvider>
    );
  }

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
            maxWidth: 600,
            width: '100%',
            padding: 4,
            bgcolor: '#111',
            color: '#C0C0C0', 
            border: '2px solid #C0C0C0',
            fontFamily: 'Orbitron, sans-serif',
            direction: 'rtl',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              הפרופיל שלי
            </Typography>
            {!isEditing && (
              <Button
                variant="contained"
                onClick={() => setIsEditing(true)}
                sx={{
                  backgroundColor: '#C0C0C0',
                  color: '#111',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#d8d8d8',
                  }
                }}
              >
                ערוך פרטים
              </Button>
            )}
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <TextField
              name="userName"
              label="שם משתמש"
              value={formData.userName}
              onChange={handleChange}
              required
              fullWidth
              disabled={!isEditing}
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
              disabled={!isEditing}
              error={!!validationErrors.email}
              helperText={validationErrors.email}
              sx={silverBorder}
              {...inputAlignRight}
            />

            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            {isEditing && (
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
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
                  {isLoading ? 'שומר...' : 'שמור שינויים'}
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={handleCancel}
                  disabled={isLoading}
                  sx={{
                    borderColor: '#C0C0C0',
                    color: '#C0C0C0',
                    '&:hover': {
                      borderColor: '#d8d8d8',
                      backgroundColor: '#1a1a1a',
                    }
                  }}
                >
                  ביטול
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Profile;
