import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { useSocket } from '../context/SocketContext';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import SearchUsers from './SearchUsers';

const ChatContainer = () => {
  const { currentUser, logout } = useAuth();
  const { activeConversation, selectConversation } = useChat();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  
  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!currentUser) {
    return null;
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-white">
      {/* Sidebar - Chat List */}
      <div className={`${
        isMobileMenuOpen ? 'block' : 'hidden'
      } md:block md:w-1/3 lg:w-1/4 flex-shrink-0 h-full flex flex-col bg-slate-900 border-r border-slate-800`}>
        {/* Logo and search header - fixed */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full blur-md bg-rose-500 opacity-70"></div>
              <div className="relative bg-slate-950 rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fuchsia-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h1 className="text-xl font-bold text-white ml-2">MishrazChat</h1>
          </div>
          <div className="flex space-x-2">
            <motion.button 
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-slate-800"
              title="Search Users"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.button>
            <motion.button 
              className="md:hidden p-2 rounded-full hover:bg-slate-800"
              onClick={toggleMobileMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* User profile summary - fixed */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-600 flex items-center justify-center text-white font-medium">
              {currentUser.name?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <div className="font-medium text-white">{currentUser.name}</div>
              <div className="flex items-center text-xs text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-1"></span>
                Online
              </div>
            </div>
          </div>
          <div ref={profileMenuRef} className="relative">
            <motion.button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="p-2 rounded-full hover:bg-slate-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </motion.button>
            
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div 
                  className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10"
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="py-1">
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowProfileMenu(false);
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      View Profile
                    </button>
                    <div className="border-t border-slate-700 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-slate-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Scrollable content area - Search or Chat List */}
        <div className="flex-1 overflow-hidden bg-slate-900">
          {isSearchOpen ? (
            <SearchUsers onSelectUser={(user) => {
              selectConversation(user._id);
              setIsSearchOpen(false);
              setIsMobileMenuOpen(false);
            }} />
          ) : (
            <ChatList 
              onSelectConversation={(userId) => {
                selectConversation(userId);
                setIsMobileMenuOpen(false);
              }} 
            />
          )}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className={`${
        !isMobileMenuOpen ? 'block' : 'hidden'
      } md:block flex-1 flex flex-col h-full overflow-y-scroll scrollbar-hidden bg-slate-900`}>
        {activeConversation ? (
          <ChatWindow 
            toggleMobileMenu={toggleMobileMenu}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-slate-900">
            <div className="text-center p-8 max-w-md">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-500/30 to-fuchsia-600/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Welcome to MishrazChat</h3>
              <p className="text-slate-400 mb-6">
                Start a new conversation by selecting a contact or searching for users
              </p>
              <motion.button 
                onClick={() => setIsMobileMenuOpen(true)} 
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white rounded-full hover:shadow-lg hover:shadow-rose-500/20 md:hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Find someone to chat with
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;