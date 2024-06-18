import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const BASE_URL = 'https://chatbackend-4ltq.onrender.com/';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${BASE_URL}account/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        const token = data.token;
        localStorage.setItem('token', token);
        navigate('/chat/1'); 
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          LogIn
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="email"
              id="email"
              label="Email"
              variant="outlined"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              LogIn
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Login;
