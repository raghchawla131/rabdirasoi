import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export default function Signup() {
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [emailError, setEmailError] = useState(false);

  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      // Simple email regex check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(!emailRegex.test(value));
    }

    setAuthData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ Clear any previous user data
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    try {
      await signup(authData);
      navigate("/login");
    } catch (error) {
      const msg = error.response?.data?.message || "An error occurred";
      setErrorMsg(msg);
      setOpen(true);
      console.error(error);
    }
  };

  // Handle Enter key press to trigger signup
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignup(e); // Call the signup function on Enter key press
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
          boxShadow: "0px 8px 24px rgba(255, 20, 147, 0.2)", // soft deep pink glow
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ color: "deeppink" }}
        >
          Create Account
        </Typography>

        <TextField
          fullWidth
          label="Username"
          name="username"
          value={authData.username}
          onChange={handleChange}
          onKeyDown={handleKeyDown} // Attach the onKeyDown event to this field
          margin="normal"
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={authData.email}
          onChange={handleChange}
          onKeyDown={handleKeyDown} // Attach the onKeyDown event to this field
          margin="normal"
          error={emailError}
          helperText={emailError ? "Please enter a valid email address" : ""}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={authData.password}
          onChange={handleChange}
          onKeyDown={handleKeyDown} // Attach the onKeyDown event to this field
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleSignup}
          sx={{
            mt: 2,
            backgroundColor: "deeppink",
            "&:hover": {
              backgroundColor: "#c71585",
            },
          }}
        >
          Sign Up
        </Button>

        <Typography variant="body2" textAlign="center" mt={2}>
          Already have an account?{" "}
          <Link href="/login" underline="hover" sx={{ color: "deeppink" }}>
            Login here
          </Link>
        </Typography>
      </Paper>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%", backgroundColor: "deeppink" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
