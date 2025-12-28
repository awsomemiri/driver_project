import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Box, TextField, Button, Typography, Paper, InputLabel, createTheme, ThemeProvider
} from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: "'Orbitron', sans-serif",
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

const PaymentForm = () => {
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [totalCost, setTotalCost] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [error, setError] = useState(null); 

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const total = queryParams.get('total');
    if (total) {
      setTotalCost(total);
    } else {
      setTotalCost(null);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["cardNumber", "cvv"].includes(name)) {
      if (!/^\d*$/.test(value)) return;
    }

    setCreditCardInfo({ ...creditCardInfo, [name]: value });
  };

  const validateExpiry = (value) => {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // אימות פורמט MM/YY
    if (!validateExpiry(creditCardInfo.expiryDate)) {
      setError("תוקף הכרטיס חייב להיות בפורמט MM/YY (לדוגמה 05/26)");
      return;
    }

    setError(null);
    alert('תשלום הושלם');
    setPaymentCompleted(true);
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
            maxWidth: 600,
            width: '100%',
            padding: 4,
            bgcolor: '#111',
            color: '#C0C0C0', 
            border: '2px solid #C0C0C0',
            fontFamily: 'Orbitron, sans-serif',
          }}
        >
          {/* המלל */}
          <Typography variant="h4" gutterBottom textAlign="center">
            תשלום כרטיס אשראי
          </Typography>
          {totalCost ? (
            <div>
              {!paymentCompleted ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    סך עלות הקנייה: {totalCost} ש"ח
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      name="cardNumber"
                      label="מספר כרטיס אשראי"
                      inputMode="numeric"
                      pattern="\d*"
                      value={creditCardInfo.cardNumber}
                      onChange={handleChange}
                      required
                      fullWidth
                      sx={silverBorder}
                    />
                    <TextField
                      name="expiryDate"
                      label="תוקף כרטיס (MM/YY)"
                      value={creditCardInfo.expiryDate}
                      onChange={handleChange}
                      required
                      fullWidth
                      sx={silverBorder}
                    /><br></br>
                    <TextField
                      name="cvv"
                      label="CVV"
                      inputMode="numeric"
                      pattern="\d*"
                      value={creditCardInfo.cvv}
                      onChange={handleChange}
                      required
                      fullWidth
                      sx={silverBorder}
                    />
                    
                    {error && <Typography color="error">{error}</Typography>}
                    <Button
                      type="submit"
                      variant="contained"
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
                      שלח תשלום
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <Typography variant="h6" gutterBottom>
                    התשלום הושלם בהצלחה!
                  </Typography>
                  <Link to="/">
                    <Button variant="contained" sx={{
                      backgroundColor: '#C0C0C0',
                      color: '#111',
                      fontWeight: 600,
                      fontSize: '1rem',
                      '&:hover': {
                        backgroundColor: '#d8d8d8',
                      }
                    }}>
                      חזרה לדף הבית
                    </Button>
                  </Link>
                </>
              )}
            </div>
          ) : (
            <Typography variant="body1">הפרמטר 'total' לא נמצא ב-URL או חסר נתונים.</Typography>
          )}
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default PaymentForm;
