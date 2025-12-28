import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { getDriverById } from '../../services/driverService';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
  createTheme,
  ThemeProvider,
  useMediaQuery
} from '@mui/material';

const theme = createTheme({
  direction: 'rtl',
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

function DraiverDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    getDriverById(parseInt(id))
      .then((selectedDriver) => {
        if (!selectedDriver) {
          setError("נהג לא נמצא");
        } else {
          setDriver(selectedDriver);
        }
      })
      .catch(() => setError("שגיאה בטעינת פרטי נהג"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!driver) return;

    const driverWithQuantity = {
      id: driver.id,
      name: driver.name,
      rating: driver.rating,
      imageSrc: driver.imageSrc,
      quantity: 1,
      price: driver.pricePerHour || driver.price_per_hour || 0,
      itemType: 'driver',
    };

    const exists = cartItems.find(item => 
      item.id.toString() === driverWithQuantity.id.toString() && item.itemType === 'driver'
    );
    if (exists) {
      alert('הנהג כבר נוסף לסל. לא ניתן להוסיף אותו שוב.');
      return;
    }

    dispatch(addToCart(driverWithQuantity));
    setSuccessMessage('הנהג נוסף לסל בהצלחה!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start', 
          pt: 6, 
          p: 6,
        }}
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            maxWidth: 650, 
            width: '100%',
            bgcolor: 'background.paper',
            borderRadius: 2,
            border: '1px solid #888',
            boxShadow: '0 0 10px #444',
            overflow: 'hidden'
          }}
        >
          <CardMedia
            component="img"
            image={process.env.PUBLIC_URL + driver.imageSrc}
            alt={driver.name}
            sx={{
              width: isMobile ? '100%' : '50%',
              height: isMobile ? 250 : '100%',
              objectFit: 'cover'
            }}
          />
          <CardContent
            sx={{
              width: isMobile ? '100%' : '50%',
              p: 5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {driver.name}
              </Typography>
              <Typography variant="body2">גיל: {driver.age}</Typography>
              <Typography variant="body2">ניסיון: {driver.experience_years} שנים</Typography>
              <Typography variant="body2">דירוג: {driver.rating} ⭐</Typography>
              <Typography variant="body1" sx={{ mt: 1 }} color="primary">
              מחיר ליום: ₪{driver.pricePerHour || driver.price_per_hour || 0}
              </Typography>

              {successMessage && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  {successMessage}
                </Alert>
              )}
            </Box>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleAddToCart}
                fullWidth
                sx={{
                  backgroundColor: '#C0C0C0',
                  color: '#111',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#ddd' },
                }}
              >
                הוסף לסל
              </Button>
              <Link to="/draiverlist" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 1,
                    borderColor: '#C0C0C0',
                    color: '#E5E4E2',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#333',
                      borderColor: '#aaa',
                    },
                  }}
                >
                  חזרה לרשימת נהגים
                </Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}

export default DraiverDetailsPage;
