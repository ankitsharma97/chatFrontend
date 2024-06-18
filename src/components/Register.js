import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Grid } from '@mui/material';
import { Navigate } from 'react-router-dom';

function Register() {
  const BASE_URL = 'https://chatbackend-4ltq.onrender.com/';

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
    });
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${BASE_URL}account/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                setRedirectToLogin(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    if (redirectToLogin) {
        return <Navigate to="/login" />;
    }

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
                    Register
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
                            type="text"
                            id="name"
                            label="Name"
                            variant="outlined"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Register;
