import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CssBaseline,
  Container,
} from '@mui/material';
import { getAllDrivers } from '../../services/driverService';

function DriverListPage() {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllDrivers()
      .then(setDrivers)
      .catch((err) => {
        console.error('שגיאה בטעינת רשימת נהגים:', err);
        setError('שגיאה בטעינת נתוני נהגים');
      });
  }, []);

  if (error) {
    return (
      <Box sx={{ color: 'black', p: 20, textAlign: 'center' }}>
        {error}
      </Box>
    );
  }

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'black',
          pt: 4,
          pb: 2,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'white' }}
          >
            Driver list
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {drivers.map((driver) => (
             <Grid item key={driver.id} xs={12} sm={6} md={3}>

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
                  <Box
                    sx={{
                      height: 170,
                      backgroundImage: `url(${process.env.PUBLIC_URL + driver.imageSrc})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderBottom: '1px solid #ccc',
                      flexShrink: 0,
                    }}
                  />
                  <CardContent sx={{ textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '200px' }}>
                    <Box>
                      <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold' }}>
                        {driver.name}
                      </Typography>
                      <Typography sx={{ color: '#000', fontSize: '0.9rem' }}>
                        גיל: {driver.age}
                      </Typography>
                      <Typography sx={{ color: '#000', fontSize: '0.9rem' }}>
                        ניסיון: {driver.experience_years} שנים
                      </Typography>
                      <Typography sx={{ color: '#000', fontSize: '0.9rem' }}>
                        דירוג: {driver.rating} ⭐
                      </Typography>
                      <Typography sx={{ color: '#000', fontSize: '0.9rem', mb: 1, fontWeight: 'bold' }}>
                        מחיר: ₪{driver.pricePerHour || driver.price_per_hour || 0}
                      </Typography>
                    </Box>
                    <Button
                      component={Link}
                      to={`/driver/${driver.id}`}
                      variant="outlined"
                      sx={{
                        marginTop: 1,
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

export default DriverListPage;
