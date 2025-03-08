import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import { useSocket } from '../context/SocketContext';
import { getUserById } from '../utils/api';
import Message from './Message';

const ChatWindow = ({ toggleMobileMenu }) => {
  const navigate = useNavigate();
  const { activeConversation, messages, sendMessage, loading, sendTypingStatus, isTyping } = useChat();
  const { isUserOnline } = useSocket();
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const optionsMenuRef = useRef(null);

  // Fetch recipient details
  useEffect(() => {
    const fetchRecipient = async () => {
      if (activeConversation?._id) {
        try {
          const userData = await getUserById(activeConversation._id);
          setRecipient(userData);
        } catch (err) {
          console.error('Error fetching recipient:', err);
        }
      }
    };

    fetchRecipient();
  }, [activeConversation]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle typing status changes
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Close options menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim() || !activeConversation) return;
    
    try {
      await sendMessage(activeConversation._id, message.trim());
      setMessage('');
      sendTypingStatus(activeConversation._id, false);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    
    if (!activeConversation) return;
    
    // Handle typing status
    sendTypingStatus(activeConversation._id, true);
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set timeout to stop typing
    typingTimeoutRef.current = setTimeout(() => {
      sendTypingStatus(activeConversation._id, false);
    }, 2000);
  };

  // Handle view profile
  // const viewProfile = () => {
  //   if (recipient) {
  //     // In a real app, you might navigate to the user's profile page
  //     navigate(`/user-profile/${recipient._id}`);
  //     setShowOptions(false);
  //   }
  // };

  // Handle search in conversation
  const searchInConversation = () => {
    // Implement search functionality
    alert('Search in conversation functionality would be implemented here');
    setShowOptions(false);
  };

  // Handle clear conversation
  const clearConversation = () => {
    // Implement clear functionality
    const confirmClear = window.confirm('Are you sure you want to clear this conversation?');
    if (confirmClear) {
      // Clear conversation logic would go here
      alert('Conversation would be cleared here');
    }
    setShowOptions(false);
  };

  if (!activeConversation || !recipient) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-fuchsia-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-3 text-slate-400">Loading conversation...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Chat Header with WhatsApp-style options */}
      <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b border-slate-800 bg-slate-900">
        <div className="flex items-center">
          <motion.button 
            className="md:hidden mr-2 p-2 rounded-full hover:bg-slate-800"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </motion.button>
          
          {/* User Info - Make it clickable to view profile */}
          <motion.div 
            className="flex items-center cursor-pointer"
            // onClick={viewProfile}
            whileHover={{ scale: 1.03 }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-600 flex items-center justify-center text-white font-medium">
                {recipient.name?.charAt(0).toUpperCase()}
              </div>
              <span className={`absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-slate-900 ${
                isUserOnline(recipient._id) ? 'bg-green-400' : 'bg-slate-500'
              }`}></span>
            </div>
            <div className="ml-3">
              <div className="font-medium text-white">{recipient.name}</div>
              <div className="text-xs text-slate-400">
                {isUserOnline(recipient._id) ? (
                  <div className="flex items-center text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 mr-1"></span>
                    Online
                  </div>
                ) : 'Offline'}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* WhatsApp-style action buttons */}
        <div className="flex items-center space-x-2">
          {/* Video Call Button */}
          <motion.button
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Video Call"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </motion.button>
          
          {/* Voice Call Button */}
          <motion.button
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Voice Call"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </motion.button>
          
          {/* Search in conversation Button */}
          <motion.button
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400"
            onClick={searchInConversation}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Search in Conversation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.button>
          
          {/* More Options Button */}
          <div ref={optionsMenuRef} className="relative">
            <motion.button
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400"
              onClick={() => setShowOptions(!showOptions)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="More Options"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </motion.button>
            
            {/* Dropdown Menu */}
            <AnimatePresence>
              {showOptions && (
                <motion.div
                  className="absolute right-0 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 mt-2"
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="py-1">
                    <button
                      // onClick={viewProfile}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      View Contact Info
                    </button>
                    <button
                      onClick={() => {
                        alert('Media, links, and docs would be shown here');
                        setShowOptions(false);
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Media, Links, & Docs
                    </button>
                    <button
                      onClick={searchInConversation}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Search in Conversation
                    </button>
                    <div className="border-t border-slate-700 my-1"></div>
                    <button
                      onClick={() => {
                        alert('Notification settings would be shown here');
                        setShowOptions(false);
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      Notification Settings
                    </button>
                    <button
                      onClick={clearConversation}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-slate-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Clear Conversation
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Messages Container with visually distinct scrollbar */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 bg-slate-950 scrollbar scrollbar-w-2 scrollbar-track-transparent scrollbar-thumb-fuchsia-600 hover:scrollbar-thumb-fuchsia-500 scrollbar-thumb-rounded-full">
        {loading ? (
          <div className="flex justify-center py-4">
            <svg className="animate-spin h-8 w-8 text-fuchsia-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : messages.length > 0 ? (
          <>
            {messages.map((msg) => (
              <Message key={msg._id} message={msg} />
            ))}
            {isTyping(recipient._id) && (
              <div className="flex items-center mt-2 ml-2">
                <div className="flex space-x-1 bg-slate-800 rounded-full px-3 py-1">
                  <div className="bg-slate-400 rounded-full h-2 w-2 animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="bg-slate-400 rounded-full h-2 w-2 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="bg-slate-400 rounded-full h-2 w-2 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-500/20 to-fuchsia-600/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-slate-300 font-medium">No messages yet.</p>
            <p className="mt-2 text-sm text-slate-400">Start the conversation!</p>
          </div>
        )}
      </div>
      
      {/* Message Input */}
      <form onSubmit={handleSubmit} className="border-t border-slate-800 p-4 bg-slate-900">
        <div className="flex items-center">
          {/* Attachment button */}
          <motion.button
            type="button"
            className="p-2 mr-2 text-slate-400 hover:text-slate-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Add attachment"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </motion.button>
          
          <input
            type="text"
            value={message}
            onChange={handleMessageChange}
            placeholder="Type a message..."
            className="flex-1 py-2 px-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-fuchsia-500 transition-colors duration-200"
          />
          
          {/* Emoji picker button */}
          <motion.button
            type="button"
            className="p-2 ml-2 text-slate-400 hover:text-slate-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Choose emoji"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.button>
          
          <motion.button 
            type="submit"
            disabled={!message.trim()}
            className="ml-2 p-2 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white hover:shadow-lg hover:shadow-fuchsia-500/20 focus:outline-none disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {message.trim() ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            )}
          </motion.button>
        </div>
      </form>
    </>
  );
};

export default ChatWindow;