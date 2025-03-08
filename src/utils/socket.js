import { io } from 'socket.io-client';

let socket = null;

export const initSocket = (token) => {
  if (socket) return socket;

  socket = io(import.meta.env.VITE_API_URL, {
    auth: { token }
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