import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const authContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  // Save user to localStorage when currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  const signIn = async (email, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();
      setCurrentUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const signUp = async (userData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign up failed");
      }
      const data = await response.json();
      setCurrentUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <authContext.Provider value={{ currentUser, signIn, signUp, signOut }}>
      {children}
    </authContext.Provider>
  );
};
