import { RedirectToSignIn, useUser } from '@clerk/react-router';

// UserProtectedRoute component to protect routes for signed-in users
const UserProtectedRoute = ({ children }) => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn redirectUrl={window.location.pathname} />
  }
  return children;
};

export default UserProtectedRoute;
