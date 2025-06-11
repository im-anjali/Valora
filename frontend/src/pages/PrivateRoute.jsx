import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/UserContext';

const PrivateRoute = ({ children }) => {
  const { currUser } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  if (!token || !currUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
