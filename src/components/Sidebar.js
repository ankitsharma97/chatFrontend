// Sidebar.js
import React, { useEffect, useState} from 'react';
import withAuth from '../utils/withAuth';
import axios from 'axios';
import { List, ListItem, Typography, Avatar, ListItemAvatar, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Sidebar() {
  const BASE_URL = 'https://chatbackend-4ltq.onrender.com/';
  const [userList, setUserList] = useState([]);
  const getToken = localStorage.getItem('token');
  const { chatId } = useParams();
  useEffect(() => {
    if (getToken) {
      axios.get(`${BASE_URL}get_user/`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      }).then((response) => {
        setUserList(response.data);
      }).catch((error) => {
        console.error('Error:', error);
      });
    }
  }, [getToken]);


  return (
    <Container fluid className="p-3 bg-dark text-white" style={{ height: '100vh', overflowY: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Users List
      </Typography>
      <List>
        {userList.map((user) => (
          <ListItem
            component={RouterLink}
            to={`/chat/${user.id}`}
            key={user.id}
            style={{
              backgroundColor: parseInt(chatId) === user.id ? '#002a44' : 'inherit',
              color: parseInt(chatId) === user.id ? 'red' : 'inherit',
            }}
          >
            <ListItemAvatar>
              <Avatar src={user.avatar} alt={user.name} />
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default withAuth(Sidebar);
