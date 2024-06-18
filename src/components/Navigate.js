import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Navigate() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser({});
    localStorage.removeItem('user');
    navigate('/login');
  };

  const [user, setUser] = useState({});
  const BASE_URL = 'https://chatbackend-4ltq.onrender.com/';
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetch(`${BASE_URL}sender/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [token]);

  return (
    <AppBar position="static" className="bg-light text-dark">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {user.name || 'MyApp'}
        </Typography>
        <Box sx={{ display: 'flex' }}>
          {isAuthenticated ? (
            <>
              <Button
                onClick={handleLogout}
                variant="contained"
                color="secondary"
                className="mx-2"
              >
                Logout
              </Button>
              <Button
                component={Link}
                to="/chat/1"
                variant="contained"
                color="primary"
                className="mx-2"
              >
                Chat
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                color="primary"
                className="mx-2"
              >
                Register
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="secondary"
                className="mx-2"
              >
                LogIn
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigate;
