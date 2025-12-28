import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Alert,
  Button,
  Stack,
  Box,
  createTheme,
  ThemeProvider
} from '@mui/material';
import { getItemById } from '../../services/itemsService';

const theme = createTheme({
  typography: {
    fontFamily: "'Orbitron', sans-serif",
    allVariants: {
      color: '#E5E4E2',
    },
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0a0a',
      paper: '#1c1c1c',
    },
    text: {
      primary: '#E5E4E2',
      secondary: '#A0A0A0',
    },
  },
});

function ItemsDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromOrders = location.search.includes('from=orders');
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    getItemById(id)
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('שגיאה בשליפת הפריט:', err);
        setError('אירעה שגיאה בטעינת הפריט.');
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (item) {
      const existingItem = cartItems.find(cartItem => 
        cartItem.id.toString() === item.id.toString() && cartItem.itemType === 'item'
      );
      const totalQuantity = (existingItem?.quantity || 0) + quantity;

      if (totalQuantity > 5) {
        alert('לא ניתן להוסיף יותר מ-5 מוצרים של אותו פריט.');
        return;
      }

      dispatch(addToCart({ ...item, quantity, itemType: 'item' }));
      setSuccessMessage('המוצר נוסף לסל בהצלחה!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Container sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress />
        </Container>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Container sx={{ mt: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      </ThemeProvider>
    );
  }

  if (!item) {
    return (
      <ThemeProvider theme={theme}>
        <Container sx={{ mt: 4 }}>
          <Alert severity="warning">הפריט לא נמצא</Alert>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'url(https://www.transparenttextures.com/patterns/carbon-fibre.png)',
          backgroundRepeat: 'repeat',
          py: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start', 
          pt: 8, 
        }}
      >
        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              bgcolor: 'background.paper',
              boxShadow: '0 0 10px #444',
              border: '1px solid #888',
              borderRadius: 2,
              overflow: 'hidden',
              maxWidth: 650,  
            }}
          >
            <CardMedia
              component="img"
              image={item.imageSrc}
              alt={item.name}
              sx={{
                width: { xs: '100%', md: '50%' },
                height: 'auto',
                objectFit: 'cover',
                borderRight: { md: '2px solid #C0C0C0' },
              }}
            />
            <CardContent
              sx={{
                width: { xs: '100%', md: '50%' },
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', 
                textAlign: 'center',      
              }}
            >
              <Typography variant="h4" gutterBottom fontWeight="bold">
                {item.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {item.description}
              </Typography>
              <Typography variant="h6" sx={{ color: '#B0B0B0', mb: 2 }}>
                ₪{item.price} מחיר ליום
              </Typography>

              {successMessage && (
                <Alert severity="success" sx={{ mt: 1, mb: 2 }}>
                  {successMessage}
                </Alert>
              )}

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="center">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
                  min="1"
                  max="5"
                  style={{
                    width: '60px',
                    padding: '6px',
                    backgroundColor: '#111',
                    color: '#E5E4E2',
                    border: '1px solid #C0C0C0',
                    borderRadius: '6px',
                    fontFamily: 'Orbitron',
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddToCart}
                  sx={{
                    backgroundColor: '#C0C0C0',
                    color: '#111',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#d0d0d0',
                    },
                  }}
                >
                  הוסף לעגלה
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (fromOrders) {
                      navigate('/orders');
                    } else {
                      navigate(-1);
                    }
                  }}
                  sx={{
                    borderColor: '#C0C0C0',
                    color: '#E5E4E2',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#333',
                      borderColor: '#aaa',
                    },
                  }}
                >
                  {fromOrders ? 'חזור להזמנות' : 'חזור'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default ItemsDetailsPage;
