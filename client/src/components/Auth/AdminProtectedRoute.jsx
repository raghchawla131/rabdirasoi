import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../../context/authContext";

const AdminProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(authContext);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(`/api/users/${currentUser.id}/role`)
      .then((res) => {
        if (!res.ok) throw new Error("Role fetch failed");
        return res.json();
      })
      .then((data) => {
        setRole(data.role);
        setLoading(false);
      })
      .catch((err) => {
        setRole("user");
        setLoading(false);
      });
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
