// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');  // Check if the user is logged in

  return isLoggedIn ? children : <Navigate to="/UserForm" />;  // Redirect to login if not logged in
};

export default ProtectedRoute;
