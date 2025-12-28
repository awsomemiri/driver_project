import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNewOrder } from '../orders/ordersSlice';
import { selectCartItems, selectCartTotal, clearCart } from '../cart/cartSlice';
import { Box, Button, Paper, Typography, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const CheckoutPage = () => {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const totalCost = queryParams.get('total');
  
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const { isAuthenticated } = useSelector(state => state.auth);

  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;
    
    if (['cardNumber', 'cvv'].includes(name)) {
      if (!/^\d*$/.test(value)) return;
    }
    
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const validateExpiry = (value) => {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);
  };

  const handlePayment = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('העגלה ריקה');
      return;
    }

    // Validate card info
    if (!cardInfo.cardNumber || !cardInfo.expiryDate || !cardInfo.cvv) {
      alert('אנא מלא את כל פרטי כרטיס האשראי');
      return;
    }

    if (!validateExpiry(cardInfo.expiryDate)) {
      alert('תוקף הכרטיס חייב להיות בפורמט MM/YY (לדוגמה 05/26)');
      return;
    }

    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          itemType: item.itemType || 'car' // default to car for backward compatibility
        }))
      };

      await dispatch(createNewOrder(orderData)).unwrap();
      dispatch(clearCart()); // Clear cart after successful order
      setPaymentCompleted(true);
      
    } catch (error) {
      console.error('Failed to create order:', error);
      console.error('Error details:', error.response?.data);
      alert(`שגיאה ביצירת ההזמנה: ${error.response?.data?.message || error.message || error}`);
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
          {!paymentCompleted ? (
            <>
              <Typography variant="h4" gutterBottom>
                דף תשלום
              </Typography>
              <Typography variant="h6" gutterBottom>
                סך עלות הקנייה: ₪{cartTotal || totalCost}
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ marginBottom: 2 }}>
                מספר פריטים: {cartItems.length}
              </Typography>
              
              {/* Credit Card Form */}
              <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2 }}>
                פרטי כרטיס אשראי:
              </Typography>
              
              <TextField
                name="cardNumber"
                label="מספר כרטיס אשראי"
                value={cardInfo.cardNumber}
                onChange={handleCardInfoChange}
                fullWidth
                required
                inputMode="numeric"
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#C0C0C0' },
                    '&:hover fieldset': { borderColor: '#DCDCDC' },
                    '&.Mui-focused fieldset': { borderColor: '#F5F5F5' },
                    input: { color: '#E5E4E2' }
                  },
                  '& .MuiInputLabel-root': { color: '#E5E4E2' }
                }}
              />
              
              <TextField
                name="expiryDate"
                label="תוקף כרטיס (MM/YY)"
                placeholder="05/26"
                value={cardInfo.expiryDate}
                onChange={handleCardInfoChange}
                fullWidth
                required
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#C0C0C0' },
                    '&:hover fieldset': { borderColor: '#DCDCDC' },
                    '&.Mui-focused fieldset': { borderColor: '#F5F5F5' },
                    input: { color: '#E5E4E2' }
                  },
                  '& .MuiInputLabel-root': { color: '#E5E4E2' }
                }}
              />
              
              <TextField
                name="cvv"
                label="CVV"
                value={cardInfo.cvv}
                onChange={handleCardInfoChange}
                fullWidth
                required
                inputMode="numeric"
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#C0C0C0' },
                    '&:hover fieldset': { borderColor: '#DCDCDC' },
                    '&.Mui-focused fieldset': { borderColor: '#F5F5F5' },
                    input: { color: '#E5E4E2' }
                  },
                  '& .MuiInputLabel-root': { color: '#E5E4E2' }
                }}
              />
              
              <Button
                variant="contained"
                onClick={handlePayment}
                sx={{
                  backgroundColor: '#C0C0C0',
                  color: '#111',
                  fontWeight: 600,
                  fontSize: '1rem',
                  padding: '10px 20px',
                  '&:hover': {
                    backgroundColor: '#D8D8D8',
                  }
                }}
              >
                {isAuthenticated ? 'בצע הזמנה' : 'התחבר לביצוע הזמנה'}
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h4" gutterBottom sx={{ color: '#4CAF50' }}>
                ✅ ההזמנה בוצעה בהצלחה!
              </Typography>
              <Typography variant="h6" gutterBottom>
                תודה על הקנייה שלך
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ marginBottom: 3 }}>
                ההזמנה שלך נרשמה במערכת ותטופל בהקדם האפשרי.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/orders')}
                sx={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1rem',
                  padding: '10px 20px',
                  marginRight: 2,
                  '&:hover': {
                    backgroundColor: '#45a049',
                  }
                }}
              >
                צפה בהזמנות שלי
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                sx={{
                  borderColor: '#C0C0C0',
                  color: '#C0C0C0',
                  fontWeight: 600,
                  fontSize: '1rem',
                  padding: '10px 20px',
                  '&:hover': {
                    borderColor: '#D8D8D8',
                    backgroundColor: 'rgba(192, 192, 192, 0.1)',
                  }
                }}
              >
                חזור לעמוד הבית
              </Button>
            </>
          )}
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default CheckoutPage;
