import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

export default function Login() {
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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

  // Memoize handleLogin with useCallback
  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    try {
      await login(authData);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }, [authData, login, navigate]); // Dependencies: authData, login, and navigate

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleLogin(event);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleLogin]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
          boxShadow: '0px 8px 24px rgba(255, 20, 147, 0.2)', // soft deep pink glow
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ color: 'deeppink' }}
        >
          Welcome Back
        </Typography>

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={authData.email}
          onChange={handleChange}
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
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{
            mt: 2,
            backgroundColor: 'deeppink',
            '&:hover': {
              backgroundColor: '#c71585',
            },
          }}
        >
          Login
        </Button>

        <Typography
          variant="body2"
          textAlign="center"
          mt={2}
        >
          New user?{' '}
          <Link href="/signup" underline="hover" sx={{ color: 'deeppink' }}>
            Sign up here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
