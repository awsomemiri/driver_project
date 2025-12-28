import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  CssBaseline,
  Container,
} from '@mui/material';
import { getAllProducts } from '../../services/productService';

function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch((err) => console.error('שגיאה בטעינת רשימת מוצרים:', err));
  }, []);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          backgroundColor: 'black', 
          pt: 0,
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 4 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'white' }}
          >
            Cars List
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: 1,
                    border: '2px solid #C0C0C0',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'scale(1.03)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.imageSrc}
                    alt={`${product.brand} ${product.model}`}
                    sx={{
                      height: 200,
                      objectFit: 'cover',
                      borderBottom: '1px solid #ccc',
                      flexShrink: 0,
                    }}
                  />
                  <CardContent sx={{ textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '140px' }}>
                    <Box>
                      <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold', minHeight: '3em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {product.brand} {product.model}
                      </Typography>
                      <Typography sx={{ color: '#000', mt: 1 }}>
                        ₪{product.price}
                      </Typography>
                    </Box>
                    <Button
                      component={Link}
                      to={`/product/${product.id}`}
                      variant="outlined"
                      sx={{
                        marginTop: 2,
                        color: 'white',
                        borderColor: '#000',
                        backgroundColor: '#C0C0C0',

                        '&:hover': {
                          backgroundColor: '#8B4546', },
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default ProductListPage;
