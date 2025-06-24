import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const tokens = localStorage.getItem('authTokens');
    if (tokens) {
      setAuthTokens(JSON.parse(tokens));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const response = await axios.post('http://localhost:8000/api/auth/token/login/', {
      username,
      password,
    });
    const tokens = response.data;
    localStorage.setItem('authTokens', JSON.stringify(tokens));
    setAuthTokens(tokens);
  };

  const register = async (username, password) => {
    await axios.post('http://localhost:8000/api/auth/users/', {
      username,
      password,
    });
    await login(username, password);
  };

  const logout = () => {
    localStorage.removeItem('authTokens');
    setAuthTokens(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authTokens, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;