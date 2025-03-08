import { createContext, useState, useContext, useEffect } from 'react';
import { useSocket } from './SocketContext';
import { useAuth } from './AuthContext';
import { getRecentConversations, getConversation, sendMessage as sendMessageApi } from '../utils/api';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { socket } = useSocket();
  
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typingUsers, setTypingUsers] = useState({});

  // Fetch recent conversations
  useEffect(() => {
    const fetchConversations = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        const data = await getRecentConversations();
        setConversations(data);
      } catch (err) {
        console.error('Error fetching conversations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [currentUser]);

  // Socket events for real-time messaging
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = async ({ senderId, message }) => {
      // If this is a message for the active conversation, add it
      if (activeConversation && senderId === activeConversation._id) {
        setMessages(prev => [...prev, message]);
        
        // Mark message as read
        socket.emit('messageRead', { 
          messageId: message._id,
          senderId
        });
      }

      // Update conversations list to show the latest message
      await refreshConversations();
    };

    const handleUserTyping = ({ userId }) => {
      setTypingUsers(prev => ({ ...prev, [userId]: true }));
    };

    const handleUserStopTyping = ({ userId }) => {
      setTypingUsers(prev => ({ ...prev, [userId]: false }));
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('userTyping', handleUserTyping);
    socket.on('userStopTyping', handleUserStopTyping);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('userTyping', handleUserTyping);
      socket.off('userStopTyping', handleUserStopTyping);
    };
  }, [socket, activeConversation]);

  // Set active conversation and load messages
  const selectConversation = async (userId) => {
    try {
      setLoading(true);
      setActiveConversation({ _id: userId });
      
      const messagesData = await getConversation(userId);
      setMessages(messagesData);
    } catch (err) {
      console.error('Error fetching conversation:', err);
    } finally {
      setLoading(false);
    }
  };

  // Send a message
  const sendMessage = async (recipientId, content) => {
    try {
      const newMessage = await sendMessageApi(recipientId, content);
      
      // Update messages in the current conversation
      setMessages(prev => [...prev, newMessage]);
      
      // Emit real-time message via socket
      socket.emit('privateMessage', {
        recipientId,
        message: newMessage
      });
      
      // Refresh conversations list
      await refreshConversations();
      
      return newMessage;
    } catch (err) {
      console.error('Error sending message:', err);
      throw err;
    }
  };

  // Update typing status
  const sendTypingStatus = (recipientId, isTyping) => {
    if (!socket) return;
    
    if (isTyping) {
      socket.emit('typing', { recipientId });
    } else {
      socket.emit('stopTyping', { recipientId });
    }
  };

  // Refresh the conversations list
  const refreshConversations = async () => {
    try {
      const data = await getRecentConversations();
      setConversations(data);
    } catch (err) {
      console.error('Error refreshing conversations:', err);
    }
  };

  const isTyping = (userId) => typingUsers[userId] || false;

  return (
    <ChatContext.Provider value={{
      conversations,
      activeConversation,
      messages,
      loading,
      selectConversation,
      sendMessage,
      sendTypingStatus,
      isTyping,
      refreshConversations
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);