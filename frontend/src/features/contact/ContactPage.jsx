import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import {
  Box, TextField, Button, Typography, InputLabel, createTheme, ThemeProvider, Paper
} from '@mui/material';

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

const fileUploadStyle = {
  p: 2,
  mt: 1,
  border: '2px dashed #C0C0C0', 
  borderRadius: 2,
  textAlign: 'center',
  color: '#E5E4E2', 
  fontSize: '0.95rem',
  backgroundColor: '#1f1f1f'
};

const ContactPage = () => {
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const profilePicFile = formData.get('profile_pic');
    const currentTime = new Date().toLocaleString('he-IL');
    formData.append('time', currentTime);

    if (profilePicFile && profilePicFile.size > 0) {
      const cloudinaryData = new FormData();
      cloudinaryData.append('file', profilePicFile);
      cloudinaryData.append('upload_preset', 'revital');

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dcemiogkv/upload', {
          method: 'POST',
          body: cloudinaryData,
        });
        const data = await response.json();
        const imageUrl = data.secure_url;
        formData.set('profile_pic_url', imageUrl);
        sendFormToEmailJS(formData);
      } catch (error) {
        console.error("שגיאה בהעלאת תמונה:", error);
        alert("שגיאה בהעלאת תמונה. השליחה בוטלה.");
      }
    } else {
      sendFormToEmailJS(formData);
    }
  };

  const sendFormToEmailJS = (formData) => {
    emailjs.send('service_dva0nsm', 'template_ygkukcq', Object.fromEntries(formData), 'Z9w2JjTNKI9nhuJ8_')
      .then(() => {
        alert("ההודעה נשלחה בהצלחה!");
      }, () => {
        alert("אירעה שגיאה בשליחה.");
      });
    form.current.reset();
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
            צור קשר
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ mb: 2 }}>
            נשמח לעמוד לרשותך, השאר פרטים ונציגינו יצרו עמך קשר בהקדם.
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{ mb: 3 }}>
            שירות לקוחות 24/6: <strong>03-9153030</strong><br />
            מכירות שירה בע"מ :<strong>03-9151068</strong>
          </Typography>

          {/* טופס */}
          <Box
            component="form"
            ref={form}
            onSubmit={sendEmail}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <TextField
              name="name"
              label="שם מלא"
              required
              fullWidth
              sx={silverBorder}
              {...inputAlignRight}
            />
            <TextField
              name="email"
              label="כתובת מייל"
              required
              fullWidth
              sx={silverBorder}
              {...inputAlignRight}
            />
            <TextField
              name="address"
              label="כתובת מגורים"
              fullWidth
              sx={silverBorder}
              {...inputAlignRight}
            />
            <TextField
              name="date"
              label="תאריך השכרה"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={silverBorder}
              {...inputAlignRight}
            />
            <TextField
              name="message"
              label="הודעה"
              multiline
              rows={4}
              required
              fullWidth
              sx={silverBorder}
              {...inputAlignRight}
            />

            {/* רישיון נהיגה */}
            <Box>
              <InputLabel sx={{ color: '#E5E4E2', mb: 1 }}>רישיון נהיגה</InputLabel>
              <Box sx={fileUploadStyle}>
                גרור קובץ או לחץ לבחירה
                <input type="file" name="profile_pic" accept="image/*" style={{ marginTop: '8px' }} />
              </Box>
            </Box>

            {/* תעודת זהות */}
            <Box>
              <InputLabel sx={{ color: '#E5E4E2', mb: 1 }}>תעודת זהות</InputLabel>
              <Box sx={fileUploadStyle}>
                גרור קובץ או לחץ לבחירה
                <input type="file" name="profile_pic" accept="image/*" style={{ marginTop: '8px' }} />
              </Box>
            </Box>

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
              שלח בקשה
            </Button>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default ContactPage;
