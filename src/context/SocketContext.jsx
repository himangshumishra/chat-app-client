import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { initSocket, disconnectSocket, getSocket } from '../utils/socket';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const token = localStorage.getItem('token');
      if (token) {
        const socketInstance = initSocket(token);
        setSocket(socketInstance);

        socketInstance.on('onlineUsers', (users) => {
          setOnlineUsers(users);
        });

        socketInstance.on('userStatus', ({ userId, status }) => {
          if (status === 'online') {
            setOnlineUsers(prev => [...prev, userId]);
          } else {
            setOnlineUsers(prev => prev.filter(id => id !== userId));
          }
        });

        return () => {
          disconnectSocket();
        };
      }
    } else {
      disconnectSocket();
      setSocket(null);
    }
  }, [currentUser]);

  const isUserOnline = (userId) => {
    return onlineUsers.includes(userId);
  };

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, isUserOnline }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);