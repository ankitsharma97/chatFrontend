import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (Component) => {
  return function Auth(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }, []);

    if (isAuthenticated) {
      return <Component {...props} />;
    } else {
      return <Navigate to='/login' />;
    }
  };
};

export default withAuth;
