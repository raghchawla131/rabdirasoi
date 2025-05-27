import React from 'react';
import { useUser } from '@clerk/react-router';
import { Navigate } from 'react-router-dom';

// UserProtectedRoute component to protect routes for signed-in users
const UserProtectedRoute = ({ children }) => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }
  return children;
};

export default UserProtectedRoute;
