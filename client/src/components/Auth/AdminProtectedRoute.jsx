import { RedirectToSignIn, useUser } from '@clerk/react-router';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const { isSignedIn, user } = useUser();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
  if (!user || !user.id) return;

  setLoading(true); // set loading whenever user changes

  fetch(`/api/users/${user.id}/role`)
    .then(res => {
      if (!res.ok) throw new Error("Role fetch failed");
      return res.json();
    })
    .then(data => {
      console.log("Fetched role:", data.role);
      setRole(data.role);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching role:", err);
      setRole('user'); // fallback if fetch fails
      setLoading(false);
    });
}, [user]);


  console.log("Loading:", loading, "Role:", role);


  if (!isSignedIn) {
    return <RedirectToSignIn redirectUrl={window.location.pathname} />;
  }

  if (loading) {
    return <div>Loading...</div>; // or spinner
  }

  if (role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
