import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getCurrentUser, login as loginApi, register as registerApi } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Check if token is expired
          const decodedToken = jwtDecode(token);
          const isTokenExpired = decodedToken.exp * 1000 < Date.now();
          
          if (isTokenExpired) {
            localStorage.removeItem('token');
            setCurrentUser(null);
          } else {
            const userData = await getCurrentUser();
            setCurrentUser(userData);
          }
        } catch (err) {
          console.error('Failed to fetch user data:', err);
          localStorage.removeItem('token');
          setCurrentUser(null);
        }
      }
      setLoading(false);
    };

    fetchCurrentUser();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const data = await loginApi({ email, password });
      localStorage.setItem('token', data.token);
      setCurrentUser(data.user);
      return data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  const register = async (name, email, password) => {
    try {
      setError(null);
      const data = await registerApi({ name, email, password });
      localStorage.setItem('token', data.token);
      setCurrentUser(data.user);
      return data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);