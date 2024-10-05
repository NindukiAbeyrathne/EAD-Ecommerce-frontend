// common/pages/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  // If not logged in, redirect to UserForm
  if (!isLoggedIn) {
    return <Navigate to="/UserForm" />;
  }

  // If logged in, render the children components (protected routes)
  return children;
};

export default ProtectedRoute;
