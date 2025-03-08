import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// User API calls
export const searchUsers = async (email) => {
  const response = await api.get(`/users/search`, { params: { email } });
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// Message API calls
export const sendMessage = async (recipientId, content) => {
  const response = await api.post('/messages', { recipientId, content });
  return response.data;
};

export const getConversation = async (userId) => {
  const response = await api.get(`/messages/conversation/${userId}`);
  return response.data;
};

export const getRecentConversations = async () => {
  const response = await api.get('/messages/recent');
  return response.data;
};

export default api;