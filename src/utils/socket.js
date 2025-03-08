import { io } from 'socket.io-client';

let socket = null;

export const initSocket = (token) => {
  if (socket) return socket;

  // Get the base URL from the API URL (strip "/api" path)
  const apiUrl = import.meta.env.VITE_API_URL;
  const baseUrl = apiUrl.replace('/api', '');

  socket = io(baseUrl, {
    auth: { token },
    path: '/socket.io',
    transports: ['websocket', 'polling'],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
  });

  // General socket event listeners
  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socket.on('connect_error', (err) => {
    console.error('Socket connection error:', err.message);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;