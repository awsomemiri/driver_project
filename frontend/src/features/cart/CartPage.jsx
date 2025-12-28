import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  updateQuantity,
} from './cartSlice';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  createTheme,
  ThemeProvider,
} from '@mui/material';

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
      default: '#111',
      paper: '#1c1c1c',
    },
    text: {
      primary: '#E5E4E2',
    },
  },
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
    },
  },
  '& .MuiInputLabel-root': {
    color: '#E5E4E2',
  },
};

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showProductDetails = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          backgroundImage: 'url(https://www.transparenttextures.com/patterns/carbon-fibre.png)',
          backgroundColor: '#0a0a0a',
          backgroundRepeat: 'repeat',
          p: { xs: 2, sm: 4 },
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          align="center"
          sx={{ mb: 5, color: '#C0C0C0' }}
        >
          סל הקניות
        </Typography>

        {cartItems.length === 0 ? (
          <Typography sx={{ color: '#666666', fontStyle: 'italic', textAlign: 'center' }}>
            העגלה ריקה
          </Typography>
        ) : (
          <Grid
            container
            spacing={2}
            direction="row-reverse"
            justifyContent="center"
            alignItems="flex-start"
          >
            {/* מוצרים */}
            <Grid item xs={12} md={8} sx={{ mx: 'auto' }}>
              <Box display="flex" flexDirection="column" gap={3}>
                {cartItems.map((item) => {
                  const isCar = item.itemType === 'car';
                  const isDriver = item.itemType === 'driver';
                  const isItem = item.itemType === 'item';

                  return (
                    <Paper
                      key={item.id}
                      elevation={10}
                      sx={{
                        display: 'flex',
                        gap: 5,
                        p: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        border: '2px solid #C0C0C0',
                        position: 'relative',
                      }}
                    >
                      <Box
                        component="img"
                        src={process.env.PUBLIC_URL + item.imageSrc}
                        alt={isCar ? `${item.brand} ${item.model || ''}` : item.name}
                        sx={{
                          width: 230,
                          height: 190,
                          borderRadius: 2,
                          objectFit: 'cover',
                          flexShrink: 0,
                        }}
                      />
                      <Box sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ color: '#C0C0C0' }}>
                          {isCar ? `${item.brand} ${item.model || ''}` : 
                           isDriver ? item.name : 
                           isItem ? item.name : 
                           `${item.brand} ${item.model || ''}`}
                        </Typography>
                        <Typography sx={{ color: '#A0A0A0', mt: 0.5 }}>
                          מחיר ליחידה: ₪{item.price || item.price_per_hour || 0}
                        </Typography>

                        {/* כמות: רק טקסט אם זה רכב או נהג */}
                        {(isCar || isDriver) ? (
                          <Typography sx={{ mt: 1, fontWeight: 'bold', color: '#E5E4E2' }}>
                            כמות: {item.quantity}
                          </Typography>
                        ) : (
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField
                              label="כמות"
                              type="number"
                              size="small"
                              value={item.quantity}
                              onChange={(e) => {
                                let newQuantity = parseInt(e.target.value, 10);
                                if (isNaN(newQuantity)) newQuantity = 1;
                                if (newQuantity > 5) newQuantity = 5;
                                if (newQuantity < 1) newQuantity = 1;
                                dispatch(updateQuantity({ id: item.id, itemType: item.itemType, quantity: newQuantity }));
                              }}
                              inputProps={{ min: 1, max: 5 }}
                              sx={{ mt: 1, maxWidth: 100, ...silverBorder }}
                            />
                          </Box>

                        )}

                        <Typography sx={{ mt: 1, fontWeight: 'bold' }}>
                          סה"כ לפריט: ₪{(item.price || item.price_per_hour || 0) * (item.quantity || 1)}
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                          <Button
                            variant="outlined"
                            color="error"
                            sx={{
                              borderColor: '#C0C0C0',
                              color: '#E5E4E2',
                              fontWeight: 'bold',
                              '&:hover': {
                                backgroundColor: '#5c0000',
                                borderColor: '#aa0000',
                              },
                            }}
                            onClick={() => dispatch(removeFromCart({ id: item.id, itemType: item.itemType }))}
                          >
                            הסר
                          </Button>
                          <Button
                            variant="outlined"
                            sx={{
                              borderColor: '#C0C0C0',
                              color: '#E5E4E2',
                              fontWeight: 'bold',
                              '&:hover': {
                                backgroundColor: '#3a3a3a',
                                borderColor: '#B0B0B0',
                              },
                            }}
                            onClick={() => showProductDetails(item)}
                          >
                            פרטים
                          </Button>

                          {(isDriver || isCar || isItem) && (
                            <Link
                              to={`/${isDriver ? 'driver' : isCar ? 'product' : 'item'}/${item.id}`}
                              style={{ textDecoration: 'none' }}
                            >
                              <Button
                                variant="outlined"
                                sx={{
                                  borderColor: '#C0C0C0',
                                  color: '#E5E4E2',
                                  fontWeight: 'bold',
                                  '&:hover': {
                                    backgroundColor: '#3a3a3a',
                                    borderColor: '#B0B0B0',
                                  },
                                }}
                              >
                                חזור לדף
                              </Button>
                            </Link>
                          )}
                        </Box>
                      </Box>
                    </Paper>
                  );
                })}
              </Box>
            </Grid>

            {/* סיכום */}
            <Grid item xs={12} md={4} sx={{ mx: 'auto' }}>
              <Paper
                elevation={10}
                sx={{
                  p: 6,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: '2px solid #C0C0C0',
                  textAlign: 'center',
                  boxShadow: '0 0 8px #888888',
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: '#B0B0B0' }}>
                  סה״כ לתשלום
                </Typography>
                <Typography variant="h4" sx={{ mb: 2, color: '#E5E4E2' }}>
                  ₪{total}
                </Typography>
                <Link to={`/checkout?total=${total}`} style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: 'rgba(112, 38, 38, 0.4)',
                      color: 'white',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: 'rgba(211, 211, 211, 0.5)',
                      },
                    }}
                    fullWidth
                  >
                    המשך לתשלום
                  </Button>
                </Link>
              </Paper>
            </Grid>
          </Grid>
        )}

        {showPopup && selectedProduct && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.85)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1300,
              p: 2,
            }}
          >
            <Paper
              sx={{
                padding: 2,
                width: 280,
                maxWidth: '90vw',
                textAlign: 'center',
                bgcolor: '#111',
                color: '#E5E4E2',
                border: '2px solid #C0C0C0',
                borderRadius: 3,
                boxShadow: '0 0 10px #888888',
              }}
            >
              <Typography variant="h5" gutterBottom>
                {selectedProduct.itemType === 'car' ? `${selectedProduct.brand} ${selectedProduct.model || ''}` : 
                 selectedProduct.itemType === 'driver' ? selectedProduct.name : 
                 selectedProduct.itemType === 'item' ? selectedProduct.name : 
                 `${selectedProduct.brand} ${selectedProduct.model || ''}`}
              </Typography>
              <Box
                component="img"
                src={process.env.PUBLIC_URL + selectedProduct.imageSrc}
                alt={selectedProduct.itemType === 'car' ? `${selectedProduct.brand} ${selectedProduct.model || ''}` : selectedProduct.name}
                sx={{ width: '100%', borderRadius: 2, mb: 1 }}
              />
              <Typography variant="body2" sx={{ mb: 3, color: '#C0C0C0' }}>
                {selectedProduct.itemType === 'car' ? `${selectedProduct.brand} ${selectedProduct.model || ''}` : 
                 selectedProduct.itemType === 'driver' ? selectedProduct.name : 
                 selectedProduct.itemType === 'item' ? selectedProduct.name : 
                 selectedProduct.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: '#C0C0C0' }}>
                ₪{selectedProduct.price || selectedProduct.price_per_hour || 0}
              </Typography>
              <Button
                variant="outlined"
                onClick={closePopup}
                sx={{
                  borderColor: '#C0C0C0',
                  color: '#C0C0C0',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#444',
                    borderColor: '#E5E4E2',
                  },
                }}
              >
                סגור
              </Button>
            </Paper>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default CartPage;
