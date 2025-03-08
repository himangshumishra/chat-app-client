import { useChat } from '../context/ChatContext';
import { useSocket } from '../context/SocketContext';
import { formatDistanceToNow } from '../utils/dateFormat';
import { motion } from 'framer-motion';

const ChatList = ({ onSelectConversation }) => {
  const { conversations, activeConversation, loading } = useChat();
  const { isUserOnline } = useSocket();

  if (loading && conversations.length === 0) {
    return (
      <div className="flex justify-center items-center h-32">
        <svg className="animate-spin h-6 w-6 text-fuchsia-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-500/20 to-fuchsia-600/20 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p className="text-slate-300 font-medium">No conversations yet</p>
        <p className="mt-2 text-sm text-slate-400">Search for users to start chatting!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-132px)] bg-slate-900">
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-rose-500/50 hover:scrollbar-thumb-rose-500 scrollbar-thumb-rounded min-h-screen">
        <div className="divide-y divide-slate-800/80">
          {conversations.map((conversation, index) => (
            <motion.div 
              key={conversation._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                activeConversation?._id === conversation._id 
                  ? 'bg-slate-800' 
                  : 'hover:bg-slate-800/50'
              }`}
              onClick={() => onSelectConversation(conversation._id)}
            >
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-600 flex items-center justify-center text-white font-medium">
                      {conversation.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className={`absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-slate-900 ${
                      isUserOnline(conversation._id) ? 'bg-green-400' : 'bg-slate-500'
                    }`}></span>
                  </div>
                  <div className="ml-3 min-w-0 flex-1">
                    <div className="font-medium text-white truncate">{conversation.name}</div>
                    <div className="text-sm truncate text-slate-400 max-w-[180px]">
                      {conversation.lastMessage}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-500 flex flex-col items-end flex-shrink-0 ml-2">
                  <div>{formatDistanceToNow(conversation.lastMessageDate)}</div>
                  {conversation.unreadCount > 0 && (
                    <div className="bg-gradient-to-r from-rose-500 to-fuchsia-500 rounded-full text-white px-2 py-1 mt-1 text-xs min-w-[20px] text-center">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatList;