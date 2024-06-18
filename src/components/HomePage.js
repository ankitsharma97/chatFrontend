// HomePage.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Typography, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
      <Container>
        <Row className="mb-5">
          <Col>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h3" component="h1" gutterBottom>
                Welcome to My Chat Application
              </Typography>
              <Typography variant="h5" component="h2" color="textSecondary">
                Connect and communicate seamlessly with friends and colleagues.
              </Typography>
              <Button
                as={Link}
                to="/login"
                variant="primary"
                style={{ marginTop: '20px' }}
              >
                Start Chatting
              </Button>
            </Paper>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
              <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                <Typography variant="h6" component="h3">
                  Real-time Messaging
                </Typography>
              </Box>
            </Paper>
          </Col>
          <Col md={4}>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
              <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                <Typography variant="h6" component="h3">
                  Secure and Private
                </Typography>
              </Box>
            </Paper>
          </Col>
          <Col md={4}>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
              <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                <Typography variant="h6" component="h3">
                  Easy to Use Interface
                </Typography>
              </Box>
            </Paper>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Join us today and experience the future of messaging!
              </Typography>
              <Button
                as={Link}
                to="/register"
                variant="secondary"
                style={{ marginTop: '20px' }}
              >
                Sign Up Now
              </Button>
            </Paper>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
