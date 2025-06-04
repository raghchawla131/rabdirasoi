import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../../context/authContext";

// UserProtectedRoute component to protect routes for signed-in users
const UserProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(authContext);

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default UserProtectedRoute;
