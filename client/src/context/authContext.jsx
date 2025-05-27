// src/context/authContext.js
import React, { createContext, useContext, useMemo } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";

export const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useAuth();

  // Map Clerk user info to your currentUser object (similar to old one)
  const currentUser = useMemo(() => {
    if (!isSignedIn || !user) return null;

    return {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || "",
      firstName: user.firstName,
      lastName: user.lastName,
      // add more user fields if you used any
    };
  }, [user, isSignedIn]);

  const logout = async () => {
    await signOut();
  };

  // No login/signup here - Clerk handles that via their components & flows

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
