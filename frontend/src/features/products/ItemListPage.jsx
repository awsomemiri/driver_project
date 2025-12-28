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
import { getAllItems } from '../../services/itemsService';

function ItemListPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllItems()
      .then(setItems)
      .catch((err) => console.error('שגיאה בטעינת רשימת פריטים:', err));
  }, []);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          backgroundColor: '#0a0a0a',
          pt: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'white' }}
          >
            item list
          </Typography>

          <Grid
            container
            spacing={4}
            columns={12}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {items.map((item) => (
              <Grid
                item
                key={item.id}
                xs={3}
                sx={{
                  minWidth: '250px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Card
                  sx={{
                    width: '100%',
                    maxWidth: 280,
                    backgroundColor: '#fff',
                    borderRadius: 2,
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
                    image={item.imageSrc}
                    alt={item.name}
                    sx={{
                      height: 200,
                      objectFit: 'cover',
                      borderBottom: '1px solid #ccc',
                      flexShrink: 0,
                    }}
                  />
                  <CardContent sx={{ textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '180px' }}>
                    <Box>
                      <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold', minHeight: '3em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {item.name}
                      </Typography>
                      <Typography 
                        sx={{ 
                          color: '#000',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          minHeight: '2.5em'
                        }}
                      >
                        {item.description}
                      </Typography>
                      <Typography sx={{ color: '#000' }}>
                        ₪{item.price}
                      </Typography>
                    </Box>
                    <Button
                      component={Link}
                      to={`/item/${item.id}`}
                      variant="outlined"
                      sx={{
                        marginTop: 2,
                        color: 'white',
                        borderColor: '#000',
                        backgroundColor: '#C0C0C0',
                        '&:hover': {
                          backgroundColor: '#8B4546',
                        },
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

export default ItemListPage;
