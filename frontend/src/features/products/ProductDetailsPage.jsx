import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { getProductById } from '../../services/productService';
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
  CssBaseline,
  createTheme,
  ThemeProvider,
} from '@mui/material';

// יצירת תמה עם רקע שחור וכיתוב כסף
const theme = createTheme({
  typography: {
    fontFamily: "'Orbitron', sans-serif",
    allVariants: {
      color: '#C0C0C0', // טקסט בצבע כסף
    },
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#000000', // רקע שחור מוחלט
      paper: '#000000',   // גם כל הכרטיסים שחורים
    },
    text: {
      primary: '#C0C0C0', // כסף
      secondary: '#C0C0C0',
    },
  },
});

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromOrders = location.search.includes('from=orders');
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('שגיאה בשליפת המוצר:', err);
        setError('אירעה שגיאה בטעינת המוצר.');
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const existingItem = cartItems.find(item => 
        item.id.toString() === product.id.toString() && item.itemType === 'car'
      );
      if (existingItem) {
        alert("המוצר כבר נוסף לסל – לא ניתן להוסיף אותו שוב.");
        return;
      }

      dispatch(addToCart({ ...product, quantity: 1, itemType: 'car' }));
      setSuccessMessage('המוצר נוסף לסל בהצלחה!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress color="inherit" />
        </Container>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{ mt: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      </ThemeProvider>
    );
  }

  if (!product) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{ mt: 4 }}>
          <Alert severity="warning">המוצר לא נמצא</Alert>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#000', // רקע שחור מוחלט
          py: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          pt: 8,
          p: 4,
        }}
      >
        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              bgcolor: '#000', // גם ה־Card שחור
              boxShadow: '0 0 15px #444',
              border: '1px solid #444',
              borderRadius: 2,
              overflow: 'hidden',
              maxWidth: 680,
            }}
          >
            <CardMedia
              component="img"
              image={product.imageSrc}
              alt={`${product.brand} ${product.model}`}
              sx={{
                width: { xs: '100%', md: '50%' },
                height: 'auto',
                objectFit: 'cover',
                borderRight: { md: '2px solid #333' },
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
                {product.brand} {product.model}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {product.description}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
               מחיר ליום: ₪{product.price}
              </Typography>

              {successMessage && (
                <Alert severity="success" sx={{ mt: 1, mb: 2 }}>
                  {successMessage}
                </Alert>
              )}

              <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleAddToCart}
                  fullWidth
                  sx={{
                    backgroundColor: '#C0C0C0', // רקע כסף
                    color: '#000', // טקסט שחור
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#aaa',
                    },
                  }}
                >
                  הוסף לסל
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
                  fullWidth
                  sx={{
                    borderColor: '#C0C0C0',
                    color: '#C0C0C0',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#111',
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

export default ProductDetailsPage;
