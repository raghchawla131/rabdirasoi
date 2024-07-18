import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(undefined);

const getUserFromLocalStorage = () => {
  const userJson = localStorage.getItem("user");
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch (error) {
    console.error("Error parsing JSON from localStorage", error);
    return null;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getUserFromLocalStorage);

  const login = async (authData) => {
    const res = await axios.post(
      "http://localhost:8001/api/auth/login",
      authData,
      { withCredentials: true }
    );
    setCurrentUser(res.data);
  };

  const signup = async (authData) => {
    await axios.post("http://localhost:8001/api/auth/signup", authData);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
